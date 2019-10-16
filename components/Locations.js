import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

class Locations extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>I am the Locations screen</Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('LocationDetails')}>
          <Text>Click me to view location details and go to LocationDetails screen</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
  },
});

export default Locations;
