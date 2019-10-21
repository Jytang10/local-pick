import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

class Maps extends Component {
  render() {
    const params = this.props.navigation.state.params
    return (
      <View style={styles.container}>
        <MapView style={styles.map} initialRegion={{latitude:33.6846, longitude: -117.8265, latitudeDelta: 0.09, longitudeDelta: 0.092113}}>
          {/* <Marker title={params.eventName} coordinate={{latitude:params.mapLocation[0], longitude:params.mapLocation[1]}}></Marker> */}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});

export default Maps;
