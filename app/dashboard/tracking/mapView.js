import React, { useState, useEffect } from 'react';
import { View, Dimensions } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import { useBluetoothData } from '../../../lib/Bluetooth';

const MapComponent = () => {
  const gpsData =  "34.052235, -118.243683" //useBluetoothData();
  const [route, setRoute] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(null);

  useEffect(() => {
    if (gpsData) {
      const [latitude, longitude] = gpsData.split(',').map(Number);
      const newPosition = { latitude, longitude };
      setCurrentPosition(newPosition);
      setRoute(prevRoute => [...prevRoute, newPosition]);
    }
  }, [gpsData]);

  return (
    <View style={{ flex: 1 }}>
      {currentPosition && (
        <MapView
          style={{ flex: 1, width: Dimensions.get('window').width }}
          region={{
            latitude: currentPosition.latitude,
            longitude: currentPosition.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker coordinate={currentPosition} />
          <Polyline coordinates={route} strokeWidth={4} strokeColor="blue" />
        </MapView>
      )}
    </View>
  );
};

export default MapComponent;
