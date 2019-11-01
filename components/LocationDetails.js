import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, FlatList, Button, ActivityIndicator } from 'react-native';
import Communications from 'react-native-communications';
import { getNotes, deleteNote } from '../actions';
import { connect } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import _ from 'lodash';


class LocationDetails extends Component {

  componentDidMount(){
    const params = this.props.navigation.state.params;
    this.props.getNotes(params.key);
  }

  render() {
    const map = <MaterialIcons style={{paddingRight:5}} name="map" color="#fff" size={20}></MaterialIcons>
    const phone = <MaterialIcons style={{paddingRight:5}} name="phone" color="#fff" size={20}></MaterialIcons>
    const params = this.props.navigation.state.params;
    return (
      <ScrollView style={styles.container}>
        <ImageBackground source={{uri: params.photo_url}} style={styles.heroImage}></ImageBackground>   
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text style={[styles.text, styles.name]}>{params.name}</Text>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.infoBox}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Map', {...params})} style={styles.infoButton}>
                {map}
                <Text style={styles.infoText}>Map</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.infoBox, styles.infoBorder]}>
              <TouchableOpacity onPress={() => Communications.phonecall(params.contact, true)} style={styles.infoButton}>
                {phone}
                <Text style={styles.infoText}>Call</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.subText}>Address</Text>
            <Text style={[styles.text, styles.sectionText]}>{params.address}</Text>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.subText}>Website</Text>
            <Text style={[styles.text, styles.sectionText]}>{params.website}</Text>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.subText}>User Notes</Text>
              <View>
                <View style={styles.addLocation}>
                  <Button title="Add a Note!" onPress={() => this.props.navigation.navigate('PostNote', params)} color="red"></Button>
                </View>
                  <View style={styles.notesContainer}>
                  {
                    this.props.loadingReducer
                    ? <ActivityIndicator size="large" color="#0000ff"></ActivityIndicator>
                    : <FlatList
                        style={{width:'100%'}}
                        data={this.props.listOfNotes}
                        keyExtractor={(item) => item.key}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) => {
                        return (
                          <View style={{shadowOpacity:0.5}}>
                            <View style={{overflow:'hidden', marginVertical:20, marginHorizontal:15, borderRadius:15, backgroundColor:'#ced6eo'}}>
                              <View style={{padding:15, backgroundColor:'#86dfe5', borderTopLeftRadius:15, borderTopRightRadius:15}}>
                                <Text style={{fontSize:20, fontWeight:'bold'}}>
                                  {item.content}
                                </Text>
                                <View style={styles.iconsContainer}>
                                  <TouchableOpacity onPress={() => this.props.navigation.navigate('UpdateNote', {...item})}>
                                    <View style={{marginRight:15}}>
                                      <MaterialIcons size={30} color="white" name="edit"></MaterialIcons>
                                    </View>
                                  </TouchableOpacity> 
                                  <TouchableOpacity onPress={() => this.props.deleteNote(item.key)}>
                                    <View>
                                      <MaterialIcons size={30} color="red" name="delete"></MaterialIcons>
                                    </View>
                                  </TouchableOpacity> 
                                </View>
                              </View>
                            </View>
                          </View>
                        )
                      }}
                    >
                    </FlatList>
                  }
                </View>
              </View>
          </View>
        </View>
      </ScrollView>
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
    fontSize: 14,
    color: '#AEB5BC',
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  heroImage: {
    height: 200,
  },
  contentContainer: {
    paddingRight: 10,
    paddingLeft: 10,
  },
  titleContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  name: {
    fontWeight: '200',
    fontSize: 38,
  },
  infoContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 10,
  },
  infoBox: {
    alignItems: 'center',
    flex: 1,
  },
  infoButton: {
    shadowOpacity:0.2,
    flexDirection: 'row',
    padding:12,
    borderRadius:6,
    backgroundColor:'#3F54E3'
  },
  infoText: {
    color:'#fff',
    fontSize: 22,
  },
  infoBorder: {
    borderColor: '#DFD8C8',
    borderLeftWidth: 1,
  },
  sectionContainer: {
    paddingBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    fontWeight: '400',
  },  
});

function mapStateToProps(state){
  const listOfNotes = _.map(state.notesList.notesList, (val, key) => {
    return {
      ...val,
      key: key
    }
  })
  return {
    listOfNotes,
    loadingReducer: state.loadingReducer.loadingReducer
  }
}

export default connect(mapStateToProps, {getNotes, deleteNote})(LocationDetails);
