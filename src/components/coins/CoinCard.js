import React from 'react';
import {View, Text, StyleSheet, Pressable, Platform, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import colors from '../../utils/colors';

export const CoinCard = ({item}) => {
  const navigation = useNavigation();

  const getImgArrow = () => {
    if (item.percent_change_1h > 0) {
      return require('cryptoTracker/src/assets/arrow_up.png');
    } else {
      return require('cryptoTracker/src/assets/arrow_down.png');
    }
  };

  const HandlePress = () => {
    const id = item.id;
    navigation.navigate('CoinDetails', {id});
  };

  return (
    <View style={styles.maincontainer}>
      <View style={styles.container}>
        <Text style={styles.symbolText}>{item.symbol}</Text>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.priceText}>{`$${item.price_usd}`}</Text>
        <Text style={styles.rankText}> Rank {item.rank}</Text>
      </View>
      <View style={styles.btnContainer}>
        <View style={styles.donwUpContainer}>
          <Text style={styles.donwUp}> {item.percent_change_1h}</Text>
          <Image style={styles.imgIcon} source={getImgArrow()} />
        </View>
        <Pressable style={styles.btn} onPress={HandlePress}>
          <Text style={styles.btnText}>DETAILS</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    flexDirection: 'column',
    padding: 16,
    borderBottomColor: colors.zircon,
    borderBottomWidth: 1,
    paddingLeft: Platform.OS == 'ios' ? 0 : 16,
    marginLeft: Platform.OS == 'ios' ? 16 : 0,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  symbolText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  nameText: {
    color: '#fff',
    fontSize: 14,
  },
  rankText: {
    color: '#fff',
    fontSize: 14,
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
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  donwUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  donwUp: {
    color: '#fff',
    fontSize: 12,
    margin: 12,
  },
  btn: {
    alignSelf: 'flex-end',
    padding: 10,
    borderColor: '#fff',
    borderWidth: 1,
    backgroundColor: colors.charade,
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  btnText: {
    color: colors.zircon,
    textAlign: 'center',
  },
});
