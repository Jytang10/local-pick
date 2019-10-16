import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Discover extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Discover</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'purple',
  },
});

export default Discover;
