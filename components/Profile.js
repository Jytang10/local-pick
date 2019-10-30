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

  },
});

export default Profile;
