import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Bugsnag from "@bugsnag/js";
import { toast } from "react-toastify";

import { client } from "@axiosClient";
import FlexBox from "@common/UI/FlexBox";
import { Body1 } from "@common/UI/Headings";

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

const StocksGrid = () => {
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
    </>
  );
};

export default StocksGrid;
