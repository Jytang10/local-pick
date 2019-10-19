import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
class PostList extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>PostList</Text>
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
});

export default PostList;
