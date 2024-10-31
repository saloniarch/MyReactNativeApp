import React, { useEffect, useRef } from 'react';
import { Animated, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000, // Duration of the fade-in
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Text style={styles.homeText}>Welcome to the Home Screen!</Text>
      </Animated.View>

      {/* Custom Bottom Navigation Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.bottomText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
          <Text style={styles.bottomText}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.bottomText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SwipingScreen')}>
          <Text style={styles.bottomText}>Swiping</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5f1ef',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeText: {
    fontSize: 24,
    color: '#000',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20, // Increase vertical padding for height
    backgroundColor: '#bcd6d3',
    borderTopWidth: 1,
    borderColor: '#ccc',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70, // Set a fixed height for the bottom bar
    elevation: 5, // Shadow effect for better visibility
  },
  bottomText: {
    fontSize: 16,
    color: '#007A7A', // Spotify green for active look
  },
});

export default HomeScreen;
