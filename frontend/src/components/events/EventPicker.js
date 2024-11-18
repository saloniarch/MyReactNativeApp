import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import createEventStyles from '../../styles/createEventStyles';

const EventPicker = ({ eventPicture, setEventPicture }) => {
    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setEventPicture(result.uri);
        }
    };

    return (
        <TouchableOpacity style={createEventStyles.imagePickerButton} onPress={pickImage}>
            <Text style={createEventStyles.imagePickerText}>
                {eventPicture ? 'Change Picture' : 'Upload Event Picture'}
            </Text>
        </TouchableOpacity>
    );
};

export default EventPicker;
