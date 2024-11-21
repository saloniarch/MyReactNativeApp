import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { getNames } from 'country-list';
import EventPicker from './EventPicker';
import useEvents from '../../hooks/useEvents';
import DateTimePicker from '@react-native-community/datetimepicker';
import createEventStyles from '../../styles/createEventStyles';
import colors from '../../styles/colors';

const EventForm = ({ onClose }) => {
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

    const { addEvent } = useEvents();

    const countries = getNames().map((name) => ({ label: name, value: name }));

    const handleInputChange = (name, value) => {
        console.log(`Input Change - ${name}: ${value}`);
        setEvent({ ...event, [name]: value });
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || event.nativeDate;
        setEvent({ ...event, date: currentDate.toISOString().split('T')[0] });
        setShowDatePicker(false);
    };

    const handleSubmit = async () => {
        try {
            await addEvent({
                ...event,
                picture: eventPicture, // Include the uploaded picture
            });
            console.log('Event created successfully!');
            onClose(); // Close the modal or form after successful submission
        } catch (error) {
            console.error('Error submitting event:', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={createEventStyles.scrollViewContent}>
            <View style={createEventStyles.scrollViewInnerContent}>
                <Text style={createEventStyles.label}>Name Of The Event</Text>
                <TextInput
                    value={event.name}
                    onChangeText={(text) => handleInputChange('name', text)}
                    style={createEventStyles.input}
                    autoCompleteType="off"
                />

                <Text style={createEventStyles.label}>Category</Text>
                <TextInput
                    value={event.category}
                    onChangeText={(text) => handleInputChange('category', text)}
                    style={createEventStyles.input}
                />

                <Text style={createEventStyles.label}>Date</Text>
                <TouchableOpacity onPress={() => setShowDatePicker(true)} style={createEventStyles.input}>
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

                <Text style={createEventStyles.label}>Address</Text>
                <TextInput
                    value={event.address}
                    onChangeText={(text) => handleInputChange('address', text)}
                    style={createEventStyles.input}
                    autoCompleteType="street-address"
                />

                <View style={createEventStyles.rowContainer}>
                    <View style={createEventStyles.inputContainer}>
                        <Text style={createEventStyles.label}>Country</Text>
                        <RNPickerSelect
                            onValueChange={(value) => handleInputChange('country', value)}
                            items={countries}
                            placeholder={{ label: 'Select a country', value: null }}
                            style={{
                                inputAndroid: createEventStyles.input,
                                inputIOS: createEventStyles.input,
                                placeholder: { color: 'gray' },
                            }}
                            value={event.country}
                        />
                    </View>

                    <View style={createEventStyles.inputContainer}>
                        <Text style={createEventStyles.label}>City</Text>
                        <TextInput
                            value={event.city}
                            onChangeText={(text) => handleInputChange('city', text)}
                            style={createEventStyles.input}
                        />
                    </View>
                </View>

                <Text style={createEventStyles.label}>Description</Text>
                <TextInput
                    value={event.description}
                    onChangeText={(text) => handleInputChange('description', text)}
                    style={[createEventStyles.input, createEventStyles.descriptionInput]}
                    multiline={true}
                    textAlignVertical="top"
                />

                <EventPicker eventPicture={eventPicture} setEventPicture={setEventPicture} />

                <TouchableOpacity style={createEventStyles.submitButton} onPress={handleSubmit}>
                    <Text style={createEventStyles.submitButtonText}>SUBMIT</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default EventForm;
