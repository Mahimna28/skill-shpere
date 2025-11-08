const mongoose = require('mongoose');


const InstitutionSchema = new mongoose.Schema({
name: { type: String, required: true },
type: { type: String, enum: ['college','school'], default: 'college' },
subdivisions: [{ name: String, teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] }]
}, { timestamps: true });


module.exports = mongoose.model('Institution', InstitutionSchema);