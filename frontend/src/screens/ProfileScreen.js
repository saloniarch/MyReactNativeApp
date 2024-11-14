import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { globalStyles } from '../styles/globalStyles';

const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({});
  const [fontsLoaded] = useFonts({
    'Anton': require('../../assets/fonts/Anton-Regular.ttf'),
  });

  // Fetch user data from AsyncStorage
  const fetchUserData = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('profileData');
      if (storedUser) {
        setUserData(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Refresh user data every time the screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, [])
  );

  // Navigate to settings screen
  const handleSettingsNavigation = () => {
    navigation.navigate('Settings');
  };

  if (!fontsLoaded) {
    return null; // Return null until fonts are loaded to prevent rendering
  }

  return (
    <View style={[globalStyles.container, styles.container]}>
      <View style={styles.profileHeader}>
        <Image source={{ uri: userData.profileImage || 'https://via.placeholder.com/100' }} style={styles.profilePicture} />
        <View style={styles.profileInfo}>
          {/* Display Name Above Username */}
          {userData.name && <Text style={styles.profileName}>{userData.name}</Text>}
          <Text style={styles.profileUsername}>{userData.username || '@username'}</Text>
          {/* Display Bio */}
          {userData.bio && <Text style={styles.profileBio}>{userData.bio}</Text>}
        </View>
      </View>

      {/* Edit Profile Button */}
      <TouchableOpacity style={styles.editProfileButton} onPress={() => navigation.navigate('EditProfile')}>
        <Text style={styles.editProfileButtonText}>EDIT PROFILE</Text>
      </TouchableOpacity>

      {/* Settings Icon */}
      <TouchableOpacity style={styles.settingsIcon} onPress={handleSettingsNavigation}>
        <MaterialCommunityIcons name="cog-outline" size={30} color="#8ACE00" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
  },
  settingsIcon: {
    position: 'absolute',
    top: 55,
    right: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileInfo: {
    marginLeft: 20,
    flex: 1,
    color: 'white',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5, 
  },
  profileUsername: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  profileBio: {
    fontSize: 17,
    color: 'white',
    marginTop: 20,
    fontStyle: 'italic',
  },
  editProfileButton: {
    padding: 10,
    borderRadius: 5,
    borderColor: '#8ACE00',
    borderWidth: 1,
    width: 190,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  editProfileButtonText: {
    fontFamily: 'Anton',
    color: '#8ACE00',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default ProfileScreen;
