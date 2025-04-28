import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import FlexBox from "@common/UI/FlexBox";
import StocksGrid from "./StockGrid";
import { Display } from "@common/UI/Headings";
import { device } from "@common/UI/Responsive";
import SearchableDropdown from "@Components/common/UI/Search/SearchDropdownCmp";
import { H6, H2 } from "../common/Typography";
import { Medium } from "../common/Paragraph";
import Layout from "@layout/HomePageLayout";

const Wrapper = styled.div`
  background: url("/assets/home/page-bg.png");
  background-position: center;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled(FlexBox)`
  flex-direction: column;
  padding: 1rem;
  align-items: center;
  gap: 1.5rem;
  width: 100%;

  @media ${device.laptop} {
    justify-content: space-between;
    margin: auto;
    gap: 2.5rem;
    width: 86.67%;
    max-width: 75rem;
    padding-bottom: 150px;
  }
`;

const Heading = styled(Display)`
  font-family: Montserrat;
  font-weight: 500;
  font-size: 27px;
  line-height: 120%;
  letter-spacing: -2%;
  text-align: center;
  padding: 0 1rem;

  @media ${device.tablet} {
    font-size: 48px;
  }

  @media ${device.laptop} {
    font-size: 91.31px;
  }
`;

const StyledStock = styled.span`
  background: linear-gradient(to right, #009CDE, #142C8E);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: 600;
`;

const SubTitle = styled(H6)`
   @media ${device.laptop} {
      font-size: 24px;
      font-weight: 400;
  }
`;

const TextWrapper = styled(FlexBox)`
  max-width: 90%;
  text-align: center;
  padding: 0 1rem;

  @media ${device.laptop} {
    max-width: 695px;
  }
`;

const Home = () => {
  const router = useRouter();

  const handleSearchSelect = (value) => {
    router.push(`/stocks/${value.fqn}`);
  };

  return (
    <Wrapper>
      <Layout noBg>
        <Container>
          <FlexBox column align="center">
            <Heading>Discover &amp; Analyze</Heading>
            <Heading style={{ margin: 0 }}>
              <StyledStock>Stocks</StyledStock> like never before
            </Heading>
          </FlexBox>

          <TextWrapper>
            <SubTitle textAlign="center">
              Advanced stock screening, real-time analysis, and powerful tools
              to make informed investment decisions
            </SubTitle>
          </TextWrapper>
          <div style={{ width: "100%", maxWidth: "806px", padding: "0 1rem" }}>
            <SearchableDropdown width="100%" onChange={handleSearchSelect} />
          </div>
          <FlexBox column align="center">
            <H2 textAlign="center">Discover Trending Stocks</H2>
            <Medium color="#687792" textAlign="center">
              Explore the most popular stocks that investors are watching right now.
            </Medium>
          </FlexBox>
          <StocksGrid />
        </Container>
      </Layout>
    </Wrapper>
  );
};

export default Home;
