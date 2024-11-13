/*import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

const EventScreen = () => {

  const [eventName, setEventName] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');

  return (
    <View style={globalStyles.container}>

      <Text style={globalStyles.title}>Event Name</Text>
      <TextInput
        style={[globalStyles.input, styles.inputOverride]}
        value={eventName}
        onChangeText={setEventName}
        placeholder="Enter Event Name"
        placeholderTextColor="#999"  
      />

      <Text style={globalStyles.title}>Description</Text>
      <TextInput
        style={[globalStyles.input, styles.inputOverride]}
        value={description}
        onChangeText={setDescription}
        placeholder="Describe Your Event"
        placeholderTextColor="#999"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputOverride: {
    borderWidth: 1,
    borderColor: 'white',
    color: 'white',
  },
});

export default EventScreen;*/
