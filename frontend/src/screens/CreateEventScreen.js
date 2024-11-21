import React from 'react';
import { Modal, View, TouchableOpacity, ScrollView } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import createEventStyles from '../styles/createEventStyles';
import colors from '../styles/colors';
import EventForm from '../components/events/EventForm';

const CreateEventScreen = ({ isVisible, onClose }) => {
    const onGestureEvent = (event) => {
        if (event.nativeEvent.translationY > 100) { 
            onClose();
        }
    };

    return (
        <Modal visible={isVisible} animationType="slide" transparent={true}>
            <View style={createEventStyles.modalBackground}>
                <PanGestureHandler 
                    onGestureEvent={onGestureEvent}
                    maxDeltaY={300}
                    >
                    <View style={createEventStyles.modalContainer}>
                        <TouchableOpacity 
                            onPress={onClose} 
                            style={createEventStyles.closeButton}
                            >
                                <Icon name="chevron-down-circle" size={30} color={colors.primary} />
                        </TouchableOpacity>
                        <View style={createEventStyles.header}>
                            <EventForm onClose={onClose} />
                        </View>
                    </View>
                </PanGestureHandler>
            </View>
        </Modal>
    );
};

export default CreateEventScreen;