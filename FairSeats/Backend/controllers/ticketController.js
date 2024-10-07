const Ticket = require('../models/ticketModel');
const Event = require('../models/eventModel');

exports.createTicket = async (req, res) => {
    const { eventId, price, resalePriceCap } = req.body;
    const adminId = req.admin.id; // Get the admin ID from the JWT

    try {
        // Check if the event exists
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const newTicket = new Ticket({
            eventId,
            adminId,
            price,
            resalePriceCap,
        });

        await newTicket.save();
        res.status(201).json({ message: 'Ticket created successfully', ticket: newTicket });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
