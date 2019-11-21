import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { updateNote, deleteNote } from '../actions';
import { connect } from 'react-redux';

class UpdateNote extends Component {
  state = {
    content: this.props.navigation.state.params.content,
    key: this.props.navigation.state.params.key
  }

  submitUpdate = () => {
    const { content, key } = this.state;
    this.props.updateNote(content, key);
    this.setState({
      content: "",
      key: ""
    })
    this.props.navigation.navigate('LocationDetails');
  }

  removeItem = () => {
    const { key } = this.state;
    this.props.deleteNote(key)
    this.props.navigation.navigate('LocationDetails')
  }

  render() {
    const { content } = this.state;
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.textContainer}>
            <Text style={[styles.text, styles.topText]}>Modify and submit updated values</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="note"
              onChangeText={content => this.setState({ content })}
              value={content}>
            </TextInput>
          </View>
          <TouchableOpacity style={styles.buttonContainer} onPress={this.submitUpdate}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.deleteButtonContainer}>
          <TouchableOpacity style={[styles.buttonContainer, {backgroundColor: 'red'}]} onPress={this.removeItem}>
            <Text style={styles.buttonText}>Remove Note</Text>
          </TouchableOpacity>
        </View>
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
  deleteButtonContainer: {
    marginTop: 25,
  },
});

export default connect(null, {updateNote, deleteNote})(UpdateNote);
