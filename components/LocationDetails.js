import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import Communications from 'react-native-communications';
import { getNotes } from '../actions';
import { connect } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import { ButtonGroup } from 'react-native-elements';
import { Linking } from 'expo';
import _ from 'lodash';
class LocationDetails extends Component {

  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    const params = navigation.state.params;
    if(state.params != undefined){
      return {
          headerRight: 
          <TouchableOpacity style={[styles.contentBox, {marginRight: 20}]} onPress={() => navigation.navigate('PostNote', params)}>
            <MaterialIcons size={35} color="#fff" name="add-circle-outline"></MaterialIcons>
          </TouchableOpacity>
        }
    }
  };

  componentDidMount(){
    const params = this.props.navigation.state.params;
    this.props.getNotes(params.key);
  }

  componentWillMount(){
    const { setParams } = this.props.navigation;
    setParams({ userData: this.props.userData });
  }

  render() {
    const map = <MaterialIcons name="map" color="#fff" size={25}></MaterialIcons>
    const phone = <MaterialIcons name="phone" color="#fff" size={25}></MaterialIcons>
    const link = <MaterialIcons name="link" color="#fff" size={25}></MaterialIcons>
    const params = this.props.navigation.state.params;
    let websiteButton;
    if(params.website !== 'N/A'){
      websiteButton = () =>
        <TouchableOpacity onPress={() => Linking.openURL(params.website)}>
          {link}
        </TouchableOpacity> 
    } else {
      websiteButton = () => 
        <TouchableOpacity onPress={() => alert('No website provided')}>
          {link}
        </TouchableOpacity> 
    }
    const mapButton = () => 
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Map', {...params})}>
        {map}
      </TouchableOpacity>
    const callButton = () => 
      <TouchableOpacity onPress={() => Communications.phonecall(params.contact, true)}>
        {phone}
      </TouchableOpacity>
    const buttons = [{ element: websiteButton }, { element: mapButton }, { element: callButton }]
    return (
      <ScrollView style={styles.container}>
        <View>
          <ImageBackground source={{uri: params.photo_url}} style={styles.heroImage}></ImageBackground>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.mainTitleContainer}>
            <Text style={[styles.text, styles.name]}>{params.name}</Text>
          </View>
          <View style={styles.buttonGroup}>
            <ButtonGroup buttons={buttons} containerStyle={{height: 50, borderWidth: 0, borderRadius: 6, backgroundColor:'#3F54E3',}}/>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.subText}>Address</Text>
            <Text style={[styles.text, styles.sectionText]}>{params.address}</Text>
          </View>
          <View style={styles.titleContainer}>
            <Text style={[styles.text, styles.title]}>Notes</Text>
          </View>   
          <View style={styles.notesContainer}>
          {
            this.props.loadingReducer
            ? <ActivityIndicator size="large" color="#0000ff"></ActivityIndicator>
            : <FlatList
                style={{width:'100%'}}
                data={this.props.listOfNotes}
                keyExtractor={(item) => item.key}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => {
                return (
                    <View style={styles.itemContainer}>
                      <View style={styles.itemInfoContainer}>
                        <Text style={styles.subText}>@{item.userName}</Text>
                        {
                        this.props.userData && this.props.userData.userID === item.userID
                        ?  <View style={styles.iconContainer}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('UpdateNote', {...item})}>
                              <View style={{marginRight:10}}>
                                <MaterialIcons size={20} color="#5580f9" name="edit"></MaterialIcons>
                              </View>
                            </TouchableOpacity> 
                          </View>
                        : <View></View>
                        }
                      </View>
                      <View style={styles.noteContentContainer}>
                        <Text style={[styles.text, {fontSize: 18}]}>"{item.content}"</Text>
                      </View>
                    </View>
                    )
                  }}
                >
              </FlatList>
            }
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  text: {
    color: '#52575D'
  },
  subText: {
    fontSize: 14,
    color: '#AEB5BC',
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  heroImage: {
    height: 200,
  },
  contentContainer: {
    paddingTop: 10,
    paddingRight: 10,
    paddingLeft: 10,
  },
  mainTitleContainer: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  buttonGroup: {
    marginTop: 10,
  },
  name: {
    fontWeight: '500',
    fontSize: 38,
  },
  sectionContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  sectionText: {
    fontSize: 16,
    fontWeight: '400',
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  contentBox: {
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 28,
  },
  itemContainer: {
    overflow:'hidden',
    marginVertical:10,
    marginHorizontal:10,
    borderRadius: 10,
    backgroundColor:'#d6d7da',
  },
  itemInfoContainer: {
    paddingTop: 10,
    paddingRight: 10,
    paddingLeft: 10,
    backgroundColor:'#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 22,
    fontWeight:'bold',
    color: '#5e90fb',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 35,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  noteContentContainer: {
    backgroundColor:'#fff',
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
  },
});

function mapStateToProps(state){
  const listOfNotes = _.map(state.notesList.notesList, (val, key) => {
    return {
      ...val,
      key: key
    }
  })
  return {
    listOfNotes,
    loadingReducer: state.loadingReducer.loadingReducer,
    userData: state.userReducer.userData,
  }
}

export default connect(mapStateToProps, {getNotes})(LocationDetails);
