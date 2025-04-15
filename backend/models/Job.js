const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  id: Number,
  title: String,
  company: String,
  location: String,
  description: String,
  employmentType: String,
  postedDate: String, // Changed to String for flexibility
  source: String,
  experienceRange: String,
  salary: String
});

module.exports = mongoose.model('Job', jobSchema);