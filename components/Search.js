import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { GOOGLE_PLACES_API_KEY } from 'react-native-dotenv';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';
import { MaterialIcons } from '@expo/vector-icons';
import LocationItem from './LocationItem';
import { LinearGradient } from 'expo-linear-gradient';
import { setCity } from '../actions';
import { connect } from 'react-redux';

import { StackActions, NavigationActions } from 'react-navigation'


class Search extends Component {

  searchLocation = (value) => {
    const city = value.address_components[0].long_name
    this.props.setCity(city);
    this.textInput.clear();
    const resetAction = StackActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName: 'Discover' })],
    });
    this.props.navigation.dispatch(resetAction);
  }
  
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../assets/images/cafe.jpeg')} style={styles.heroImage}>
          <LinearGradient style={styles.heroTextContainer} start={{x: 0.1, y: 0.6}} end={{x: 0.1, y: 1}} colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,1)']}>
            <Text style={styles.heroText}>Find your local pick</Text>
          </LinearGradient>        
        </ImageBackground>
        <View style={styles.searchContainer}>
          <GoogleAutoComplete apiKey={GOOGLE_PLACES_API_KEY} debounce={500} minLength={4} components="country:us" queryTypes="(cities)">
            {({ handleTextChange, locationResults, fetchDetails, isSearching, inputValue, clearSearchs }) => (
              <React.Fragment>
                <View style={styles.textInputContainer}>
                  <MaterialIcons name='search' size={30} color='#3F54E3'></MaterialIcons>
                  <TextInput 
                    style={styles.textInput}
                    placeholder="Search for a city"
                    onChangeText={handleTextChange}
                    value={inputValue}
                    ref={input => { this.textInput = input }}
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
                      clearResults={clearSearchs}
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heroImage: {
    height: 200,
  },
  heroTextContainer: {
    flexDirection:'row',
    borderRadius: 10,
    position:'absolute',
    left:0,
    right:0,
    bottom:0,
    top:0
  },
  heroText: {
    fontSize:22,
    fontWeight:'bold',
    color:'#fff',
    alignSelf:'flex-end',
    paddingLeft:20,
    paddingBottom:20
  },
  searchContainer: {
    padding: 10,
    marginTop: 25,
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
});

export default connect(null, {setCity})(Search);
