import React, { Component } from 'react';
import { validateAll } from 'indicative/validator';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
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
      <LinearGradient 
        colors={['#3F54E3', '#E089B3']}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>          
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Sign Up Form</Text>
        </View>
        <View style={styles.inputContainer}>
          <Hoshi 
            style={{marginBottom:20}}
            label={"name"}
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
            label={"email"}
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
            label={"password"}
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
            label={"Reconfirm password"}
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
              <Text>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
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
  inputContainer: {
    flex: 5,
  },
  submitButtonContainer: {
    alignItems: 'center',
  },
  submitButton: {
    width: 250,
    padding: 13,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
});

export default SignUp;
