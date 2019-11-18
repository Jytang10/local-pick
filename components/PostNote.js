import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { postNote } from '../actions';
import { connect } from 'react-redux';

class PostNote extends Component {
  state = {
    content:""
  }

  submitNote = () => {
    const { content } = this.state;
    const params = this.props.navigation.state.params;
    const userID = this.props.userData.userID;
    if(this.props.loginStatus){
      let userName = this.props.userData.displayName;
      this.props.postNote(content, userName, params.key, userID);
    } else {
      this.props.postNote(content, 'anonymous', params.key);
    }
    this.setState({ content:"" });
    this.props.navigation.navigate('LocationDetails')
  }

  render() {
    const { content } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={[styles.text, styles.topText]}>Add a personal note </Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input}
            placeholder="Note"
            onChangeText={content => this.setState({ content })}
            value={content}>
          </TextInput>
        </View>
        <TouchableOpacity style={styles.buttonContainer} onPress={this.submitNote}>
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

function mapStateToProps(state){
  return {
    loginStatus: state.loginReducer.loginStatus,
    userData: state.userReducer.userData,
  }
}

export default connect(mapStateToProps, {postNote})(PostNote);
