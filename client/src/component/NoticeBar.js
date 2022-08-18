import React from "react";
import { useGlobalContext } from "../context/context";
import { ImLocation2 } from "react-icons/im";

const NoticeBar = () => {
  let { jobsData } = useGlobalContext();
  jobsData = jobsData.slice(0, 10);

  console.log("jobs notics board:", jobsData);

  return (
    <>
      <div className="trending-text notice-board">
        <marquee>
          {jobsData.length > 0
            ? jobsData.map((item, index) => {
                const {
                  jobId,
                  jobTitle,
                  companyName,
                  qualification,
                  experience,
                  location,
                  salary,
                  skills,
                  description,
                  aboutCompany,
                  postedOn,
                  source,
                  applyLink,
                } = item;

                return (
                  <a href={`/id/${jobId}`} key={index}>
                    <span>
                      ✅{jobTitle} @ {companyName} <ImLocation2 /> {location}
                    </span>
                  </a>
                );
              })
            : ""}
        </marquee>
      </div>
    </>
  );
};

export default NoticeBar;
