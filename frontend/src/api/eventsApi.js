import API from './index';

// Function to create an event
export const createEvent = async (formData, token) => {
    const response = await API.post('/events/create', formData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// Function to fetch all events
export const fetchEvents = async () => {
    const response = await API.get('/events/fetchEvent');
    return response.data.events;
};