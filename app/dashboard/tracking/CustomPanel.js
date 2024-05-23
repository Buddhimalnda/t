import React, { useState } from 'react';
import { Modal, View, Text, Button, TextInput, StyleSheet, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
const CustomPanel = ({ isVisible, onClose, onSubmit, Rx }) => {
  const [inputData, setInputData] = useState('');

  const handleSubmit = () => {
    onSubmit(inputData);
    setInputData('');
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
            <Pressable style={styles.closeBtn} onPress={onClose}><AntDesign name="close" size={24} color="black" /></Pressable>
            {Rx}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeBtn: {
    position: 'absolute',
    top: 10,
    right: 15,
  },
});

export default CustomPanel;
