import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button, ScrollView, ActivityIndicator } from 'react-native';
import { GOOGLE_PLACES_API_KEY } from 'react-native-dotenv';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';
import { MaterialIcons } from '@expo/vector-icons';
import LocationItem from './LocationItem';
import { setCity } from '../actions';
import { connect } from 'react-redux';
class Search extends Component {

  searchLocation = (value) => {
    const city = value.address_components[0].long_name
    this.props.setCity(city);
    this.props.navigation.navigate('Discover');
  }
  
  render() {
    return (
      <View style={styles.container}>
        <GoogleAutoComplete apiKey={GOOGLE_PLACES_API_KEY} debounce={500} minLength={4} components="country:us" queryTypes="(cities)">
          {({ handleTextChange, locationResults, fetchDetails, isSearching, inputValue, clearSearchs }) => (
            <React.Fragment>
              <View style={styles.textInputContainer}>
                <MaterialIcons name='search' size={26} color='grey'></MaterialIcons>
                <TextInput 
                  style={styles.textInput}
                  placeholder="Search for a city"
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
    padding: 10,
    backgroundColor: '#fff',
  },
  textInputContainer: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    width: 200,
    borderWidth: 2,
    borderColor: 'grey',
    paddingHorizontal: 16
  },
});

export default connect(null, {setCity})(Search);
