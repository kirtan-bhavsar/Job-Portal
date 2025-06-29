import React from "react";
import Wrapper from "../assets/wrappers/JobInfo.js";

const JobInfo = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className="job-icon">{icon}</span>
      <span className="job-text">{text}</span>
    </Wrapper>
  );
};

export default JobInfo;
