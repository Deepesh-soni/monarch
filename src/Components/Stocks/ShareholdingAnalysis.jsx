import React from "react";
import { H1 } from "@common/UI/Headings";
import styled from "styled-components";
import FlexBox from "@common/UI/FlexBox";
import { Result } from "antd";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, LabelList } from "recharts";
import { blue } from "@ant-design/colors";
import _ from "lodash";
import { device } from "@common/UI/Responsive";

const ShareholdingContainer = styled(FlexBox)`
  flex-direction: column;
  gap: 1rem;

  @media ${device.laptop} {
    flex-direction: row;
  }
`;

const ShareholdingLeft = styled(FlexBox)`
  border: 1px solid #3c3c3c;
  width: 100%;
  border-radius: 12px;
  padding: 0.5rem;
  flex-direction: column;
  gap: 1rem;
  background-color: white;

  @media ${device.laptop} {
    width: 55%;
  }
`;

const ShareholdingRight = styled(FlexBox)`
  border: 1px solid #3c3c3c;
  width: 100%;
  border-radius: 12px;
  padding: 0.5rem;
  flex-direction: column;
  gap: 1rem;
  background-color: white;

  @media ${device.laptop} {
    width: 45%;
  }
`;

const ResponsiveTableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
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

const TableRow = styled.tr``;

const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ebf0f4;
  white-space: nowrap;
`;

const keys = [
    "Promoters",
    "Retail",
    "ForeignInstitution",
    "MutualFund",
    "OtherDomesticInstitution",
    "Others",
];

const keyColors = {
    Promoters: blue[2],
    Retail: blue[3],
    ForeignInstitution: blue[4],
    MutualFund: blue[5],
    OtherDomesticInstitution: blue[6],
    Others: blue[7],
};

function prepareChartData(raw) {
    const yearMap = new Map();
    raw.forEach(item => {
        const year = Math.floor(item.YRC / 100);
        if (!yearMap.has(year)) {
            yearMap.set(year, item);
        }
    });
    const filtered = Array.from(yearMap.values())
        .sort((a, b) => a.YRC - b.YRC)
        .slice(-5);
    return filtered.map(item => ({
        ...item,
        YRC: formatYRC(item.YRC),
    }));
}

function formatYRC(yrc) {
    const year = Math.floor(yrc / 100);
    return `${year}`;
}

function CustomShareholdingTooltip({ active, payload, label }) {
    if (active && payload && payload.length) {
        const row = payload[0].payload;
        return (
            <div style={{ background: "#fff", padding: 10, border: "1px solid #ccc" }}>
                <strong>Year: {label}</strong>
                {keys.map(key => (
                    <div key={key} style={{ color: keyColors[key], fontSize: 12 }}>
                        {_.startCase(key)}: {(row[key] ?? 0).toFixed(2)}%
                    </div>
                ))}
            </div>
        );
    }
    return null;
}

const Unavailable = () => (
    <Result
        status="warning"
        title="Data Unavailable for this stock right now."
    />
);

function StackedBarChart({ data }) {
    const chartData = prepareChartData(data);
    return (
        <div style={{ width: "100%", overflowX: "auto" }}>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData}>
                    <XAxis dataKey="YRC" />
                    <Tooltip content={<CustomShareholdingTooltip />} />
                    {keys.map(key => (
                        <Bar key={key} dataKey={key} stackId="a" fill={keyColors[key]}>
                            <LabelList
                                dataKey={key}
                                position="center"
                                formatter={val => `${val.toFixed(2)}%`}
                                style={{ fill: "#fff", fontSize: 10 }}
                            />
                        </Bar>
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

const formatValue = (value, show = false) => {
    return show
        ? `₹ ${new Intl.NumberFormat("en-IN").format(value?.toFixed(2))}`
        : `${new Intl.NumberFormat("en-IN").format(value?.toFixed(2))}`;
};

const ShareholdingAnalysis = ({ stockHoldingChart, stock }) => {
    const stockHoldingChartFiltered = stockHoldingChart?.chartData?.map(row =>
        keys.reduce((acc, k) => {
            if (row[k] > 0) acc[k] = row[k];
            return acc;
        }, { YRC: row.YRC })
    );

    return (
        <ShareholdingContainer width="100%">
            <ShareholdingLeft width="100%" column id="peers">
                <H1 bold>Shareholding Analysis</H1>
                {stockHoldingChart ? (
                    <StackedBarChart data={stockHoldingChartFiltered} />
                ) : (
                    <Unavailable />
                )}
            </ShareholdingLeft>
            <ShareholdingRight>
                <H1 bold>Valuation</H1>
                <ResponsiveTableWrapper>
                    <Table style={{ minWidth: 'unset' }}>
                        <StyledTable>
                            <tbody>
                                {[
                                    ["52 Week High", formatValue(stock.high52WeekPrice, true)],
                                    ["52 Week Low", formatValue(stock.low52WeekPrice, true)],
                                    ["P/E Ratio", stock.peTtm],
                                    ["PBV", stock.pbv],
                                    ["EV to EBITDA", stock.evToEbitda],
                                    ["EV to Capital Employed", stock.evToCapitalEmployed],
                                    ["EV to Sales", stock.evToSales],
                                    ["PEG", stock.pegRatio],
                                ].map(([label, val]) => (
                                    <TableRow key={label}>
                                        <TableCell>{label}</TableCell>
                                        <TableCell>
                                            {val != null ? val : "N/A"}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </tbody>
                        </StyledTable>
                    </Table>
                </ResponsiveTableWrapper>
            </ShareholdingRight>
        </ShareholdingContainer>
    );
};

export default ShareholdingAnalysis; 