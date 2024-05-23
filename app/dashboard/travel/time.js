import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const StepTime = ({time_duration, distance,  calories}) => {
  return (
    <View style={styles.container}>
      <View style={styles.metric}>
        <Text style={styles.value}>{calories}</Text>
        <Text style={styles.label}>Calories</Text>
      </View>
      <View style={styles.metric}>
        <Text style={styles.value}>{time_duration}</Text>
        <Text style={styles.label}>Active Time</Text>
      </View>
      <View style={styles.metric}>
        <Text style={styles.value}>{distance}</Text>
        <Text style={styles.label}>Km</Text>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  metric: {
    alignItems: 'center',
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
});


export default StepTime