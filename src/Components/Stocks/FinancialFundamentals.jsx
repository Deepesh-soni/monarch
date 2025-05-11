import React from "react";
import { H1 } from "@common/UI/Headings";
import { Body1 } from "@common/UI/Headings";
import styled from "styled-components";
import { device } from "@common/UI/Responsive";
import FlexBox from "@common/UI/FlexBox";
import { Result } from "antd";

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
  background: #fff;
  min-width: 600px;
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
  white-space: nowrap;
`;

const TableRow = styled.tr``;

const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ebf0f4;
  white-space: nowrap;
`;

const FundamentalBlock = styled.div`
  width: 100%;

  @media ${device.laptop} {
    width: 48%;
  }
`;

const ResponsiveTableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  
  @media ${device.laptop} {
    overflow-x: unset;
  }
`;

const formatValue = (value, show = false) => {
    return show
        ? `₹ ${new Intl.NumberFormat("en-IN").format(value?.toFixed(2))}`
        : `${new Intl.NumberFormat("en-IN").format(value?.toFixed(2))}`;
};

const Unavailable = () => (
    <Result
        status="warning"
        title="Data Unavailable for this stock right now."
    />
);

const FinancialFundamentals = ({ financialData }) => {
    return (
        <FlexBox column width="100%" id="fundamentals">
            <H1 bold>Financial Fundamentals</H1>
            <TableContainer>
                {Object.entries(financialData).map(([section, data]) => {
                    const years = data[0]?.values?.length
                        ? data[0].years.slice(-3)
                        : [];

                    return (
                        <FundamentalBlock key={section}>
                            <Body1 bold>{section}</Body1>

                            {!data.length || !years.length ? (
                                <Body1><br /><Unavailable /></Body1>
                            ) : (
                                <ResponsiveTableWrapper>
                                    <Table>
                                        <StyledTable>
                                            <thead>
                                                <tr>
                                                    <TableHeader>Evaluation Metrics</TableHeader>
                                                    {years.map(year => (
                                                        <TableHeader key={year}>{year}</TableHeader>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.map(row => (
                                                    <TableRow key={row.metric}>
                                                        <TableCell>{row.metric}</TableCell>
                                                        {row.values.slice(-3).map((value, idx) => (
                                                            <TableCell key={idx}>
                                                                {value != null ? formatValue(value, true) : "N/A"}
                                                            </TableCell>
                                                        ))}
                                                    </TableRow>
                                                ))}
                                            </tbody>
                                        </StyledTable>
                                    </Table>
                                </ResponsiveTableWrapper>
                            )}
                        </FundamentalBlock>
                    );
                })}
            </TableContainer>
        </FlexBox>
    );
};

export default FinancialFundamentals; 