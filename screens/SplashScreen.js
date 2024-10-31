import React, { useEffect, useRef } from 'react';
import { Animated, Image, SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const SplashScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start fade in effect
    Animated.timing(fadeAnim, {
      toValue: 1, // Fade in to fully visible
      duration: 2000, // Duration of the fade-in
      useNativeDriver: true,
    }).start(() => {
      // After fade-in, wait for a moment and then fade out
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0, // Fade out to fully invisible
          duration: 1000, // Duration of the fade-out
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
        source={require('../assets/icon.png')}
        style={[styles.logo, { opacity: fadeAnim }]} // Animate opacity
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
