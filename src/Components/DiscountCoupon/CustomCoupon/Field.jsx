import React from "react";
import styled from "styled-components";

import FlexBox from "@common/UI/FlexBox";
import { Body2, Caption } from "@common/UI/Headings";
import useMobileView from "@hooks/useMobileView";
import { device } from "@common/UI/Responsive";
import { ACCENT_800 } from "@common/UI/colors";

const Title = styled(FlexBox)`
  width: 100%;
  text-align: right;
  align-items: center;
  gap: 0.5rem;

  @media ${device.laptop} {
    flex-direction: column;
    align-items: end;
    max-width: 14vw;
  }
`;

const Tooltip = styled.div`
  position: absolute;
  bottom: 100%; /* Position the tooltip above the icon */
  left: 50%;
  transform: translateX(-50%);
  padding: 8px;
  background-color: ${ACCENT_800};
  font-size: 0.625rem;
  color: white;
  border-radius: 4px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  white-space: nowrap; /* Prevent text from wrapping */
`;

const TooltipContainer = styled(FlexBox)`
  position: relative;
  display: inline-block;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover ${Tooltip} {
    opacity: 1;
    visibility: visible;
  }
`;

const Image = styled.img`
  width: 0.9375rem;
  height: 0.9375rem;
`;

export const Field = ({
  title,
  children,
  infoIcon,
  optional,
  tooltipText,
  align = "center",
}) => {
  const isMobile = useMobileView();

  return (
    <FlexBox
      column={isMobile}
      align={isMobile ? "left" : align}
      columnGap="1rem"
    >
      <Title>
        <Body2 bold>{title} :</Body2>
        {optional && (
          <FlexBox justify="end">
            <Caption>(optional)</Caption>
          </FlexBox>
        )}
        {infoIcon && isMobile && (
          <TooltipContainer>
            <Image src="/assets/info.webp" alt="Info" />
            {tooltipText && <Tooltip>{tooltipText}</Tooltip>}
          </TooltipContainer>
        )}
      </Title>
      <FlexBox align={align} columnGap="0.75rem">
        {children}
        {infoIcon && !isMobile && (
          <TooltipContainer>
            <Image src="/assets/info.webp" alt="Info" />
            {tooltipText && <Tooltip>{tooltipText}</Tooltip>}
          </TooltipContainer>
        )}
      </FlexBox>
    </FlexBox>
  );
};
