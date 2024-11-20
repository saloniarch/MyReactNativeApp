import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useUser } from '../contexts/UserContext';
import { useFonts } from 'expo-font'; 
import { globalStyles } from '../styles/globalStyles';

const ProfileScreen = ({ navigation }) => {
  const { profileData } = useUser(); // Get profile data from context
  const [fontsLoaded] = useFonts({
    'Anton': require('../../assets/fonts/Anton-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Wait until fonts are loaded and profile data is available
  }

  // Navigate to settings screen
  const handleSettingsNavigation = () => {
    navigation.navigate('Settings');
  };

  return (
    <View style={[globalStyles.container]}>
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: profileData?.profileImage || 'https://via.placeholder.com/100' }}
          style={styles.profilePicture}
        />
        <View style={styles.profileInfo}>
          {profileData?.name && <Text style={styles.profileName}>{profileData.name}</Text>}
          <Text style={styles.profileUsername}>{profileData?.username || '@username'}</Text>
          {profileData?.bio && <Text style={styles.profileBio}>{profileData.bio}</Text>}
        </View>
      </View>

      <TouchableOpacity
        style={styles.editProfileButton}
        onPress={() => navigation.navigate('EditProfile')}
      >
        <Text style={styles.editProfileButtonText}>EDIT PROFILE</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.settingsIcon}
        onPress={handleSettingsNavigation}
      >
        <MaterialCommunityIcons name="cog-outline" size={30} color="#8ACE00" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({

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
