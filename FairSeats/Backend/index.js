const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');

dotenv.config();  // Load environment variables

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Use the auth routes
app.use('/api/auth', authRoutes);

// Start server
const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));