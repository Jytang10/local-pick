import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Login</Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}>
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
    alignItems: 'center',
    backgroundColor: 'grey',
  },
});

export default Login;
