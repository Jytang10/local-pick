import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { postNote } from '../actions';
import { connect } from 'react-redux';

class PostNote extends Component {
  state = {
    content:""
  }

  submitNote = () => {
    const { content } = this.state;
    const params = this.props.navigation.state.params;
    this.props.postNote(content, params.key);
    this.setState({ content:"" });
    this.props.navigation.navigate('LocationDetails')
  }

  render() {
    const { content } = this.state;
    return (
      <View style={styles.container}>
        <Text>Add a Note</Text>
        <TextInput 
          style={styles.content}
          placeholder="content"
          onChangeText={content => this.setState({ content })}
          value={content}>
        </TextInput>
        <Button title="submit" onPress={this.submitNote}></Button>
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
  content: {
    marginTop:20,
    height: 40,
    borderColor: 'grey',
    borderWidth: 1
  }
});

export default connect(null, {postNote})(PostNote);
