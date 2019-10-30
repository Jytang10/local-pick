import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SignUpRegister from './SignUpRegister';
import { LinearGradient } from 'expo-linear-gradient';

class SignUp extends Component {
  render() {
    return (
      <LinearGradient 
        colors={['#3F54E3', '#E089B3']}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>          
        <Text>Sign Up</Text>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignUp;
