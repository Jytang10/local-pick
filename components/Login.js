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
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>User Login</Text>
        </View>
        <View style={styles.loginForm}>
          <LoginEmailPassword></LoginEmailPassword>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  titleText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 50,
  },
  loginForm: {
    flex: 2
  },
});

export default Login;
