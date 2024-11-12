// src/screens/ProfileScreen.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={[globalStyles.container, styles.container]}>
      {/* Profile Picture */}
      <View style={styles.profilePictureContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/100' }} // Placeholder image URL
          style={styles.profilePicture}
        />
      </View>

      {/* User Information */}
      <Text style={[globalStyles.text, styles.userName]}>John Doe</Text>
      <Text style={[globalStyles.text, styles.userEmail]}>john.doe@example.com</Text>

      {/* Edit Profile Button */}
      <TouchableOpacity style={[globalStyles.button, styles.button]} onPress={() => navigation.navigate('EditProfile')}>
        <Text style={globalStyles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

      {/* Settings Button */}
      <TouchableOpacity style={[globalStyles.button, styles.button]} onPress={() => navigation.navigate('Settings')}>
        <Text style={globalStyles.buttonText}>Settings</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity style={[globalStyles.button, styles.button]} onPress={() => navigation.navigate('Logout')}>
        <Text style={globalStyles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  profilePictureContainer: {
    marginBottom: 20,
    borderRadius: 50,
    overflow: 'hidden',
    width: 100,
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  profilePicture: {
    width: '100%',
    height: '100%',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default ProfileScreen;
