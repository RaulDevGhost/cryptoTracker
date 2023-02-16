import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import colors from '../../utils/colors';
import CallAuthBiomatric from '../../libs/bioAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const getToken = async () => {
    const token = await AsyncStorage.getItem('PopUPEnable');
    return token;
  };
  const CallBio = async () => {
    let isLogged; //here is user login or not status
    let BiomatircEnable = getToken();
    if (BiomatircEnable) {
      BiomatircEnable = JSON.parse(BiomatircEnable);
    }
    console.info(BiomatircEnable);
    if (isLogged && BiomatircEnable === true) {
      let sign = await CallAuthBiomatric();
      console.info(sign);
      if (sign === true) {
        //REDIRECT TO HOME PAGE AFTER VERIFICATION OF BIOMATRIC
        // CallAuthBiomatirc() is services that is create for
        // handle the verficaiton
      }
    }
  };

  useEffect(() => {
    CallBio();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <Text>LOGIN</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blackPearl,
  },
  titleText: {
    color: '#fff',
    textAlign: 'center',
  },
  btn: {
    padding: 8,
    backgroundColor: 'blue',
    borderRadius: 8,
    margin: 16,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
  },
  loader: {
    marginTop: 60,
  },
});

export default LoginScreen;
