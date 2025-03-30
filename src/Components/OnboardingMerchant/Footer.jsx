import React from "react";
import styled from "styled-components";

import FlexBox from "@common/UI/FlexBox";
import { Button } from "@common/UI/Buttons";
import { ACCENT_0, ACCENT_200 } from "@common/UI/colors";

const BottomBar = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
  background-color: ${ACCENT_0};
`;

const ProgressBar = styled.div`
  height: 0.5rem;
  background: ${ACCENT_200};
`;

const ProgressIndicator = styled.div`
  width: ${({ percentage }) => `${percentage * 100}%`};
  height: 0.5rem;
  border-radius: 0 0.875rem 0.875rem 0;
  background: var(
    --gradient,
    linear-gradient(180deg, #c6426e 0%, #533a71 100%)
  );
  transition: all 600ms ease-out;
`;

const TOTAL_STEPS = 17 + 1;

export const Footer = ({
  handleNext,
  handleBack,
  pageNum,
  nextCtaLabel,
  disableNext,
}) => (
  <BottomBar>
    <ProgressBar>
      <ProgressIndicator percentage={pageNum / TOTAL_STEPS} />
    </ProgressBar>
    <FlexBox padding="1rem 1.5rem" justify="space-between">
      <div>
        {pageNum > 1 && (
          <Button
            textDecoration="Underline"
            textCta
            secondary
            onClick={handleBack}
          >
            Go Back
          </Button>
        )}
      </div>
      {pageNum >= 1 && pageNum <= TOTAL_STEPS && (
        <Button onClick={() => handleNext()} disabled={disableNext}>
          {nextCtaLabel}
        </Button>
      )}
    </FlexBox>
  </BottomBar>
);

export default Footer;
