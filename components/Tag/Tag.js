import React from "react";
// import "./style.scss";

const Tag = ({ name, primaryColor, secondaryColor, textColor }) => {
  return (
    <div
      style={{
        backgroundColor: `${primaryColor}`,
        border: `2px solid ${secondaryColor}`,
        color: `${textColor}`,
      }}
      className="tagy"
    >
      {name}
    </div>
  );
};

export default Tag;
