const mongoose = require('mongoose');


const CourseSchema = new mongoose.Schema({
title: String,
category: String,
description: String,
freeResources: [{ title: String, url: String }],
teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });


module.exports = mongoose.model('Course', CourseSchema);