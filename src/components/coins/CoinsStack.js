import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CoinsScreen from './CoinsScreen';

const Stack = createStackNavigator();

const CoinsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'grey',
          shadowColor: 'grey',
        },
        headerTintColor: 'white',
      }}>
      <Stack.Screen name="Coins" component={CoinsScreen} />
    </Stack.Navigator>
  );
};

export default CoinsStack;