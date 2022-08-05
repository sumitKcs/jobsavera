import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const JobDetail = () => {
  const [singlejobDetails, setSingleJobDetails] = useState([]);
  const param = useParams();
  const { id } = param;
  const GET_JOB_BY_ID_URI = `${process.env.REACT_APP_SERVER_URI}/api/job/get/${id}`;
  console.log("id is:", id, GET_JOB_BY_ID_URI);

  //   const res = await axios.get(GET_JOB_BY_ID_URI);
  //   console.log("singe jod data: ", res);

  useEffect(() => {
    try {
      const getJobById = async () => {
        const res = await axios.get(GET_JOB_BY_ID_URI);
        const jobData = res.data.job;
        setSingleJobDetails(jobData);
      };
      getJobById();
    } catch (err) {
      console.log(err);
    }
  }, []);

  console.log("single job data: ", singlejobDetails.location);
  const {
    jobId,
    jobTitle,
    companyName,
    experience,
    location,
    salary,
    skills,
    description,
    aboutCompany,
    postedOn,
    source,
  } = singlejobDetails;
  return (
    <>
      <div>
        <div>{jobTitle}</div>
        <div>{companyName}</div>
        <div>{jobId}</div>
        <div>{location}</div>
        <div>{experience}</div>
        <div>{salary}</div>
        <div>{skills}</div>
        <div>{postedOn}</div>
        <div>{description}</div>
        <div>{aboutCompany}</div>
        <div>{source}</div>
      </div>
    </>
  );
};

export default JobDetail;
