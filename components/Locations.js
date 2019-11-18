import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import { getLocations, deleteLocation } from '../actions';
import { connect } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import _ from 'lodash';

class Locations extends Component {

  componentDidMount(){
    const params = this.props.navigation.state.params;
    this.props.getLocations(params.key);
  }

  render() {
    const params = this.props.navigation.state.params;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.titleContainer}>
          <View style={styles.contentBox}>
            <Text style={[styles.text, styles.title]}>{params.title}</Text>
            <Text style={styles.subText}>Category</Text>
          </View>
          {
            this.props.userData
            ? <TouchableOpacity style={styles.contentBox} onPress={() => this.props.navigation.navigate('PostLocation', params)}>
                <MaterialIcons size={42} color="#1B53E2" name="add-circle-outline"></MaterialIcons>
                <Text style={styles.subText}>Add Local Pick</Text>
              </TouchableOpacity>
            : <View></View>
          }
        </View>
        <View>
          {
            this.props.loadingReducer
            ? <ActivityIndicator size="large" color="#0000ff"></ActivityIndicator>
            : <FlatList
                style={{width:'100%'}}
                data={this.props.listOfLocations}
                keyExtractor={(item) => item.key}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => {
                return (
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('LocationDetails', {...item})}>
                    <View style={styles.itemContainer}>
                      <View style={styles.itemInfoContainer}>
                        <Text style={styles.itemText}>{item.name}</Text>
                        {
                        this.props.userData && this.props.userData.userID === item.userID
                        ?  <View style={styles.iconContainer}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('UpdateLocation', {...item})}>
                              <View style={{marginRight:10}}>
                                <MaterialIcons size={28} color="#5580f9" name="edit"></MaterialIcons>
                              </View>
                            </TouchableOpacity> 
                            <TouchableOpacity onPress={() => this.props.deleteLocation(item.key)}>
                              <View>
                                <MaterialIcons size={28} color="#b1bcca" name="delete"></MaterialIcons>
                              </View>
                            </TouchableOpacity> 
                          </View>
                        : <View></View>
                        }
                      </View>
                      <View>
                        <Image source={{uri:item.photo_url}} style={styles.itemImage}></Image>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              }}
            >
            </FlatList>
          }
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
    color: '#52575D'
  },
  subText: {
    fontSize: 12,
    color: '#AEB5BC',
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  titleContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  contentBox: {
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 30,
  },
  itemContainer: {
    overflow:'hidden',
    marginVertical:15,
    marginHorizontal:15,
    borderRadius:15,
    borderWidth: 0.3,
    backgroundColor:'#d6d7da',
  },
  itemInfoContainer: {
    padding:15,
    backgroundColor:'#f1f6ff',
    borderTopLeftRadius:15,
    borderTopRightRadius:15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: 20,
    fontWeight:'bold',
    color: '#5e90fb',
  },
  itemImage: {
    width:'100%',
    height:175,
    borderBottomLeftRadius:15,
    borderBottomRightRadius:15, 
    alignSelf:'stretch',
  },
  iconContainer: {
    flexDirection: 'row',
  }
});

function mapStateToProps(state){
  const listOfLocations = _.map(state.locationsList.locationsList, (val, key) => {
    return {
      ...val,
      key: key
    }
  })
  return {
    listOfLocations,
    loadingReducer: state.loadingReducer.loadingReducer,
    userData: state.userReducer.userData,
  }
}

export default connect(mapStateToProps, {getLocations, deleteLocation})(Locations);
