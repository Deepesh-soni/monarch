import React, { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import Bugsnag from "@bugsnag/js";
import { toast } from "react-toastify";

import { client } from "@axiosClient";
import FlexBox from "@common/UI/FlexBox";
import { Body1 } from "@common/UI/Headings";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: 200px 0; }
`;

const FilterOption = styled(Body1)`
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  padding: 6px 20px;
  border-radius: 6px;
  ${({ active }) =>
    active
      ? css`
          background: #ffffff;
          color: #142c8e;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        `
      : css`
          &:hover {
            background: rgba(255, 255, 255, 0.5);
          }
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
  animation: ${fadeIn} 0.5s ease-in-out;
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

const SkeletonBox = styled.div`
  height: 20px;
  width: 100%;
  background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite linear;
  border-radius: 4px;
`;

const StocksGrid = () => {
  const [filterType, setFilterType] = useState("all");
  const [stocksData, setStocksData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStockData = async type => {
    setLoading(true);
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
    setLoading(false);
  };

  useEffect(() => {
    fetchStockData(filterType);
  }, [filterType]);

  return (
    <>
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
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <StockCard key={index}>
                <SkeletonBox style={{ height: "48px", width: "48px" }} />
                <SkeletonBox />
                <SkeletonBox />
                <SkeletonBox />
              </StockCard>
            ))
          : stocksData?.slice(0, 4).map((stock, index) => (
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
    </>
  );
};

export default StocksGrid;
