import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { postLocation } from '../actions';
import { connect } from 'react-redux';

class PostLocation extends Component {
  state = {
    locationTitle:"",
    city:""
  }

  submitLocation = () => {
    const { locationTitle, city } = this.state;
    const params = this.props.navigation.state.params;
    this.props.postLocation(locationTitle, city, params.key);
    this.setState({ locationTitle:"", city:"" });
    this.props.navigation.navigate('Locations')
  }

  render() {
    const { locationTitle, city } = this.state;
    return (
      <View style={styles.container}>
        <Text>Add a Recommendation</Text>
        <TextInput 
          style={styles.locationTitle}
          placeholder="title"
          onChangeText={locationTitle => this.setState({ locationTitle })}
          value={locationTitle}>
        </TextInput>
        <TextInput 
          style={styles.locationTitle}
          placeholder="city"
          onChangeText={city => this.setState({ city })}
          value={city}>
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
