import React from 'react';
import {View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native';

const BiomatricModal = ({open, CallBack}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={open}>
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={{padding: 25, fontSize: 16, textAlign: 'center'}}>
            Do you want to allow this App to use biometrci authentication ?
          </Text>
          <TouchableOpacity
            style={{padding: 10}}
            onPress={() => CallBack(true)}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>Enable</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{padding: 10}}
            onPress={() => CallBack(false)}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  box: {
    flexDirection: 'column',
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    alignItems: 'center',
    borderRadius: 20,
  },
  titleText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default BiomatricModal;
