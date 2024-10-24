// routes/studentRoutes.js
const express = require('express');
const { addStudent, getStudents } = require('../controllers/studentController');
const router = express.Router();

// POST /api/students - Add a new student
router.post('/', addStudent);

// GET /api/students - Get all students (optional)
router.get('/', getStudents);

module.exports = router;
