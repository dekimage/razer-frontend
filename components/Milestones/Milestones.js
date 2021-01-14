import React from "react";
import Link from "next/link";
import CardPopover from "../../components/Reactstrap/CardPopover";
import "./style.scss";

import iconLock1 from "../../assets/fonts/lock1.svg";
const Milestones = (props) => {
  const level = props.level;
  const isFullView = props.isFullView;
  const milestones = props.milestones;
  return (
    <>
      <div className="milestones">
        <div className="flex-row align-center justify-between pb1 mb1">
          <div className="text-header">
            {isFullView ? "All Rewards" : "Upcoming Milestones"}
          </div>
          {!isFullView && (
            <Link href="/rewards">
              <a>
                <div className="progressRealms__viewMore">
                  <div className="pr5"> View All</div>
                  {/* <ion-icon name="chevron-forward-outline"></ion-icon> */}
                  <ion-icon name="arrow-forward-outline"></ion-icon>
                </div>
              </a>
            </Link>
          )}
        </div>

        <div>
          {milestones.map((milestone, i) => {
            return (
              <div className="milestone" key={i}>
                <div className="milestone-requirement">
                  Level {milestone.level}
                  {level > milestone.level ? (
                    <div className="milestone-image completed">&#10004;</div>
                  ) : (
                    <div className="milestone-image">
                      <img src={iconLock1} style={{ width: "40px" }} />
                    </div>
                  )}
                </div>
                <div className="milestone-rewards">
                  {milestone.rewards.map((reward, i) => {
                    return (
                      <div className="milestone-rewards-item" key={i}>
                        <img
                          // src={`http://localhost:1337${realmsCardsCount[17].logo}`}
                          style={{ width: "50px" }}
                        />
                        <CardPopover id={reward.id} name={reward.name} />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Milestones;
