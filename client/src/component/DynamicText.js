import React from "react";
import { useGlobalContext } from "../context/context";

const DynamicText = ({ text }) => {
  const { dynamicText } = useGlobalContext();

  return text ? (
    <div className="trending-text"> {text}</div>
  ) : (
    <div className="trending-text"> {dynamicText}</div>
  );
};

export default DynamicText;
