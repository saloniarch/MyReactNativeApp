import { useState, useEffect } from 'react';
import { createEvent, fetchEvents } from '../api/eventsApi';

const useEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [addEventLoading, setAddEventLoading] = useState(false);
    const [error, setError] = useState(null);

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

    const addEvent = async (eventData, token = localStorage.getItem('token')) => {
        setAddEventLoading(true);
        const formData = new FormData();

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
            const response = await fetch('http://10.0.0.13:5000/api/events/create', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                const message = response.status === 401
                    ? 'Unauthorized. Please log in again.'
                    : response.status === 500
                    ? 'Server error. Please try again later.'
                    : 'Failed to create event.';
                throw new Error(message);
            }

            const data = await response.json();
            setEvents((prev) => [...prev, data.event]);
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setAddEventLoading(false);
        }
    };

    useEffect(() => {
        loadEvents();
    }, []);

    return { events, addEvent, loading, addEventLoading, error };
};

export default useEvents;