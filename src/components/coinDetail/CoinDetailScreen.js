import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Http from 'cryptoTracker/src/libs/http';

export const CoinDetailScreen = props => {
  const [details, setDetails] = useState({});

  const {item} = props.route.params;

  useEffect(() => {
    const getDetails = async () => {
      const res = await Http.instance.getCoin(item.id);
      setDetails(res[0]);
    };
    getDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{details.name}</Text>
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
