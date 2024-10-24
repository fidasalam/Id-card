const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

// Initialize app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
const idCardTemplateRoutes = require('./routes/idCardTemplateRoute');
const studentRoutes = require('./routes/studentRoute');
app.use('/api', idCardTemplateRoutes);
app.use('/api/student',studentRoutes );


// Set the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
