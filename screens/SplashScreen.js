// screens/SplashScreen.js
import React, { useEffect, useRef } from 'react';
import { Animated, Image, SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const SplashScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        navigation.replace('Home');
      }, 1000);
    });
  }, [fadeAnim, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.Image
        source={require('../assets/icon.png')}
        style={[styles.logo, { opacity: fadeAnim }]}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5f1ef',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
