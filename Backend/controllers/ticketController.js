const Ticket = require('../models/ticketModel');
const Event = require('../models/eventModel');
const Web3 = require('web3');
const TicketBooking = require('../artifacts/contracts/TicketBooking.sol/TicketBooking.json'); // Adjust the path if necessary

const web3 = new Web3('http://127.0.0.1:8545'); // Hardhat Network URL
let contract;

// Initialize the contract
const initContract = async () => {
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = TicketBooking.networks[networkId];
    contract = new web3.eth.Contract(
        TicketBooking.abi,
        deployedNetwork.address
    );
};

// Call initContract once at the start of your application
initContract();

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
        res.status(500).json({ message: error.message });
    }
};
