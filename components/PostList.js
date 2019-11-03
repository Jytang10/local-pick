import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { postList } from '../actions';
import { connect } from 'react-redux';
class PostList extends Component {
  state = {
    title:"",
    description:""
  }

  submitList = () => {
    const { title, description } = this.state;
    const city = this.props.cityLocation;
    this.props.postList(title, description, city);
    this.setState({ title:"", description:"" });
    this.props.navigation.navigate('Discover')
  }

  render() {
    const { title, description } = this.state;
    return (
      <View style={styles.container}>
        <Text>Add a Category</Text>
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
});

function mapStateToProps(state){
  return {
    cityLocation: state.searchList.city
  }
}

export default connect(mapStateToProps, {postList})(PostList);
