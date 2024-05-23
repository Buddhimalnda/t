import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, Button, FlatList } from 'react-native';
import { BleManager } from 'react-native-ble-plx';

const Bluetooth = () => {
  const [manager] = useState(new BleManager());
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [data, setData] = useState('');

  const SERVICE_UUID = '12345678-1234-1234-1234-123456789abc';
  const CHARACTERISTIC_UUID = 'abcd1234-1234-1234-1234-123456789abc';

  const scanAndConnect = () => {
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log(error);
        return;
      }

      // Stop scanning if the desired device is found
      if (device.name === 'ESP32_BLE') {
        manager.stopDeviceScan();
        device.connect()
          .then((device) => {
            return device.discoverAllServicesAndCharacteristics();
          })
          .then((device) => {
            setDeviceInfo(device);
            return device.readCharacteristicForService(SERVICE_UUID, CHARACTERISTIC_UUID);
          })
          .then(characteristic => {
            setData(characteristic.value);
            device.monitorCharacteristicForService(SERVICE_UUID, CHARACTERISTIC_UUID, (err, characteristic) => {
              if (characteristic) {
                setData(characteristic.value);
              }
            });
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  };

  useEffect(() => {
    return () => manager.destroy();
  }, [manager]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ margin: 20 }}>
        <Button title="Scan and Connect" onPress={scanAndConnect} />
        <Text>Device: {deviceInfo?.name}</Text>
        <Text>Data: {data}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Bluetooth;
