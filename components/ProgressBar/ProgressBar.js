import React from "react";
import "./style.scss";
const ProgressBar = ({ progress }) => {
  // Color testing
  {
    /* let color;
  switch (progress) {
    case progress <= 25:
      color = "#1c8696";
      break;
    case progress <= 50:
      color = "#5ebd6d";
      break;
    case progress <= 75:
      color = "#ffd255";
      break;
    case progress <= 100:
      color = "#fa385e";
      break;
    default:
      color = "#ffd255";
  } */
  }

  return (
    <div className="progressbarEmpty">
      <div
        className="progressBarFilled"
        style={{ "--progress": progress }}
      ></div>
    </div>
  );
};

export default ProgressBar;
