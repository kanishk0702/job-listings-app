require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Job = require('./models/Job');
const jobsData = require('./jobs.json');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/joblistings')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Error:', err));

// API Routes
app.get('/api/jobs', async (req, res) => {
  try {
    const { location } = req.query;
    const query = location ? { location: new RegExp(location, 'i') } : {};
    const jobs = await Job.find(query);
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Data Import Endpoint (Run once)
app.get('/api/import', async (req, res) => {
  try {
    await Job.deleteMany({});
    const jobs = await Job.insertMany(jobsData);
    res.json({ message: `Successfully imported ${jobs.length} jobs` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));