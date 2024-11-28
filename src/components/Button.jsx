import React from "react";
import "../styles/Button.css";

function Button({ text, handleClick }) {

  return (
    <button className="custom-button" onClick={handleClick}>
      {text}
    </button>
  );
}

export default Button;
