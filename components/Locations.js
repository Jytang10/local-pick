import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Button, ActivityIndicator } from 'react-native';
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
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <View style={styles.contentBox}>
            <Text style={[styles.text, styles.title]}>Best AYCE</Text>
            <Text style={styles.subText}>Category</Text>
          </View>
          <TouchableOpacity style={styles.contentBox} onPress={() => this.props.navigation.navigate('PostLocation', params)}>
            <MaterialIcons size={42} color="#1B53E2" name="add-circle-outline"></MaterialIcons>
            <Text style={styles.subText}>Add Local Pick</Text>
          </TouchableOpacity>
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
                  <TouchableOpacity style={{shadowOpacity:0.4}} onPress={() => this.props.navigation.navigate('LocationDetails', {...item})}>
                    <View style={styles.itemContainer}>
                      <View style={styles.itemInfoContainer}>
                        <Text style={styles.itemText}>{item.name}</Text>
                        <View style={styles.iconContainer}>
                          <TouchableOpacity onPress={() => this.props.navigation.navigate('UpdateLocation', {...item})}>
                            <View style={{marginRight:10}}>
                              <MaterialIcons size={28} color="white" name="edit"></MaterialIcons>
                            </View>
                          </TouchableOpacity> 
                          <TouchableOpacity onPress={() => this.props.deleteLocation(item.key)}>
                            <View>
                              <MaterialIcons size={28} color="#f87776" name="delete"></MaterialIcons>
                            </View>
                          </TouchableOpacity> 
                        </View>
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
      </View>
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
    marginVertical:20,
    marginHorizontal:15,
    borderRadius:15,
    backgroundColor:'grey',
  },
  itemInfoContainer: {
    padding:15,
    backgroundColor:'#5580fa',
    borderTopLeftRadius:15,
    borderTopRightRadius:15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: 20,
    fontWeight:'bold',
    color: '#fff',
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
    loadingReducer: state.loadingReducer.loadingReducer
  }
}

export default connect(mapStateToProps, {getLocations, deleteLocation})(Locations);
