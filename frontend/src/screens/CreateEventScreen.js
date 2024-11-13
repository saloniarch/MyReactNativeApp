import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

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

    return (
        <Modal visible={isVisible} animationType="slide" transparent={true}>
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>V</Text>
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
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    modalContainer: {
        width: '80%',
        padding: 20,
        backgroundColor: '#2D2D2D',
        borderRadius: 10,
        elevation: 5,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        borderRadius: 50,
        padding: 5,
    },
    closeButtonText: {
        color: '#8ACE00',
        fontSize: 18,
    },
    scrollView: {
        paddingBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#444',
        backgroundColor: '#3C3C3C',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 10,
        borderRadius: 5,
        color: '#E1DAAE',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#8ACE00',
    },
    label: {
        color: '#FFFFFF', // White color for labels
        fontSize: 16,
        marginBottom: 5,
    },
    submitButton: {
        backgroundColor: '#8ACE00',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    submitButtonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CreateEventScreen;