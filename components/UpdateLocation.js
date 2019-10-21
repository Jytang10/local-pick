import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { updateLocation } from '../actions';
import { connect } from 'react-redux';

class UpdateLocation extends Component {
  state = {
    locationTitle: this.props.navigation.state.params.locationTitle,
    key: this.props.navigation.state.params.key
  }

  submitUpdate = () => {
    const { locationTitle, key } = this.state;
    this.props.updateLocation(locationTitle, key);
    this.setState({
      locationTitle: "",
      key: ""
    })
    this.props.navigation.navigate('Locations');
  }

  render() {
    const { locationTitle } = this.state;
    return (
      <View style={styles.container}>
        <Text>Update Location Screen</Text>
        <TextInput
          style={styles.titleInput}
          placeholder="title"
          onChangeText={locationTitle => this.setState({ locationTitle })}
          value={locationTitle}>
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
