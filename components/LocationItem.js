import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

class LocationItem extends Component {

  handlePress = async () => {
    const res = await this.props.fetchDetails(this.props.place_id)
  }

  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this.handlePress}>
        <Text>{this.props.description}</Text>
      </TouchableOpacity>
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
