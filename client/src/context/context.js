import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [jobsData, setJobsData] = useState([]);
  const [toShow, setToShow] = useState("default");
  const [dynamicText, setDynamicText] = useState("Openings");

  const ALL_JOBS_URI = `${process.env.REACT_APP_SERVER_URI}/api/job/get`;
  console.log(ALL_JOBS_URI);
  useEffect(() => {
    if (toShow === "default") {
      try {
        const getJobData = async () => {
          const res = await axios.get(ALL_JOBS_URI);
          setJobsData(res.data.jobs);
          console.log("total jobs:", res.data.total, "jobs: ", res.data.jobs);
        };

        getJobData();
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  return (
    <AppContext.Provider value={{ jobsData, dynamicText }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
