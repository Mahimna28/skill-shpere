const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Message = require('../models/Message');


// fetch recent messages for room
router.get('/room/:room', auth, async (req, res) => {
try {
const msgs = await Message.find({ room: req.params.room }).populate('from', 'name');
res.json(msgs);
} catch (err) { res.status(500).send('Server error'); }
});


module.exports = router;