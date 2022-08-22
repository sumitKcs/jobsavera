import React from "react";
import { CssBaseline, Container, Paper, Box } from "@material-ui/core";
import StepperForm from "./StepperForm";
import "../assets/StepperForm.scss";

const Stepper = () => {
  return (
    <div className="stepperForm">
      <StepperForm />
    </div>
  );
};

export default Stepper;
