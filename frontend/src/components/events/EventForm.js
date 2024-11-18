import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { getNames } from 'country-list';
import EventPicker from './EventPicker';
import EventHandlers from './EventHandlers';
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

    const countries = getNames().map((name) => ({ label: name, value: name }));

    const handleInputChange = (name, value) => {
        setEvent({ ...event, [name]: value });
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || event.nativeDate;
        setEvent({ ...event, date: currentDate.toLocaleDateString() });
        setShowDatePicker(false);
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
                        onChange={(event, date) => handleDateChange(event, date)}
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
                            placeholder={{ label: "Select a country", value: null }}
                            style={{
                                inputAndroid: createEventStyles.input,
                                inputIOS: createEventStyles.input,
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
                    textAlignVertical='top'
                />

                <EventPicker eventPicture={eventPicture} setEventPicture={setEventPicture} />
                <EventHandlers event={event} eventPicture={eventPicture} onClose={onClose} />
            </View>
        </ScrollView>
    );
};

export default EventForm;