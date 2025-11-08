const mongoose = require('mongoose');
const MessageSchema = new mongoose.Schema({
from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
to: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // null for group
body: String,
room: String, // group room id
}, { timestamps: true });


module.exports = mongoose.model('Message', MessageSchema);