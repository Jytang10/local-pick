import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { postLocation } from '../actions';
import { connect } from 'react-redux';

class PostLocation extends Component {
  state = {
    locationTitle:""
  }

  submitLocation = () => {
    const { locationTitle } = this.state;
    this.props.postLocation(locationTitle);
    this.setState({ locationTitle:"" });
    this.props.navigation.navigate('Locations')
  }

  render() {
    const { locationTitle } = this.state;
    return (
      <View style={styles.container}>
        <Text>Add a Recommendation</Text>
        <TextInput 
          style={styles.locationTitle}
          placeholder="title"
          onChangeText={locationTitle => this.setState({ locationTitle })}
          value={locationTitle}>
        </TextInput>
        <Button title="submit" onPress={this.submitLocation}></Button>
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
  locationTitle: {
    marginTop:20,
    height: 40,
    borderColor: 'grey',
    borderWidth: 1
  }
});

export default connect(null, {postLocation})(PostLocation);
