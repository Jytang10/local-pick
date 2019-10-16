import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class LocationDetails extends Component {
  render() {
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
  },
});

export default LocationDetails;
