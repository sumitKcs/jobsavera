const Job = require("../model/job");

exports.add = async (req, res) => {
  const maxJobIdUser = await Job.find().sort({ jobId: -1 }).limit(1);
  //console.log("max id: ", maxJobIdUser);
  let jobId;
  const {
    jobTitle,
    companyName,
    state,
    city,
    salary,
    qualification,
    experience,
    skills,
    description,
    aboutCompany,
    source,
    applyLink,
  } = req.body;
  if (
    !jobTitle ||
    !companyName ||
    !state ||
    !qualification ||
    !description ||
    !aboutCompany
  ) {
    return res.json({ Success: false, message: "Please check your inputs." });
  }

  if (maxJobIdUser.length > 0) {
    const maxJobId = maxJobIdUser[0].jobId;
    jobId = maxJobId + 1;
  } else {
    jobId = 1;
  }
  // console.log("max job id is:" + jobId);
  const newJob = new Job({
    jobId,
    jobTitle,
    companyName,
    state,
    city,
    salary,
    qualification,
    experience,
    skills,
    description,
    aboutCompany,
    source,
    applyLink,
  });

  const resultSave = await newJob.save();
  console.log("response after save", res);
  res.json({
    sucess: true,
    message: "Job Posted Sucessfully!",
    job: {
      jobId: newJob.jobId,
      jobTitle: newJob.jobTitle,
      companyName: newJob.companyName,
      location: newJob.location,
      salary: newJob.salary,
      qualification: newJob.qualification,
      experience: newJob.experience,
      skills: newJob.skills,
      description: newJob.description,
      aboutCompany: newJob.aboutCompany,
      source: newJob.source,
      applyLink: newJob.applyLink,
      postedOn: newJob.postedOn,
    },
  });
};

exports.get = async (req, res) => {
  const getAllJobs = await Job.find({}).sort({ jobId: -1 });
  res.json({ total: getAllJobs.length, jobs: getAllJobs });
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) {
    return res.json({ Success: false, message: "Invalid Request" });
  }
  const getJob = await Job.findOne({ jobId: id });
  if (getJob) {
    return res.json({
      Success: true,
      message: "Job found sucessfully!!",
      job: getJob,
    });
  }
  return res.json({ Success: false, message: "Job not found !!" });
};
