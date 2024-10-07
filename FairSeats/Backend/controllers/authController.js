const Admin = require('../models/adminModel');
const jwt = require('jsonwebtoken');
const Web3 = require('web3').default;  // Import Web3 correctly
const web3 = new Web3('http://127.0.0.1:7545'); // Connect to Ganache

// Signup Controller
exports.signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the email is already registered
        let admin = await Admin.findOne({ email });
        if (admin) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // Generate a new Ethereum address
        const newAccount = web3.eth.accounts.create();
        const blockchainAddress = newAccount.address;

        // Create new admin
        admin = new Admin({
            name,
            email,
            password,
            blockchainAddress
        });
        await admin.save();

        res.status(201).json({ message: "Admin registered successfully", admin });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Login Controller (POST)
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        // Check if the password matches
        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login Controller (GET) - Just a placeholder
exports.getLogin = (req, res) => {
    res.send("Login page");
};
