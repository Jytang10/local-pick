import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

class Maps extends Component {
  render() {
    const params = this.props.navigation.state.params
    return (
      <View style={styles.container}>
        <MapView style={styles.map} initialRegion={{latitude: params.lat, longitude: params.lng, latitudeDelta: 0.09, longitudeDelta: 0.092113}}>
          <Marker title={params.name} coordinate={{latitude: params.lat, longitude: params.lng}}></Marker>
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
