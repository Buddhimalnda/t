// import { BleManager } from 'react-native-ble-plx';
// import { useState, useEffect } from 'react';

// const bleManager = new BleManager();

// export function useBluetoothData() {
//   const [deviceData, setDeviceData] = useState('');

// //   useEffect(() => {
//     // Replace with your ESP32's BLE UUIDs
//     const SERVICE_UUID = '4fafc201-1fb5-459e-8fcc-c5c9c331914b';
//     const CHARACTERISTIC_UUID = 'beb5483e-36e1-4688-b7f5-ea07361b26a8';

//     const scanAndConnect = () => {
//       bleManager.startDeviceScan(null, null, (error, scannedDevice) => {
//         if (error) {
//           console.log(error);
//           return;
//         }

//         if (scannedDevice && scannedDevice.name === 'ESP32_GPS') {
//           console.log('ESP32 Found, stopping scan and attempting connection...');
//           bleManager.stopDeviceScan();

//           scannedDevice.connect()
//             .then((device) => {
//               console.log('Connected to ESP32');
//               return device.discoverAllServicesAndCharacteristics();
//             })
//             .then((device) => {
//               return device.readCharacteristicForService(SERVICE_UUID, CHARACTERISTIC_UUID);
//             })
//             .then((characteristic) => {
//               const data = characteristic.value; // Base64 encoded data
//               const decodedData = Buffer.from(data, 'base64').toString('utf-8');
//               setDeviceData(decodedData);
//             })
//             .catch((error) => {
//               console.log(error);
//             });
//         }
//       });
//     };

//     scanAndConnect();

// //     return () => {
// //       bleManager.stopDeviceScan();
// //     };
// //   }, []);

//   return deviceData;
// }
