import React from 'react';
import { Modal, View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import createEventStyles from '../styles/createEventStyles';
import colors from '../styles/colors';
import EventForm from '../components/events/EventForm';

const CreateEventScreen = ({ isVisible, onClose }) => {
    const onGestureEvent = (event) => {
        if (event.nativeEvent.state === State.END && event.nativeEvent.translationY > 100) {
            onClose();
        }
    };

    return (
        <Modal visible={isVisible} animationType="slide" transparent={true}>
            <View style={createEventStyles.modalBackground}>
                <PanGestureHandler onHandlerStateChange={onGestureEvent}>
                    <View style={createEventStyles.modalContainer}>
                        <TouchableOpacity 
                            onPress={onClose} 
                            style={createEventStyles.closeButton}
                        >
                            <Icon name="chevron-down-circle" size={30} color={colors.primary} />
                        </TouchableOpacity>
                        <View style={createEventStyles.header}>
                            <Text style={createEventStyles.title}>CREATE EVENT</Text>
                        </View>

                        {/* ScrollView to make content scrollable */}
                        <ScrollView 
                            contentContainerStyle={createEventStyles.scrollViewContent} 
                            showsVerticalScrollIndicator={false} // Hide the scrollbar
                        >
                            <EventForm onClose={onClose} />
                        </ScrollView>
                    </View>
                </PanGestureHandler>
            </View>
        </Modal>
    );
};

export default CreateEventScreen;
