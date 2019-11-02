import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import { getLists, deleteList } from '../actions';
import { connect } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import _ from 'lodash';

class Discover extends Component {
  state = {
    city: ''
  }

  componentDidMount(){
    if(this.props.cityLocation){
      const city = this.props.cityLocation;
      this.setState({ city });
      this.props.getLists(city);
    }
  }

  render() {
    const params = this.props.navigation.state.params;
    return (
        this.state.city
        ?   <ScrollView style={styles.container}>
              <View style={styles.titleContainer}>
                <View style={styles.contentBox}>
                  <Text style={[styles.text, styles.title]}>{this.props.cityLocation}</Text>
                  <Text style={[styles.subText, {textTransform: 'uppercase'}]}>City</Text>
                </View>
                <TouchableOpacity style={styles.contentBox} onPress={() => this.props.navigation.navigate('PostList', params)}>
                  <MaterialIcons size={42} color="#1B53E2" name="add-circle-outline"></MaterialIcons>
                  <Text style={[styles.subText, {textTransform: 'uppercase'}]}>Add Category</Text>
                </TouchableOpacity>
              </View>
              <View>
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
                        <TouchableOpacity style={{shadowOpacity:0.4}} onPress={() => this.props.navigation.navigate('Locations', {...item})}>
                        <View style={styles.itemContainer}>
                          <View style={styles.itemInfoContainer}>
                            <View style={styles.textContainer}>
                              <Text style={styles.itemText}>{item.title}</Text>
                              <Text style={styles.subText}>{item.description}</Text>
                            </View>
                            <View style={styles.iconContainer}>
                              <TouchableOpacity onPress={() => this.props.navigation.navigate('UpdateList', {...item})}>
                                <View style={{marginRight:10}}>
                                  <MaterialIcons size={28} color="#5580f9" name="edit"></MaterialIcons>
                                </View>
                              </TouchableOpacity> 
                              <TouchableOpacity onPress={() => this.props.deleteList(item.key)}>
                                <View>
                                  <MaterialIcons size={28} color="#b1bcca" name="delete"></MaterialIcons>
                                </View>
                              </TouchableOpacity> 
                            </View>
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
        : <View style={styles.emptyResults}>
            <MaterialIcons size={150} color="red" name="error-outline"></MaterialIcons>
            <Text style={styles.errorText}>No current city found. Please select a city at the Search page.</Text>
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
    fontSize: 14,
    color: '#AEB5BC',
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
    backgroundColor:'#f1f6ff',
    borderTopLeftRadius:15,
    borderTopRightRadius:15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: 22,
    fontWeight:'bold',
    color: '#5e90fb',
  },
  iconContainer: {
    flexDirection: 'row',
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
