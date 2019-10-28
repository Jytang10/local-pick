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
    console.log(value)
    // const city = value.address_components[0].long_name
    // const title;
    // const address;
    // const photo_url;
    // const contact;
    // this.props.postLocation(city, params.key);
    // this.props.navigation.goBack('Locations');
  }

  render() {
    // const { locationTitle } = this.state;
    return (
      <View style={styles.container}>
        <Text>Add a Recommendation</Text>
        <TextInput 
          style={styles.locationTitle}
          placeholder="title"
          onChangeText={locationTitle => this.setState({ locationTitle })}
          value={locationTitle}>
        </TextInput>
        <Button title="submit" onPress={this.submitLocation}></Button>
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
  }
});

export default connect(null, {postLocation})(PostLocation);
