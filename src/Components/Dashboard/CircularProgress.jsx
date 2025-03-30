import React from "react";
import styled from "styled-components";

import { ACCENT_100, ACCENT_300 } from "@common/UI/colors";

const ProgressContainer = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
`;

const ProgressCircle = styled.svg`
  width: 100%;
  height: 100%;
`;

const BackgroundCircle = styled.circle`
  fill: transparent;
  stroke: ${ACCENT_300};
  stroke-width: 8;
  stroke-dasharray: 314;
  stroke-dashoffset: 0;
`;

const ProgressFill = styled.circle`
  fill: transparent;
  stroke: ${ACCENT_100};
  stroke-width: 8;
  stroke-dasharray: 314;
  stroke-dashoffset: ${({ percent }) => 314 - (percent / 100) * 314};
  transition: stroke-dashoffset 0.3s ease-in-out;
`;

const ProgressText = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
  color: white;
`;

const CircularProgressBar = ({ percent }) => {
  return (
    <ProgressContainer>
      <ProgressCircle>
        <BackgroundCircle cx="50%" cy="50%" r="45" />
        <ProgressFill percent={percent} cx="50%" cy="50%" r="45" />
      </ProgressCircle>
      <ProgressText>{`${percent}%`}</ProgressText>
    </ProgressContainer>
  );
};

export default CircularProgressBar;
