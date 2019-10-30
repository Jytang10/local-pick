import React, { Component } from 'react';
import { View, SafeAreaView, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

class Profile extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.profileImageContainer}>
          <View style={styles.profileImage}>
            <Image source={require('../assets/images/jt.jpg')} style={styles.image} resizeMode='center'></Image>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.text, styles.name}>JT</Text>
          <Text style={styles.text, styles.username}>@codemonkey999</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    fontFamily: 'HelveticaNeu',
    color: '#52575D'
  },
  profileImageContainer: {
    alignSelf: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  infoContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  name: {
    fontWeight: '200',
    fontSize: 36,
  },
  username: {
    color: '#AEB5BC',
    fontSize: 16,
  },
});

export default Profile;
