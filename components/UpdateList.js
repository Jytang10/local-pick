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
    this.props.navigation.navigation('Discover');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Update List</Text>
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
});

export default UpdateList;
