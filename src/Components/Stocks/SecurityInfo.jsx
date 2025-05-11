import React from "react";
import { Button } from "antd";
import { Body1 } from "@common/UI/Headings";
import { H5 } from "@common/Typography";
import { FaArrowsRotate } from "react-icons/fa6";
import { CiExport } from "react-icons/ci";
import styled from "styled-components";
import { device } from "@common/UI/Responsive";
import FlexBox from "@common/UI/FlexBox";

const SecuritySection = styled(FlexBox)`
  width: 100%;
  border: 1px solid #3c3c3c;
  border-radius: 12px;
  padding: 1rem;
  flex-direction: column;
  background: #fff;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
  margin-top: 1rem;
  @media ${device.laptop} {
    column-gap: 6rem;
    grid-template-columns: repeat(2, 1fr);
  }
`;

const GridItem = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SecurityHeader = styled(FlexBox)`
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;

  @media ${device.laptop} {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 0;
  }
`;

const ButtonGroup = styled(FlexBox)`
  column-gap: 16px;
  flex-wrap: wrap;
`;

const formatValue = (value, show = false) => {
    return show
        ? `₹ ${new Intl.NumberFormat("en-IN").format(value?.toFixed(2))}`
        : `${new Intl.NumberFormat("en-IN").format(value?.toFixed(2))}`;
};

const SecurityInfo = ({ stock, isLoggedIn, onWatchlistClick, onCompareClick }) => {
    return (
        <SecuritySection id="security">
            <SecurityHeader>
                <H5 bold>Security Information</H5>
                <ButtonGroup align="center">
                    {isLoggedIn && (
                        <Button outline onClick={onWatchlistClick}>
                            <FaArrowsRotate size={18} />
                            <Body1>Add to Watchlist</Body1>
                        </Button>
                    )}
                    <Button outline onClick={onCompareClick}>
                        <CiExport />
                        <Body1>Compare</Body1>
                    </Button>
                </ButtonGroup>
            </SecurityHeader>
            <GridContainer>
                <GridItem>
                    <Body1 bold>ISIN</Body1>
                    <Body1>{stock.isin}</Body1>
                </GridItem>
                <GridItem>
                    <Body1 bold>Today's High</Body1>
                    <Body1>{formatValue(stock.high, true)}</Body1>
                </GridItem>
                <GridItem>
                    <Body1 bold>Open Price</Body1>
                    <Body1>{formatValue(stock.open, true)}</Body1>
                </GridItem>
                <GridItem>
                    <Body1 bold>Today's Low</Body1>
                    <Body1>{formatValue(stock.low, true)}</Body1>
                </GridItem>
                <GridItem>
                    <Body1 bold>Market Cap</Body1>
                    <Body1>{formatValue(stock.mcap, true)} Cr.</Body1>
                </GridItem>
                <GridItem>
                    <Body1 bold>Volume</Body1>
                    <Body1>{formatValue(stock.volume)}</Body1>
                </GridItem>
                <GridItem>
                    <Body1 bold>Sector</Body1>
                    <Body1>{stock.sectorName}</Body1>
                </GridItem>
                <GridItem>
                    <Body1 bold>Trade Category</Body1>
                    <Body1>{stock.bseGroup}</Body1>
                </GridItem>
                <GridItem>
                    <Body1 bold>Industry</Body1>
                    <Body1>{stock.industryName}</Body1>
                </GridItem>
            </GridContainer>
        </SecuritySection>
    );
};

export default SecurityInfo; 