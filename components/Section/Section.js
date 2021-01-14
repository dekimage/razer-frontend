import React from "react";
import "./style.scss";

const Section = (props) => {
  const name = props.name;
  const description = props.description;
  const image = props.image;
  return (
    <div className="section">
      <div className="outer-wrapper">
        <div className="inner-wrapper">
          <div className="section-wrapper">
            <div className="section-textBox">
              <div className="section-header">{name}</div>
              <div className="section-subHeader">{description}</div>
            </div>

            <img className="section-image" src={image} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section;
