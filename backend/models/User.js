const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
name: { type: String, required: true },
email: { type: String, required: true, unique: true },
password: { type: String, required: true },
role: { type: String, enum: ['student', 'teacher', 'parent', 'admin'], default: 'student' },
institution: { type: mongoose.Schema.Types.ObjectId, ref: 'Institution' },
subdivisions: [{ type: String }],
points: { type: Number, default: 0 },
badges: [{ type: String }],
}, { timestamps: true });


module.exports = mongoose.model('User', UserSchema);