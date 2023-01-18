import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Http from 'cryptoTracker/src/libs/http';
import {CoinCard} from './CoinCard';
import {CoinSearch} from './CoinSerach';

export const CoinsScreen = () => {
  const navigation = useNavigation();
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allCoins, setAllCoins] = useState([]);

  const HandlePress = () => {
    navigation.navigate('CoinDetails');
  };

  const handleSearch = input => {
    const coinsFiltered = allCoins.filter(coin => {
      return (
        coin.name.toLowerCase().includes(input.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(input.toLowerCase())
      );
    });
    setCoins(coinsFiltered);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await Http.instance.get();
      setCoins(res.data);
      setLoading(false);
      setAllCoins(res.data);
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <CoinSearch searching={handleSearch} />
      {loading ? (
        <ActivityIndicator style={styles.loader} color="#fff" size="large" />
      ) : null}
      <Text>Coins Screen</Text>
      {/* <Pressable style={styles.btn} onPress={HandlePress}>
        <Text style={styles.titleText}>GO TO DETAILS</Text>
      </Pressable> */}
      <FlatList
        data={coins}
        renderItem={({item}) => <CoinCard item={item} />}
      />
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
