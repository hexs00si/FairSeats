const Event = require('../models/eventModel');

// Create an event
exports.createEvent = async (req, res) => {
    const { name, date, location, description } = req.body;
    const adminId = req.admin.id; // Get the admin ID from the JWT

    try {
        const newEvent = new Event({
            name,
            date,
            location,
            description,
            adminId
        });
        await newEvent.save();
        res.status(201).json({ message: "Event created successfully", event: newEvent });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all events
exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific event by ID
exports.getEventById = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateEvent = async (req, res) => {
    const { id } = req.params;

    try {
        // Extract the properties that are actually provided in the request body
        const updates = {};
        if (req.body.name) updates.name = req.body.name;
        if (req.body.date) updates.date = req.body.date;
        if (req.body.location) updates.location = req.body.location;
        if (req.body.description) updates.description = req.body.description;

        const updatedEvent = await Event.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json({ message: "Event updated successfully", event: updatedEvent });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an event by ID
exports.deleteEvent = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedEvent = await Event.findByIdAndDelete(id);
        if (!deletedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};