import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Button, ActivityIndicator } from 'react-native';
import { getLocations, deleteLocation } from '../actions';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';

class Locations extends Component {

  componentDidMount(){
    const params = this.props.navigation.state.params;
    const cityLocation = this.props.cityLocation;
    this.props.getLocations(cityLocation, params.key);
  }

  render() {
    const params = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <View style={styles.addLocation}>
          <Button title="Add a Recommendation!" onPress={() => this.props.navigation.navigate('PostLocation', params)} color="red"></Button>
        </View>
        <View style={styles.locationsContainer}>
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
                  <TouchableOpacity style={{shadowOpacity:0.5}} onPress={() => this.props.navigation.navigate('LocationDetails', {...item})}>
                    <View style={{overflow:'hidden', marginVertical:20, marginHorizontal:15, borderRadius:15, backgroundColor:'#ced6eo'}}>
                      <View style={{padding:15, backgroundColor:'#86dfe5', borderTopLeftRadius:15, borderTopRightRadius:15}}>
                        <Text style={{fontSize:20, fontWeight:'bold'}}>
                          {item.locationTitle}
                        </Text>
                        <View style={styles.iconsContainer}>
                          <TouchableOpacity onPress={() => this.props.navigation.navigate('UpdateLocation', {...item})}>
                            <View style={{marginRight:15}}>
                              <Icon size={30} color="white" name="edit"></Icon>
                            </View>
                          </TouchableOpacity> 
                          <TouchableOpacity onPress={() => this.props.deleteLocation(item.key)}>
                            <View>
                              <Icon size={30} color="red" name="close"></Icon>
                            </View>
                          </TouchableOpacity> 
                        </View>
                      </View>
                      <View>
                        <Image source={{uri:item.image}}>
                        </Image> 
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10
  },
  addLocation: {

  },
  locationsContainer: {

  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 25
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
    cityLocation: state.searchList.city
  }
}

export default connect(mapStateToProps, {getLocations, deleteLocation})(Locations);
