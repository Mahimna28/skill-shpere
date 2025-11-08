const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Institution = require('../models/Institution');


// Create institution (admin only client-side should enforce role)
router.post('/', auth, async (req, res) => {
try {
const inst = new Institution(req.body);
await inst.save();
res.json(inst);
} catch (err) {
res.status(500).send('Server error');
}
});


// List
router.get('/', auth, async (req, res) => {
try {
const list = await Institution.find();
res.json(list);
} catch (err) { res.status(500).send('Server error'); }
});


module.exports = router;