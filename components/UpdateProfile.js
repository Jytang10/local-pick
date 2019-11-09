import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { updateProfile } from '../actions';
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation'

class UpdateProfile extends Component {
  state = {
    name: this.props.navigation.state.params.name,
    displayName: this.props.navigation.state.params.displayName,
    location: this.props.navigation.state.params.location,
    food: this.props.navigation.state.params.food,
    about: this.props.navigation.state.params.about,
    email: this.props.navigation.state.params.email,
  }

  submitUpdate = () => {
    const { name, displayName, location, food, about, email } = this.state;
    this.props.updateProfile(name, displayName, location, food, about, email);
    this.setState({
      name: "",
      displayName: "",
      location: "",
      food: "",
      about: "",
      email: "",
    })
    const resetAction = StackActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName: 'Profile' })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    const { name, displayName, location, food, about, email } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={[styles.text, styles.topText]}>Modify and submit updated values</Text>
        </View>
        <View style={styles.inputContainer}>      
          <TextInput
            style={styles.input}
            placeholder="Name"
            onChangeText={name => this.setState({ name })}
            value={name}>
          </TextInput>
        </View>
        <View style={styles.inputContainer}>      
          <TextInput
            style={styles.input}
            placeholder="Display Name"
            onChangeText={displayName => this.setState({ displayName })}
            value={displayName}>
          </TextInput>
        </View>
        <View style={styles.inputContainer}>      
          <TextInput
            style={styles.input}
            placeholder="Location"
            onChangeText={location => this.setState({ location })}
            value={location}>
          </TextInput>
        </View>
        <View style={styles.inputContainer}>      
          <TextInput
            style={styles.input}
            placeholder="Favorite Food"
            onChangeText={food => this.setState({ food })}
            value={food}>
          </TextInput>
        </View>
        <View style={styles.inputContainer}>      
          <TextInput
            style={styles.input}
            placeholder="About"
            onChangeText={about => this.setState({ about })}
            value={about}>
          </TextInput>
        </View>
        <View style={styles.inputContainer}>      
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={email => this.setState({ email })}
            value={email}>
          </TextInput>
        </View>
        <TouchableOpacity style={styles.buttonContainer} onPress={this.submitUpdate}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#fff',
  },
  text: {
    // fontFamily: 'HelveticaNeu',
    color: '#52575D'
  },
  textContainer: {
    textAlign: 'center',
    marginBottom: 15,
  },
  topText: {
    fontSize: 18,
    fontWeight: '400',
  },
  inputContainer: {
    backgroundColor: '#f1f6ff',
    borderRadius: 5,
    height: 40,
    paddingLeft: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  input: {
    height: 40,
    fontSize: 15,
  },
  buttonContainer: {
    backgroundColor:'#5580f9',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    textAlign:'center',
    color:'#fff',
    fontWeight:'bold',
    fontSize: 20,
  },
});

export default connect(null, {updateProfile})(UpdateProfile);
