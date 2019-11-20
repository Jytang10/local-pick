import React, { Component } from 'react';
import { View, SafeAreaView, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import { Avatar } from 'react-native-elements';
import firebase from 'firebase';
import { StackActions, NavigationActions } from 'react-navigation'
class Profile extends Component {
  state = {
    loginStatus: null,
    userData: {}
  }

  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    const params = navigation.state.params;
    if(state.params != undefined){
      return { 
          headerRight:
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={[styles.contentBox, {marginRight: 10}]} onPress={state.params.updateProfileNav}>
              <MaterialIcons size={30} color="#fff" name="edit"></MaterialIcons>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.contentBox, {marginRight: 10}]} onPress={state.params.logout}>
              <MaterialIcons size={30} color="red" name="exit-to-app"></MaterialIcons>
            </TouchableOpacity>
          </View>
        }
    }
  };

  componentDidMount(){
    if(this.props.loginStatus){
      const loginStatus = this.props.loginStatus;
      this.setState({ loginStatus });
    }
    if(this.props.userData){
      const userData = this.props.userData;
      this.setState({ userData });
    }
  }

  componentWillMount(){
    const { setParams } = this.props.navigation;
    setParams({ updateProfileNav: this.updateProfileNav, logout: this.logout });
  }

  logout = () => {
    firebase.auth().signOut()
    .then(() => {
      this.props.navigation.navigate('Home')
    })
  }

  updateProfileNav = () => {
    let userData = this.state.userData;
    const resetAction = StackActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName: 'UpdateProfile', params: {...userData}})],
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    ({ name, displayName, location, food, about, email } = this.state.userData)
    return (
      this.state.loginStatus
      ? <SafeAreaView style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.profileImageContainer}>
              <Avatar rounded source={require('../assets/images/avatar.png')} size="xlarge" overlayContainerStyle={{backgroundColor: '#F6F6F6'}} />
            </View>
            <View style={styles.titleContainer}>
              <Text style={[styles.text, styles.name]}>{name}</Text>
              <Text style={[styles.text, styles.username]}>@{displayName}</Text>
            </View>
            <View style={styles.statsContainer}>
              <View style={styles.statsBox}>
                <Text style={[styles.text, styles.stat]}>{location}</Text>
                <Text style={[styles.text, styles.subText]}>Location</Text>
              </View>
              <View style={[styles.statsBox, styles.statsBorder]}>
                <Text style={[styles.text, styles.stat]}>{food}</Text>
                <Text style={[styles.text, styles.subText]}>Favorite Food</Text>
              </View>
            </View>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.subText}>About</Text>
              <Text style={[styles.text, styles.aboutInfo]}>{about}</Text>
            </View>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.subText}>Contact</Text>
              <Text style={[styles.text, styles.contactInfo]}>{email}</Text>
            </View>
            <View>
              <View style={styles.sectionTitleContainer}>
                <Text style={styles.subText}>Media</Text>
              </View>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{paddingTop: 10}}>
                <View style={styles.mediaImageContainer}>
                  <Image source={require('../assets/images/kitakata.jpeg')} style={styles.image} resizeMode='cover'></Image>
                </View>
                <View style={styles.mediaImageContainer}>
                  <Image source={require('../assets/images/omomo.jpeg')} style={styles.image} resizeMode='cover'></Image>
                </View>
                <View style={styles.mediaImageContainer}>
                  <Image source={require('../assets/images/cava.jpeg')} style={styles.image} resizeMode='cover'></Image>
                </View>
                <View style={styles.mediaImageContainer}>
                  <Image source={require('../assets/images/icecream.jpg')} style={styles.image} resizeMode='cover'></Image>
                </View>
                <View style={styles.mediaImageContainer}>
                  <Image source={require('../assets/images/halal.jpeg')} style={styles.image} resizeMode='cover'></Image>
                </View>
              </ScrollView>
            </View>
          </ScrollView>
        </SafeAreaView>
      : <View style={styles.emptyResults}>
          <MaterialIcons size={150} color="#E089B3" name="person-pin"></MaterialIcons>
          <Text style={[styles.errorText, {textAlign: 'center'}]}>No current user. Please sign up for an account!</Text>
          <View style={styles.signUpButtonContainer}>
            <TouchableOpacity style={styles.signUpButton} onPress={() => this.props.navigation.navigate('Home')}>
              <Text style={styles.signUpText}>Login or Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  text: {
    color: '#52575D'
  },
  emptyResults: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  errorText: {
    fontSize: 26,
  },
  subText: {
    fontSize: 14,
    color: '#AEB5BC',
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  profileImageContainer: {
    alignSelf: 'center',
    marginTop: 15,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  titleContainer: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  name: {
    fontWeight: '200',
    fontSize: 38,
  },
  username: {
    color: '#AEB5BC',
    fontSize: 18,
  },
  statsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 15,
  },
  statsBox: {
    alignItems: 'center',
    flex: 1,
  },
  stat: {
    fontSize: 26,
  },
  statsBorder: {
    borderColor: '#DFD8C8',
    borderLeftWidth: 1,
  },
  mediaImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 15,
  },
  sectionTitleContainer: {
    alignItems: 'center',
    paddingTop: 15,
  },
  aboutInfo: {
    fontSize: 16,
    fontWeight: '400',
  },  
  contactInfo: {
    fontSize: 16,
    fontWeight: '500',
  },
  signUpButtonContainer: {
    alignItems: 'center',
    padding: 10,
  },
  signUpButton: {
    width: 250,
    padding: 13,
    borderRadius: 20,
    backgroundColor: '#3F54E3',
  },
  signUpText: {
    textAlign:'center',
    color:'#fff',
    fontWeight:'bold',
    fontSize:20  
  },
  iconContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginRight: 10,
  }
});

function mapStateToProps(state){
  return {
    loginStatus: state.loginReducer.loginStatus,
    userData: state.userReducer.userData,
  }
}

export default connect(mapStateToProps, {})(Profile);
