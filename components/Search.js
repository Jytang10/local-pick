import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button } from 'react-native';
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
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Discover')}>
          <Text>Click me to go to Discover screen directly</Text>
        </TouchableOpacity>
        <View>
          <Text>Set City below</Text>
          <TextInput
            style={styles.cityInput}
            placeholder="Enter city"
            onChangeText={city => this.setState({ city })}
            value={city}>
          </TextInput>
          <Button title="Submit" onPress={this.submitCity}></Button>
        </View>
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
  }
});

export default connect(null, {setCity})(Search);
