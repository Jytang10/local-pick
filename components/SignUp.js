import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
class SignUp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Sign Up</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
});

export default SignUp;
