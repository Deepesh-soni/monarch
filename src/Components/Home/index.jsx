import React from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

import FlexBox from "@common/UI/FlexBox";
import Navbar from "@common/Navbar";
import StocksGrid from "./StockGrid";
import { Display, Body1, H1 } from "@common/UI/Headings";
import { device } from "@common/UI/Responsive";
import SearchableDropdown from "@Components/common/UI/Search/SearchDropdownCmp";
import { useRouter } from 'next/router';

const Wrapper = styled.div`
  background: url("/assets/home/page-bg.png");
  background-position: center;
`;

const Container = styled(FlexBox)`
  flex-direction: column;
  padding: 0 1rem;
  align-items: center;
  gap: 0.5rem;

  @media ${device.laptop} {
    flex-direction: column;
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
  font-size: 91.31px;
  line-height: 100%;
  letter-spacing: -5%;
  text-align: center;
`;

const SearchBar = styled(FlexBox)`
  width: 806px;
  gap: 16px;
  border-radius: 18px;
  border: 1px solid #687792;
  padding: 12px 16px;
`;

const TextWrapper = styled(FlexBox)`
  max-width: 695px;
`;

const Home = () => {

  const router = useRouter();

  const handleSearchSelect = (value) => {
    router.push(`/stocks/${value.fqn}`);
  }

  return (
    <Wrapper>
      <Container>
        <Navbar />
        <FlexBox column align="center">
          <Heading>Discover & Analyze</Heading>
          <FlexBox>
            <img
              src="/assets/home/stocks.svg"
              alt="Stocks"
              width={304}
              height={108}
            />
            <Heading>like never before</Heading>{" "}
          </FlexBox>
        </FlexBox>
        <TextWrapper>
          <H1 textAlign="center">
            Advanced stock screening, real-time analysis, and powerful tools to
            make informed investment decisions
          </H1>
        </TextWrapper>
        <div style={{ width: "100%", maxWidth: "806px" }}>
          <SearchableDropdown width="100%" onChange={handleSearchSelect} />
        </div>
        <FlexBox column align="center">
          <Display>Discover Trending Stocks</Display>
          <Body1 color="#687792">
            Explore the most popular stocks that investors are watching right
            now.
          </Body1>
        </FlexBox>
        <StocksGrid />
      </Container>
    </Wrapper>
  );
};

export default Home;
