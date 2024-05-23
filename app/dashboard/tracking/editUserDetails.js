import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { _COLORS } from '../../../style'

const EditUserDetails = () => {
  return (
    <View>
        <View style={styles.inputGroup}>
            <Text style={styles.inputText}>Weight: </Text>
            <TextInput style={styles.input} />
        </View>
        <View style={styles.inputGroup}>
            <Text style={styles.inputText}>Height: </Text>
            <TextInput style={styles.input} />
        </View>
        <View style={styles.inputGroup}>
            <Text style={styles.inputText}>Age: </Text>
            <TextInput style={styles.input} />
        </View>
        <View style={styles.inputGroup}>
            <Text style={styles.inputText}>Gender: </Text>
            <TextInput style={styles.input} />
        </View>
        <View style={styles.inputGroup}>
            <Text style={styles.inputText}>Body Composition: </Text>
            <TextInput style={styles.input} />
        </View>
        <View style={styles.inputGroup}>
            <Button title="Save" />
            <Button title="Rest" />

        </View>
    </View>
  )
}

export default EditUserDetails

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