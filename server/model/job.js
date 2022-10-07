const mongoose = require("mongoose");

const jobSchema = mongoose.Schema({
  jobId: {
    type: Number,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  noOfOpenings: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  salaryPeriod: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  requiredSkills: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  aboutCompany: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  applyLink: {
    type: String,
    required: true,
  },
  postedOn: {
    type: Date,
    required: true,
    default: Date(),
  },
});

module.exports = mongoose.model("Job", jobSchema);
