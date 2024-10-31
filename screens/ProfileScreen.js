import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Profile Picture */}
      <View style={styles.profilePictureContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/100' }} // Placeholder image URL
          style={styles.profilePicture}
        />
      </View>

      {/* User Information */}
      <Text style={styles.userName}>John Doe</Text>
      <Text style={styles.userEmail}>john.doe@example.com</Text>

      {/* Edit Profile Button */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('EditProfile')} // Correct usage of navigate
      >
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

      {/* Settings Button */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Settings')} // Correct usage of navigate
      >
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>
      
      {/* Logout Button */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => {
          // Handle Logout
        }}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e5f1ef', // Same background as the app
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
    color: '#000',
  },
  userEmail: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#1DB954', // Spotify green
    borderRadius: 5,
    padding: 10,
    width: '80%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProfileScreen;
