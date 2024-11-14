import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from '../styles/globalStyles';
import colors from '../styles/colors';

const EditProfileScreen = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');

  // Load data from AsyncStorage on mount
  useEffect(() => {
    const loadProfileData = async () => {
      const savedProfile = await AsyncStorage.getItem('profileData');
      if (savedProfile) {
        const { name, username, email, bio, profileImage } = JSON.parse(savedProfile);
        setName(name || 'John Doe');
        setUsername(username || 'New Username');
        setEmail(email || 'john.doe@example.com');
        setBio(bio || 'This is my bio');
        setProfileImage(profileImage || null);
      }
    };
    loadProfileData();
  }, []);

  // Handle profile image selection
  const selectProfileImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfileImage(result.uri);
    }
  };

  // After saving the profile changes, navigate to Profile tab within Main
  const saveChangesAndNavigate = () => {
    navigation.navigate("Main", {
      screen: "Profile",
      params: {
        name: name,
        username: username,
        email: email,
        bio: bio,
        profileImage: profileImage,
      },
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[globalStyles.container, styles.container]}>
        <TouchableOpacity onPress={selectProfileImage} style={styles.imageContainer}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.profileImagePlaceholder}>
              <Text style={styles.addPhotoText}>Add Photo</Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Name</Text>
          <TextInput
            style={styles.fieldInput}
            value={name}
            onChangeText={setName}
            placeholder="Enter name"
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Username</Text>
          <TextInput
            style={styles.fieldInput}
            value={username}
            onChangeText={setUsername}
            placeholder="Enter username"
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Email</Text>
          <TextInput
            style={styles.fieldInput}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email"
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Bio</Text>
          <TextInput
            style={styles.fieldInput}
            value={bio}
            onChangeText={setBio}
            placeholder="Enter bio"
            multiline
          />
        </View>

        <TouchableOpacity style={[globalStyles.button, styles.saveButton]} onPress={saveChangesAndNavigate}>
          <Text style={globalStyles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  profileImagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhotoText: {
    color: colors.white,
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    width: '100%',
  },
  fieldLabel: {
    color: colors.primary, // Apply primary color to labels
    fontWeight: 'bold',
    flex: 1,
  },
  fieldInput: {
    flex: 2,
    borderBottomWidth: 1,
    backgroundColor: '#444',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: colors.white,
  },
  saveButton: {
    marginTop: 30,
    borderRadius: 5,
  },
});

export default EditProfileScreen;
