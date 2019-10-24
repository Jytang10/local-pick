import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Button } from 'react-native';
import Communications from 'react-native-communications';
import Icon from 'react-native-vector-icons/FontAwesome';

class LocationDetails extends Component {
  render() {
    const map = <Icon style={{paddingRight:5}} name="map" color="black" size={20}></Icon>
    const phone = <Icon style={{paddingRight:5}} name="copy" color="black" size={20}></Icon>
    const params = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <View style={{height:250, width:'100%', alignSelf:'stretch'}}>
          <Image resizeMode="contain" source={{}} style={{borderRadius:15, width:"100%", height:'100%', alignSelf:'stretch', flex:1}}></Image>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:8, alignItems:'baseline'}}>
          <View style={{flexDirection:'row', alignItems:'baseline'}}>
            <Text style={{fontSize:16, fontWeight:'bold'}}>Type: </Text>
            <Text>Title</Text>
          </View>
          <Text style={{fontSize:16, fontWeight:'bold'}}>Title</Text>
        </View>
        <View style={{marginTop:15, flexDirection:'row', justifyContent:'center'}}>
          <View style={{marginRight:20}}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Map', {...params})} style={{shadowOpacity:0.4, flexDirection:'row', padding:12, borderRadius:6, backgroundColor:'#86dfe6'}}>
              {map}
              <Text style={{color:'black', fontSize:19}}>Map</Text>
            </TouchableOpacity>
          </View>
          <View style={{marginRight:20}}>
            {/* {
              params.contact !== null && 
                <TouchableOpacity onPress={() => Communications.phonecall(params.contact, true)} style={{shadowOpacity:0.4, flexDirection:'row', padding:12, borderRadius:6, backgroundColor:'#86dfe6'}}>
                  {phone}
                  <Text style={{color:'black', fontSize:19}}>Call</Text>
                </TouchableOpacity>
            } */}
          </View>
        </View>
        <View style={{marginTop:8}}>
          <Text style={{fontSize:24, fontWeight:'bold'}}>Name</Text>
          <Text style={{fontSize:24, fontWeight:'bold'}}>Address</Text>
          <Text style={{fontSize:24, fontWeight:'bold'}}>Website</Text>
        </View>
        <ScrollView style={styles.noteContainer}>
          <View>
            <Text style={{lineHeight:23, fontSize:20}}>User Notes</Text>
            <View style={styles.addLocation}>
              <Button title="Add a Note!" onPress={() => this.props.navigation.navigate('PostNote', params)} color="red"></Button>
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
  noteContainer: {
    marginTop: 6,
    backgroundColor: 'blue'
  }
});

export default LocationDetails;
