import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LoginEmailPassword from './LoginEmailPassword';

class Login extends Component {
  
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.loginForm}>
          <LoginEmailPassword navigation={navigation}></LoginEmailPassword>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  loginForm: {
    top: '25%',
    flex: 2,
  },
});

export default Login;
