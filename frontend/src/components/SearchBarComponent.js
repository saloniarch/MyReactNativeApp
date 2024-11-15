import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../styles/colors';

const SearchBarComponent = () => {
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);

  const toggleSearchBar = () => {
    setIsSearchBarVisible(!isSearchBarVisible);
  };

  const dismissSearchBar = () => {
    setIsSearchBarVisible(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissSearchBar}>
      <View style={styles.container}>
        {!isSearchBarVisible && (
        <TouchableOpacity onPress={toggleSearchBar} style={{ position: 'absolute', left: 20 }}>
          <Icon name="search" style={styles.searchIcon} />
        </TouchableOpacity>        
        )}
        {isSearchBarVisible && (
          <View style={styles.searchBar}>
            <Icon name="search" style={styles.searchIconActive} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search events..."
              placeholderTextColor="#999"
              returnKeyType="search"
              autoFocus
            />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  searchIcon: {
    fontSize: 24,
    color: '#888',
  },
  searchIconActive: {
    fontSize: 20,
    color: '#888',
    marginRight: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: '5%',
    width: '80%',
    height: 30,
    paddingHorizontal: 15,
    backgroundColor: colors.beige,
    borderRadius: 25,
    elevation: 2, // Android shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
    fontFamily: 'System',
  },
});

export default SearchBarComponent;
