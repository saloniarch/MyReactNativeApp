import React, { useEffect, useRef } from 'react';
import { Animated, SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar'; 
import colors from '../styles/colors';  // Assuming you have this for colors

const SplashScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start fade-in effect
    Animated.timing(fadeAnim, {
      toValue: 1, // Fade in to fully visible
      duration: 1000, 
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        // After 1 second, fade-out and navigate to Main
        Animated.timing(fadeAnim, {
          toValue: 0, 
          duration: 900,
          useNativeDriver: true,
        }).start(() => {
          // After fade-out, navigate to Main Tab
          navigation.replace('Main'); // Use replace to avoid going back to Splash
        });
      }, 1000); 
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
    backgroundColor: colors.black, 
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
