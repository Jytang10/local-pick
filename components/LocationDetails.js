import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList, Button, ActivityIndicator } from 'react-native';
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
    const map = <MaterialIcons style={{paddingRight:5}} name="map" color="black" size={20}></MaterialIcons>
    const phone = <MaterialIcons style={{paddingRight:5}} name="phone" color="black" size={20}></MaterialIcons>
    const params = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <View style={{height:250, width:'100%', alignSelf:'stretch'}}>
          <Image resizeMode="contain" source={{uri: params.photo_url}} style={{borderRadius:15, width:"100%", height:'100%', alignSelf:'stretch', flex:1}}></Image>
        </View>
        {/* <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:8, alignItems:'baseline'}}>
          <View style={{flexDirection:'row', alignItems:'baseline'}}>
            <Text style={{fontSize:16, fontWeight:'bold'}}>Type: </Text>
            <Text>Text</Text>
          </View>
          <Text style={{fontSize:16, fontWeight:'bold'}}>Title</Text>
        </View> */}
        <View style={{marginTop:15, flexDirection:'row', justifyContent:'center'}}>
          <View style={{marginRight:20}}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Map', {...params})} style={{shadowOpacity:0.4, flexDirection:'row', padding:12, borderRadius:6, backgroundColor:'#86dfe6'}}>
              {map}
              <Text style={{color:'black', fontSize:19}}>Map</Text>
            </TouchableOpacity>
          </View>
          <View style={{marginRight:20}}>
            {
              params.contact !== null && 
                <TouchableOpacity onPress={() => Communications.phonecall(params.contact, true)} style={{shadowOpacity:0.4, flexDirection:'row', padding:12, borderRadius:6, backgroundColor:'#86dfe6'}}>
                  {phone}
                  <Text style={{color:'black', fontSize:19}}>Call</Text>
                </TouchableOpacity>
            }
          </View>
        </View>
        <View style={{marginTop:8}}>
          <Text style={{fontSize:24, fontWeight:'bold'}}>Name: {params.name}</Text>
          <Text style={{fontSize:24, fontWeight:'bold'}}>Address: {params.address}</Text>
          <Text style={{fontSize:24, fontWeight:'bold'}}>Website: {params.website}</Text>
        </View>
        <ScrollView style={styles.noteSection}>
          <View>
            <Text style={{lineHeight:23, fontSize:20}}>User Notes</Text>
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
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    backgroundColor: 'grey',
  },
  noteSection: {
    marginTop: 6,
    backgroundColor: 'blue'
  },
  notesContainer: {

  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 25
  }
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
