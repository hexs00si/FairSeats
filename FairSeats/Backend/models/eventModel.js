const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin', // Reference to the Admin model
        required: true,
    },
    ticketsMinted: {
        type: Number,
        default: 0, // To track how many tickets have been minted for the event
    }
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

module.exports = mongoose.model('Event', eventSchema);
