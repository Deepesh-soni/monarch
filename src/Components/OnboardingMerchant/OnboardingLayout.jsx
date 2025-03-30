import React from "react";
import styled from "styled-components";

import FlexBox from "@common/UI/FlexBox";
import { Display, H3 } from "@common/UI/Headings";
import { device } from "@common/UI/Responsive";
import SlideContainer from "@common/SlideContainer";

const Wrapper = styled(FlexBox)`
  width: 100%;
  height: calc(100% - 4.8519rem);
  flex-direction: column;
  padding: ${({ padding }) => (padding ? padding : "1rem 1.5rem")};
  gap: 1rem;
  align-items: center;

  @media ${device.laptop} {
    max-width: 60rem;
    margin: 0 auto;
    gap: 1.5rem;
  }
`;

const Title = styled(Display)`
  text-align: left;
  @media ${device.laptop} {
    text-align: center;
  }
`;

const SubTitle = styled(H3)`
  text-align: left;
  @media ${device.laptop} {
    text-align: center;
  }
`;

export const OnboardingLayout = ({
  children,
  slideDirection,
  title,
  subTitle,
  padding,
}) => (
  <SlideContainer slideDirection={slideDirection}>
    <Wrapper padding={padding}>
      <FlexBox column rowGap="0.5rem">
        <Title bold>{title}</Title>
        {subTitle && <SubTitle>{subTitle}</SubTitle>}
      </FlexBox>
      {children}
    </Wrapper>
  </SlideContainer>
);
