import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  SectionList,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import Http from 'cryptoTracker/src/libs/http';
import Storage from 'cryptoTracker/src/libs/storage';
import colors from '../../utils/colors';
import CoinMarketItem from './CoinMarketItem';

export const CoinDetailScreen = props => {
  const navigation = useNavigation();
  const [details, setDetails] = useState({});
  const [markets, setMarkets] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);

  const {id} = props.route.params;

  useEffect(() => {
    const getDetails = async () => {
      const res = await Http.instance.getCoin(id);
      setDetails(res[0]);
      navigation.setOptions({title: res[0].name});
      getFavorite(res[0].id);
    };
    getDetails();
    const getMarkets = async () => {
      const res = await Http.instance.getMarkets(id);
      setMarkets(res);
    };
    getMarkets();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getFavorite = async detailId => {
    const key = `favorite-${detailId}`;
    const isStored = await Storage.instance.get(key);

    if (isStored !== null) {
      setIsFavorite(true);
    }
  };

  const toogleFavorite = () => {
    if (!isFavorite) {
      addFavorite();
    } else {
      removeFavorie();
    }
  };

  const addFavorite = async () => {
    const coin = JSON.stringify(details);
    const key = `favorite-${details.id}`;

    const stored = await Storage.instance.store(key, coin);

    //console.log('stored', stored);

    if (stored) {
      setIsFavorite(true);
    }
  };

  const removeFavorie = async () => {
    const key = `favorite-${details.id}`;
    const removed = await Storage.instance.remove(key);
    if (removed) {
      setIsFavorite(false);
    }
  };

  const getSections = coin => {
    const sections = [
      {
        title: 'Market cap',
        data: [coin.market_cap_usd],
      },
      {
        title: 'Volume 24h',
        data: [coin.volume24],
      },
      {
        title: 'Change 24h',
        data: [coin.percent_change_24h],
      },
    ];

    return sections;
  };

  return (
    <View style={styles.container}>
      <View style={styles.subHeader}>
        <Text style={styles.titleText}>{details.name}</Text>

        <Image
          style={styles.iconImg}
          source={{
            uri: `https://c1.coinlore.com/img/25x25/${details.nameid}.png`,
          }}
        />
        <Pressable
          onPress={toogleFavorite}
          style={[
            styles.btnFavorite,
            isFavorite ? styles.btnFavoriteRemove : styles.btnFavoriteAdd,
          ]}>
          <Text
            style={
              isFavorite ? styles.btnFavoriteRemove : styles.btnFavoriteAdd
            }>
            {isFavorite ? 'Remove favorite' : 'Add favorite'}
          </Text>
        </Pressable>
      </View>
      <SectionList
        style={styles.section}
        sections={getSections(details)}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <View style={styles.sectionItem}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
        renderSectionHeader={({section}) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionText}>{section.title}</Text>
          </View>
        )}
      />
      <Text style={styles.marketsTitle}>Markets</Text>

      <FlatList
        style={styles.list}
        horizontal={true}
        data={markets}
        renderItem={({item}) => <CoinMarketItem item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.charade,
  },
  row: {
    flexDirection: 'row',
  },
  subHeader: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 8,
  },
  iconImg: {
    width: 25,
    height: 25,
  },
  section: {
    maxHeight: 220,
  },
  list: {
    maxHeight: 100,
    paddingLeft: 16,
  },
  sectionHeader: {
    backgroundColor: 'rgba(0,0,0, 0.2)',
    padding: 8,
  },
  sectionItem: {
    padding: 8,
  },
  itemText: {
    color: colors.white,
    fontSize: 14,
  },
  sectionText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  marketsTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    marginLeft: 16,
  },
  btnFavorite: {
    width: 130,
    borderRadius: 8,
    padding: 10,
    borderColor: '#fff',
    borderWidth: 1,
    backgroundColor: colors.charade,
    marginTop: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  btnFavoriteText: {
    color: colors.white,
  },
  btnFavoriteAdd: {
    borderColor: colors.active,
    color: colors.active,
    textAlign: 'center',
  },
  btnFavoriteRemove: {
    borderColor: colors.block,
    color: colors.block,
    textAlign: 'center',
  },
});
