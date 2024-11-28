import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createEvent, fetchEvents } from '../api/eventsApi';

const useEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [addEventLoading, setAddEventLoading] = useState(false);
    const [error, setError] = useState(null);

    // Load all events on initial mount
    const loadEvents = async () => {
        setLoading(true);
        try {
            const fetchedEvents = await fetchEvents();
            setEvents(fetchedEvents);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Add a new event
    const addEvent = async (eventData) => {
        setAddEventLoading(true);
        const formData = new FormData();

        // Prepare the form data for the request
        Object.keys(eventData).forEach((key) => {
            if (key === 'picture' && eventData[key]) {
                formData.append(key, {
                    uri: eventData[key],
                    name: 'eventPicture.jpg',
                    type: 'image/jpeg',
                });
            } else {
                formData.append(key, eventData[key]);
            }
        });

        try {
            const token = await AsyncStorage.getItem('userToken');

            // Use the `createEvent` API method
            const data = await createEvent(formData, token);

            // Add the new event to the events state
            setEvents((prev) => [...prev, data.event]);
        } catch (error) {
            console.log('Error adding event:', error.message);
            setError(error.message);
            throw error;
        } finally {
            setAddEventLoading(false);
        }
    };

    // Run loadEvents on component mount
    useEffect(() => {
        loadEvents();
    }, []);

    return { events, addEvent, loading, addEventLoading, error };
};

export default useEvents;