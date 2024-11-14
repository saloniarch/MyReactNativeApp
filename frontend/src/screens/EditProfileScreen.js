import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
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
        setName(name || '');
        setUsername(username || '');
        setEmail(email || '');
        setBio(bio || '');
        setProfileImage(profileImage || null);
      }
    };
    loadProfileData();
  }, []);

  // Handle profile image selection
  const selectProfileImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfileImage(result.uri);
    }
  };

  // Save profile data to AsyncStorage and navigate 
  const saveChangesAndNavigate = async () => { 
    const profileData = { name, username, email, bio, profileImage }; 
    try { 
      await AsyncStorage.setItem('profileData', JSON.stringify(profileData)); 
      navigation.navigate("Main", { 
        screen: "Profile", 
        params: profileData, 
      }); 
    } catch (error) { 
      console.error("Error saving profile data:", error); 
    } 
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust the behavior based on platform
      style={globalStyles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[globalStyles.container, styles.container]}>
          <TouchableOpacity onPress={selectProfileImage} style={styles.imageContainer}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <View style={styles.profileImagePlaceholder}>
                <Text style={{color: colors.white, fontFamily: 'Anton', fontSize: 18}}>
                Add Photo</Text>
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
            <Text style={styles.characterCount}>{bio.length}/200</Text> {/* Show character count */}
          </View>

          <TouchableOpacity style={[globalStyles.button, styles.saveButton]} onPress={saveChangesAndNavigate}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
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
  addPhotoText: {
    color: colors.white,
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
    textAlignVertical: 'center',
    paddingTop: 20,
    alignItems: 'center'
  },
  characterCount: {
    position: 'absolute',
    color: colors.primary,
    right: 15,
    top: 10,
    fontSize: 10,
  },
  saveButton: {
    marginTop: 30,
    borderRadius: 5,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  saveButtonText: {
    fontFamily: 'Anton',
    fontSize: 20,
    color: colors.primary,
    fontWeight: 'bold',
    textAlign: 'center',
  },  
});

export default EditProfileScreen;