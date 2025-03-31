import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Bugsnag from "@bugsnag/js";
import { toast } from "react-toastify";
import { FaSearch } from "react-icons/fa";

import { client } from "@axiosClient";
import FlexBox from "@common/UI/FlexBox";
import Navbar from "@common/Navbar";
import StocksGrid from "./StockGrid";
import { Display, Body1, H1 } from "@common/UI/Headings";
import { device } from "@common/UI/Responsive";

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
  const [filterType, setFilterType] = useState("all");
  const [stocksData, setStocksData] = useState([]);

  const fetchStockData = async type => {
    const urls = {
      gainers: "/default/gainers",
      losers: "/default/losers",
      all: "/default/topMcap",
    };

    try {
      const response = await client.get(urls[type]);
      setStocksData(response?.data?.results || []);
    } catch (error) {
      toast.error(`Failed to load ${type} stocks`);
      Bugsnag?.notify(error);
    }
  };

  useEffect(() => {
    fetchStockData(filterType);
  }, [filterType]);

  return (
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
      <SearchBar>
        <FaSearch color="#888" />
        <input
          type="text"
          placeholder="Search stocks, create screens.."
          style={{ flex: 1, border: "none", outline: "none" }}
        />
      </SearchBar>
      <FlexBox column align="center">
        <Display>Discover Trending Stocks</Display>
        <Body1 color="#687792">
          Explore the most popular stocks that investors are watching right now.
        </Body1>
      </FlexBox>
      <StocksGrid />
    </Container>
  );
};

export default Home;
