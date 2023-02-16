import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../../utils/colors';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeBiometrics from 'react-native-biometrics';

const HomeRegisterScreen = () => {
  const rnBiometrics = new ReactNativeBiometrics();

  rnBiometrics.isSensorAvailable().then(resultObject => {
    const {available, biometryType} = resultObject;

    if (available && biometryType === rnBiometrics.TouchID) {
      console.log('TouchID is supported');
    } else if (available && biometryType === rnBiometrics.FaceID) {
      console.log('FaceID is supported');
    } else if (available && biometryType === rnBiometrics.Biometrics) {
      console.log('Biometrics is supported');
      try {
        rnBiometrics
          .simplePrompt({
            promptMessage: 'Confirm fingerprint',
          })
          .then(resultObject => {
            const {success} = resultObject;

            if (success) {
              console.log('successful biometrics provided');
            } else {
              console.log('user cancelled biometric prompt');
            }
          })
          .catch(() => {
            console.log('biometrics failed');
          });
      } catch (e) {
        console.log('Device not Support Fingerprint');
      }
    } else {
      console.log('Biometrics not supported');
    }
  });

  const navigation = useNavigation();

  const getToken = async () => {
    const token = await AsyncStorage.getItem('PopUPEnable');
    return token;
  };

  let BiomatircEnable = getToken();
  let isLogged; //here is user login or not status
  if (BiomatircEnable) {
    //BiomatircEnable = JSON.parse(BiomatircEnable);
    console.log('BiomatircEnable-->', BiomatircEnable);
  }
  console.log(BiomatircEnable);
  if (BiomatircEnable === true && isLogged) {
    //GO TO LOGIN PAGE TO SHOW BIOMATRIC POPUP
    navigation.navigate('LoginScreen');
  } else {
    if (isLogged) {
      //REDIRECT TO HOME PAGE DIRECT BECAUSE USE ALREADY CANCEL THE
      // BIOMATRIC FEATURE OR DEVICE IS NOT SUPPORTED
    } else {
      //GO TO LOGIN PAGE FOR NORMAL LOGIN
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Home Register2</Text>
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
});

export default HomeRegisterScreen;
