const express = require("express");
const { signup, getLogin, login } = require("../controllers/authController");
const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController.js");
const { createTicket } = require("../controllers/ticketController.js");
const { authenticate } = require("../Middleware/authMiddleware.js");

const router = express.Router();

// POST route for Signup
router.post("/signup", signup);
// GET route for Login
router.get("/login", getLogin);
// POST route for Login
router.post("/login", login);
// Create an event
router.post("/events", authenticate, createEvent);
// Get all events
router.get("/events", getEvents);
// Get a specific event by ID
router.get("/events/:id", getEventById);
// Update an event by ID
router.put("/events/:id", authenticate, updateEvent);
// Delete an event by ID
router.delete("/events/:id", authenticate, deleteEvent);
// POST route to create and mint a ticket NFT
router.post("/tickets", authenticate, createTicket);

module.exports = router;
