const Job = require("../model/job");

exports.add = async (req, res) => {
  const maxJobIdUser = await Job.find().sort({ jobId: -1 }).limit(1);
  //console.log("max id: ", maxJobIdUser);
  let jobId;
  const {
    jobTitle,
    noOfOpenings,
    jobLocation,
    qualification,
    salary,
    salaryPeriod,
    jobDescription,
    experience,
    requiredSkills,
    companyName,
    aboutCompany,
    source,
    applyLink,
  } = req.body;
  if (
    !jobTitle ||
    !companyName ||
    !jobLocation ||
    !qualification ||
    !jobDescription ||
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
    noOfOpenings,
    jobLocation,
    qualification,
    salary,
    salaryPeriod,
    jobDescription,
    experience,
    requiredSkills,
    companyName,
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
      jobTitle: newJob.jobTitle,
      noOfOpenings: newJob.noOfOpenings,
      jobLocation: newJob.jobLocation,
      qualification: newJob.qualification,
      salary: newJob.salary,
      salaryPeriod: newJob.salaryPeriod,
      jobDescription: newJob.jobDescription,
      experience: newJob.experience,
      requiredSkills: newJob.requiredSkills,
      companyName: newJob.companyName,
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
