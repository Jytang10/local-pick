import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button, ScrollView } from 'react-native';
import { GOOGLE_PLACES_API_KEY } from 'react-native-dotenv';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';
import LocationItem from './LocationItem';
import { setCity } from '../actions';
import { connect } from 'react-redux';
class Search extends Component {

  state = {
    city:""
  }

  submitCity = () => {
    const { city } = this.state;
    this.props.setCity(city);
    this.setState({ city: "" });
    this.props.navigation.navigate('Discover');
  } 
  
  render() {
    const { city } = this.state;
    return (
      <View style={styles.container}>
        <GoogleAutoComplete apiKey={GOOGLE_PLACES_API_KEY} debounce={500} minLength={4}>
          {({ handleTextChange, locationResults }) => (
            <React.Fragment>
              {console.log('locationResults', locationResults)}
              <View style={styles.textInputContainer}>
                <TextInput 
                  style={styles.textInput}
                  placeholder="Search for a city"
                  onChangeText={handleTextChange}
                  >
                </TextInput>
              </View>
              <ScrollView>
                {locationResults.map(ele => (
                  <LocationItem
                    {...ele}
                    key={ele.id}
                  >
                  </LocationItem>
                ))}
              </ScrollView>
            </React.Fragment>
          )}
        </GoogleAutoComplete>
        <Text>Set City below</Text>
        <TextInput
          style={styles.cityInput}
          placeholder="Enter city"
          onChangeText={city => this.setState({ city })}
          value={city}>
        </TextInput>
        <Button title="Submit" onPress={this.submitCity}></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
    backgroundColor: 'orange',
  },
  cityInput: {
    marginTop: 20,
    height: 40,
    borderColor: 'grey',
    borderWidth: 1
  },
  textInputContainer: {
    marginTop: 30
  },
  textInput: {
    height: 40,
    width: 300,
    borderWidth: 1,
    paddingHorizontal: 16
  }
});

export default connect(null, {setCity})(Search);
