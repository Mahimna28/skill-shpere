const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();


// Signup
router.post('/signup', async (req, res) => {
try {
const { name, email, password, role } = req.body;
let user = await User.findOne({ email });
if (user) return res.status(400).json({ msg: 'User already exists' });
user = new User({ name, email, password, role });
const salt = await bcrypt.genSalt(10);
user.password = await bcrypt.hash(password, salt);
await user.save();


const payload = { user: { id: user.id, role: user.role } };
const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
} catch (err) { console.error(err); res.status(500).send('Server error'); }
});


// Login
router.post('/login', async (req, res) => {
try {
const { email, password } = req.body;
const user = await User.findOne({ email });
if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });
const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });
const payload = { user: { id: user.id, role: user.role } };
const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
} catch (err) { console.error(err); res.status(500).send('Server error'); }
});


module.exports = router;