import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { deleteLocation } from '../actions';
import { connect } from 'react-redux';

class UpdateLocation extends Component {
  state = {
    key: this.props.navigation.state.params.key
  }

  removeItem = () => {
    const { key } = this.state;
    this.props.deleteLocation(key)
    this.props.navigation.navigate('Locations')
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.deleteButtonContainer}>
          <TouchableOpacity style={[styles.buttonContainer, {backgroundColor: 'red'}]} onPress={this.removeItem}>
            <Text style={styles.buttonText}>Remove Location</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default connect(null, {deleteLocation})(UpdateLocation);
