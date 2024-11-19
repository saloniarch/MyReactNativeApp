import API from './index';

export const createEvent = async (eventData) => {
    const formData = new FormData();
    Object.keys(eventData).forEach((key) => formData.append(key, eventData[key]));

    const response = await API.post('/events/create', formData);
    return response.data;
};

export const fetchEvents = async () => {
    const response = await API.get('/events');
    return response.data.events;
};
