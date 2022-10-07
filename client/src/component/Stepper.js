import React from "react";
import { CssBaseline, Container, Paper, Box } from "@material-ui/core";
import StepperForm from "./StepperForm";
import "../assets/StepperForm.scss";
import Navbar from "./Navbar";

const Stepper = () => {
  return (
    <>
      <Navbar />
      <div className="stepperForm">
        <StepperForm />
      </div>
    </>
  );
};

export default Stepper;
