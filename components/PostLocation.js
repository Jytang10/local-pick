import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ScrollView, ActivityIndicator } from 'react-native';
import { GOOGLE_PLACES_API_KEY } from 'react-native-dotenv';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';
import LocationItem from './LocationItem';
import { postLocation } from '../actions';
import { connect } from 'react-redux';

class PostLocation extends Component {
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

  searchLocation = (value) => {
    const params = this.props.navigation.state.params;
    const name = value.name;
    const place_id = value.place_id;
    const address = value.formatted_address;
    const photo_ref = value.photos[0].photo_reference;
    const contact = value.formatted_phone_number;
    this.props.postLocation(name, place_id, address, photo_ref, contact, params.key);
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
