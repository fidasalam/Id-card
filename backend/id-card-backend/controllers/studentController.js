// controllers/studentController.js
const Student = require('../models/Student');

// Add a new student
exports.addStudent = async (req, res) => {
  const { name, class: studentClass, rollNo, bloodGroup,profilePic } = req.body;

  try {
    const newStudent = new Student({
      name,
      class: studentClass,
      rollNo,
      bloodGroup,
      profilePic
    });
    
    await newStudent.save();
    res.status(201).json({ message: 'Student added successfully!', student: newStudent });
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ message: 'Failed to add student', error });
  }
};

// Get all students (optional)
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Failed to fetch students', error });
  }
};
