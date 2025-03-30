import React from "react";
import styled from "styled-components";

import FlexBox from "@common/UI/FlexBox";
import { Body1, H3 } from "@common/UI/Headings";
import { Display } from "@common/UI/Headings";
import { PRIMARY_900, ACCENT_0 } from "@common/UI/colors";
import SlideContainer from "@common/SlideContainer";
import { device } from "@common/UI/Responsive";
import Footer from "./Footer";

const Wrapper = styled(FlexBox)`
  width: 100%;
  height: calc(100% - 4.8519rem);
  flex-direction: column;
  padding: 1rem;
  column-gap: 4rem;

  @media ${device.laptop} {
    align-items: center;
    flex-direction: row;
  }
`;

const LeftSection = styled(FlexBox)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const RightSection = styled(FlexBox)`
  flex: 1;
  flex-direction: column;
`;

const Span = styled.span`
  display: inline;
  @media ${device.laptop} {
    display: block;
  }
`;

const Bold = styled.b`
  display: inline;
  @media ${device.laptop} {
    display: block;
  }
`;

const StepNumberContainer = styled(FlexBox)`
  height: auto;
  background-color: ${PRIMARY_900};
  border-radius: 0.75rem;
  padding: 1rem;
  align-items: center;
  justify-content: center;
  min-width: 3.5rem;
`;

const GetStarted = ({ pageNum, handleNextPage, slideDirection }) => (
  <>
    <SlideContainer slideDirection={slideDirection}>
      <Wrapper>
        <LeftSection>
          <Display textAlign="start">
            It&apos;s easy to get
            <Span> started With</Span> <Bold>Pamprazzi</Bold>
          </Display>
        </LeftSection>
        <RightSection justify="center" rowGap="2rem">
          <FlexBox columnGap="0.75rem">
            <StepNumberContainer>
              <H3 color={ACCENT_0}>1.</H3>
            </StepNumberContainer>
            <FlexBox
              column
              backgroundColor="#F6F6F6"
              padding="25px 16px"
              borderRadius="12px"
              width="80%"
            >
              <H3 bold>Tell us about your Place</H3>
              <Body1>
                Introduce your salon to us! Share a few details about your
                establishment.
              </Body1>
            </FlexBox>
          </FlexBox>
          <FlexBox columnGap="0.75rem">
            <StepNumberContainer>
              <H3 color={ACCENT_0}>2.</H3>
            </StepNumberContainer>
            <FlexBox
              column
              backgroundColor="#F6F6F6"
              padding="25px 16px"
              borderRadius="12px"
              width="80%"
            >
              <H3 bold>What services do you offer?</H3>
              <Body1>
                Let us know the services you provide, from haircuts to spa
                treatments.
              </Body1>
            </FlexBox>
          </FlexBox>
          <FlexBox columnGap="0.75rem">
            <StepNumberContainer>
              <H3 color={ACCENT_0}>3.</H3>
            </StepNumberContainer>
            <FlexBox
              column
              backgroundColor="#F6F6F6"
              padding="25px 16px"
              borderRadius="12px"
              width="80%"
            >
              <H3 bold>Go Live!</H3>
              <Body1>
                You&apos;re almost there! Just a few more steps to get your
                salon up and running
              </Body1>
            </FlexBox>
          </FlexBox>
        </RightSection>
      </Wrapper>
    </SlideContainer>
    <Footer
      handleNext={handleNextPage}
      pageNum={pageNum}
      nextCtaLabel="Let’s Begin!"
    />
  </>
);

export default GetStarted;
