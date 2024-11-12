import React, { useEffect, useRef } from 'react';
import { Animated, SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import colors from '../styles/colors';

const SplashScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start fade-in effect
    Animated.timing(fadeAnim, {
      toValue: 1, // Fade in to fully visible
      duration: 2000, // Duration of the fade-in
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0, // Fade out to fully invisible
          duration: 1500, // Duration of the fade-out
          useNativeDriver: true,
        }).start(() => {
          // Navigate to the main app once the fade-out is complete
          navigation.replace('Main');
        });
      }, 1000); // Wait for 1 second before starting the fade-out
    });
  }, [fadeAnim, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.Image
        source={require('../../assets/icon.png')}
        style={[styles.logo, { opacity: fadeAnim }]} // Animate opacity
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black, // Use the dark gray from colors.js
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
