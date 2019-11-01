import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, Button, ScrollView, ActivityIndicator } from 'react-native';
import { GOOGLE_PLACES_API_KEY } from 'react-native-dotenv';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';
import { MaterialIcons } from '@expo/vector-icons';
import LocationItem from './LocationItem';
import { LinearGradient } from 'expo-linear-gradient';
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
    borderRadius:10,
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
    padding: 5,
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
