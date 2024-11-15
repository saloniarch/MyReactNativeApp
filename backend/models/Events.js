import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        required: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true,
    },
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);

export default Event;
