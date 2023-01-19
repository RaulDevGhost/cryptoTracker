import React from 'react';
import {View, Text, StyleSheet, Pressable, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import colors from '../../utils/colors';
import {color} from 'react-native-reanimated';

export const CoinCard = ({item}) => {
  const navigation = useNavigation();

  const HandlePress = () => {
    navigation.navigate('CoinDetails', {item});
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.symbolText}>{item.symbol}</Text>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.priceText}>{`$${item.price_usd}`}</Text>
      </View>
      <Pressable style={styles.btn} onPress={HandlePress}>
        <Text style={styles.btnText}>GO TO DETAILS</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomColor: colors.zircon,
    borderBottomWidth: 1,
    paddingLeft: Platform.OS == 'ios' ? 0 : 16,
    marginLeft: Platform.OS == 'ios' ? 16 : 0,
  },
  row: {
    flexDirection: 'row',
  },
  symbolText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 12,
  },
  nameText: {
    color: '#fff',
    fontSize: 14,
    marginRight: 16,
  },
  priceText: {
    color: '#fff',
    fontSize: 14,
  },
  percentText: {
    color: '#fff',
    fontSize: 12,
    marginRight: 8,
  },
  imgIcon: {
    width: 22,
    height: 22,
  },
  btn: {
    padding: 8,
    backgroundColor: colors.zircon,
    borderRadius: 8,
    margin: 16,
  },
  btnText: {
    color: colors.charade,
    textAlign: 'center',
  },
});
