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
  companyName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
    default: "Not Specified",
  },
  experience: {
    type: String,
    required: true,
    default: "Not Specified",
  },
  skills: {
    type: [String],
    required: true,
    default: "not mentioned",
  },
  description: {
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
    default: "jobsavera",
  },
  postedOn: {
    type: Date,
    required: true,
    default: Date(),
  },
});

module.exports = mongoose.model("Job", jobSchema);
