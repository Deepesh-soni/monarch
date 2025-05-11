import React from "react";
import { H1 } from "@common/UI/Headings";
import { Large } from "@common/Paragraph";
import { Body1 } from "@common/UI/Headings";
import styled from "styled-components";
import FlexBox from "@common/UI/FlexBox";
import { Result } from "antd";

const ResponsiveTableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
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

const PeerComparisonTable = ({ peer, currentStock }) => {
    const rows = [
        {
            label: "Price",
            peer: formatValue(peer.price, true),
            current: formatValue(currentStock.price, true),
        },
        {
            label: "Market Cap",
            peer: `${formatValue(peer.mcap, true)} Cr.`,
            current: `${formatValue(currentStock.mcap, true)} Cr.`,
        },
        {
            label: "Volume",
            peer: formatValue(peer.volume),
            current: formatValue(currentStock.volume),
        },
        { label: "Change", peer: peer.change, current: currentStock.change },
        {
            label: "Dividend Yield",
            peer: peer.dividendYield,
            current: currentStock.dividendYield,
        },
        { label: "P/E Ratio", peer: peer.peTtm, current: currentStock.peTtm },
        { label: "PB TTM", peer: peer.pbTtm, current: currentStock.pbTtm },
        { label: "ROE TTM", peer: peer.roeTtm, current: currentStock.roeTtm },
        { label: "PEG Ratio", peer: peer.pegRatio, current: currentStock.pegRatio },
    ];

    return (
        <ResponsiveTableWrapper>
            <table
                style={{
                    width: "100%",
                    marginTop: "1rem",
                    border: "1px solid black",
                    borderRadius: "8px",
                    backgroundColor: "white",
                }}
            >
                <thead>
                    <tr>
                        <th
                            style={{
                                textAlign: "left",
                                borderBottom: "2px solid #ccc",
                                padding: "0.75rem",
                            }}
                        >
                            Metric
                        </th>
                        <th
                            style={{
                                textAlign: "center",
                                borderBottom: "2px solid #ccc",
                                padding: "8px",
                            }}
                        >
                            <strong>{currentStock.companyName}</strong>
                        </th>
                        <th
                            style={{
                                textAlign: "right",
                                borderBottom: "2px solid #ccc",
                                padding: "8px",
                                textAlign: 'center',
                            }}
                        >
                            <strong>
                                <a href={`/stocks/${peer.fqn}`}>{peer.companyName}</a>
                            </strong>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map(row => (
                        <tr key={row.label}>
                            <td
                                style={{
                                    textAlign: "left",
                                    padding: "8px",
                                    borderBottom: "1px solid #eee",
                                }}
                            >
                                {row.label}
                            </td>
                            <td
                                style={{
                                    textAlign: "center",
                                    padding: "8px",
                                    borderBottom: "1px solid #eee",
                                }}
                            >
                                {row.current !== undefined ? row.current : "N/A"}
                            </td>
                            <td
                                style={{
                                    textAlign: "right",
                                    padding: "8px",
                                    borderBottom: "1px solid #eee",
                                    textAlign: 'center',
                                }}
                            >
                                {row.peer !== undefined ? row.peer : "N/A"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </ResponsiveTableWrapper>
    );
};

const PeerComparison = ({ peers, currentStock }) => {
    return (
        <FlexBox width="100%" column id="peers" rowGap="2rem">
            <FlexBox column>
                <H1 bold>Peer Comparison</H1>
                <Large bold>Similarity by APART</Large>
            </FlexBox>
            <FlexBox width="100%" justify="center" column>
                <Large>
                    Conventional industrial classifications and peer determinations are
                    cursory, biased &amp; often inaccurate. APART&apos;s Similarity Score
                    peeps through deep data to find securities &amp; businesses that are
                    more similar to each other than the rest. This ensures that you are
                    comparing like to like and not apples to oranges!
                </Large>
            </FlexBox>
            {peers && peers.length > 0 ? (
                <PeerComparisonTable peer={peers[0]} currentStock={currentStock} />
            ) : (
                <Body1>
                    <Unavailable />
                </Body1>
            )}
        </FlexBox>
    );
};

export default PeerComparison; 