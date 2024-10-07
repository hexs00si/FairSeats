const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event', // Reference to the Event model
    required: true,
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin', // Reference to the Admin model
    required: true,
  },
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model if needed in future
  },
  price: {
    type: Number,
    required: true,
  },
  resaleCount: {
    type: Number,
    default: 0,
    max: 2, // Allowing a maximum of 2 resales to prevent excessive reselling
  },
  resalePriceCap: {
    type: Number, // Max resale price to limit ticket scalping
    required: true,
  },
  isMinted: {
    type: Boolean,
    default: false, // Ticket will be marked as minted once the NFT is created
  },
  transactionHash: {
    type: String, // Transaction hash for blockchain records
    required: false,
  },
  ownershipHistory: [{
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
    },
    purchasedAt: {
      type: Date,
      default: Date.now,
    },
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

module.exports = mongoose.model('Ticket', ticketSchema);
