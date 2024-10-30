import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const SwipeButtons = ({ onLike, onDislike }) => {
  return (
    <View style={styles.buttonContainer}>
      <Button title="Dislike" onPress={onDislike} color="#f00" />
      <Button title="Like" onPress={onLike} color="#0f0" />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 30,
    width: '100%',
  },
});

export default SwipeButtons;