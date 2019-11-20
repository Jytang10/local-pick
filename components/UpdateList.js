import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { updateList, deleteList } from '../actions';
import { connect } from 'react-redux';

class UpdateList extends Component {
  state = {
    title: this.props.navigation.state.params.title,
    description: this.props.navigation.state.params.description,
    key: this.props.navigation.state.params.key
  }

  submitUpdate = () => {
    const { title, description, key } = this.state;
    this.props.updateList(title, description, key);
    this.setState({
      title: "",
      description: "",
      key: ""
    })
    this.props.navigation.navigate('Discover');
  }

  removeItem = () => {
    const { key } = this.state;
    this.props.deleteList(key)
    this.props.navigation.navigate('Discover')
  }

  render() {
    const { title, description } = this.state;
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.textContainer}>
            <Text style={[styles.text, styles.topText]}>Modify and submit updated values</Text>
          </View>
          <View style={styles.inputContainer}>      
            <TextInput
              style={styles.input}
              placeholder="Title"
              onChangeText={title => this.setState({ title })}
              value={title}>
            </TextInput>
          </View>
          <View style={styles.inputContainer}>      
            <TextInput
              style={styles.input}
              placeholder="Short Description"
              onChangeText={description => this.setState({ description })}
              value={description}>
            </TextInput>
          </View>
          <TouchableOpacity style={styles.buttonContainer} onPress={this.submitUpdate}>
            <Text style={styles.buttonText}>Submit Update</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.deleteButtonContainer}>
          <TouchableOpacity style={[styles.buttonContainer, {backgroundColor: 'red'}]} onPress={this.removeItem}>
            <Text style={styles.buttonText}>Remove Category</Text>
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
  }
});

export default connect(null, {updateList, deleteList})(UpdateList);
