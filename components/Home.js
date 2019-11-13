import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';
import { setLoginFalse } from '../actions';
class Home extends Component {

  componentDidMount(){
    this.props.setLoginFalse();
  }

  render() {
    return (
      <LinearGradient 
        colors={['#3F54E3', '#E089B3']}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        <View style={styles.mainContainer}>
          <MaterialIcons name="local-dining" color="white" raised size={100}/>        
          <Text style={styles.title}>Local Pick</Text>
          <Text style={styles.description}>Share & discover your local food recommendations</Text>
        </View>
        <View style={styles.navContainer}>
          <TouchableOpacity style={styles.guestButton} onPress={() => this.props.navigation.navigate('Search')}>
            <Text style={[styles.buttonText, {color: '#5e90fb'}]}>Guest</Text>
          </TouchableOpacity>
          <View style={styles.dividerContainer}>
            <Text style={styles.buttonDivider}>────────  OR  ────────</Text>
          </View>
          <TouchableOpacity style={styles.loginButton} onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>New user? Sign up </Text>
            <Text style={[styles.signUpText, {color: '#1B53E2', fontWeight: '500'}]} onPress={() => this.props.navigation.navigate('SignUp')}>here</Text>
          </View>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
    textAlign: 'center',
  },
  navContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 125,
    alignItems: 'center',
  },
  guestButton: {
    width: 250,
    padding: 13,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 25,
    fontWeight: '500',
    color: '#1B53E2',
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
  },
  signUpContainer: {
    marginTop: 15,
    flexDirection: 'row',
  },
  signUpText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#fff',
  }
});

export default connect(null, {setLoginFalse})(Home);

