import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { updateLocation } from '../actions';
import { connect } from 'react-redux';

class UpdateLocation extends Component {
  state = {
    name: this.props.navigation.state.params.name,
    key: this.props.navigation.state.params.key
  }

  submitUpdate = () => {
    const { name, key } = this.state;
    this.props.updateLocation(name, key);
    this.setState({
      name: "",
      key: ""
    })
    this.props.navigation.navigate('Locations');
  }

  render() {
    const { name } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={[styles.text, styles.topText]}>Modify and submit updated values</Text>
        </View>
        <View style={styles.inputContainer}>     
          <TextInput
            style={styles.input}
            placeholder="title"
            onChangeText={name => this.setState({ name })}
            value={name}>
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

export default connect(null, {updateLocation})(UpdateLocation);
