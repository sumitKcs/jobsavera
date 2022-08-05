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
import jobImage from "../assests/topbar-image.jpg";
import NoticeBar from "./NoticeBar";

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
      <NoticeBar />
      <div className="job-container">
        {jobsData.length > 0 ? (
          jobsData.map((jobObj, index) => {
            const date = new Date(jobObj.postedOn);
            const day = date.getDate();
            const month = date.getMonth();
            const year = date.getFullYear();
            const postedDate = `${day}/${month + 1}/${year}`;
            console.log("extracted year: ", year);
            return (
              <div
                className="job-card"
                key={index}
                onClick={() => jobClickHandler(jobObj)}
              >
                {/* <FontAwesomeIcon  onClick={ favClickhandler} className= {favIconStyle} icon={solid('heart')}  /> */}

                <div className="job-image">
                  <img
                    src={jobImage}
                    style={{ height: "10vh", width: "8vw" }}
                    alt="job-image"
                  />
                </div>

                <div className="job-summary">
                  <div>
                    <div className="job-title"> {jobObj.jobTitle} </div>
                    <div className="company-name"> @{jobObj.companyName} </div>
                    <div className="salary">
                      <HiCurrencyRupee style={{ color: "green" }} /> &nbsp;
                      {jobObj.salary}
                    </div>
                    <div className="experience">
                      <FaUserGraduate style={{ color: "green" }} /> &nbsp;
                      {jobObj.qualification}
                    </div>
                    <div className="experience">
                      <MdOutlineWork style={{ color: "green" }} /> &nbsp;
                      {jobObj.experience}
                    </div>
                    <div className="location">
                      <ImLocation2 style={{ color: "green" }} /> &nbsp;
                      {jobObj.location}
                    </div>
                    <div className="posted-on">
                      <MdOutlineAccessTimeFilled style={{ color: "green" }} />{" "}
                      &nbsp; Posted on: {postedDate}
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
