/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import CoinsStack from 'cryptoTracker/src/components/coins/CoinsStack';

const Tabs = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        tabBarOptions={{
          tintColor: '#fefefe',
          style: {
            backgroundColor: 'grey',
          },
        }}>
        <Tabs.Screen name="Coins" component={CoinsStack} />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

export default App;
