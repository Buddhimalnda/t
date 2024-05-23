import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { _COLORS } from '../../../style'

const StartWorkout = ({handleStartWorkout}) => {
    const [name, setName] = useState('')
  return (
    <View>
      <View>
        <View style={styles.inputGroup}>
            <Text style={styles.inputText}>Name: </Text>
            <TextInput style={styles.input} onChangeText={(e)=>setName(e)} />
        </View>
        <View style={styles.inputGroup}>
            <Button title="Start" onPress={()=> handleStartWorkout({name})}  />
        </View>
    </View>
    </View>
  )
}

export default StartWorkout


const styles = StyleSheet.create({
    container:{
    },
    inputGroup:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    input:{
        fontSize: 14,
        color: _COLORS.black,
        borderColor: _COLORS.primary,
        borderBottomWidth:2,
        width: 150
    },
    inputText:{
        fontSize: 14,
        color: _COLORS.black,
    }
})