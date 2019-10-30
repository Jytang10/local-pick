//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

class Profile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.props.ggpulnavigation.navigate('Home')}>
          <Text>No current user. Please Login or Sign Up to view Profile.</Text>
          <Text>Go to Login/SignUp page</Text>
        </TouchableOpacity>      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
  },
});

export default Profile;
