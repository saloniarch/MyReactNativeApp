import Event from '../models/Events.js';

export const createEvent = async (req, res) => {
    console.log('Julebord');
    try {
        const eventData = JSON.parse(req.body.eventData); // Parse JSON object from string
        const { name, category, description, date, address, country, city } = req.body;

        /*if (!name || !category || !description || !date || !address || !country || !city) {
            return res.status(400).json({ message: 'All fields are required' });
        }*/

        const newEvent = new Event({
            name,
            category,
            description,
            date,
            address,
            country,
            city,
            picture: req.file ? `uploads/${req.file.filename}` : null, // Save relative path
            user: req.user._id, // From JWT
        });

        await newEvent.save();
        res.status(201).json({ message: 'Event created successfully', event: newEvent });
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ message: 'Failed to create event', error: error.message });
    }
};

// Fetch all events
export const fetchEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json({ events });
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ message: 'Failed to fetch events', error: error.message });
    }
};
