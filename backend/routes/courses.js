const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Course = require('../models/Course');


router.post('/', auth, async (req, res) => {
try {
const course = new Course(req.body);
await course.save();
res.json(course);
} catch (err) { res.status(500).send('Server error'); }
});


router.get('/', async (req, res) => {
try {
const courses = await Course.find().limit(20);
res.json(courses);
} catch (err) { res.status(500).send('Server error'); }
});


module.exports = router;