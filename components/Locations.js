import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground, ScrollView, ActivityIndicator } from 'react-native';
import { getLocations } from '../actions';
import { connect } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import _ from 'lodash';

class Locations extends Component {

  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    const params = navigation.state.params;
    if(state.params != undefined){
      return { 
        headerRight: 
        <TouchableOpacity style={[styles.contentBox, {marginRight: 20}]} onPress={() => navigation.navigate('PostLocation', params)}>
          <MaterialIcons size={35} color="#fff" name="add-circle-outline"></MaterialIcons>
        </TouchableOpacity>
      }
    }
  };

  componentDidMount(){
    const params = this.props.navigation.state.params;
    this.props.getLocations(params.key);
  }

  componentWillMount(){
    const { setParams } = this.props.navigation;
    setParams({ userData: this.props.userData });
  }

  render() {
    const params = this.props.navigation.state.params;
    let colors = ['#525bdc', '#906dc8', '#b67bbf', '#d684b5'];
    return (
      <ScrollView style={styles.container}>
        <View style={styles.titleContainer}>
          <View style={styles.contentBox}>
            <Text style={[styles.text, styles.title]}>{params.title}</Text>
          </View>
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
                renderItem={({item, index}) => {
                return (
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('LocationDetails', {...item})}>
                    <View style={styles.itemContainer}>
                      <ImageBackground source={{uri:item.photo_url}} style={styles.heroImage}>
                        <LinearGradient style={styles.heroTextContainer} start={{x: 0.1, y: 0.6}} end={{x: 0.1, y: 1}} colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,1)']}>
                          <Text style={styles.heroText}>{item.name}</Text>
                        </LinearGradient>
                        {
                          this.props.userData && this.props.userData.userID === item.userID
                          ?  <View style={styles.iconContainer}>
                              <TouchableOpacity onPress={() => this.props.navigation.navigate('UpdateLocation', {...item})}>
                                <View style={{marginRight:10}}>
                                  <MaterialIcons size={22} color="#fff" name="edit"></MaterialIcons>
                                </View>
                              </TouchableOpacity> 
                            </View>
                          : <View></View>
                          }   
                      </ImageBackground>
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
    backgroundColor: '#F6F6F6',
  },
  text: {
    color: '#52575D'
  },
  subText: {
    fontSize: 12,
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: '400',
  },
  titleContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  heroImage: {
    height: 150,
  },
  heroTextContainer: {
    flexDirection:'row',
    borderRadius: 10,
    position:'absolute',
    left:0,
    right:0,
    bottom:0,
    top:0
  },
  heroText: {
    fontSize: 22,
    fontWeight:'bold',
    color:'#fff',
    alignSelf:'flex-end',
    paddingLeft: 20,
    paddingBottom: 20
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
    borderWidth: 0.1,
  },
  itemInfoContainer: {
    padding:15,
    borderBottomLeftRadius:15,
    borderBottomRightRadius:15,
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
    borderTopLeftRadius:15,
    borderTopRightRadius:15, 
    alignSelf:'stretch',
  },
  iconContainer: {
    alignSelf:'flex-end',
    paddingRight: 10,
    paddingTop: 110,
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

export default connect(mapStateToProps, {getLocations})(Locations);
