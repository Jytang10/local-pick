import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Communications from 'react-native-communications';
import Icon from 'react-native-vector-icons/FontAwesome';

class LocationDetails extends Component {
  render() {
    const map = <Icon style={{paddingRight:5}} name="map" color="black" size={20}></Icon>
    const phone = <Icon style={{paddingRight:5}} name="copy" color="black" size={20}></Icon>
    const params = this.props.navigation.state.params;
    console.log(params)
    return (
      <View style={styles.container}>
        <Text>I am the LocationDetails screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    backgroundColor: 'pink',
  },
});

export default LocationDetails;
