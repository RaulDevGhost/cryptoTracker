import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Button, TextInput, Alert} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import colors from '../../utils/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BiomatricModal from '../../libs/modalBiometric';
import CallCheckBiomatric from '../../libs/bioAuth';
import CallAuthBiomatric from '../../libs/bioAuth';
//import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';

const RegisterScreen = () => {
  const [BioMatricModalShow, setBioMatricModalShow] = useState(false);

  const OpneModal = async () => {
    let Biomatciaviable = await CallCheckBiomatric();
    if (Biomatciaviable) {
      let PopUPEnable = await AsyncStorage.getItem('PopUPEnable');
      if (PopUPEnable) {
        PopUPEnable = JSON.parse(PopUPEnable);
      }
      console.info(PopUPEnable);
      if (PopUPEnable === null) {
        setBioMatricModalShow(true);
      }
    }
  };

  const CallBack = async data => {
    console.info(data);
    setBioMatricModalShow(false);
    if (data === true) {
      let sign = await CallAuthBiomatric();
      if (sign === true) {
        await AsyncStorage.setItem('PopUPEnable', JSON.stringify(sign));
      }
    }
    if (data === false) {
      await AsyncStorage.setItem('PopUPEnable', JSON.stringify(data));
    }
  };

  useEffect(() => {
    async () => await OpneModal();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Register Screen</Text>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
        }}
        onSubmit={values => console.log(values)}
        validationSchema={yup.object().shape({
          name: yup.string().required('Please, provide your name!'),
          email: yup.string().email().required(),
          password: yup
            .string()
            .min(4)
            .max(10, 'Password should not excced 10 chars.')
            .required(),
        })}>
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          isValid,
          handleSubmit,
        }) => (
          <View style={styles.formContainer}>
            <TextInput
              value={values.name}
              style={styles.input}
              onChangeText={handleChange('name')}
              onBlur={() => setFieldTouched('name')}
              placeholder="Name"
            />
            {touched.name && errors.name && (
              <Text style={{fontSize: 12, color: '#FF0D10'}}>
                {errors.name}
              </Text>
            )}
            <TextInput
              value={values.email}
              style={styles.input}
              onChangeText={handleChange('email')}
              onBlur={() => setFieldTouched('email')}
              placeholder="E-mail"
            />
            {touched.email && errors.email && (
              <Text style={{fontSize: 12, color: '#FF0D10'}}>
                {errors.email}
              </Text>
            )}
            <TextInput
              value={values.password}
              style={styles.input}
              onChangeText={handleChange('password')}
              placeholder="Password"
              onBlur={() => setFieldTouched('password')}
              secureTextEntry={true}
            />
            {touched.password && errors.password && (
              <Text style={{fontSize: 12, color: '#FF0D10'}}>
                {errors.password}
              </Text>
            )}
            <Button
              color="#3740FE"
              title="Submit"
              disabled={!isValid}
              onPress={handleSubmit}
            />
          </View>
        )}
      </Formik>
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
  input: {
    alignSelf: 'center',
    width: '50%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#4e4e4e',
    padding: 12,
    marginBottom: 5,
  },
});

export default RegisterScreen;
