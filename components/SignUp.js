import React, { Component } from 'react';
import { validateAll } from 'indicative/validator';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import Axios from 'axios';

class SignUp extends Component {
  state = {
    name:'',
    email:'',
    password:'',
    password_confirmation:'',
    userData:'',
    error:{}
  }

  registerUser = async(data) => {
    const rules = {
      name:'required|string',
      email:'required|email',
      password:'required|string|min:6|confirmed',
    }

    const messages = {
      required: (field) => `${field} is required`,
      'email.email': 'The email syntax is wrong',
      'password.confirmed': 'THe password did not match',
      'password.min': 'Password is too short'
    }

    try {
      await validateAll(data, rules, messages)
      const response = await Axios.post('https://react-blog-api.bahdcasts.com/api/auth/register',{
        name:data.name,
        email:data.email,
        password:data.password
      })
      this.setState({
        userData: response.data.data.user
      })
      this.props.navigation.navigate("Profile",{...this.state.userData})
    } catch(errors) {
      console.log('-------', errors.response)
      const formattedErrors = {}
      if(errors.response && errors.response.status === 422){
        formattedErrors['email'] = errors.response.data['email'][0]
        this.setState({
          error:formattedErrors
        })
      }else{
        errors.forEach(error => formattedErrors[error.field] = error.message)
        this.setState({
          error:formattedErrors
        })
      }
    }
  }
  
  render() {
    return (
       <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Hoshi 
            style={{marginBottom:20}}
            label={"Full Name"}
            backgroundColor={'#fff'}
            borderColor={'#b76c94'}
            borderHeight={3}
            inputPadding={16}
            value={this.state.name}
            onChangeText={name => this.setState({name})}
            >
          </Hoshi>
          {
            this.state.error['name'] && <Text style={{fontSize:25, color:'red'}}>{this.state.error['name']}</Text>
          }
          <Hoshi
            style={{marginBottom:20}}
            label={"Email"}
            backgroundColor={'#fff'}
            borderColor={'#b76c94'}
            borderHeight={3}
            inputPadding={16}
            value={this.state.email}
            onChangeText={email => this.setState({email})}
            >
          </Hoshi>
          {
            this.state.error['email'] && <Text style={{fontSize:25, color:'red'}}>{this.state.error['email']}</Text>
          }
          <Hoshi
            style={{marginBottom:20}}
            label={"Password"}
            secureTextEntry
            backgroundColor={'#fff'}
            borderColor={'#b76c94'}
            borderHeight={3}
            inputPadding={16}
            value={this.state.password}
            onChangeText={password => this.setState({password})}
            >
          </Hoshi>
          {
            this.state.error['password'] && <Text style={{fontSize:25, color:'red'}}>{this.state.error['password']}</Text>
          }
          <Hoshi 
            label={"Reconfirm Password"}
            secureTextEntry
            backgroundColor={'#fff'}
            borderColor={'#b76c94'}
            borderHeight={3}
            inputPadding={16}
            style={{marginBottom:45}}
            value={this.state.password_confirmation}
            onChangeText={password_confirmation => this.setState({password_confirmation})}
            >
          </Hoshi>
          <View style={styles.submitButtonContainer}>
            <TouchableOpacity style={styles.submitButton} onPress={() => this.registerUser(this.state)}>
              <Text style={styles.submitText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  inputContainer: {
    backgroundColor: '#fff',
    flex: 5,
    marginTop: 20,
  },
  submitButtonContainer: {
    alignItems: 'center',
  },
  submitButton: {
    width: 250,
    padding: 13,
    borderRadius: 20,
    backgroundColor: '#1491f5',
  },
  submitText: {
    textAlign:'center',
    color:'#fff',
    fontWeight:'bold',
    fontSize:20  }
});

export default SignUp;
