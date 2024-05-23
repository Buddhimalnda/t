import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProgressCircle } from 'react-native-svg-charts';

const StepsTracker = ({ steps, date }) => {
  const progressPercentage = steps / 10000; // Assuming the goal is 10,000 steps

  return (
    <View style={styles.container}>
      <ProgressCircle
        style={styles.progressCircle}
        progress={progressPercentage}
        progressColor={'#FFA726'}
        startAngle={-Math.PI * 0.8}
        endAngle={Math.PI * 0.8}
      >
        <View style={styles.innerCircle}>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.steps}>{steps}</Text>
          <Text style={styles.label}>Steps Taken</Text>
        </View>
      </ProgressCircle>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressCircle: {
    height: 200,
    width: 200,
  },
  innerCircle: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  date: {
    fontSize: 16,
    color: 'grey',
  },
  steps: {
    fontSize: 48,
    color: 'black',
  },
  label: {
    fontSize: 16,
    color: 'grey',
  },
});

export default StepsTracker;
