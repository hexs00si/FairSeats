const Ticket = require('../models/ticketModel');
const Event = require('../models/eventModel');
const Web3 = require('web3');
const TicketBooking = require('../artifacts/contracts/TicketBooking.sol/TicketBooking.json'); // Adjust the path if necessary

// Create Web3 instance
const web3 = new Web3(); // Create without a provider initially

// Set the provider
web3.setProvider('http://127.0.0.1:7545'); // Use the HTTP provider

let contract;

// Initialize the contract
const initContract = async () => {
    try {
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = TicketBooking.networks[networkId];

        if (!deployedNetwork) {
            throw new Error(`Contract not deployed on the current network: ${networkId}`);
        }

        contract = new web3.eth.Contract(
            TicketBooking.abi,
            deployedNetwork.address
        );

        console.log(`Contract initialized at address: ${deployedNetwork.address}`);
    } catch (error) {
        console.error('Failed to initialize contract:', error);
    }
};

// Call initContract once at the start of your application
initContract().catch(err => console.error('Error during contract initialization:', err));

exports.createTicket = async (req, res) => {
    const { eventId, price, resalePriceCap } = req.body;
    const adminId = req.admin.id; // Get the admin ID from the JWT

    try {
        // Check if the event exists
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Create a new ticket in MongoDB
        const newTicket = new Ticket({
            eventId,
            adminId,
            price,
            resalePriceCap,
        });

        await newTicket.save();

        // Create the ticket on the blockchain
        const accounts = await web3.eth.getAccounts();
        await contract.methods.createTicket(price).send({ from: accounts[0] });

        res.status(201).json({ message: 'Ticket created successfully', ticket: newTicket });
    } catch (error) {
        console.error('Error creating ticket:', error);
        res.status(500).json({ message: error.message });
    }
};
