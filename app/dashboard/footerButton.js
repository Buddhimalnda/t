import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { _COLORS } from '../../style'

const FooterButton = () => {
  return (
    <View style={styles.container}>
      <Btn title="1" />
      <Btn title="2" />
      <Btn title="3" />
      <Btn title="4" />
    </View>
  )
}
const Btn = ({title})=>{
    return(
        <View style={styles.btn}>
            <Text style={styles.btnText}>{title}</Text>
        </View>
    )

}


export default FooterButton

const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#a1c',
        display: 'flex',
        flexDirection: 'row',
        height: 70,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    btn: {
        backgroundColor: _COLORS.primary,
        color: '#fff',
        width: 60,
        height: 60,
        borderRadius: 50,
        margin: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: _COLORS.dark,
      shadowOffset: {
        width: 5,
        height: 5,
      },
      shadowOpacity:  0.17,
      shadowRadius: .5,
      elevation: 5
    },
    btnText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    }
})