import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <MaterialIcons name="local-dining" color="white" raised size={100}/>        
          <Text style={styles.title}>Local Pick</Text>
          <Text style={styles.description}>A community to share and discover local food recommendations.</Text>
        </View>
        <View style={styles.navContainer}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')}>
            <Text>Guest User click here</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
            <Text>Click here to Login or Sign Up</Text>
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
    alignItems: 'center',
    backgroundColor: 'purple',
  },
  mainContainer: {
    alignItems: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 50,
    color: 'white'
  },
  description: {
    color: 'white'
  }
});

export default Home;
