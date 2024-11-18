import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createEventStyles from '../../styles/createEventStyles';

const EventHandlers = ({ event, eventPicture, onClose }) => {
    const handleSubmit = async () => {
        const token = await AsyncStorage.getItem('userToken');

        const formData = new FormData();
        formData.append("name", event.name);
        formData.append("category", event.category);
        formData.append("description", event.description);
        formData.append("date", event.date);
        formData.append("address", event.address);
        formData.append("country", event.country);
        formData.append("city", event.city);

        if (eventPicture) {
            formData.append("picture", {
                uri: eventPicture,
                name: "eventPicture.jpg",
                type: "image/jpeg",
            });
        }

        try {
            const response = await fetch("http://localhost:5000/api/events/create", {
                method: "POST",
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Event created successfully:", data.event);
                onClose();
            } else {
                console.error("Error creating event:", data.message || "Something went wrong");
            }
        } catch (error) {
            console.error("Error creating event:", error);
        }
    };

    return (
        <TouchableOpacity style={createEventStyles.submitButton} onPress={handleSubmit}>
            <Text style={createEventStyles.submitButtonText}>SUBMIT</Text>
        </TouchableOpacity>
    );
};

export default EventHandlers;
