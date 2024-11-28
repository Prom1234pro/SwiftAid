import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import "../styles/SelectCountry.css";

function LayoutContainer({headingText, children}) {
  
  return (
    <div className="layout-container">
      <button className="back-button">←</button>
      <h1>{headingText}</h1>
      <>
      {children}
      </>
      </div>
  );
}

export default LayoutContainer;
