import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Modal, TextInput, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { globalStyles } from '../styles/globalStyles';

const EditProfileScreen = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [bio, setBio] = useState('This is my bio');
  const [isModalVisible, setModalVisible] = useState(false);
  const [editableField, setEditableField] = useState(null);

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

  // Toggle the modal visibility and set the editable field
  const openEditModal = (field) => {
    setEditableField(field);
    setModalVisible(true);
  };

  // Save changes to the profile
  const saveChanges = () => {
    console.log('Profile updated:', { name, email, bio, profileImage });
    setModalVisible(false);
  };

  // Handle changes in input field for modal
  const handleInputChange = (text) => {
    if (editableField === 'name') {
      setName(text);
    } else if (editableField === 'email') {
      setEmail(text);
    } else if (editableField === 'bio') {
      setBio(text);
    }
  };

  return (
    <View style={[globalStyles.container, styles.container]}>
      {/* Profile Image */}
      <TouchableOpacity onPress={selectProfileImage}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <View style={styles.profileImagePlaceholder}>
            <Text style={styles.addPhotoText}>Add Photo</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Name */}
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Name:</Text>
        <Text style={styles.fieldValue} onPress={() => openEditModal('name')}>{name}</Text>
      </View>

      {/* Email */}
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Email:</Text>
        <Text style={styles.fieldValue} onPress={() => openEditModal('email')}>{email}</Text>
      </View>

      {/* Bio */}
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Bio:</Text>
        <Text style={styles.fieldValue} onPress={() => openEditModal('bio')}>{bio}</Text>
      </View>

      {/* Save and Cancel Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[globalStyles.button, styles.button]} onPress={saveChanges}>
          <Text style={globalStyles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[globalStyles.button, styles.button, styles.cancelButton]} onPress={() => setModalVisible(false)}>
          <Text style={globalStyles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      {/* Edit Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              value={editableField === 'name' ? name : editableField === 'email' ? email : bio}
              onChangeText={handleInputChange}
              placeholder={`Enter your ${editableField}`}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={saveChanges}>
                <Text style={globalStyles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={globalStyles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  addPhotoText: {
    color: '#fff',
  },
  fieldContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  fieldLabel: {
    fontWeight: 'bold',
    color: '#333',
  },
  fieldValue: {
    color: '#007BFF',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 5,
    paddingVertical: 12,
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 12,
    backgroundColor: '#1DB954',
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default EditProfileScreen;
