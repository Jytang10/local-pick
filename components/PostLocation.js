import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ScrollView, ActivityIndicator } from 'react-native';
import { GOOGLE_PLACES_API_KEY } from 'react-native-dotenv';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';
import LocationItem from './LocationItem';
import { postLocation } from '../actions';
import { connect } from 'react-redux';
import axios from "axios";

class PostLocation extends Component {

  getWebsitePhotoData = (params, name, place_id, address, photo_ref, contact) => {
    Promise.all([
      axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=website&key=${GOOGLE_PLACES_API_KEY}`),
      axios.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo_ref}&key=${GOOGLE_PLACES_API_KEY}`)
    ])
    .then(([websiteRes, photoRes]) => {this.props.postLocation(name, websiteRes.data.result.website, address, photoRes.config.url, contact, params.key)})
    .then(this.props.navigation.navigate('Locations'))
    .catch(err => console.log(err))
  }

  searchLocation = (value) => {
    const params = this.props.navigation.state.params;
    const name = value.name;
    const place_id = value.place_id;
    const address = value.formatted_address;
    const photo_ref = value.photos[0].photo_reference;
    const contact = value.formatted_phone_number;
    this.getWebsitePhotoData(params, name, place_id, address, photo_ref, contact)
  }

  render() {
    return (
      <View style={styles.container}>
        <GoogleAutoComplete apiKey={GOOGLE_PLACES_API_KEY} debounce={500} minLength={4} components="country:us" queryTypes="establishment">
          {({ handleTextChange, locationResults, fetchDetails, isSearching, inputValue, clearSearchs }) => (
            <React.Fragment>
              <View style={styles.textInputContainer}>
                <TextInput 
                  style={styles.textInput}
                  placeholder="Search for an establishment"
                  onChangeText={handleTextChange}
                  value={inputValue}
                  >
                </TextInput>
                <Button title="Clear Results" onPress={clearSearchs}></Button>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#fff',
  },
  locationTitle: {
    marginTop:20,
    height: 40,
    borderColor: 'grey',
    borderWidth: 1
  },
  textInputContainer: {
    marginTop: 30,
    flexDirection: 'row'
  },
  textInput: {
    height: 40,
    width: 200,
    borderWidth: 2,
    borderColor: 'grey',
    paddingHorizontal: 16
  },
});

export default connect(null, {postLocation})(PostLocation);
