import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { postList } from '../actions';
import { MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
class PostList extends Component {
  state = {
    title:"",
    description:""
  }

  submitList = () => {
    const { title, description } = this.state;
    const city = this.props.cityLocation;
    const userID = this.props.userData.userID;
    this.props.postList(title, description, city, userID);
    this.setState({ title:"", description:"" });
    this.props.navigation.navigate('Discover')
  }

  render() {
    const { title, description } = this.state;
    return (
      <View style={styles.container}>
        {
          this.props.userData
          ?
          <View>
            <View style={styles.textContainer}>
              <Text style={[styles.text, styles.topText]}>Input Example: </Text>
              <Text style={[styles.text, styles.topText, {fontStyle: 'italic'}]}>Best burgers</Text>
              <Text style={[styles.text, styles.topText, {fontStyle: 'italic'}]}>Find the best hamburgers in town</Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput 
                style={styles.input}
                placeholder="Title"
                onChangeText={title => this.setState({ title })}
                value={title}>
              </TextInput>
            </View>
            <View style={styles.inputContainer}>
              <TextInput 
                style={styles.input}
                placeholder="Short Description"
                onChangeText={description => this.setState({ description })}
                value={description}>
              </TextInput>
            </View>
            <TouchableOpacity style={styles.buttonContainer} onPress={this.submitList}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
          :
          <View style={styles.emptyResults}>
            <MaterialIcons size={150} color="#E089B3" name="person-pin"></MaterialIcons>
            <Text style={[styles.errorText, {textAlign: 'center'}]}>Please login or sign up to add a category!</Text>
            <View style={styles.signUpButtonContainer}>
              <TouchableOpacity style={styles.signUpButton} onPress={() => this.props.navigation.navigate('Home')}>
                <Text style={styles.signUpText}>Login or Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
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
  text: {
    color: '#52575D'
  },
  textContainer: {
    textAlign: 'center',
    marginBottom: 15,
  },
  emptyResults: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  errorText: {
    fontSize: 26,
  },
  topText: {
    fontSize: 18,
    fontWeight: '400',
  },
  inputContainer: {
    backgroundColor: '#f1f6ff',
    borderRadius: 5,
    height: 40,
    paddingLeft: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  input: {
    height: 40,
    fontSize: 15,
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
  signUpButtonContainer: {
    alignItems: 'center',
    padding: 10,
  },
  signUpButton: {
    width: 250,
    padding: 13,
    borderRadius: 20,
    backgroundColor: '#3F54E3',
  },
  signUpText: {
    textAlign:'center',
    color:'#fff',
    fontWeight:'bold',
    fontSize:20  
  },
});

function mapStateToProps(state){
  return {
    cityLocation: state.searchList.city,
    userData: state.userReducer.userData,
  }
}

export default connect(mapStateToProps, {postList})(PostList);
