import React, { Component, useState } from "react";
import Navbar from "./Navbar";
import "../assets/Admin.css";
import { useForm } from "react-hook-form";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import axios from "axios";
import stateCityJson from "../helper/stateCityList";
import { MdTurnedIn } from "react-icons/md";
import { CoursesList } from "../helper/CoursesList";

const Admin = () => {
  const [stateVal, setStateVal] = useState("");
  const [cityVal, setCityVal] = useState("");
  const [fixedSalary, setFixedSalary] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [jobDescriptionState, setJobDescriptionState] = useState(
    EditorState.createEmpty()
  );
  const [aboutCompanyState, setAboutCompanyState] = useState(
    EditorState.createEmpty()
  );
  const [aboutCompanyVal, setAboutCompanyVal] = useState("");
  const [jobDescriptionVal, setJobDescriptionVal] = useState("");

  const onSubmit = async (data) => {
    // let JobDescriptionVal = convertToRaw(jobDescriptionState.getCurrentContent());
    // JobDescriptionVal = editorVal.blocks[0].text;
    // let aboutCompanyVal = convertToRaw(aboutCompanyState.getCurrentContent());
    // aboutCompanyVal = aboutCompanyVal.blocks[0].text;
    // if (editorVal.length > 0) {
    // } else {
    //   setDescriptionError(true);
    // }
    // let JobDescriptionVal = draftToHtml(
    //   convertToRaw(jobDescriptionState.getCurrentContent())
    // );
    // console.log("about company", aboutCompanyVal);
    // console.log("about job:", jobDescriptionVal);
    data.description = jobDescriptionVal;
    data.aboutCompany = aboutCompanyVal;
    data.state = stateVal;
    data.city = cityVal;
    console.log(data);
    Object.keys(data).forEach((key) => {
      if (data[key] === "") {
        delete data[key];
      }
    });
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URI}/api/job/add`,
        data
      );
      setIsPublished(true);
      console.log("data sent:", data);
    } catch (err) {
      console.log(err);
    }
  };

  const jobDescriptionHandler = (jobDescriptionState) => {
    setJobDescriptionState(jobDescriptionState);
    const val = draftToHtml(
      convertToRaw(jobDescriptionState.getCurrentContent())
    );
    setJobDescriptionVal(val);
    // console.log(
    //   draftToHtml(convertToRaw(jobDescriptionState.getCurrentContent()))
    // );
  };
  const aboutCompanyHandler = (aboutCompanyState) => {
    setAboutCompanyState(aboutCompanyState);
    const val = draftToHtml(
      convertToRaw(aboutCompanyState.getCurrentContent())
    );
    setAboutCompanyVal(val);
    // console.log(
    //   draftToHtml(convertToRaw(aboutCompanyState.getCurrentContent()))
    // );
  };

  const statehandler = (e) => {
    setStateVal(e.target.value);
    console.log(e.target.value);
  };
  const cityHandler = (e) => {
    setCityVal(e.target.value);
    console.log(e.target.value);
  };
  const UGC = CoursesList.filter((item, index) => {
    if (item.Course.charAt(0) === "B" || item.Course.charAt(0) === "b") {
      return item.Course;
    }
  });
  const PGC = CoursesList.filter((item, index) => {
    if (item.Course.charAt(0) === "M" || item.Course.charAt(0) === "m") {
      return item.Course;
    }
  });
  console.log("UGC", UGC);
  console.log("PGC", PGC);
  return (
    <>
      <Navbar />
      <div className="form-container">
        <div className="form-card">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label
                htmlFor="exampleFormControlInput1 admin-label"
                className="admin-label"
              >
                Job Title
              </label>
              <br />
              {errors.jobTitle && (
                <span className="input-error-message">
                  Please Enter Job Title
                </span>
              )}
              <input
                type="text"
                name="jobTitle"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Software Development Engineer"
                {...register("jobTitle", { required: true })}
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="exampleFormControlInput1 admin-label"
                className="admin-label"
              >
                Company Name
              </label>
              <br />
              {errors.companyName && (
                <span className="input-error-message">
                  Please Enter Company Name
                </span>
              )}
              <input
                name="companyName"
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Amazon"
                {...register("companyName", { required: true })}
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="exampleFormControlInput1 admin-label"
                className="admin-label"
              >
                Location
              </label>
              <br />
              {errors.location && (
                <span className="input-error-message">
                  Please Enter Location
                </span>
              )}
              <select
                name="state"
                className="form-control"
                id="exampleFormControlInput1"
                value={stateVal}
                onChange={statehandler}
              >
                <option value="" disabled={true}>
                  ---- Select State ----
                </option>
                {Object.keys(stateCityJson).map((state, idx) => {
                  return (
                    <>
                      <option value={state} key={idx}>
                        {state}
                      </option>
                    </>
                  );
                })}
              </select>
              <select
                name="city"
                className="form-control"
                id="exampleFormControlInput1"
                value={cityVal}
                onChange={cityHandler}
              >
                <option value="" disabled={true}>
                  ---- Select City ----
                </option>
                {stateVal ? (
                  stateCityJson[stateVal].map((city, idx) => {
                    return (
                      <>
                        <option key={idx} value={city}>
                          {city}
                        </option>
                      </>
                    );
                  })
                ) : (
                  <option value="" disabled={true}>
                    Choose a state to get their cities
                  </option>
                )}
              </select>
            </div>
            <div className="form-group">
              <label
                htmlFor="exampleFormControlInput1 admin-label"
                className="admin-label"
              >
                Salary
              </label>
              <span className="fixedSalary">
                <input
                  type="checkbox"
                  name="fixedSalaryCheckBox"
                  value={fixedSalary}
                  onChange={() => setFixedSalary(!fixedSalary)}
                />{" "}
                <label
                  htmlFor="fixedSalaryCheckBox"
                  className="fixedSalaryLabel"
                >
                  Fixed Salary
                </label>
              </span>
              {fixedSalary && (
                <input
                  name="fixedSalary"
                  type="text"
                  defaultValue={""}
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="fixed amount in INR"
                  {...register("fixedSalary", { required: true })}
                />
              )}
              {!fixedSalary && (
                <>
                  <input
                    name="minSalary"
                    type="text"
                    defaultValue={""}
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="minimum amount in INR"
                    {...register("minSalary", { required: true })}
                  />
                  <input
                    name="maxSalary"
                    type="text"
                    defaultValue={""}
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="maximum amount in INR"
                    {...register("maxSalary", { required: true })}
                  />
                </>
              )}
              <div className="SalaryType">
                <input
                  type="radio"
                  id="html"
                  name="annuallySalary"
                  value="annually"
                  className="annuallySalary"
                  checked={true}
                  {...register("annuallySalary", { required: true })}
                />{" "}
                <label for="html">annually</label>
                <input
                  type="radio"
                  id="html"
                  name="monthlySalary"
                  value="monthly"
                  className="monthlySalary"
                  {...register("monthlySalary", { required: true })}
                />{" "}
                <label for="html">monthly</label>
              </div>
            </div>
            <div className="form-group">
              <label
                htmlFor="exampleFormControlInput1 admin-label"
                className="admin-label"
              >
                Minimum Qualification
              </label>
              <br />
              {errors.qualification && (
                <span className="input-error-message">
                  Please Enter Qualification
                </span>
              )}
              <select
                name="qualification"
                className="form-control"
                id="exampleFormControlSelect1"
                {...register("qualification", { required: true })}
              >
                <option value={""}>---</option>
                <option value={"10th"}>10th</option>
                <option value={"12th/diploma"}>12th/diploma</option>
                <option value={"batchelor"}>Graduation</option>
                <option value="master">Post Graduation</option>
              </select>
            </div>

            <div className="form-group">
              <label
                htmlFor="exampleFormControlInput1 admin-label"
                className="admin-label"
              >
                Experience
              </label>
              <br />
              {errors.experience && (
                <span className="input-error-message">
                  Please Enter Experience
                </span>
              )}
              <input
                name="experience"
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="0-1 years"
                {...register("experience", { required: true })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlInput1" className="admin-label">
                Required Skills
              </label>
              <input
                name="skills"
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="excel, powerpoint"
                {...register("skills")}
              />
            </div>

            <div className="form-group ">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="admin-label"
              >
                Job Description
              </label>
              <div className="job-description-editor">
                <Editor
                  editorState={jobDescriptionState}
                  wrapperClassName="wrapper-className-job"
                  editorClassName="editor-className-job"
                  toolbarClassName="toolbar-className-job"
                  onEditorStateChange={jobDescriptionHandler}
                  placeholder="Write about Job here......"
                  required={true}
                />
              </div>
            </div>
            <div className="form-group">
              <label
                htmlFor="exampleFormControlTextarea1 "
                className="admin-label"
              >
                About Comapny
              </label>
              <br />
              {errors.aboutCompany && (
                <span className="input-error-message">
                  Please Enter About Company
                </span>
              )}
              <div className="about-company-editor">
                <Editor
                  editorState={aboutCompanyState}
                  wrapperClassName="wrapper-className-company"
                  editorClassName="editor-className-company"
                  toolbarClassName="toolbar-className-company"
                  onEditorStateChange={aboutCompanyHandler}
                  placeholder="Write about company here......"
                  required={true}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlInput1" className="admin-label">
                Job Source
              </label>
              <br />
              {errors.source && (
                <span className="input-error-message">
                  Please Enter Job Source
                </span>
              )}
              <input
                name="source"
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Banglore"
                {...register("source", { required: true })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlInput1" className="admin-label">
                Apply Link
              </label>
              <br />
              {errors.applyLink && (
                <span className="input-error-message">
                  Please Enter Apply Link
                </span>
              )}
              <input
                name="applyLink"
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="https://careers.google.com/software-engineer"
                {...register("applyLink", { required: true })}
              />
            </div>
            {isPublished ? (
              <button type="submit" className="btn btn-success">
                Published
              </button>
            ) : (
              <button type="submit" className="btn btn-secondary">
                Publish
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Admin;
