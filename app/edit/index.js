import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { _COLORS } from '../../style';

import Slider from '@react-native-community/slider';
function EditBtnList() {
  const [speed, setSpeed] = useState(0.0)
  return (
    <View style={styles.container}>
          <Text style={{
    fontSize: 20,
    fontWeight: "bold",
  }}>Speed of Blink</Text>
      <View style={styles.content}>
          <Slider
            style={{width: 200, height: 40}}
            minimumValue={0}
            maximumValue={5}
            minimumTrackTintColor={_COLORS.red}
            maximumTrackTintColor="#000000"
            onValueChange={(value) => setSpeed(value.toPrecision(2))}
          />
          <Text>{speed}s</Text>
        </View>
        <View style={styles.content}>
          <Button title="Save" color={_COLORS.primary} />	
          <Button title="reset" color={_COLORS.red} />	
          <Button title="Test" color={_COLORS.tertiary} />	
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _COLORS.white,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    dispaly: 'flex',
    flexDirection: 'row',
  }
})

export default EditBtnList;