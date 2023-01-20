import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import colors from '../../utils/colors';
import {CoinsScreen} from './CoinsScreen';
import {CoinDetailScreen} from '../coinDetail/CoinDetailScreen';

const Stack = createStackNavigator();

const CoinsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.blackPearl,
          shadowColor: colors.charade,
        },
        headerTintColor: 'white',
      }}>
      <Stack.Screen
        name="Coins"
        component={CoinsScreen}
        options={{title: 'Coins'}}
      />
      <Stack.Screen name="CoinDetails" component={CoinDetailScreen} />
    </Stack.Navigator>
  );
};

export default CoinsStack;
