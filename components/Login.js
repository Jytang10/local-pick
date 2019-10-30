import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LoginEmailPassword from './LoginEmailPassword';

class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text>Login or Sign-Up</Text>
        </View>
        <View style={styles.loginForm}>
          <LoginEmailPassword></LoginEmailPassword>
        </View>
        <TouchableOpacity style={styles.signUpButton} onPress={() => this.props.navigation.navigate('SignUp')}>
          <Text>New User Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    alignItems: 'center'
  },
  loginForm: {
    flex: 2
  },
  signUpButton: {
    flex: 1
  }
});

export default Login;
