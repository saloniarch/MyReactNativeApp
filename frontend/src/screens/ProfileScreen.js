import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { globalStyles } from '../styles/globalStyles';

const ProfileScreen = ({ route, navigation }) => {
  const { name, username, bio, profileImage } = route.params || {};

  // Define the handleSettingsNavigation function
  const handleSettingsNavigation = () => {
    navigation.navigate('Settings');
  };

  return (
    <View style={[globalStyles.container, styles.container]}>
      <View style={styles.profileHeader}>
        <Image source={{ uri: profileImage || 'https://via.placeholder.com/100' }} style={styles.profilePicture} />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{name || 'John Doe'}</Text>
          <Text style={styles.profileUsername}>{username || '@johndoe'}</Text>
          <Text style={styles.profileBio}>{bio || 'This is the bio section.'}</Text>
        </View>
      </View>

      {/* Edit Profile Button */}
      <TouchableOpacity style={styles.editProfileButton} onPress={() => navigation.navigate('EditProfile')}>
        <Text style={styles.editProfileButtonText}>Edit Profile</Text>
      </TouchableOpacity>

      {/* Settings Icon */}
      <TouchableOpacity style={styles.settingsIcon} onPress={handleSettingsNavigation}>
        <MaterialCommunityIcons name="cog" size={30} color="#8ACE00" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 60, // Adjust padding to position elements correctly
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
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  profileUsername: {
    fontSize: 16,
    color: 'grey',
    marginBottom: 5,
  },
  profileBio: {
    fontSize: 14,
    color: 'white',
  },
  editProfileButton: {
    padding: 10,
    borderRadius: 5,
    borderColor: '#8ACE00',
    borderWidth: 1,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  editProfileButtonText: {
    color: '#8ACE00',
    fontWeight: 'bold',
  },
  postsList: {
    paddingHorizontal: 5,
  },
  postImage: {
    width: '32%',
    height: 100,
    margin: 2,
    borderRadius: 5,
  },
});

export default ProfileScreen;
