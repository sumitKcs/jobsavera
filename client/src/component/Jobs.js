import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Pagination } from "react-bootstrap";
import { useGlobalContext } from "../context/context";
import { ImLocation2 } from "react-icons/im";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { HiCurrencyRupee } from "react-icons/hi";
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

      <div className="movie-container">
        {jobsData.length > 0 ? (
          jobsData.map((jobObj, index) => {
            return (
              <div
                className="movie-card"
                key={index}
                onClick={() => jobClickHandler(jobObj)}
              >
                {/* <FontAwesomeIcon  onClick={ favClickhandler} className= {favIconStyle} icon={solid('heart')}  /> */}

                <div className="movie-image">
                  <div>
                    <div> {jobObj.jobTitle} </div>
                    <div> {jobObj.companyName} </div>
                    <div>
                      <HiCurrencyRupee style={{ color: "green" }} />
                      {jobObj.salary}{" "}
                    </div>
                    <div> {jobObj.experience} </div>
                    <div>
                      <ImLocation2 style={{ color: "green" }} />
                      {jobObj.location}{" "}
                    </div>
                    <div>
                      <MdOutlineAccessTimeFilled style={{ color: "green" }} />
                      Posted on: {jobObj.postedOn.slice(0, 10)}{" "}
                    </div>
                  </div>
                </div>

                <div className="movie-title">
                  {/* <p className='card-text movie-title'>{jobObj.original_title}</p> */}
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
