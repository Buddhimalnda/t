import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Slider from '@react-native-community/slider';
import { _COLORS } from '../../style';
import CheckBox from 'react-native-check-box'
import { setColor } from '../../db/workout';
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../../config/firebase";
function ColorPicker() {
  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);
  const [hex, setHex] = useState("#000000");
  useEffect(() => {
    setHex(rgbToHex(red, green, blue));
  }, [red, green, blue, rgbToHex]);
  const [uid, setUid] = useState();

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUid(user.uid);
    });
  }, [onAuthStateChanged]);

  const handleSubmit = () => {
    setColor({ red, green, blue, uid });
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>Pick Your color</Text>
          <Button
            title="Submit"
            color={_COLORS.primary}
            onPress={handleSubmit}
          />
        </View>
        <View style={styles.row}>
          <Text>R</Text>
          <Slider
            style={{ width: 200, height: 40 }}
            minimumValue={0}
            maximumValue={255}
            minimumTrackTintColor={_COLORS.red}
            maximumTrackTintColor="#000000"
            onValueChange={(value) => setRed(Math.ceil(value.toPrecision(3)))}
          />
          <Text>{red}</Text>
        </View>
        <View style={styles.row}>
          <Text>G</Text>
          <Slider
            style={{ width: 200, height: 40 }}
            minimumValue={0}
            maximumValue={255}
            minimumTrackTintColor={_COLORS.green}
            maximumTrackTintColor="#000000"
            onValueChange={(value) => setGreen(Math.ceil(value.toPrecision(3)))}
          />
          <Text>{green}</Text>
        </View>
        <View style={styles.row}>
          <Text>B</Text>
          <Slider
            style={{ width: 200, height: 40 }}
            minimumValue={0}
            maximumValue={255}
            minimumTrackTintColor={_COLORS.blur}
            maximumTrackTintColor="#000000"
            onValueChange={(value) => setBlue(Math.ceil(value.toPrecision(3)))}
          />
          <Text>{blue}</Text>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: `rgba(${red},${green},${blue},1)`,
            height: 50,
            width: 100,
            margin: 20,
          }}
        ></View>
        <Text>{hex}</Text>
      </View>
    </View>
  );
}
const rgbToHex = (r, g, b)=> {
  // Ensure RGB values are within the 0-255 range
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));

  // Convert each component to a two-digit hexadecimal string
  const redHex = r.toString(16).padStart(2, '0');
  const greenHex = g.toString(16).padStart(2, '0');
  const blueHex = b.toString(16).padStart(2, '0');

  // Concatenate the strings and prepend a hash
  return `#${redHex}${greenHex}${blueHex}`;
}

export default ColorPicker

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  titleView:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 20,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
})