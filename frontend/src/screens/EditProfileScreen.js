import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../contexts/UserContext'; 
import { globalStyles } from '../styles/globalStyles';
import colors from '../styles/colors';
import buttonStyles from '../styles/buttonStyles';

const EditProfileScreen = ({ navigation }) => {
  const { profileData, setProfileData } = useUser();  // Use context for global state
  const [name, setName] = useState(profileData?.name || '');
  const [username, setUsername] = useState(profileData?.username || '');
  const [email, setEmail] = useState(profileData?.email || '');
  const [bio, setBio] = useState(profileData?.bio || '');
  const [profileImage, setProfileImage] = useState(profileData?.profileImage || null);

  // Load data from AsyncStorage on mount
  useEffect(() => {
    const loadProfileData = async () => {
      const savedProfile = await AsyncStorage.getItem('profileData');
      if (savedProfile) {
        const parsedProfile = JSON.parse(savedProfile);
        setName(parsedProfile.name || '');
        setUsername(parsedProfile.username || '');
        setEmail(parsedProfile.email || '');
        setBio(parsedProfile.bio || '');
        setProfileImage(parsedProfile.profileImage || null);
      }
    };
    loadProfileData();
  }, []);

  // Request permissions and handle profile image selection
  const selectProfileImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled && result.assets && result.assets.length > 0) {
        setProfileImage(result.assets[0].uri);
      } else {
        console.log('Image selection cancelled');
      }
    } catch (error) {
      console.error('Error selecting image:', error);
    }
  };

  // Save profile data to AsyncStorage and update global state
  const saveChanges = async () => {
    const updatedProfile = { name, username, email, bio, profileImage };
    try {
      await AsyncStorage.setItem('profileData', JSON.stringify(updatedProfile));
      setProfileData(updatedProfile);  // Update global profile data through context
      navigation.goBack();  // Go back after saving
    } catch (error) {
      console.error('Error saving profile data:', error);
    }
  };

  // Reset fields to original data or navigate back
  const handleCancel = () => {
    setName(profileData.name || '');
    setUsername(profileData.username || '');
    setEmail(profileData.email || '');
    setBio(profileData.bio || '');
    setProfileImage(profileData.profileImage || null);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={globalStyles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[globalStyles.container, styles.container]}>
          <TouchableOpacity onPress={selectProfileImage} style={styles.imageContainer}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <View style={styles.profileImagePlaceholder}>
                <Text style={{ color: colors.white, fontFamily: 'Anton', fontSize: 18 }}>
                  Add Photo
                </Text>
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
              placeholderTextColor={colors.beige}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Username</Text>
            <TextInput
              style={styles.fieldInput}
              value={username}
              onChangeText={setUsername}
              placeholder="Enter username"
              maxLength={11}
              placeholderTextColor={colors.beige}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Email</Text>
            <TextInput
              style={styles.fieldInput}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter email"
              keyboardType="email-address"
              placeholderTextColor={colors.beige}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Bio</Text>
            <TextInput
              style={[styles.fieldInput, styles.bioInput]}
              value={bio}
              onChangeText={setBio}
              placeholder="Enter bio"
              multiline
              maxLength={200}
              placeholderTextColor={colors.beige}
            />
            <Text style={styles.characterCount}>{bio.length}/200</Text>
          </View>

          <TouchableOpacity style={buttonStyles.greenButton} onPress={saveChanges}>
            <Text style={buttonStyles.greenButtonText}>SAVE CHANGES</Text>
          </TouchableOpacity>

          <TouchableOpacity style={buttonStyles.yellowButton} onPress={handleCancel}>
            <Text style={buttonStyles.yellowButtonText}>CANCEL</Text>
          </TouchableOpacity>

        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 15,
    width: '100%',
  },
  fieldLabel: {
    color: colors.yellow,
    fontWeight: 'bold',
    flex: 1,
    fontSize: 14,
    paddingLeft: 15,
  },
  fieldInput: {
    flex: 2,
    height: 40,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.yellow,
    borderRadius: 10,
    paddingHorizontal: 10,
    color: colors.white,
    fontSize: 14,
    textAlignVertical: 'center',
  },
  bioInput: {
    height: 70,
    textAlignVertical: 'top',
    paddingTop: 20,
  },
  characterCount: {
    position: 'absolute',
    color: colors.primary,
    right: 15,
    top: 10,
    fontSize: 10,
  },
});

export default EditProfileScreen;
