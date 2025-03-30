import React from "react";
import styled from "styled-components";
import FlexBox from "./FlexBox";
import { PRIMARY_900 } from "./colors";

const LoaderContainer = styled.div`
  width: ${({ width }) => width || "2rem"};
  height: ${({ height }) => height || "2rem"};
  border: 5px solid ${PRIMARY_900};
  border-bottom-color: transparent;
  border-radius: 50%;
  flex-shrink: 0;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Spinner = ({ width, height }) => (
  <LoaderContainer width={width} height={height} />
);

export default Spinner;
