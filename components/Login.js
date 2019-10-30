import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LoginEmailPassword from './LoginEmailPassword';
import { LinearGradient } from 'expo-linear-gradient';

class Login extends Component {
  render() {
    return (
      <LinearGradient 
        colors={['#3F54E3', '#E089B3']}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>        
        <View style={styles.title}>
          <Text>Login or Sign-Up</Text>
        </View>
        <View style={styles.loginForm}>
          <LoginEmailPassword></LoginEmailPassword>
        </View>
        <TouchableOpacity style={styles.signUpButton} onPress={() => this.props.navigation.navigate('SignUp')}>
          <Text>New User Sign Up</Text>
        </TouchableOpacity>
      </LinearGradient>
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
    flex: 1,
    alignItems: 'center'
  }
});

export default Login;
