import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, ImageBackground } from 'react-native';
import { GOOGLE_PLACES_API_KEY } from 'react-native-dotenv';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';
import { MaterialIcons } from '@expo/vector-icons';
import LocationItem from './LocationItem';
import { postLocation } from '../actions';
import { connect } from 'react-redux';
import axios from "axios";

class PostLocation extends Component {

  getWebsitePhotoData = (params, name, place_id, address, lat, lng, photo_ref, contact, userID) => {
    Promise.all([
      axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=website&key=${GOOGLE_PLACES_API_KEY}`),
      axios.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo_ref}&key=${GOOGLE_PLACES_API_KEY}`)
    ])
    .then(([websiteRes, photoRes]) => {
      let website;
      if(Object.keys(websiteRes.data.result).length == 0){
        website = "N/A"
      } else {
        website = websiteRes.data.result.website
      }
      this.props.postLocation(name, website, address, lat, lng, photoRes.config.url, contact, userID, params.key)
    })
    .then(this.props.navigation.navigate('Locations'))
    .catch(err => console.log(err))
  }

  searchLocation = (value) => {
    const params = this.props.navigation.state.params;
    const name = value.name;
    const place_id = value.place_id;
    const address = value.formatted_address;
    const lat = value.geometry.location["lat"];
    const lng = value.geometry.location["lng"];
    const photo_ref = value.photos[0].photo_reference;
    const contact = value.formatted_phone_number;
    const userID = this.props.userData.userID;
    this.getWebsitePhotoData(params, name, place_id, address, lat, lng, photo_ref, contact, userID)
  }

  render() {
    return (
      <View style={styles.container}>
         {
          this.props.userData
          ?
          <View>
            <View style={styles.topTextContainer}>
              <Text style={[styles.text, styles.topText]}>Search for an establishment</Text>
            </View>
            <View style={styles.searchContainer}>
              <GoogleAutoComplete apiKey={GOOGLE_PLACES_API_KEY} debounce={500} minLength={4} components="country:us" queryTypes="establishment">
                {({ handleTextChange, locationResults, fetchDetails, isSearching, inputValue, clearSearchs }) => (
                  <React.Fragment>
                    <View style={styles.textInputContainer}>
                      <MaterialIcons name='search' size={30} color='#3F54E3'></MaterialIcons>
                      <TextInput 
                        style={styles.textInput}
                        placeholder="Search for an establishment"
                        onChangeText={handleTextChange}
                        value={inputValue}
                        >
                      </TextInput>
                      <TouchableOpacity style={styles.clear} onPress={clearSearchs}>
                        <Text style={styles.clearText}>Clear</Text>
                      </TouchableOpacity>
                    </View>
                    {isSearching && <ActivityIndicator size="large" color="red"></ActivityIndicator>}
                    <ScrollView style={styles.locationResults} keyboardShouldPersistTaps='always'>
                      {locationResults.map(ele => (
                        <LocationItem
                          {...ele}
                          key={ele.id}
                          fetchDetails={fetchDetails}
                          searchLocation={this.searchLocation}
                        >
                        </LocationItem>
                      ))}
                    </ScrollView>
                  </React.Fragment>
                )}
              </GoogleAutoComplete>
              <ImageBackground source={require('../assets/images/truck.png')} style={styles.fillImage}></ImageBackground>
            </View>
          </View>
        :
        <View style={styles.emptyResults}>
          <MaterialIcons size={150} color="#E089B3" name="person-pin"></MaterialIcons>
          <Text style={[styles.errorText, {textAlign: 'center'}]}>Please login or sign up to add a location!</Text>
          <View style={styles.signUpButtonContainer}>
            <TouchableOpacity style={styles.signUpButton} onPress={() => this.props.navigation.navigate('Home')}>
              <Text style={styles.signUpText}>Login or Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
        }
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
  topTextContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  topText: {
    fontSize: 20,
    fontWeight: '400',
  },
  searchContainer: {
    padding: 10,
    marginTop: 10,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    height: 45,
    width: 275,
    borderWidth: 3,
    borderColor: '#3F54E3',
    paddingHorizontal: 16,
    marginLeft: 5,
  },
  clear: {
    padding: 10,
  },
  clearText: {
    color: 'grey',
  },
  fillImage: {
    height: 250,
    width: 250,
    alignSelf: 'center',
    marginTop: 35,
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
});

function mapStateToProps(state){
  return {
    userData: state.userReducer.userData,
  }
}

export default connect(mapStateToProps, {postLocation})(PostLocation);

