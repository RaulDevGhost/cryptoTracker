import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import colors from '../../utils/colors';
import RegisterScreen from './RegisterScreen';
import HomeRegisterScreen from './HomeRegisterScreen';
import LoginScreen from './LoginScreen';

const Stack = createStackNavigator();

const RegisterStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.blackPearl,
          shadowColor: colors.blackPearl,
        },
        headerTintColor: colors.white,
      }}>
      <Stack.Screen name="HomeRegister" component={HomeRegisterScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default RegisterStack;
