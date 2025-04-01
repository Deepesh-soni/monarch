import React from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

import FlexBox from "@common/UI/FlexBox";
import Navbar from "@common/NavBar";
import StocksGrid from "./StockGrid";
import { Display, Body1, H1 } from "@common/UI/Headings";
import { device } from "@common/UI/Responsive";
import SearchableDropdown from "@Components/common/UI/Search/SearchDropdownCmp";
import { useRouter } from "next/router";
import { H6, H2 } from "../common/Typography";
import { Medium } from "../common/Paragraph";

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
  padding: 0 1rem;

  @media ${device.tablet} {
    font-size: 48px;
  }

  @media ${device.laptop} {
    font-size: 91.31px;
    text-align: center;
  }
`;

const SearchBar = styled(FlexBox)`
  width: 90%;
  max-width: 806px;
  gap: 16px;
  border-radius: 18px;
  border: 1px solid #687792;
  padding: 12px 16px;
`;

const TextWrapper = styled(FlexBox)`
  max-width: 90%;
  text-align: center;
  padding: 0 1rem;

  @media ${device.laptop} {
    max-width: 695px;
  }
`;

const Image = styled.img`
  width: auto;
  max-width: 120px;
  height: auto;

  @media ${device.tablet} {
    max-width: 80px;
  }

  @media ${device.laptop} {
    max-width: 304px;
    height: 108px;
  }
`;

const Home = () => {
  const router = useRouter();

  const handleSearchSelect = value => {
    router.push(`/stocks/${value.fqn}`);
  };

  return (
    <Wrapper>
      <Navbar />
      <Container>
        <FlexBox column align="center">
          <Heading>Discover & Analyze</Heading>
          <FlexBox>
            <Image src="/assets/home/stocks.svg" alt="Stocks" />
            <Heading>like never before</Heading>
          </FlexBox>
        </FlexBox>
        <TextWrapper>
          <H6 textAlign="center">
            Advanced stock screening, real-time analysis, and powerful tools to
            make informed investment decisions
          </H6>
        </TextWrapper>
        <div style={{ width: "100%", maxWidth: "806px", padding: "0 1rem" }}>
          <SearchableDropdown width="100%" onChange={handleSearchSelect} />
        </div>
        <FlexBox column align="center">
          <H2 textAlign="center">Discover Trending Stocks</H2>
          <Medium color="#687792" textAlign="center">
            Explore the most popular stocks that investors are watching right
            now.
          </Medium>
        </FlexBox>
        <StocksGrid />
      </Container>
    </Wrapper>
  );
};

export default Home;
