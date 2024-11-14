import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import colors from '../styles/colors';

const SettingsScreen = ({ navigation }) => {
  // Use the useFonts hook to load the Anton font
  const [fontsLoaded] = useFonts({
    Anton: require('../../assets/fonts/Anton-Regular.ttf'),
  });

  // Show a placeholder while the font is loading
  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { fontFamily: 'Anton', fontSize: 38, color: '#8ACE00' }]}>SETTINGS</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ChangePassword')}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('NotificationSettings')}>
        <Text style={styles.buttonText}>Notification Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ThemeSettings')}>
        <Text style={styles.buttonText}>Theme Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PrivacyPolicy')}>
        <Text style={styles.buttonText}>Privacy Policy</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Logout')}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black,
  },
  loadingText: {
    color: colors.primary,
    fontSize: 24,
  },
  text: {
    color: colors.white,
    fontSize: 24,
    marginBottom: 30,
  },
  button: {
    padding: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: colors.yellow,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SettingsScreen;
