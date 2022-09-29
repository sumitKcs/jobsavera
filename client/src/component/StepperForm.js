import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  OutlinedInput,
  Checkbox,
  ListItemText,
  useTheme,
  Box,
  Chip,
  FormControlLabel,
  FormGroup,
  Radio,
  FormLabel,
  RadioGroup,
  TextareaAutosize,
} from "@material-ui/core";
import "../assets/StepperForm.scss";
import Navbar from "./Navbar";
import stateCityJson from "../helper/stateCityList";
import { SkillsList } from "../helper/SkillsList";
import { CoursesList } from "../helper/CoursesList";
import axios from "axios";

const getSteps = () => {
  return [
    "Basic Details",
    "Additional Details",
    "About company",
    "Source & Link",
  ];
};
// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

const StepperForm = () => {
  const theme = useTheme();
  const { innerHeight, innerWidth } = window;
  const [activeStep, setActiveStep] = useState(0);
  const [jobTitle, setJobTitle] = useState("");
  const [noOfOpenings, setNoOfOpenings] = useState("");
  const [state, setstate] = useState("");
  const [city, setcity] = useState("");
  const [qualificationVal, setqualificationVal] = useState("");
  const [courseVal, setCourseVal] = useState([]);
  const [permanentWFH, setPermanentWFH] = useState(false);
  const [fixedSalary, setFixedSalary] = useState(false);
  const [fixedSalaryAmount, setFixedSalaryAmount] = useState(0);
  const [maximumSalaryAmount, setMaximumSalaryAmount] = useState(0);
  const [MinimumSalaryAmount, setMinimumSalaryAmount] = useState(0);
  const [salaryPeriod, setSalaryPeriod] = useState("annually");
  const [experienceVal, setExperienceVal] = useState("");
  const [maximumExperience, setMaximumExperience] = useState(0);
  const [minimumExperience, setMinimumExperience] = useState(0);
  const [requiredSkills, setRequiredSkills] = useState("");
  const [jobDescription, setjobDescription] = useState("");
  const [aboutCompany, setaboutCompany] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [source, setSource] = useState("");
  const [applyLink, setApplyLink] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [jobDescriptionState, setJobDescriptionState] = useState(
    EditorState.createEmpty()
  );
  const [aboutCompanyState, setAboutCompanyState] = useState(
    EditorState.createEmpty()
  );

  const steps = getSteps();

  let UGC = CoursesList.filter((item, index) => {
    if (item.Course.charAt(0) === "B" || item.Course.charAt(0) === "b") {
      return item;
    }
  });

  UGC.unshift({ Course: "All graduates" });
  UGC = UGC.map((item) => {
    return item.Course;
  });

  let PGC = CoursesList.filter((item, index) => {
    if (item.Course.charAt(0) === "M" || item.Course.charAt(0) === "m") {
      return item;
    }
  });
  PGC.unshift({ Course: "All post-graduates" });
  PGC = PGC.map((item) => {
    return item.Course;
  });
  //console.log("PGC", PGC);

  const handleState = (e) => {
    setstate(e.target.value);
  };

  const handleCity = (e) => {
    setcity(e.target.value);
  };

  const handlequalificationVal = (e) => {
    setqualificationVal(e.target.value);
    console.log(e.target.value);
  };
  const handleCourse = (event) => {
    const {
      target: { value },
    } = event;
    setCourseVal(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleSalaryPeriod = (e) => {
    setSalaryPeriod(e.target.value);
  };

  const handleExperience = (e) => {
    setExperienceVal(e.target.value);
  };
  const jobDescriptionHandler = (jobDescriptionState) => {
    setJobDescriptionState(jobDescriptionState);
    const val = draftToHtml(
      convertToRaw(jobDescriptionState.getCurrentContent())
    );
    setjobDescription(val);
    // console.log(
    //   draftToHtml(convertToRaw(jobDescriptionState.getCurrentContent()))
    // );
  };

  const aboutCompanyHandler = (aboutCompanyState) => {
    setAboutCompanyState(aboutCompanyState);
    const val = draftToHtml(
      convertToRaw(aboutCompanyState.getCurrentContent())
    );
    setaboutCompany(val);
    // console.log(
    //   draftToHtml(convertToRaw(aboutCompanyState.getCurrentContent()))
    // );
  };

  const handleNext = async () => {
    setActiveStep(activeStep + 1);
    if (activeStep == steps.length - 1) {
      let jobLocation;
      let salary;
      let experience;
      let qualification;
      if (qualificationVal === "batchelors" || qualificationVal === "masters") {
        qualification = courseVal;
        qualification = qualification.toString();
      }
      if (permanentWFH) {
        jobLocation = "WFH";
      } else {
        jobLocation = city + ", " + state;
      }
      if (fixedSalary) {
        salary = fixedSalaryAmount;
      } else {
        salary = MinimumSalaryAmount + "-" + maximumSalaryAmount;
      }
      if (experienceVal === "fresher") {
        experience = "fresher";
      } else {
        experience = minimumExperience + "-" + maximumExperience;
      }
      const formData = {
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
      };
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_SERVER_URI}/api/job/add`,
          formData
        );
        setIsPublished(true);
        console.log("data sent:", formData);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep(activeStep - 1);
  };

  const getStepsContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div className="form-content-columns">
            <div className="form-content-col1">
              <div className="single-column-container">
                <div className="single-input-container">
                  <TextField
                    className="job-title text-input"
                    id="jobTitle"
                    label="Job Title"
                    variant="outlined"
                    size="small"
                    fullWidth
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="ex: software development engineer"
                    name="jobTitle"
                    required
                  />
                </div>
              </div>
              <div className="single-column-container">
                <div className="single-input-container">
                  <TextField
                    className="openings text-input"
                    id="openings"
                    label="No. of Openings"
                    variant="outlined"
                    size="small"
                    fullWidth
                    onChange={(e) => setNoOfOpenings(e.target.value)}
                    placeholder="eg: 4"
                    name="openings"
                    required
                  />
                </div>
              </div>
              <div className="checkbox-input-container">
                <span className="label-text">Salary in ₹: </span>
                <span className="checkbox-container">
                  <input
                    className="checkBox"
                    name="salary"
                    type="checkbox"
                    value={fixedSalary}
                    onChange={() => setFixedSalary(!fixedSalary)}
                  />
                  <label htmlFor="salary" className="checkbox-label">
                    Fixed Salary
                  </label>
                </span>
              </div>

              <div className="single-column-container with-label">
                <span className="multiple-input-container">
                  {fixedSalary && (
                    <TextField
                      className="fixed-salary text-input"
                      id="fixedSalary"
                      label="Fixed. salary in ₹"
                      variant="outlined"
                      size="small"
                      fullWidth
                      onChange={(e) => setFixedSalaryAmount(e.target.value)}
                      placeholder="ex: 500000"
                      name="fixedSalary"
                      required
                    />
                  )}
                  {!fixedSalary && (
                    <>
                      <TextField
                        className="min-salary text-input"
                        id="minSalary"
                        label="Min. salary"
                        variant="outlined"
                        size="small"
                        fullWidth
                        onChange={(e) => setMinimumSalaryAmount(e.target.value)}
                        placeholder="ex: 500000"
                        name="minSalary"
                        required
                      />
                      <TextField
                        className="max-salary text-input"
                        id="maxSalary"
                        label="Max. salary"
                        variant="outlined"
                        size="small"
                        fullWidth
                        onChange={(e) => setMaximumSalaryAmount(e.target.value)}
                        placeholder="ex: 700000"
                        name="maxSalary"
                        required
                      />
                    </>
                  )}
                </span>
              </div>
              <div className="single-column-container">
                <span className="multiple-input-container salary-period">
                  <FormControl>
                    <RadioGroup
                      row
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={salaryPeriod}
                      onChange={handleSalaryPeriod}
                    >
                      <FormControlLabel
                        value="annually"
                        control={<Radio />}
                        label="annually"
                        defaultChecked
                      />
                      <FormControlLabel
                        value="monthly"
                        control={<Radio />}
                        label="monthly"
                      />
                    </RadioGroup>
                  </FormControl>
                </span>
              </div>
            </div>
            <div className="form-content-col2">
              <div className="checkbox-input-container">
                <span className="label-text">Location: </span>
                <span className="checkbox-container">
                  <input
                    className="checkbox"
                    name="wfh"
                    type="checkbox"
                    value={permanentWFH}
                    onChange={() => setPermanentWFH(!permanentWFH)}
                  />
                  <label htmlFor="wfh" className="checkbox-label">
                    Work from home
                  </label>
                </span>
              </div>
              {!permanentWFH && (
                <div className="single-column-container">
                  <span className="multiple-input-container">
                    <FormControl variant="standard">
                      <InputLabel id="State-label">State</InputLabel>
                      <Select
                        className="location-state select-input"
                        labelId="State-label"
                        id="State"
                        value={state}
                        onChange={handleState}
                        label="State"
                        placeholder="Select a State"
                        required
                      >
                        <MenuItem value="" disabled={true}>
                          <em>Select a state</em>
                        </MenuItem>
                        {Object.keys(stateCityJson).map((state, idx) => {
                          return (
                            <MenuItem value={state} key={idx}>
                              {state}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </span>
                  <span className="multiple-input-container">
                    <FormControl variant="standard">
                      <InputLabel id="city-label">City</InputLabel>
                      <Select
                        className="location-city select-input"
                        labelId="city-label"
                        id="location-city"
                        value={city}
                        onChange={handleCity}
                      >
                        <MenuItem value="" disabled={true}>
                          <em>Select a city</em>
                        </MenuItem>
                        {state ? (
                          stateCityJson[state].map((city, idx) => {
                            return (
                              <MenuItem key={idx} value={city}>
                                {city}
                              </MenuItem>
                            );
                          })
                        ) : (
                          <MenuItem value="" disabled={true}>
                            Choose a state to get their cities
                          </MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  </span>
                </div>
              )}
              <div className="single-column-container">
                <span className="multiple-input-container">
                  <FormControl variant="standard">
                    <InputLabel id="qualificationVal-label">
                      qualificationVal
                    </InputLabel>
                    <Select
                      className="qualificationVal select-input"
                      labelId="qualificationVal-label"
                      id="qualificationVal"
                      value={qualificationVal}
                      onChange={handlequalificationVal}
                      label="qualificationVal-label"
                      placeholder="Select minimum qualificationVal"
                      required
                    >
                      <MenuItem value="" disabled={true}>
                        <em>Select minimum qualificationVal</em>
                      </MenuItem>
                      <MenuItem value="10th">10th</MenuItem>
                      <MenuItem value="12th/diploma">12th/diploma</MenuItem>
                      <MenuItem value="batchelors">Graduation</MenuItem>
                      <MenuItem value="masters">Post Graduation</MenuItem>
                    </Select>
                  </FormControl>
                </span>
                <span className="multiple-input-container">
                  {qualificationVal &&
                    (qualificationVal === "batchelors" ||
                      qualificationVal === "masters") && (
                      <FormControl>
                        <InputLabel id="course-label">Course</InputLabel>
                        <Select
                          className="course select-input"
                          labelId="course-label"
                          id="course"
                          multiple
                          value={courseVal}
                          onChange={handleCourse}
                          renderValue={(selected) => selected.join(", ")}
                          label="Course"
                        >
                          <MenuItem value="" disabled={true}>
                            <em>Select eligible courses</em>
                          </MenuItem>

                          {qualificationVal === "batchelors" &&
                            UGC.map((course, index) => {
                              return (
                                <MenuItem key={index} value={course}>
                                  <Checkbox
                                    checked={courseVal.indexOf(course) > -1}
                                  />
                                  <ListItemText primary={course} />
                                </MenuItem>
                              );
                            })}
                          {qualificationVal === "masters" &&
                            PGC.map((course, index) => {
                              return (
                                <MenuItem key={course} value={course}>
                                  <Checkbox
                                    checked={courseVal.indexOf(course) > -1}
                                  />
                                  <ListItemText primary={course} />
                                </MenuItem>
                              );
                            })}
                        </Select>
                      </FormControl>
                    )}
                </span>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="form-content-columns-container">
            <div className="full-width-column job-description">
              <FormLabel id="work-experience">Job Description</FormLabel>
              <div className="job-description-editor">
                <Editor
                  editorState={jobDescriptionState}
                  wrapperClassName="wrapper-class-job"
                  editorClassName="editor-class-job"
                  toolbarClassName="toolbar-class-job"
                  onEditorStateChange={jobDescriptionHandler}
                  placeholder="Write about Job here......"
                  required={true}
                  toolbar={{
                    options: ["inline", "list", "textAlign", "history", "link"],
                    inline: { inDropdown: true },
                    list: { inDropdown: true },
                    textAlign: { inDropdown: true },
                    link: { inDropdown: true },
                    history: { inDropdown: true },
                  }}
                />
              </div>
            </div>
            <div className="form-content-columns">
              <div className="form-content-col1">
                <div>
                  <div className="single-column-container">
                    <div className="single-input-container experience">
                      <FormControl>
                        <FormLabel id="work-experience">
                          Work Experinece
                        </FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby="work-experience"
                          name="work-experience"
                          value={experienceVal}
                          onChange={handleExperience}
                        >
                          <FormControlLabel
                            value="fresher"
                            control={<Radio />}
                            label="Fresher"
                          />
                          <FormControlLabel
                            value="experienced"
                            control={<Radio />}
                            label="Experienced"
                          />
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </div>
                  <div className="single-column-container">
                    <span className="multiple-input-container">
                      {experienceVal === "experienced" && (
                        <>
                          <TextField
                            className="min-experience number-input"
                            id="min-experience"
                            label="Min. exp. in yrs"
                            variant="outlined"
                            size="small"
                            fullWidth
                            onChange={(e) =>
                              setMinimumExperience(e.target.value)
                            }
                            placeholder="ex: 500000"
                            name="min-experience"
                            type="number"
                            InputProps={{
                              inputProps: {
                                max: 20,
                                min: 0,
                              },
                            }}
                            required
                          />
                          <TextField
                            className="max-experience number-input"
                            id="max-experience"
                            label="Max. exp. in yrs"
                            variant="outlined"
                            size="small"
                            fullWidth
                            onChange={(e) =>
                              setMaximumExperience(e.target.value)
                            }
                            placeholder="ex: 700000"
                            name="max-experience"
                            type="number"
                            InputProps={{
                              inputProps: {
                                max: 20,
                                min: 0,
                              },
                            }}
                            required
                          />
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <div className="form-content-col2">
                <div className="single-column-container">
                  <div className="multiple-input-container">
                    <TextField
                      className="max-experience text-input"
                      id="required-skills"
                      label="required skills"
                      variant="outlined"
                      size="small"
                      fullWidth
                      onChange={(e) => setRequiredSkills(e.target.value)}
                      placeholder="ex: ms-word, telecalling, software developer"
                      name="max-experience"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="form-content-columns-container">
            <div className="about-company-container">
              <TextField
                className="company-name"
                id="company-name"
                label="company name"
                variant="outlined"
                placeholder="company name"
                margin="normal"
                name="jobTitle"
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <div className="full-width-column">
                <FormLabel id="about-company">About Company</FormLabel>
                <div className="about-company-editor">
                  <Editor
                    id="about-company"
                    editorState={aboutCompanyState}
                    wrapperClassName="wrapper-class-job"
                    editorClassName="editor-class-job"
                    toolbarClassName="toolbar-class-job"
                    onEditorStateChange={aboutCompanyHandler}
                    placeholder="Write about company here......"
                    required={true}
                    toolbar={{
                      options: [
                        "inline",
                        "list",
                        "textAlign",
                        "history",
                        "link",
                      ],
                      inline: { inDropdown: true },
                      list: { inDropdown: true },
                      textAlign: { inDropdown: true },
                      link: { inDropdown: true },
                      history: { inDropdown: true },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <>
            <TextField
              label="Source"
              variant="outlined"
              placeholder="ex: careers.amazon.in"
              fullWidth
              onChange={(e) => setSource(e.target.value)}
              margin="normal"
            />
            <TextField
              label="Apply Link"
              variant="outlined"
              placeholder="ex: https://careers.amazon.in/software-developer"
              fullWidth
              onChange={(e) => setApplyLink(e.target.value)}
              margin="normal"
            />
          </>
        );
      default:
        return;
    }
  };

  //   console.log("window", innerHeight, innerWidth);
  const stepperProps = {};
  stepperProps.alternativeLabel = true;
  if (innerWidth < 500) {
    stepperProps.orientation = "vertical";
    if (stepperProps.alternativeLabel) {
      delete stepperProps.alternativeLabel;
    }
  }

  return (
    <>
      <Navbar />

      <div className="stepperform-container">
        {activeStep === steps.length ? (
          <Typography variant="h3" align="center">
            Thank You
          </Typography>
        ) : (
          <>
            <Stepper
              alternativeLabel
              activeStep={activeStep}
              className="stepper"
            >
              {steps.map((step, index) => {
                return (
                  <Step key={index} className="step-container">
                    <StepLabel className="step-label">{step}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            <div className="stepper-form-content-container">
              <div className="stepper-form-content">
                <form>{getStepsContent(activeStep)}</form>
              </div>
              <div className="stepper-form-buttons-container">
                <div className="stepper-form-button">
                  <Button
                    className="button"
                    variant="contained"
                    color="primary"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                  >
                    back
                  </Button>
                </div>
                <div className="stepper-form-button">
                  <Button
                    className="button"
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                  >
                    {" "}
                    {activeStep === steps.length - 1 ? "finish" : "next"}
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default StepperForm;
