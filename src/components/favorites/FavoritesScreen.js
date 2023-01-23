import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import colors from '../../utils/colors';
import Storage from 'cryptoTracker/src/libs/storage';
import {CoinCard} from '../coins/CoinCard';
import FavoritesEmptyState from './FavoritesEmptyState';

const FavoritesScreen = () => {
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    getAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAll = async () => {
    const keysGot = await Storage.instance.getAllkeys();
    getMulti(keysGot);
    // if (keys.length > 0) {
    //   getMulti();
    // }
  };

  const getMulti = async keysPara => {
    const multi = await Storage.instance.multiGet(keysPara);
    console.log(multi);
    const favorites = multi.map(fav => JSON.parse(fav[1]));
    console.log('favs', favorites);
    setFavs(favorites);
  };
  return (
    <View style={styles.container}>
      {favs.length > 0 ? (
        <FlatList
          data={favs}
          renderItem={({item}) => <CoinCard item={item} />}
        />
      ) : (
        <FavoritesEmptyState />
      )}
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
});

export default FavoritesScreen;
