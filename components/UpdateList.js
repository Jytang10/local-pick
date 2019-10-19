import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { updateList } from '../actions';
import { connect } from 'react-redux';

class UpdateList extends Component {
  state = {
    title: this.props.navigation.state.params.title,
    key: this.props.navigation.state.params.key
  }

  submitUpdate = () => {
    const { title, key } = this.state;
    this.props.updateList(title, key);
    this.setState({
      title: "",
      key: ""
    })
    this.props.navigation.navigate('Discover');
  }

  render() {
    const { title } = this.state;
    return (
      <View style={styles.container}>
        <Text>Update List Screen</Text>
        <TextInput
          style={styles.titleInput}
          placeholder="title"
          onChangeText={title => this.setState({ title })}
          value={title}>
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
    padding: 30,
    backgroundColor: '#fff',
  },
  titleInput: {
    marginTop: 20,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  }
});

export default connect(null, {updateList})(UpdateList);
