import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
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
        <Text>Update Location Screen</Text>
        <TextInput
          style={styles.titleInput}
          placeholder="title"
          onChangeText={name => this.setState({ name })}
          value={name}>
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
  titleInput: {
    marginTop: 20,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  }
});

export default connect(null, {updateLocation})(UpdateLocation);
