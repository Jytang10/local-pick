import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import firebase from 'firebase';
import 'firebase/firestore';

class SignUp extends Component {
  state = {
    name:'',
    displayName:'',
    location:'',
    food:'',
    about:'',
    email:'',
    password:'',
    userData:'',
  }

  registerUser = data => {
    ({ name, displayName, location, food, about, email, password } = data)
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        const fbRootRefFS = firebase.firestore();
        const userID = user.user.uid;
        console.log('user ID is', userID)
        const userRef = fbRootRefFS.collection('users').doc(userID);
        userRef.set({
          name,
          displayName,
          location,
          food,
          about,
          email,
          password
        });
      }).catch((error) => {
        console.log('Could not register User', error)
      });

    this.setState({
      userData: data
    })

    this.props.navigation.navigate("Profile",{...this.state.userData})
  };
  
  render() {
    return (
       <ScrollView style={styles.container}>
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
          <Hoshi 
            style={{marginBottom:20}}
            label={"Display Name"}
            backgroundColor={'#fff'}
            borderColor={'#b76c94'}
            borderHeight={3}
            inputPadding={16}
            value={this.state.displayName}
            onChangeText={displayName => this.setState({displayName})}
            >
          </Hoshi>
          <Hoshi 
            style={{marginBottom:20}}
            label={"Location"}
            backgroundColor={'#fff'}
            borderColor={'#b76c94'}
            borderHeight={3}
            inputPadding={16}
            value={this.state.location}
            onChangeText={location => this.setState({location})}
            >
          </Hoshi>
          <Hoshi 
            style={{marginBottom:20}}
            label={"Favorite Food"}
            backgroundColor={'#fff'}
            borderColor={'#b76c94'}
            borderHeight={3}
            inputPadding={16}
            value={this.state.food}
            onChangeText={food => this.setState({food})}
            >
          </Hoshi>
          <Hoshi 
            style={{marginBottom:20}}
            label={"Short User Bio"}
            backgroundColor={'#fff'}
            borderColor={'#b76c94'}
            borderHeight={3}
            inputPadding={16}
            value={this.state.about}
            onChangeText={about => this.setState({about})}
            >
          </Hoshi>
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
          <View style={styles.submitButtonContainer}>
            <TouchableOpacity style={styles.submitButton} onPress={() => this.registerUser(this.state)}>
              <Text style={styles.submitText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
