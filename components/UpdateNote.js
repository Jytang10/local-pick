import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { updateNote } from '../actions';
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

  render() {
    const { content } = this.state;
    return (
      <View style={styles.container}>
        <Text>Update Note Screen</Text>
        <TextInput
          style={styles.contentInput}
          placeholder="content"
          onChangeText={content => this.setState({ content })}
          value={content}>
        </TextInput>
        <Button title="Submit" onPress={this.submitUpdate}></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  contentInput: {
    marginTop: 20,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  }
});

export default connect(null, {updateNote})(UpdateNote);
