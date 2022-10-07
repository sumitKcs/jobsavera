import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Pagination } from "react-bootstrap";
import { useGlobalContext } from "../context/context";
import { ImLocation2 } from "react-icons/im";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { HiCurrencyRupee } from "react-icons/hi";
import { MdOutlineWork } from "react-icons/md";
import { FaUserGraduate } from "react-icons/fa";
import jobImage from "../assets/topbar-image.jpg";
import NoticeBar from "./NoticeBar";
import "../assets/Job.scss";

const Jobs = () => {
  const { jobsData, dynamicText } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const jobClickHandler = async (jobObj) => {
    const id = jobObj.jobId;

    setIsLoading(true);
    navigate(`/id/${id}`);
  };

  console.log("Jobsdata: ", jobsData);
  return (
    <>
      <div className="trending-text"> {dynamicText}</div>
      <div className="job-container">
        {jobsData.length > 0 ? (
          jobsData.map((jobObj, index) => {
            const date = new Date(jobObj.postedOn);
            const day = date.getDate();
            const month = date.getMonth();
            const year = date.getFullYear();
            const postedDate = `${day}/${month + 1}/${year}`;
            console.log("extracted year: ", year);
            let jobTitle = jobObj.jobTitle;
            jobTitle = jobTitle.charAt(0).toUpperCase() + jobTitle.slice(1);
            let companyName = jobObj.companyName;
            companyName =
              companyName.charAt(0).toUpperCase() + companyName.slice(1);
            let qualification = jobObj.qualification;
            qualification = qualification.split(",");
            if (qualification.length > 2) {
              qualification =
                qualification[0] +
                "," +
                qualification[1] +
                "," +
                qualification[2] +
                "...";
            }

            return (
              <div
                className="job-card"
                key={index}
                onClick={() => jobClickHandler(jobObj)}
              >
                {/* <FontAwesomeIcon  onClick={ favClickhandler} className= {favIconStyle} icon={solid('heart')}  /> */}

                {/* <div className="job-image-container">
                  <img
                    className="job-image"
                    src={jobImage}
                    style={{ height: "40%", width: "90%" }}
                    alt="job-image"
                  />
                </div> */}

                <div className="job-summary">
                  <div className="job-title"> {jobTitle} </div>
                  <div className="company-name"> @{companyName} </div>
                  <div className="horizontal-line-container">
                    <hr className="horizontal-line"></hr>{" "}
                  </div>
                  <div className="job-summary-column">
                    <div className="job-summary-left">
                      <div className="salary">
                        <HiCurrencyRupee style={{ color: "green" }} /> &nbsp;
                        {jobObj.salary}
                      </div>
                      <div className="experience">
                        <FaUserGraduate style={{ color: "green" }} /> &nbsp;
                        {qualification}
                      </div>
                      <div className="experience">
                        <MdOutlineWork style={{ color: "green" }} /> &nbsp;
                        {jobObj.experience} years
                      </div>
                    </div>
                    <div className="job-summary-right">
                      <div className="location">
                        <ImLocation2 style={{ color: "green" }} /> &nbsp;
                        {jobObj.city + "," + jobObj.state}
                      </div>
                      <div className="posted-on">
                        <MdOutlineAccessTimeFilled style={{ color: "green" }} />{" "}
                        &nbsp; Posted on: {postedDate}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="fav-no-data">
            <span className="no-fav-msg">No Data Found</span>
          </div>
        )}
      </div>
    </>
  );
};

export default Jobs;
