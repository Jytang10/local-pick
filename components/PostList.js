import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
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
        <TextInput 
          style={styles.title}
          placeholder="title"
          onChangeText={title => this.setState({ title })}
          value={title}>
        </TextInput>
        <TextInput 
          style={styles.title}
          placeholder="description"
          onChangeText={description => this.setState({ description })}
          value={description}>
        </TextInput>
        <Button title="submit" onPress={this.submitList}></Button>
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
  title: {
    marginTop:20,
    height: 40,
    borderColor: 'grey',
    borderWidth: 1
  }
});

function mapStateToProps(state){
  return {
    cityLocation: state.searchList.city
  }
}

export default connect(mapStateToProps, {postList})(PostList);
