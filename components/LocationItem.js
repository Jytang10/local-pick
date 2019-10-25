import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class LocationItem extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.description}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    height: 40,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
});

export default LocationItem;
