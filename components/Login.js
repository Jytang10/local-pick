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
          <Text style={styles.titleText}>Login</Text>
        </View>
        <View style={styles.loginForm}>
          <LoginEmailPassword></LoginEmailPassword>
        </View>
        {/* <View style={styles.signUpContainer}>
          <TouchableOpacity style={styles.signUpButton} onPress={() => this.props.navigation.navigate('SignUp')}>
            <Text>New User Sign Up</Text>
          </TouchableOpacity>
        </View> */}
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
  // signUpContainer: {
  //   flex: 1,
  //   alignItems: 'center',
  // },
  // signUpButton: {
  //   width: 250,
  //   padding: 13,
  //   borderRadius: 20,
  //   backgroundColor: '#fff',
  //   alignItems: 'center'
  // }
});

export default Login;
