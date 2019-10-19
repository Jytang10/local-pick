import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { getLists, deleteList } from '../actions';
import { connect } from 'react-redux';
import _ from 'lodash';

class Discover extends Component {

  componentDidMount(){
    // this.props.getLists();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.addList}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('PostList')}>
            <Text>Click me to add a List</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.listsContainer}>
          {
            this.props.loadingReducer
            ? <Text>Loading Lists, Please Wait</Text>
            : <FlatList
                style={{width:'100%'}}
                data={this.props.listOfLists}
                keyExtractor={(item) => item.key}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => {
                    return (
                      <View style={{elevation:8, marginBottom:15, borderRadius:15, backgroundColor:'#575FCF', padding:20}}>
                        <Text style={{fontSize:30, fontWeight:'bold', color:'#fff', marginBottom:10}}>{item.title}</Text>
                      </View>
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
    loadingReducer: state.loadingReducer.loadingReducer
  }
}

export default connect(mapStateToProps, {getLists, deleteList})(Discover);
