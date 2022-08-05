const Job = require("../model/job");

exports.add = async (req, res) => {
  const maxJobIdUser = await Job.find().sort({ jobId: -1 }).limit(1);
  console.log("max id: ", maxJobIdUser);
  let jobId;
  const {
    jobTitle,
    companyName,
    location,
    salary,
    experience,
    skills,
    description,
    aboutCompany,
    source,
    postedOn,
  } = req.body;

  if (maxJobIdUser.length > 0) {
    const maxJobId = maxJobIdUser[0].jobId;
    jobId = maxJobId + 1;
  } else {
    jobId = 1;
  }
  console.log("max job id is:" + jobId);
  const newJob = new Job({
    jobId,
    jobTitle,
    companyName,
    location,
    salary,
    experience,
    skills,
    description,
    aboutCompany,
    source,
  });

  await newJob.save();

  res.json({
    sucess: true,
    message: "Job Posted Sucessfully!",
    job: {
      jobId: newJob.jobId,
      jobTitle: newJob.jobTitle,
      companyName: newJob.companyName,
      location: newJob.location,
      salary: newJob.salary,
      experience: newJob.experience,
      skills: newJob.skills,
      description: newJob.description,
      aboutCompany: newJob.aboutCompany,
      source: newJob.source,
      postedOn: newJob.postedOn,
    },
  });
};

exports.get = async (req, res) => {
  const getAllJobs = await Job.find({});
  console.log("all jobs", getAllJobs);
  res.json({ total: getAllJobs.length, jobs: getAllJobs });
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  const getJob = await Job.findOne({ jobId: id });
  console.log(getJob);
  res.json({ Success: true, message: "Job found sucessfully!!", job: getJob });
};
