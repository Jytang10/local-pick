//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

class Search extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>I am the Search screen</Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Discover')}>
          <Text>Click me to search and go to Discover screen</Text>
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
    backgroundColor: 'green',
  },
});

export default Search;
