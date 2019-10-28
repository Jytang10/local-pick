import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ScrollView, ActivityIndicator } from 'react-native';
import { GOOGLE_PLACES_API_KEY } from 'react-native-dotenv';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';
import LocationItem from './LocationItem';
import { postLocation } from '../actions';
import { connect } from 'react-redux';
import axios from "axios";

class PostLocation extends Component {
  state = {
    website: '',
    photo_url: ''
  }
  // state = {
  //   locationTitle:""
  // }

  // submitLocation = () => {
  //   const { locationTitle } = this.state;
  //   const params = this.props.navigation.state.params;
  //   this.props.postLocation(locationTitle, params.key);
  //   this.setState({ locationTitle:"" });
  //   this.props.navigation.navigate('Locations')
  // }

  getWebsiteData = async (place_id) => {
    const data = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=website&key=${GOOGLE_PLACES_API_KEY}`)
    // .then(res => console.log('----Places API data----', res.data.result.website))
    .then(res => this.setState({ website:res.data.result.website }))
    .catch(err =>{console.log(err)});
  }

  getPhotoData = async (photo_ref) => {
    const data = await axios.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo_ref}&key=${GOOGLE_PLACES_API_KEY}`)
    // .then(res => console.log('----Places API photo data----', res.config.url))
    .then(res => this.setState({ photo_url:res.config.url }))
    .catch(err =>{console.log(err)})
  }

  searchLocation = (value) => {
    const params = this.props.navigation.state.params;
    const name = value.name;
    const place_id = value.place_id;
    const address = value.formatted_address;
    const photo_ref = value.photos[0].photo_reference;
    const contact = value.formatted_phone_number;
    this.getWebsiteData(place_id);
    this.getPhotoData(photo_ref);
    const { website, photo_url } = this.state;
    // this.props.postLocation(name, place_id, address, photo_ref, contact, params.key);
    this.props.postLocation(name, website, address, photo_url, contact, params.key);
    this.props.navigation.navigate('Locations');
  }

  render() {
    // const { locationTitle } = this.state;
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
        {/* <Text>Add a Recommendation</Text>
        <TextInput 
          style={styles.locationTitle}
          placeholder="title"
          onChangeText={locationTitle => this.setState({ locationTitle })}
          value={locationTitle}>
        </TextInput>
        <Button title="submit" onPress={this.submitLocation}></Button> */}
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
