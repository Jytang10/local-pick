import React, { Component } from 'react';
import firebase from 'firebase';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

class LoginEmailPassword extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    loading:false
  }

  onButtonPress = () => {
    // firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    // .then(this.onLoginSuccess)
    // .catch(err => {
    //   this.setState({
    //     error:err.message
    //   })
    // })
  }

  onLoginSuccess = () => {
    this.setState({
      error:'',
      loading:false
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput 
          placeholder="email" 
          style={styles.input}
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
          >
        </TextInput>
        <TextInput 
          placeholder="password" 
          style={styles.input}
          secureTextEntry
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
          >
        </TextInput>
        <TouchableOpacity style={styles.buttonContainer} onPress={this.onButtonPress}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.errorText}>
            {this.state.error} 
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:20
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.5)',
    paddingLeft: 10,
    marginBottom: 15,
    borderRadius: 5,
    fontSize: 15,
  },
  errorText: {
    fontSize: 25,
    color: 'red',
    alignSelf: 'center',
    marginTop:10
  },
  buttonText: {
    textAlign:'center',
    color:'#fff',
    fontWeight:'bold',
    fontSize:20
  },
  buttonContainer: {
    backgroundColor:'#3B3B98',
    padding:15,
    borderRadius:8
  }
});

export default LoginEmailPassword;
