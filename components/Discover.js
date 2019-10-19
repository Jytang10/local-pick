import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { getLists } from '../actions';

class Discover extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>I am the Discover screen with various categories</Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Locations')}>
          <Text>Click me to view catagory and list of locations</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('PostList')}>
          <Text>Click me to add a List</Text>
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
    backgroundColor: 'purple',
  },
});

export default Discover;
