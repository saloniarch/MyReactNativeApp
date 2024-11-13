import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { globalStyles } from '../styles/globalStyles';

const ProfileScreen = ({ route, navigation }) => {
  const { name, username, email, bio, profileImage, followers, following, posts } = route.params || {};

  const renderItem = ({ item }) => (
    <Image source={{ uri: item }} style={styles.postImage} />
  );

  return (
    <View style={[globalStyles.container, styles.container]}>
      {/* Settings Icon */}
      <TouchableOpacity 
        style={styles.settingsIcon} 
        onPress={() => navigation.navigate('Settings')} 
        > 
      <MaterialCommunityIcons name="cog" size={30} color="#8ACE00" /> 
      </TouchableOpacity>

      <View style={styles.profileHeader}>
        <Image source={{ uri: profileImage || 'https://via.placeholder.com/100' }} style={styles.profilePicture} />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{name || 'John Doe'}</Text>
          <Text style={styles.profileUsername}>{username || '@johndoe'}</Text>
          <Text style={styles.profileBio}>{bio || 'This is the bio section.'}</Text>
          <View style={styles.followInfo}>
            <Text style={styles.followText}>{followers || 0} Followers</Text>
            <Text style={styles.followText}>{following || 0} Following</Text>
          </View>
        </View>
      </View>

      {/* Edit Profile Button */}
      <TouchableOpacity style={styles.editProfileButton} onPress={() => navigation.navigate('EditProfile')}>
        <Text style={styles.editProfileButtonText}>Edit Profile</Text>
      </TouchableOpacity>

      {/* Posts Section */}
      <FlatList
        data={posts || []}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        style={styles.postsList}
      />
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
  followInfo: {
    flexDirection: 'row',
    marginTop: 10,
  },
  followText: {
    fontSize: 14,
    color: 'white',
    marginRight: 20,
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
