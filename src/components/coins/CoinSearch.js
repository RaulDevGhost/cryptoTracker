import React, {useState} from 'react';
import {TextInput, Platform, View, StyleSheet} from 'react-native';

export const CoinSearch = props => {
  const {searching} = props;
  const [query, setQuery] = useState('');

  const handleText = text => {
    setQuery(text);
    searching(text);
  };

  return (
    <View>
      <TextInput
        style={[
          styles.textInput,
          Platform.OS == 'ios' ? styles.textInputIOS : styles.textInputAndroid,
        ]}
        onChangeText={handleText}
        value={query}
        placeholder="Search coin"
        placeholderTextColor="#fff"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 46,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingLeft: 16,
    color: '#fff',
  },
  textInputAndroid: {
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
  },
  textInputIOS: {
    margin: 8,
    borderRadius: 8,
  },
});
