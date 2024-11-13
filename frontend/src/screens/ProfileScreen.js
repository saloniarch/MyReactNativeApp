import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileScreen = ({ route, navigation }) => {
  const { name, username, email, bio, profileImage } = route.params || {};

  useEffect(() => {
    // Log to ensure useEffect runs
    console.log('Setting header options for ProfileScreen');

    // Setting header right icon for the profile screen
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 10 }} // Add some margin for positioning
          onPress={() => navigation.navigate('Settings')}  // Navigate to Settings screen
        >
          <Icon name="settings-outline" size={30} color="#8ACE00" /> {/* Icon for Settings */}
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={[globalStyles.container, styles.container]}>
      <View style={styles.profilePictureContainer}>
        <Image
          source={{ uri: profileImage || 'https://via.placeholder.com/100' }} // Use profileImage or fallback
          style={styles.profilePicture}
        />
      </View>

      {/* User Information */}
      <Text style={[globalStyles.text, styles.userName]}>{name || 'John Doe'}</Text>
      <Text style={[globalStyles.text, styles.userEmail]}>{email || 'john.doe@example.com'}</Text>

      {/* Edit Profile Button */}
      <TouchableOpacity style={[globalStyles.button, styles.button]} onPress={() => navigation.navigate('EditProfile')}>
        <Text style={globalStyles.buttonText}>Edit Profile</Text>
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
