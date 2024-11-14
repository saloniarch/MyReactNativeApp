import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // To use the arrow icon
import { PanGestureHandler } from 'react-native-gesture-handler'; // For swipe-to-dismiss
import colors from '../styles/colors';

const CreateEventScreen = ({ isVisible, onClose }) => {
    const [event, setEvent] = useState({
        name: '',
        category: '',
        description: '',
        date: '',
        address: '',
        country: '',
        city: '',
        picture: null,
    });

    const handleInputChange = (name, value) => {
        setEvent({ ...event, [name]: value });
    };

    const handleSubmit = () => {
        console.log('Event Created:', event);
        onClose();  // Close the modal after submitting
    };

    // Handle swipe gestures to close the screen
    const onGestureEvent = (event) => {
        if (event.nativeEvent.translationY > 100) {
            onClose();  // Close the screen if swiped down more than 100px
        }
    };

    return (
        <Modal visible={isVisible} animationType="slide" transparent={true}>
            <View style={styles.modalBackground}>
                <PanGestureHandler onGestureEvent={onGestureEvent}>
                    <View style={styles.modalContainer}>
                        {/* Close Button with Arrow Icon */}
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Icon name="chevron-down-circle" size={30} color="#8ACE00" />
                        </TouchableOpacity>
                        <ScrollView contentContainerStyle={styles.scrollView}>
                            <Text style={styles.title}>Create Event</Text>

                            {/* Event Name */}
                            <Text style={styles.label}>Name:</Text>
                            <TextInput
                                value={event.name}
                                onChangeText={(text) => handleInputChange('name', text)}
                                style={styles.input}
                            />

                            {/* Event Category */}
                            <Text style={styles.label}>Category:</Text>
                            <TextInput
                                value={event.category}
                                onChangeText={(text) => handleInputChange('category', text)}
                                style={styles.input}
                            />

                            {/* Event Description */}
                            <Text style={styles.label}>Description:</Text>
                            <TextInput
                                value={event.description}
                                onChangeText={(text) => handleInputChange('description', text)}
                                style={styles.input}
                            />

                            {/* Event Date */}
                            <Text style={styles.label}>Date:</Text>
                            <TextInput
                                value={event.date}
                                onChangeText={(text) => handleInputChange('date', text)}
                                style={styles.input}
                            />

                            {/* Event Address */}
                            <Text style={styles.label}>Address:</Text>
                            <TextInput
                                value={event.address}
                                onChangeText={(text) => handleInputChange('address', text)}
                                style={styles.input}
                            />

                            {/* Event Country */}
                            <Text style={styles.label}>Country:</Text>
                            <TextInput
                                value={event.country}
                                onChangeText={(text) => handleInputChange('country', text)}
                                style={styles.input}
                            />

                            {/* Event City */}
                            <Text style={styles.label}>City:</Text>
                            <TextInput
                                value={event.city}
                                onChangeText={(text) => handleInputChange('city', text)}
                                style={styles.input}
                            />

                            {/* Event Picture */}
                            <Text style={styles.label}>Upload Picture (Optional):</Text>
                            <TextInput
                                value={event.picture}
                                onChangeText={(text) => handleInputChange('picture', text)}
                                style={styles.input}
                            />

                            {/* Submit Button */}
                            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                                <Text style={styles.submitButtonText}>Submit</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </PanGestureHandler>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    modalContainer: {
        width: '90%',
        height: '78%',
        padding: 20,
        backgroundColor: 'rgba(210, 175, 29, 0.66)',  // Semi-transparent yellow
        borderRadius: 10,
        elevation: 5,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        borderRadius: 50,
        padding: 5,
        zIndex: 1,
    },
    closeButtonText: {
        color: colors.primary,
        fontSize: 18,
    },
    scrollView: {
        paddingBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#D2AF1D',          // Darker border color for contrast
        backgroundColor: '#C4B89A',    // Set to beige
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 10,
        borderRadius: 5,
        color: '#2D2D2D',              // Darker font color for readability
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 20,
        color: colors.primary,
        fontFamily: 'Anton',
    },
    label: {
        color: '#FFFFFF',
        fontSize: 16,
        marginBottom: 5,
    },
    submitButton: {
        backgroundColor: 'transparent', // Transparent button background
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
        borderWidth: 1,
        borderColor: colors.primary, // Primary-colored border
    },
    submitButtonText: {
        color: colors.primary,
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Anton', // Applying Anton font
    },
});

export default CreateEventScreen;
