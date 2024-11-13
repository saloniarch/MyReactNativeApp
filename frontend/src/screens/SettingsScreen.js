import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../styles/colors'; // Ensure you have the colors module available

const SettingsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>

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
        <Text style={styles.logOutText}>Logout</Text>
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
    color: colors.primary, // Green text
    fontWeight: 'bold',
    fontSize: 16,
  },
  logOutText: {
    color: '#D2AF1D',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SettingsScreen;
