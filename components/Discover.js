import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { getLists } from '../actions';
import { connect } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import _ from 'lodash';

class Discover extends Component {
  state = {
    city: ''
  }

  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    const params = navigation.state.params;
    if(state.params != undefined){
      return { 
          headerRight: 
          <TouchableOpacity style={[styles.contentBox, {marginRight: 20}]} onPress={() => navigation.navigate('PostList', params)}>
            <MaterialIcons size={35} color="#fff" name="add-circle-outline"></MaterialIcons>
          </TouchableOpacity>
        }
    }
  };

  componentDidMount(){
    if(this.props.cityLocation){
      const city = this.props.cityLocation;
      this.setState({ city });
      this.props.getLists(city);
    }
  }

  componentWillMount(){
    const { setParams } = this.props.navigation;
    setParams({ userData: this.props.userData });
  }

  render() {
    return (
        this.state.city
        ?   <ScrollView style={styles.container}>
              <View style={styles.titleContainer}>
                <View style={styles.contentBox}>
                  <Text style={[styles.text, styles.title]}>{this.props.cityLocation}</Text>
                </View>
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
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Locations', {...item})}>
                        <View style={styles.itemContainer}>
                          <View style={styles.itemInfoContainer}>
                            <View style={styles.textContainer}>
                              <Text style={styles.itemText}>{item.title}</Text>
                              <Text style={styles.subText}>{item.description}</Text>
                            </View>
                            {
                            this.props.userData && this.props.userData.userID === item.userID
                            ? <View style={styles.iconContainer}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('UpdateList', {...item})}>
                                  <View style={{marginRight:10}}>
                                    <MaterialIcons size={25} color="#5580f9" name="edit"></MaterialIcons>
                                  </View>
                                </TouchableOpacity>
                              </View>
                            : <View></View>
                            }
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
            <MaterialIcons size={150} color="#E089B3" name="error-outline"></MaterialIcons>
            <Text style={[styles.errorText, {textAlign: 'center'}]}>No current city found. Please select a city at the Search page.</Text>
          </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  emptyResults: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  errorText: {
    fontSize: 26,
  },
  text: {
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
    marginVertical:10,
    marginHorizontal:10,
    borderRadius: 15,
    backgroundColor:'#d6d7da',
  },
  itemInfoContainer: {
    padding: 15,
    backgroundColor:'#f1f6ff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
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
    cityLocation: state.searchList.city,
    userData: state.userReducer.userData,
  }
}

export default connect(mapStateToProps, {getLists})(Discover);
