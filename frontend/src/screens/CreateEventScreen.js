import colors from '../styles/colors';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { getNames } from 'country-list';

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

    const [eventPicture, setEventPicture] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const countries = getNames().map((name) => ({ label: name, value: name }));

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

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || event.nativeDate;
        setEvent({ ...event, date: currentDate.toLocaleDateString() });
        setShowDatePicker(false);
    };

    const handleInputChange = (name, value) => {
        setEvent({ ...event, [name]: value });
    };

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
            const response = await fetch("http://localhost:8081/api/events/create", {
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

    const onGestureEvent = (event) => {
        if (event.nativeEvent.translationY > 100) {
            onClose();
        }
    };

    return (
        <Modal visible={isVisible} animationType="slide" transparent={true}>
            <View style={styles.modalBackground}>
                <PanGestureHandler onGestureEvent={onGestureEvent}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Icon name="chevron-down-circle" size={30} color={colors.primary} />
                        </TouchableOpacity>
                        <View style={styles.header}>
                            <Text style={styles.title}>CREATE AN EVENT</Text>
                        </View>
                        <ScrollView contentContainerStyle={styles.scrollViewContent}>
                            <View style={styles.scrollViewInnerContent}>
                                
                                {/*Event Name*/}
                                <Text style={styles.label}>Name Of The Event</Text>
                                <TextInput
                                    value={event.name}
                                    onChangeText={(text) => handleInputChange('name', text)}
                                    style={styles.input}
                                    autoCompleteType="off"
                                />

                                {/*Category*/}
                                <Text style={styles.label}>Category</Text>
                                <TextInput
                                    value={event.category}
                                    onChangeText={(text) => handleInputChange('category', text)}
                                    style={styles.input}
                                />

                                {/*Date*/}
                                <Text style={styles.label}>Date</Text>
                                <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
                                    <Text style={{ color: event.date ? colors.black : colors.grey }}>
                                        {event.date ? event.date : 'Select Date'}
                                    </Text>
                                </TouchableOpacity>

                                {showDatePicker && (
                                    <DateTimePicker
                                        value={new Date()}
                                        mode="date"
                                        display="default"
                                        onChange={handleDateChange}
                                    />
                                )}

                                {/*Address*/}
                                <Text style={styles.label}>Address</Text>
                                <TextInput
                                    value={event.address}
                                    onChangeText={(text) => handleInputChange('address', text)}
                                    style={styles.input}
                                    autoCompleteType="street-address"
                                />

                                {/*Country*/}
                                <View style={styles.rowContainer}>
                                    <View style={styles.inputContainer}>
                                        <Text style={styles.label}>Country</Text>
                                        <RNPickerSelect
                                            onValueChange={(value) => handleInputChange('country', value)}
                                            items={countries}
                                            placeholder={{ label: "Select a country", value: null }}
                                            style={{
                                                inputAndroid: styles.input,
                                                inputIOS: styles.input,
                                            }}
                                            value={event.country}
                                        />
                                    </View>
                                    
                                    {/*City*/}
                                    <View style={styles.inputContainer}>
                                        <Text style={styles.label}>City</Text>
                                        <TextInput
                                            value={event.city}
                                            onChangeText={(text) => handleInputChange('city', text)}
                                            style={styles.input}
                                        />
                                    </View>
                                </View>

                                {/*Description*/}
                                <Text style={styles.label}>Description</Text>
                                <TextInput
                                    value={event.description}
                                    onChangeText={(text) => handleInputChange('description', text)}
                                    style={styles.descriptionInput}
                                    multiline={true}
                                    textAlignVertical='top'
                                    scrollEnabled={true}
                                />

                                {/*Image upload*/}
                                <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
                                    <Text style={styles.imagePickerText}>
                                        {eventPicture ? 'Change Picture' : 'Upload Event Picture'}
                                    </Text>
                                </TouchableOpacity>

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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
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
    descriptionInput: {
        height: 150,
        minHeight: 100,
        maxHeight: 200,
        borderColor: colors.yellow,
        backgroundColor: '#C4B89A',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 10,
        borderRadius: 5,
        color: '#2D2D2D',
        textAlignVertical: 'top',
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
    imagePickerButton: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
        alignItems: 'center',
    },
    imagePickerText: {
        color: colors.white,
        fontSize: 16,
    },

    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    inputContainer: {
        width: '48%', 
    },
});


export default CreateEventScreen;
