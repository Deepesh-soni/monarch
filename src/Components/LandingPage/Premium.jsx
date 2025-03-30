import React from "react";
import styled from "styled-components";
import FlexBox from "@Components/common/UI/FlexBox";
import { Body2, Display } from "@Components/common/UI/Headings";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  width: 100%;
`;
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 2.25rem;
  padding: 4rem;
`;
const Image = styled.img`
  width: 2.5rem;
  height: 2.5rem;
`;

const MainContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
`;
const Premium = () => {
  return (
    <Wrapper>
      <Display bold>Unlock Premium Perks</Display>
      <MainContainer>
        <Container>
          <FlexBox
            column
            rowGap="2.25rem"
            style={{ borderLeft: "1px solid #ccc" }}
            padding="0 4rem"
          >
            <FlexBox>
              <Body2 bold>Features</Body2>
            </FlexBox>
            <FlexBox columnGap="0.75rem" align="center">
              <Image src="/assets/landingPage/clientIcon.svg" />
              <Body2>Client</Body2>
            </FlexBox>
            <FlexBox columnGap="0.75rem" align="center">
              <Image src="/assets/landingPage/Bookingsicon.svg" />
              <Body2>Client</Body2>
            </FlexBox>
            <FlexBox columnGap="0.75rem" align="center">
              <Image src="/assets/landingPage/coupon.svg" />
              <Body2>Client</Body2>
            </FlexBox>
            <FlexBox columnGap="0.75rem" align="center">
              <Image src="/assets/landingPage/Services.svg" />
              <Body2>Client</Body2>
            </FlexBox>
            <FlexBox columnGap="0.75rem" align="center">
              <Image src="/assets/landingPage/Transaction.svg" />
              <Body2>Client</Body2>
            </FlexBox>
            <FlexBox columnGap="0.75rem" align="center">
              <Image src="/assets/landingPage/Shopsettings.svg" />
              <Body2>Client</Body2>
            </FlexBox>
            <FlexBox columnGap="0.75rem" align="center">
              <Image src="/assets/landingPage/Analytics.svg" />
              <Body2>Client</Body2>
            </FlexBox>
            <FlexBox columnGap="0.75rem" align="center">
              <Image src="/assets/landingPage/staffmanagement.svg" />
              <Body2>Client</Body2>
            </FlexBox>
            <FlexBox columnGap="0.75rem" align="center">
              <Image src="/assets/landingPage/Review.svg" />
              <Body2>Client</Body2>
            </FlexBox>
          </FlexBox>
        </Container>
      </MainContainer>
    </Wrapper>
  );
};

export default Premium;
