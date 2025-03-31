import React from "react";
import styled from "styled-components";
import Link from "next/link";
import FlexBox from "@common/UI/FlexBox";
import { Body1, Support, H1 } from "@common/UI/Headings";
import { device } from "@common/UI/Responsive";
import { IoMdAdd } from "react-icons/io";
import { CiExport } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import { FaArrowRightArrowLeft, FaArrowsRotate } from "react-icons/fa6";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  padding: 0 1rem;
  align-items: center;
  gap: 0.5rem;

  @media ${device.laptop} {
    justify-content: space-between;
    margin: auto;
    gap: 2.5rem;
    width: 86.67%;
  }
`;

const NavContainer = styled(FlexBox)`
  width: 100%;
  justify-content: space-between;
`;

const Hr = styled.hr`
  width: 100%;
  border: 1px solid #ebf0f4;
`;

const SecuritySection = styled(FlexBox)`
  width: 100%;
  border: 1px solid #3c3c3c;
  border-radius: 12px;
  padding: 0.5rem;
  flex-direction: column;
`;
const ActionButton = styled(FlexBox)`
  border: 1.5px solid #142c8e;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  gap: 0.5rem;
  border-radius: 0.8rem;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1rem;
  font-size: 1rem;
  column-gap: 5rem;
`;

const GridItem = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Section = styled(FlexBox)`
  width: 100%;
  justify-content: space-between;
  column-gap: 1rem;
`;

const BusinessSectionLeft = styled(FlexBox)`
  border: 1px solid #3c3c3c;
  width: 60%;
  border-radius: 12px;
  padding: 0.5rem;
  flex-direction: column;
  gap: 1rem;
`;

const BusinessSectionRight = styled(FlexBox)`
  border: 1px solid #3c3c3c;
  width: 40%;
  border-radius: 12px;
  padding: 0.5rem;
  flex-direction: column;
  gap: 1rem;
`;

const TableContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  margin-top: 2rem;
`;

const Table = styled.div`
  width: 100%;
  border: 1px solid #3c3c3c;
  border-radius: 12px;
  padding: 1rem;
  background: #fff;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 0.75rem;
  text-align: left;
  font-weight: bold;
  border-right: 2px solid;
`;

const TableRow = styled.tr``;

const TableCell = styled.td`
  padding: 0.75rem;
`;

const financialData = {
  "Profit & Loss": [
    { metric: "Book Value", values: [1287, 1287, 1287] },
    { metric: "EPS", values: [1287, 1287, 1287] },
    { metric: "Net Profit", values: [1287, 1287, 1287] },
    { metric: "Operating Profit", values: [1287, 1287, 1287] },
    { metric: "Revenue", values: [1287, 1287, 1287] },
  ],
  "Balance Sheet": [
    { metric: "Cash & Equivalents", values: [1287, 1287, 1287] },
    { metric: "Debt", values: [1287, 1287, 1287] },
    { metric: "Net Worth", values: [1287, 1287, 1287] },
    { metric: "Total Assets", values: [1287, 1287, 1287] },
    { metric: "Total Liabilities", values: [1287, 1287, 1287] },
  ],
};

const pagesix = () => {
  return (
    <Wrapper>
      <NavContainer>
        <FlexBox columnGap="1rem" align="center">
          <img src="/logopagesix.svg" width={56} height={56}></img>
          <FlexBox column columnGap="0.75rem">
            <Body1 bold>HEUBACHIND</Body1>
            <Support>Heubach Colorants India Limited</Support>
          </FlexBox>
        </FlexBox>
        <FlexBox column columnGap="0.75rem" align="center">
          <Body1 bold>₹ 1,6780.83</Body1>
          <Support color="red">+15.23 (0.22%)</Support>
        </FlexBox>
      </NavContainer>
      <Hr />
      <FlexBox width="100%" justify="space-between">
        <Body1>Security Information</Body1>
        <Body1>Business Description</Body1>
        <Body1>APART Insights</Body1>
        <Body1>Financial Fundamentals</Body1>
        <Body1>Cash Counter</Body1>
        <Body1>Peer Comparison</Body1>
      </FlexBox>
      <SecuritySection>
        <FlexBox width="100%" align="center" justify="space-between">
          <Body1 bold>Security Information</Body1>
          <FlexBox columnGap="16px">
            <ActionButton>
              <FaArrowsRotate />
              <Body1>Add to Watchlist</Body1>
            </ActionButton>
            <ActionButton>
              <CiExport />
              <Body1>Compare</Body1>
            </ActionButton>
          </FlexBox>
        </FlexBox>
        <GridContainer>
          <GridItem>
            <Body1 bold>ISIN</Body1>
            <Body1>ISIN000123456</Body1>
          </GridItem>
          <GridItem>
            <Body1 bold>Today's High</Body1>
            <Body1>₹1,534</Body1>
          </GridItem>
          <GridItem>
            <Body1 bold>Open Price</Body1>
            <Body1>₹1,534</Body1>
          </GridItem>
          <GridItem>
            <Body1 bold>Today's Low</Body1>
            <Body1>₹1,534</Body1>
          </GridItem>
          <GridItem>
            <Body1 bold>Market Cap</Body1>
            <Body1>₹1,553</Body1>
          </GridItem>
          <GridItem>
            <Body1 bold>Exchanges</Body1>
            <Body1>₹1,553</Body1>
          </GridItem>
          <GridItem>
            <Body1 bold>Sector</Body1>
            <Body1>AAA</Body1>
          </GridItem>
          <GridItem>
            <Body1 bold>Trade Category</Body1>
            <Body1>AAA</Body1>
          </GridItem>
          <GridItem>
            <Body1 bold>Industry</Body1>
            <Body1>₹1,234</Body1>
          </GridItem>
        </GridContainer>
      </SecuritySection>
      <Section>
        <BusinessSectionLeft>
          <Body1 bold>Business Description</Body1>
          <Body1>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.
          </Body1>
          <ul>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut
            </li>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut
            </li>
          </ul>
          <Body1>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam, quis
            optio minus sunt dignissimos hic laborum vel aut voluptatem ab
            provident, officiis dolorum quod rem similique placeat? Architecto,
            magni. Consectetur.
          </Body1>
        </BusinessSectionLeft>
        <BusinessSectionRight>
          <Body1 bold>APART Insights</Body1>
          <Body1>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam, quis
            optio minus sunt dignissimos hic laborum vel aut voluptatem ab
            provident, officiis dolorum quod rem similique placeat? Architecto,
            magni. Consectetur.
          </Body1>
          <Body1 bold>Strengths & Moat:</Body1>
          <ul>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut
            </li>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut
            </li>
          </ul>
          <Body1 bold>Risks & Threats</Body1>
          <ul>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut
            </li>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut
            </li>
          </ul>
        </BusinessSectionRight>
      </Section>

      <FlexBox column width="100%">
        <H1 bold>Financial Fundamentals</H1>
        <TableContainer>
          {Object.entries(financialData).map(([section, data]) => (
            <div key={section} style={{ width: "48%" }}>
              <Body1 bold>{section}</Body1>
              <Table>
                <StyledTable>
                  <thead>
                    <tr>
                      <TableHeader>Evaluation Metrics</TableHeader>
                      <TableHeader>Mar 2022</TableHeader>
                      <TableHeader>Mar 2023</TableHeader>
                      <TableHeader>Mar 2024</TableHeader>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map(row => (
                      <TableRow key={row.metric}>
                        <TableCell>{row.metric}</TableCell>
                        {row.values.map((value, index) => (
                          <TableCell key={index}>{value}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </tbody>
                </StyledTable>
              </Table>
            </div>
          ))}
        </TableContainer>
      </FlexBox>
      <FlexBox width="100%" column>
        <H1 bold>Cash Counter</H1>
        <FlexBox padding="1rem 2rem" width="100%" justify="space-between">
          <Support bold>Cash Flow from Investing Activities</Support>
          <Support bold>Cash Flow from Investing Activities</Support>
          <Support bold>Cash Flow from Investing Activities</Support>
          <Support bold>Cash Flow from Investing Activities</Support>
        </FlexBox>
      </FlexBox>
    </Wrapper>
  );
};

export default pagesix;
