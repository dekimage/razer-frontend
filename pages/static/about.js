import React from "react";
import defaultPage from "../../hocs/defaultPage";
import "../../styles/pages/about.scss";

const About = () => {
  return (
    <div className="">
      <div className="visualBox">
        <div className="visualBox--title">
          A new approach to <span className="um">Self-Improvement</span>.
        </div>
        <div className="visualBox--text">New. Improved. Gamified.</div>
        <div className="visualBox--image">
          <img height="300px" src="http://localhost:1337/test-feature.png" />
        </div>
      </div>

      <div className="visualBox">
        <div className="visualBox--title">
          Extracted from the <span className="um">World's Best</span> minds.
        </div>
        <div className="visualBox--text">
          +150 Books. +20 Courses. +200 Videos.
        </div>
        <div className="visualBox--image">
          <img height="300px" src="http://localhost:1337/test-feature.png" />
        </div>
      </div>

      <div className="visualBox">
        <div className="visualBox--title">
          Get the top <span className="um">1% Wisdom</span>. In{" "}
          <span className="um">99% less Time</span>.
        </div>
        <div className="visualBox--text">
          Compressed. Squeezed. Value Packed.
        </div>
        <div className="visualBox--image">
          <img height="300px" src="http://localhost:1337/test-feature.png" />
        </div>
      </div>

      <div className="visualBox">
        <div className="visualBox--title">
          You don't change by <span className="um">Reading</span>. You change by{" "}
          <span className="um">Doing</span>.
        </div>
        <div className="visualBox--text">Practical. Actionable. Visible.</div>
        <div className="visualBox--image">
          <img height="300px" src="http://localhost:1337/test-feature.png" />
        </div>
      </div>

      <div className="visualBox">
        <div className="visualBox--title">
          Cut 10 years of your learning curve.
          {/* 0% fat. Protein rich ideas. */}
        </div>
        <div className="visualBox--text">0% Fat. 0% Waste. 0% Junk.</div>
        <div className="visualBox--image">
          <img height="300px" src="http://localhost:1337/test-feature.png" />
        </div>
      </div>

      <div className="visualBox">
        <div className="visualBox--title">
          Abstract to Concrete is <span className="um">Hard</span>. Concrete to
          Abstract is <span className="um">Easy</span>.
        </div>
        <div className="visualBox--text">Examples. Cases. Metaphores.</div>
        <div className="visualBox--image">
          <img height="300px" src="http://localhost:1337/test-feature.png" />
        </div>
      </div>

      <div className="visualBox">
        <div className="visualBox--title">
          <span className="um">Boring</span> takes energy.{" "}
          <span className="um">Fun</span> gives energy.
        </div>
        <div className="visualBox--text">Leveling. Quests. Spells.</div>
        <div className="visualBox--image">
          <img height="300px" src="http://localhost:1337/test-feature.png" />
        </div>
      </div>

      <div className="visualBox">
        <div className="visualBox--title">
          Learn <span className="um">10 Minutes</span> per day.{" "}
          <span className="um">Repeat</span>.
        </div>
        <div className="visualBox--text">
          1% better or worse makes all the difference.
        </div>
        <div className="visualBox--image">
          <img height="300px" src="http://localhost:1337/test-feature.png" />
        </div>
      </div>
    </div>
  );
};

export default defaultPage(About);
