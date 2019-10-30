import React, { Component } from 'react';
import { View, SafeAreaView, Text, StyleSheet, Image, ScrollView } from 'react-native';

class Profile extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.profileImageContainer}>
          <View style={styles.profileImage}>
            <Image source={require('../assets/images/jt.jpg')} style={styles.image} resizeMode='center'></Image>
          </View>
        </View>
        <View style={styles.titleContainer}>
          <Text style={[styles.text, styles.name]}>James T.</Text>
          <Text style={[styles.text, styles.username]}>@codemonkey999</Text>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statsBox}>
            <Text style={[styles.text, styles.stat]}>Irvine</Text>
            <Text style={[styles.text, styles.subText]}>Location</Text>
          </View>
          <View style={[styles.statsBox, styles.statsBorder]}>
            <Text style={[styles.text, styles.stat]}>Yakiniku</Text>
            <Text style={[styles.text, styles.subText]}>Favorite Food</Text>
          </View>
        </View>
        <View style={styles.mediaContainer}>
          <View>
            <Text style={styles.subText}>Media</Text>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.mediaImageContainer}>
              <Image source={require('../assets/images/kitakata.jpeg')} style={styles.image} resizeMode='cover'></Image>
            </View>
            <View style={styles.mediaImageContainer}>
              <Image source={require('../assets/images/omomo.jpeg')} style={styles.image} resizeMode='cover'></Image>
            </View>
            <View style={styles.mediaImageContainer}>
              <Image source={require('../assets/images/cava.jpeg')} style={styles.image} resizeMode='cover'></Image>
            </View>
            <View style={styles.mediaImageContainer}>
              <Image source={require('../assets/images/icecream.jpg')} style={styles.image} resizeMode='cover'></Image>
            </View>
            <View style={styles.mediaImageContainer}>
              <Image source={require('../assets/images/halal.jpeg')} style={styles.image} resizeMode='cover'></Image>
            </View>
          </ScrollView>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.subText}>About</Text>
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
    // fontFamily: 'HelveticaNeu',
    color: '#52575D'
  },
  subText: {
    fontSize: 12,
    color: '#AEB5BC',
    textTransform: 'uppercase',
    fontWeight: '500',
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
  titleContainer: {
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
  statsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 32,
  },
  statsBox: {
    alignItems: 'center',
    flex: 1,
  },
  stat: {
    fontSize: 24,
  },
  statsBorder: {
    borderColor: '#DFD8C8',
    borderLeftWidth: 1,
  },
  mediaContainer: {
    marginTop: 32,
  },
  mediaImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  infoContainer: {
    marginTop: 16,
  },
});

export default Profile;
