import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import colors from '../../utils/colors';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeBiometrics from 'react-native-biometrics';
import TouchID from 'react-native-touch-id';

const HomeRegisterScreen = () => {
  const optionalConfigObject = {
    title: 'Authentication Required', // Android
    imageColor: '#e00606', // Android
    imageErrorColor: '#ff0000', // Android
    sensorDescription: 'Touch sensor', // Android
    sensorErrorDescription: 'Failed', // Android
    cancelText: 'Cancel', // Android
    fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
    unifiedErrors: false, // use unified error messages (default false)
    passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
  };
  const pressHandler = () => {
    TouchID.authenticate(
      'to demo this react-native component',
      optionalConfigObject,
    )
      .then(success => {
        alert('Authenticated Successfully');
        console.log('success', success);
      })
      .catch(error => {
        alert('Authentication Failed');
      });
  };
  // const rnBiometrics = new ReactNativeBiometrics();

  // rnBiometrics.isSensorAvailable().then(resultObject => {
  //   const {available, biometryType} = resultObject;

  //   if (available && biometryType === rnBiometrics.TouchID) {
  //     console.log('TouchID is supported');
  //   } else if (available && biometryType === rnBiometrics.FaceID) {
  //     console.log('FaceID is supported');
  //   } else if (available && biometryType === rnBiometrics.Biometrics) {
  //     console.log('Biometrics is supported');
  //     try {
  //       rnBiometrics
  //         .simplePrompt({
  //           promptMessage: 'Confirm fingerprint',
  //         })
  //         .then(resultObject => {
  //           const {success} = resultObject;

  //           if (success) {
  //             console.log('successful biometrics provided');
  //           } else {
  //             console.log('user cancelled biometric prompt');
  //           }
  //         })
  //         .catch(() => {
  //           console.log('biometrics failed');
  //         });
  //     } catch (e) {
  //       console.log('Device not Support Fingerprint');
  //     }
  //   } else {
  //     console.log('Biometrics not supported');
  //   }
  // });

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
      <TouchableHighlight onPress={pressHandler}>
        <Text>Authenticate with Touch ID</Text>
      </TouchableHighlight>
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
