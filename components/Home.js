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
          <Text style={styles.description}>Share & discover your local food recommendations</Text>
        </View>
        <View style={styles.navContainer}>
          <TouchableOpacity style={styles.guestButton} onPress={() => this.props.navigation.navigate('Search')}>
            <Text>Guest User</Text>
          </TouchableOpacity>
          <View style={styles.dividerContainer}>
            <Text style={styles.buttonDivider}>────────  OR  ────────</Text>
          </View>
          <TouchableOpacity style={styles.loginButton} onPress={() => this.props.navigation.navigate('Login')}>
            <Text>Login / Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'purple',
  },
  mainContainer: {
    alignItems: 'center',
    marginTop: 150
  },
  title: {
    fontWeight: 'bold',
    fontSize: 50,
    color: 'white',
    marginTop: 10,
  },
  description: {
    color: 'white',
    fontSize: 18,
    marginTop: 10,
  },
  navContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 150,
    alignItems: 'center',
  },
  guestButton: {
    width: 250,
    padding: 13,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  buttonDivider: {
    color: '#fff',
    padding: 20,
  },
  loginButton: {
    width: 250,
    padding: 13,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center'
  }
});

export default Home;
