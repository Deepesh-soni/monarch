import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Bugsnag from "@bugsnag/js";
import { toast } from "react-toastify";
import { FaSearch } from "react-icons/fa";

import { client } from "@axiosClient";
import FlexBox from "@common/UI/FlexBox";
import Navbar from "@common/Navbar";
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

const FilterOption = styled(Body1)`
  cursor: pointer;
  ${({ active }) =>
    active &&
    css`
      background: #ffffff;
      color: #142c8e;
      padding: 6px 20px;
    `}
`;

const StockGrid = styled(FlexBox)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  background: #ffffff;
  width: 100%;
  padding: 20px;
  border-radius: 10px;
`;

const StockCard = styled(FlexBox)`
  display: flex;
  flex-direction: column;
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  gap: 8px;
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
      console.log("stocksData", response);
      debugger;
      setStocksData(response?.data?.results || []);
    } catch (error) {
      toast.error(`Failed to load ${type} stocks`);
      Bugsnag?.notify(error);
    }
  };

  useEffect(() => {
    fetchStockData(filterType);
  }, [filterType]);

  console.log("stocksData", stocksData);

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
      <FlexBox
        columnGap="12px"
        backgroundColor="#ebf0f4"
        padding="6px 18px"
        borderRadius="8px"
        align="center"
      >
        {["all", "gainers", "losers"].map(type => (
          <FilterOption
            key={type}
            active={filterType === type}
            onClick={() => setFilterType(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </FilterOption>
        ))}
      </FlexBox>
      <StockGrid>
        {stocksData?.slice(0, 4).map((stock, index) => (
          <StockCard key={index}>
            <FlexBox align="center">
              <img
                src="/reliance.svg"
                width="48px"
                height="48px"
                alt="Stock Logo"
              />
              <FlexBox column>
                <Body1>{stock.companyName}</Body1>
                <Body1 color="#687792">{stock.exchange}</Body1>
              </FlexBox>
            </FlexBox>
            <FlexBox align="center" justify="space-between">
              <FlexBox column>
                <Body1>Market Cap</Body1>
                <Body1>{stock.mcap}</Body1>
              </FlexBox>
              <FlexBox column>
                <Body1>Volume</Body1>
                <Body1>{stock.volume}</Body1>
              </FlexBox>
            </FlexBox>
          </StockCard>
        ))}
      </StockGrid>
    </Container>
  );
};

export default Home;
