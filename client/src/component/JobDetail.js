import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { ImLocation2 } from "react-icons/im";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { HiCurrencyRupee } from "react-icons/hi";
import { MdOutlineWork } from "react-icons/md";
import { FaUserGraduate } from "react-icons/fa";
import { AiOutlineBackward } from "react-icons/ai";
import TopBar from "./TopBar";
import NoticeBar from "./NoticeBar";
import Search from "./Search";
import DynamicText from "./DynamicText";
import { useGlobalContext } from "../context/context";

const JobDetail = () => {
  const [singlejobDetails, setSingleJobDetails] = useState([]);
  const [errorResponse, setErrorResponse] = useState(false);
  const navigate = useNavigate();
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
        if (res.data.Success) {
          const jobData = res.data.job;
          setSingleJobDetails(jobData);
        } else {
          setErrorResponse(true);
        }

        console.log("checking id response", res);
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
    qualification,
    experience,
    state,
    city,
    salary,
    skills,
    description,
    aboutCompany,
    postedOn,
    source,
    applyLink,
  } = singlejobDetails;

  const date = new Date(postedOn);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const postedDate = `${day}/${month + 1}/${year}`;
  return (
    <>
      <Navbar />
      <TopBar />
      <NoticeBar />
      <Search />
      <DynamicText text="Job Description" />
      <div className="jobDetail-container">
        {errorResponse ? (
          <div className="fav-no-data">
            <span className="no-fav-msg">No Data Found</span>
          </div>
        ) : (
          <>
            <div className="back-button-container">
              <AiOutlineBackward
                className="back-button"
                onClick={() => navigate(-1)}
              />
            </div>
            <div className="jobDetail-card">
              <div className="jobDetail-content">
                <div className="jobDetail-jobId ">Job Id: {jobId}</div>
                <div className="jobDetail-jobTitle ">{jobTitle}</div>
                <div className="jobDetail-companyName ">{companyName}</div>
                <div className="jobDetails-icon-description-container">
                  <div className="jobDetails-icon-description-leftBox">
                    <div className="jobDetail-location jobContents">
                      <ImLocation2 className="jobDetail-icons" /> &nbsp;
                      {city === "N/A" ? state : `${city} (${state})`}
                    </div>
                    <div className="jobDetail-qualification jobContents">
                      <FaUserGraduate className="jobDetail-icons" />
                      &nbsp; {qualification}
                    </div>
                    <div className="jobDetail-experience jobContents">
                      <MdOutlineWork className="jobDetail-icons" />
                      &nbsp; {experience}
                    </div>
                  </div>
                  <div className="jobDetails-icon-description-rightBox">
                    <div className="jobDetail-salary jobContents">
                      <HiCurrencyRupee className="jobDetail-icons" />
                      &nbsp; {salary}
                    </div>
                    <div className="jobDetail-postedOn jobContents">
                      <MdOutlineAccessTimeFilled className="jobDetail-icons" />{" "}
                      &nbsp; Posted on: {postedDate}
                    </div>
                  </div>
                </div>
                <div className="jobDetail-text-description-container">
                  <div className="jobDetail-heading ">Required Skills</div>
                  <hr className="horizontal-line"></hr>
                  <div className="jobDetail-skills text-description">
                    {skills}
                  </div>
                  <div className="jobDetail-heading ">Job Description</div>
                  <hr className="horizontal-line"></hr>
                  <div
                    className="jobDetail-description text-description"
                    dangerouslySetInnerHTML={{ __html: description }}
                  ></div>
                  <div className="jobDetail-heading">About Company</div>
                  <hr className="horizontal-line"></hr>
                  <div
                    className="jobDetail-aboutCompany text-description"
                    dangerouslySetInnerHTML={{ __html: aboutCompany }}
                  ></div>
                  <div className="jobDetail-heading ">Source</div>
                  <hr className="horizontal-line"></hr>
                  <div className="jobDetail-source text-description">
                    {source}
                  </div>
                  <div className="jobDetail-applyLink-container ">
                    <a
                      className="jobDetail-applyButton-link"
                      href={applyLink}
                      target="_blank"
                    >
                      <button
                        className="jobDetail-applyButton btn btn-info"
                        type="button"
                      >
                        Apply
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default JobDetail;
