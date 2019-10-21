import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { postLocation } from '../actions';
import { connect } from 'react-redux';

class PostLocation extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>PostLocation</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default PostLocation;
