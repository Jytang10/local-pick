import React, { Component } from 'react';
import { View, SafeAreaView, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import firebase from 'firebase';
import { StackActions, NavigationActions } from 'react-navigation'


class Profile extends Component {
  state = {
    loginStatus: null,
    userData: {}
  }

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

  logout = () => {
    firebase.auth().signOut()
    .then(() => {
      this.props.navigation.navigate('Home')
    })
  }

  updateProfileNav = (userData) => {
    // const resetAction = StackActions.reset({
    //   index: 0,
    //   key: null,
    //   actions: [NavigationActions.navigate({ routeName: 'UpdateProfile', params: {userData: {...userData}}})],
    // });
    // this.props.navigation.dispatch(resetAction);
  }

  render() {
    ({ name, displayName, location, food, about, email } = this.state.userData)
    let userData = this.state.userData;
    return (
      this.state.loginStatus
      ? <SafeAreaView style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.profileImageContainer}>
              <View style={styles.profileImage}>
                <Image source={require('../assets/images/avatar.png')} style={styles.image} resizeMode='center'></Image>
              </View>
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
            <View>
              <View style={styles.sectionTitleContainer}>
                <Text style={styles.subText}>About</Text>
                <Text style={[styles.text, styles.aboutInfo]}>{about}</Text>
              </View>
            </View>
            <View>
              <View style={styles.sectionTitleContainer}>
                <Text style={styles.subText}>Contact</Text>
                <Text style={[styles.text, styles.contactInfo]}>{email}</Text>
              </View>
            </View>
            <View style={styles.signUpButtonContainer}>
              <TouchableOpacity style={[styles.signUpButton, {backgroundColor: '#4654FF'}]} onPress={() => this.props.navigation.navigate('UpdateProfile', {...userData})}>
                <Text style={styles.signUpText}>Update User Info</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.signUpButtonContainer}>
              <TouchableOpacity style={styles.signUpButton} onPress={this.logout}>
                <Text style={styles.signUpText}>Logout</Text>
              </TouchableOpacity>
            </View>
            {/* <View>
              <View style={styles.sectionTitleContainer}>
                <Text style={styles.subText}>Media</Text>
              </View>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
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
            </View> */}
          </ScrollView>
        </SafeAreaView>
      : <View style={styles.emptyResults}>
          <MaterialIcons size={150} color="red" name="person-pin"></MaterialIcons>
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
    backgroundColor: '#fff',
  },
  text: {
    // fontFamily: 'HelveticaNeu',
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
    fontSize: 12,
    color: '#AEB5BC',
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  profileImageContainer: {
    alignSelf: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  titleContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  name: {
    fontWeight: '200',
    fontSize: 36,
  },
  username: {
    color: '#AEB5BC',
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 10,
  },
  statsBox: {
    alignItems: 'center',
    flex: 1,
  },
  stat: {
    fontSize: 24,
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
    marginHorizontal: 10,
  },
  sectionTitleContainer: {
    padding: 10,
  },
  aboutInfo: {
    fontWeight: '400',
  },  
  contactInfo: {
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
    backgroundColor: '#1491f5',
  },
  signUpText: {
    textAlign:'center',
    color:'#fff',
    fontWeight:'bold',
    fontSize:20  
  }
});

function mapStateToProps(state){
  return {
    loginStatus: state.loginReducer.loginStatus,
    userData: state.userReducer.userData,
  }
}

export default connect(mapStateToProps, {})(Profile);
