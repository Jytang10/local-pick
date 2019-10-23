import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button, ActivityIndicator } from 'react-native';
import { getLists, deleteList } from '../actions';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';

class Discover extends Component {

  componentDidMount(){
    const city = this.props.cityLocation;
    this.props.getLists(city);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.addList}>
          <Button title="Add a List!!" onPress={() => this.props.navigation.navigate('PostList')} color="red"></Button>
        </View>
        <View style={styles.listsContainer}>
          {
            this.props.loadingReducer
            ? <ActivityIndicator size="large" color="#0000ff"></ActivityIndicator>
            : <FlatList
                style={{width:'100%'}}
                data={this.props.listOfLists}
                keyExtractor={(item) => item.key}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => {
                    return (
                      <TouchableOpacity style={{shadowOpacity:0.5, marginBottom:15, borderRadius:15, backgroundColor:'#575FCF', padding:20}} onPress={() => this.props.navigation.navigate('Locations', {...item})}>
                        <View style={{overflow:'hidden'}} >
                          <Text style={{fontSize:30, fontWeight:'bold', color:'#fff', marginBottom:10}}>{item.title}</Text>
                          <View style={styles.iconsContainer}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('UpdateList', {...item})}>
                              <View style={{marginRight:15}}>
                                <Icon size={30} color="white" name="edit"></Icon>
                              </View>
                            </TouchableOpacity> 
                            <TouchableOpacity onPress={() => this.props.deleteList(item.key)}>
                              <View>
                                <Icon size={30} color="red" name="close"></Icon>
                              </View>
                            </TouchableOpacity> 
                          </View>
                        </View>
                      </TouchableOpacity>
                    )
                  }
                }
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
    padding:10
  },
  addList: {

  },
  listContainer: {

  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 25
  }
});

function mapStateToProps(state){
  const listOfLists = _.map(state.listsList.listsList, (val, key) =>{
    return {
      ...val,
      key: key
    }
  })
  return {
    listOfLists,
    loadingReducer: state.loadingReducer.loadingReducer,
    cityLocation: state.searchList.city
  }
}

export default connect(mapStateToProps, {getLists, deleteList})(Discover);
