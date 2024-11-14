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
                            <Icon name="chevron-down-circle" size={30} color={colors.primary} />
                        </TouchableOpacity>
                        <View style={styles.header}>
                            <Text style={styles.title}>CREATE AN EVENT</Text>
                        </View>
                        <ScrollView contentContainerStyle={styles.scrollViewContent}>
                            <View style={styles.scrollViewInnerContent}>
                                {/* Event Name */}
                                <Text style={styles.label}>Name</Text>
                                <TextInput
                                    value={event.name}
                                    onChangeText={(text) => handleInputChange('name', text)}
                                    style={styles.input}
                                />

                                {/* Event Category */}
                                <Text style={styles.label}>Category</Text>
                                <TextInput
                                    value={event.category}
                                    onChangeText={(text) => handleInputChange('category', text)}
                                    style={styles.input}
                                />

                                {/* Event Description */}
                                <Text style={styles.label}>Description</Text>
                                <TextInput
                                    value={event.description}
                                    onChangeText={(text) => handleInputChange('description', text)}
                                    style={styles.input}
                                />

                                {/* Event Date */}
                                <Text style={styles.label}>Date</Text>
                                <TextInput
                                    value={event.date}
                                    onChangeText={(text) => handleInputChange('date', text)}
                                    style={styles.input}
                                />

                                {/* Event Address */}
                                <Text style={styles.label}>Address</Text>
                                <TextInput
                                    value={event.address}
                                    onChangeText={(text) => handleInputChange('address', text)}
                                    style={styles.input}
                                />

                                {/* Event Country */}
                                <Text style={styles.label}>Country</Text>
                                <TextInput
                                    value={event.country}
                                    onChangeText={(text) => handleInputChange('country', text)}
                                    style={styles.input}
                                />

                                {/* Event City */}
                                <Text style={styles.label}>City</Text>
                                <TextInput
                                    value={event.city}
                                    onChangeText={(text) => handleInputChange('city', text)}
                                    style={styles.input}
                                />

                                {/* Event Picture */}
                                <Text style={styles.label}>Event Picture</Text>
                                <TextInput
                                    value={event.picture}
                                    onChangeText={(text) => handleInputChange('picture', text)}
                                    style={styles.input}
                                />

                                {/* Submit Button */}
                                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                                    <Text style={styles.submitButtonText}>SUBMIT</Text>
                                </TouchableOpacity>
                            </View>
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
        padding: 0, 
        backgroundColor: 'rgba(210, 175, 29, 0.7)',
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
    header: {
        padding: 9,
        backgroundColor: 'transparent',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignItems: 'center',
    },
    scrollViewContent: {
        paddingBottom: 20,
    },
    scrollViewInnerContent: {
        paddingHorizontal: 20,
        paddingTop: 20, 
    },
    input: {
        height: 40,
        borderColor: colors.yellow,
        backgroundColor: '#C4B89A',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 10,
        borderRadius: 5,
        color: '#2D2D2D',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: colors.primary,
        fontFamily: 'Anton',
    },
    label: {
        color: colors.white,
        fontSize: 16,
        marginBottom: 5,
    },
    submitButton: {
        backgroundColor: 'transparent',
        paddingVertical: 12,
        width: 190,
        borderRadius: 5,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20,
        borderWidth: 2,
        borderColor: colors.primary,
    },
    submitButtonText: {
        color: colors.primary,
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Anton',
    },
});

export default CreateEventScreen;
