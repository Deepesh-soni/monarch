import React from "react";
import { H4, H5 } from "@common/Typography";
import { Medium } from "@common/Paragraph";
import { Typography } from "antd";
import { DateTime } from "luxon";
import { BiLinkExternal } from "react-icons/bi";
import styled from "styled-components";
import { device } from "@common/UI/Responsive";

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  @media ${device.laptop} {
    width: auto;
  }
`;

const RightContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-top: 0.5rem;

  @media ${device.laptop} {
    flex-direction: column;
    align-items: flex-end;
    margin-top: 0;
  }
`;

const HeaderRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media ${device.laptop} {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

const ExchangeLinksRow = styled.div`
  margin-top: 4px;
  display: flex;
  gap: 16px;
`;

const ExchangeLink = styled.a`
  display: inline-flex;
  align-items: center;
  color: #687792;
  font-size: 0.875rem;
  text-decoration: none;
  gap: 4px;
  &:hover {
    text-decoration: underline;
  }
`;

const formatValue = (value, show = false) => {
    return show
        ? `₹ ${new Intl.NumberFormat("en-IN").format(value?.toFixed(2))}`
        : `${new Intl.NumberFormat("en-IN").format(value?.toFixed(2))}`;
};

const slugify = text =>
    text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[\s\W-]+/g, "-");

const StockHeader = ({ stock }) => {
    const changeValue = parseFloat(stock.change || "0");
    const changeColor = changeValue >= 0 ? "green" : "red";

    const ist = DateTime.fromISO(stock.lastRefreshed).setZone("Asia/Kolkata");
    const datePart = ist.toFormat("dd LLL");
    const timePart = ist
        .toFormat("h:mm a")
        .toLowerCase()
        .replace("am", "a.m.")
        .replace("pm", "p.m.");
    const lastRefreshedLabel = `${datePart} ${timePart}`;

    return (
        <HeaderRow>
            <LeftContainer>
                <H5 bold>{stock.companyName}</H5>
                <ExchangeLinksRow>
                    {stock.web_url && stock.web_url && (
                        <ExchangeLink
                            href={stock.web_url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span>{stock.web_url}</span>
                            <BiLinkExternal size={14} />
                        </ExchangeLink>
                    )}
                    {stock.bseListed && stock.bseCode && (
                        <ExchangeLink
                            href={`https://www.bseindia.com/stock-share-price/${slugify(
                                stock.companyName
                            )}/${stock.companyShortName}/${stock.bseCode}/`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span>BSE: {stock.bseCode}</span>
                            <BiLinkExternal size={14} />
                        </ExchangeLink>
                    )}
                    {stock.nseListed && stock.nseSymbol && (
                        <ExchangeLink
                            href={`https://www.nseindia.com/get-quotes/equity?symbol=${stock.nseSymbol}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span>NSE: {stock.nseSymbol}</span>
                            <BiLinkExternal size={14} />
                        </ExchangeLink>
                    )}
                </ExchangeLinksRow>
            </LeftContainer>
            <RightContainer>
                <H4 bold>{formatValue(stock.price, true)}</H4>
                <Medium style={{ color: changeColor, fontWeight: 500, fontSize: 14 }}>{stock.change}%</Medium>
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                    {lastRefreshedLabel}
                </Typography.Text>
            </RightContainer>
        </HeaderRow>
    );
};

export default StockHeader; 