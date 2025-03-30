import React from "react";
import styled from "styled-components";

const ProgressBarContainer = styled.div`
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
`;

const ProgressBarBox = styled.div`
  height: 3px;
  background: linear-gradient(90deg, #533A71 -91.07%, #C6426E 180%);

  transition: width 0.3s ease-in-out;
`;

const ProgressBar = ({ value }) => {
  return (
    <ProgressBarContainer>
      <ProgressBarBox style={{ width: `${value *100}%` }} />
    </ProgressBarContainer>
  );
};

export default ProgressBar;
