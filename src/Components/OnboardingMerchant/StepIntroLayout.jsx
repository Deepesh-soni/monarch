import React from "react";
import styled from "styled-components";

import FlexBox from "@common/UI/FlexBox";
import { H3, Display } from "@components/common/UI/Headings";
import { device } from "@common/UI/Responsive";
import SlideContainer from "@common/SlideContainer";
import Footer from "./Footer";

const Wrapper = styled(FlexBox)`
  width: 100%;
  height: calc(100% - 4.8519rem);
  flex-direction: column;
  padding: 1rem 1.5rem;
  gap: 4rem;

  @media ${device.laptop} {
    width: 86.67%;
    max-width: 75rem;
    gap: 0;
    padding: 0;
    margin: 0 auto;
    flex-direction: row;
    align-items: center;
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media ${device.laptop} {
    flex: 1;
  }
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  @media ${device.laptop} {
    align-items: flex-end;
  }
`;

const StyledImg = styled.img`
  width: 100%;
  max-width: 18rem;
  height: auto;
  margin: auto;

  @media ${device.laptop} {
    margin: unset;
    max-width: 23.4375rem;
  }
`;

const StepIntroLayout = ({
  pageNum,
  handleNextPage,
  handlePrevPage,
  slideDirection,
  stepInfo,
}) => {
  const { step, title, description, imageUrl } = stepInfo;

  return (
    <>
      <SlideContainer slideDirection={slideDirection}>
        <Wrapper>
          <LeftSection>
            <H3>{step}</H3>
            <Display bold>{title}</Display>
            <H3>{description}</H3>
          </LeftSection>
          <RightSection>
            <StyledImg src={imageUrl} alt={title} />
          </RightSection>
        </Wrapper>
      </SlideContainer>
      <Footer
        handleNext={handleNextPage}
        handleBack={handlePrevPage}
        pageNum={pageNum}
        nextCtaLabel="Next"
      />
    </>
  );
};

export default StepIntroLayout;
