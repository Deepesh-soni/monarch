import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import FlexBox from "@common/UI/FlexBox";
import { Body1, Support, H1 } from "@common/UI/Headings";
import { device } from "@common/UI/Responsive";
import { IoMdAdd } from "react-icons/io";
import { CiExport } from "react-icons/ci";
import { FaArrowsRotate } from "react-icons/fa6";
import { client } from "@axiosClient";

// Styled components (keeping most of your original styles)
const Wrapper = styled(FlexBox)`
  flex-direction: column;
  padding: 20px;
  align-items: center;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const NavContainer = styled(FlexBox)`
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const Hr = styled.hr`
  width: 100%;
  border: 1px solid #ebf0f4;
  margin: 20px 0;
`;

const SecuritySection = styled(FlexBox)`
  width: 100%;
  border: 1px solid #ebf0f4;
  border-radius: 12px;
  padding: 1rem;
  flex-direction: column;
  background: #fff;
`;

const ActionButton = styled(FlexBox)`
  border: 1.5px solid #142c8e;
  display: inline-flex;
  align-items: center;
  padding: 8px 12px;
  gap: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #f0f0f0;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1rem;
  column-gap: 2rem;
`;

const GridItem = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Section = styled(FlexBox)`
  width: 100%;
  justify-content: space-between;
  column-gap: 1rem;
  flex-wrap: wrap;
  margin-top: 1rem;
`;


const BusinessSectionLeft = styled(FlexBox)`
  border: 1px solid #ebf0f4;
  width: 60%;
  border-radius: 12px;
  padding: 20px;
  flex-direction: column;
  gap: 16px;
  background: #fff;
  @media ${device.laptop} {
    width: 100%;
  }
`;

const BusinessSectionRight = styled(FlexBox)`
  border: 1px solid #ebf0f4;
  width: 38%;
  border-radius: 12px;
  padding: 20px;
  flex-direction: column;
  gap: 16px;
  background: #fff;
  @media ${device.laptop} {
    width: 100%;
  }
`;

const TableContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  margin-top: 20px;
  flex-wrap: wrap;
`;

const Table = styled.div`
  width: 100%;
  border: 1px solid #ebf0f4;
  border-radius: 12px;
  padding: 20px;
  background: #fff;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 12px;
  text-align: left;
  font-weight: bold;
  border-bottom: 2px solid #ebf0f4;
`;

const TableRow = styled.tr``;

const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ebf0f4;
`;

// Dummy financial data (for display purposes)
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

const PageSix = () => {
    const router = useRouter();
    const { fqn } = router.query;
    const [stock, setStock] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // API integration: Fetch stock details using the fqn parameter
    useEffect(() => {
        if (!fqn) return;
        const fetchStockDetails = async () => {
            try {
                const response = await client.get(`/stock/details/${fqn}`);
                setStock(response.data);
            } catch (err) {
                setError("Failed to fetch stock details.");
            } finally {
                setLoading(false);
            }
        };
        fetchStockDetails();
    }, [fqn]);

    if (loading)
        return <Wrapper><Body1>Loading...</Body1></Wrapper>;
    if (error)
        return <Wrapper><Body1>{error}</Body1></Wrapper>;
    if (!stock) return null;

    // Calculate change color based on the change value
    const changeValue = parseFloat(stock.change || "0");
    const changeColor = changeValue >= 0 ? "green" : "red";

    return (
        <Wrapper>
            {/* Top Navigation with Logo, Company Info and Price */}
            <NavContainer>
                <FlexBox columnGap="16px" align="center">
                    <img src="/logopagesix.svg" width={56} height={56} alt="logo" />
                    <FlexBox direction="column" gap="8px">
                        <Body1 bold>{stock.companyName}</Body1>
                        <Support>{stock.companyShortName}</Support>
                    </FlexBox>
                </FlexBox>
                <FlexBox direction="column" gap="8px" align="center">
                    <Body1 bold>₹ {stock.price}</Body1>
                    <Support color={changeColor}>{stock.change}</Support>
                </FlexBox>
            </NavContainer>
            <Hr />

            {/* Section Navigation Labels */}
            <FlexBox width="100%" justify="space-around" wrap="wrap">
                <Body1>Security Information</Body1>
                <Body1>Business Description</Body1>
                <Body1>APART Insights</Body1>
                <Body1>Financial Fundamentals</Body1>
                <Body1>Cash Counter</Body1>
                <Body1>Peer Comparison</Body1>
            </FlexBox>

            {/* Security Section */}
            <SecuritySection>
                <FlexBox width="100%" align="center" justify="space-between" margin="0 0 1rem 0">
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
                        <Body1>{stock.isin}</Body1>
                    </GridItem>
                    <GridItem>
                        <Body1 bold>Today's High</Body1>
                        <Body1>₹ {stock.high}</Body1>
                    </GridItem>
                    <GridItem>
                        <Body1 bold>Open Price</Body1>
                        <Body1>₹ {stock.open}</Body1>
                    </GridItem>
                    <GridItem>
                        <Body1 bold>Today's Low</Body1>
                        <Body1>₹ {stock.low}</Body1>
                    </GridItem>
                    <GridItem>
                        <Body1 bold>Market Cap</Body1>
                        <Body1>₹ {stock.mcap}</Body1>
                    </GridItem>
                    <GridItem>
                        <Body1 bold>Volume</Body1>
                        <Body1>{stock.volume}</Body1>
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

            {/* Business & Insights Sections */}
            <Section>
                <BusinessSectionLeft>
                    <Body1 bold>Business Description</Body1>
                    <Body1>
                        {/* Replace with actual business description */}
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Body1>
                    <ul>
                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                    </ul>
                    <Body1>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam, quis optio minus sunt dignissimos hic laborum.
                    </Body1>
                </BusinessSectionLeft>
                <BusinessSectionRight>
                    <Body1 bold>APART Insights</Body1>
                    <Body1>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, quis optio minus sunt dignissimos hic laborum.
                    </Body1>
                    <Body1 bold>Strengths &amp; Moat:</Body1>
                    <ul>
                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                    </ul>
                    <Body1 bold>Risks &amp; Threats</Body1>
                    <ul>
                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                    </ul>
                </BusinessSectionRight>
            </Section>

            {/* Financial Fundamentals Section */}
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

            {/* Cash Counter Section */}
            <FlexBox width="100%" column>
                <H1 bold>Cash Counter</H1>
                <FlexBox padding="1rem 2rem" width="100%" justify="space-between">
                    <Support bold>Cash Flow from Investing</Support>
                    <Support bold>Cash Flow from Financing</Support>
                    <Support bold>Cash Flow from Operating</Support>
                    <Support bold>Cash Flow from Equivalents</Support>
                </FlexBox>
            </FlexBox>
        </Wrapper>
    );
};

export default PageSix;
