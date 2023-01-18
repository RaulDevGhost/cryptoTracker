import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const CoinCard = props => {
  const {item} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{item.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
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
