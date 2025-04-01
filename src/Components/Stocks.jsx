import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import FlexBox from "@common/UI/FlexBox";
import { Body1, Support, H1 } from "@common/UI/Headings";
import { device } from "@common/UI/Responsive";
import { CiExport } from "react-icons/ci";
import { FaArrowsRotate } from "react-icons/fa6";
import { client } from "@axiosClient";
import { BiLinkExternal } from "react-icons/bi";
import { H5, H2, H6, H4 } from "../Components/common/Typography";
import { Medium, Large } from "../Components/common/Paragraph";
import { Modal, Select, Button, Spin } from "antd";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { blue } from "@ant-design/colors";
import _ from "lodash";
import { LabelList } from "recharts";

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
      yearMap.set(year, item); // take only first entry per year
    }
  });

  // Get only the last 5 years
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

function StackedBarChart({ data }) {
  const chartData = prepareChartData(data);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData}>
        <XAxis dataKey="YRC" />
        <YAxis />
        <Tooltip formatter={(value, name) => [value, _.startCase(name)]} />
        <Legend formatter={value => _.startCase(value)} />
        {keys.map(key => (
          <Bar key={key} dataKey={key} stackId="a" fill={keyColors[key]}>
            <LabelList
              dataKey={key}
              position="center"
              formatter={val => `${val.toFixed(1)}%`}
              style={{ fill: "#fff", fontSize: 10 }}
            />
          </Bar>
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

const AddToWatchlistPopup = ({ visible, onClose, stockFqn }) => {
  const [watchlists, setWatchlists] = useState([]);
  const [selectedWatchlist, setSelectedWatchlist] = useState(null);
  const [loadingWatchlists, setLoadingWatchlists] = useState(false);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    if (visible) {
      setLoadingWatchlists(true);
      client
        .get("/watchlist")
        .then(res => setWatchlists(res.data || []))
        .catch(err => console.error("Failed to fetch watchlists", err))
        .finally(() => setLoadingWatchlists(false));
    }
  }, [visible]);

  const handleAdd = async () => {
    if (!selectedWatchlist) return;
    setAdding(true);
    try {
      // Find the selected watchlist details
      const watchlist = watchlists.find(w => w.fqn === selectedWatchlist);
      let updatedStocks = Array.isArray(watchlist.stocks)
        ? [...watchlist.stocks]
        : [];
      if (!updatedStocks.includes(stockFqn)) {
        updatedStocks.push(stockFqn);
      }
      const payload = {
        name: watchlist.name,
        description: watchlist.description,
        stocks: updatedStocks,
      };
      await client.put(`/watchlist/${watchlist.fqn}`, payload);
      // Optionally show success message...
      onClose();
    } catch (error) {
      console.error("Failed to add stock to watchlist", error);
    } finally {
      setAdding(false);
    }
  };

  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      title="Add to Watchlist"
      footer={null}
    >
      <Select
        style={{ width: "100%" }}
        placeholder="Select a watchlist"
        loading={loadingWatchlists}
        onChange={value => setSelectedWatchlist(value)}
      >
        {watchlists.map(watchlist => (
          <Select.Option key={watchlist.fqn} value={watchlist.fqn}>
            {watchlist.name}
          </Select.Option>
        ))}
      </Select>
      <div style={{ marginTop: 16, textAlign: "right" }}>
        <Button onClick={handleAdd} loading={adding} type="primary">
          Add
        </Button>
        <Button onClick={onClose} style={{ marginLeft: 8 }}>
          Cancel
        </Button>
        <Button
          type="link"
          onClick={() => {
            /* trigger create new popup */
          }}
        >
          Create New Watchlist
        </Button>
      </div>
    </Modal>
  );
};

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
`;

/* Navigation links with a bottom highlight on hover */
const NavLinks = styled(FlexBox)`
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
`;

const NavLink = styled.a`
  position: relative;
  text-decoration: none;
  color: inherit;
  font-weight: 500;
  padding: 4px 0;
  &:hover::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -2px;
    height: 2px;
    width: 100%;
    background: #142c8e;
  }
`;

const SecuritySection = styled(FlexBox)`
  width: 100%;
  border: 1px solid #3c3c3c;
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
  column-gap: 6rem;
`;

const GridItem = styled.div`
  display: flex;
  justify-content: space-between;
`;

// const Section = styled(FlexBox)`
//   width: 100%;
//   justify-content: space-between;
//   column-gap: 1rem;
//   flex-wrap: wrap;
//   margin-top: 1rem;
// `;

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

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

// Header row container
const HeaderRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

// Company title styled component
const CompanyTitle = styled(H1)`
  margin: 0;
  font-size: 1.75rem;
  color: #111111;
`;

// Exchange links row
const ExchangeLinksRow = styled.div`
  margin-top: 4px;
  display: flex;
  gap: 16px;
`;

// Each exchange link
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

const ScoreCard = styled(FlexBox)`
  justify-content: center;
  width: fit-content;
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid #888888;
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

const slugify = text =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-");

const PeerComparisonTable = ({ peer, currentStock }) => {
  const rows = [
    { label: "Price", peer: peer.price, current: currentStock.price },
    { label: "Market Cap", peer: peer.mcap, current: currentStock.mcap },
    { label: "Volume", peer: peer.volume, current: currentStock.volume },
    { label: "Change", peer: peer.change, current: currentStock.change },
    {
      label: "Dividend Yield",
      peer: peer.dividendYield,
      current: currentStock.dividendYield,
    },
    { label: "PB TTM", peer: peer.pbTtm, current: currentStock.pbTtm },
    { label: "ROE TTM", peer: peer.roeTtm, current: currentStock.roeTtm },
    { label: "PEG Ratio", peer: peer.pegRatio, current: currentStock.pegRatio },
  ];

  return (
    <table
      style={{
        width: "100%",
        marginTop: "1rem",
        border: "1px solid black",
        borderRadius: "8px",
      }}
    >
      <thead>
        <tr>
          <th
            style={{
              textAlign: "left", // Align "Metric" column to the left
              borderBottom: "2px solid #ccc",
              padding: "0.75rem",
            }}
          >
            Metric
          </th>
          <th
            style={{
              textAlign: "center", // Center-align the Reliance Industries Ltd column
              borderBottom: "2px solid #ccc",
              padding: "8px",
            }}
          >
            <strong>{currentStock.companyName}</strong>
          </th>
          <th
            style={{
              textAlign: "right", // Right-align the Indian Oil Corporation Ltd column
              borderBottom: "2px solid #ccc",
              padding: "8px",
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
                textAlign: "left", // Left-align the "Metric" column content
                padding: "8px",
                borderBottom: "1px solid #eee",
              }}
            >
              {row.label}
            </td>
            <td
              style={{
                textAlign: "center", // Center-align the value for Reliance Industries Ltd
                padding: "8px",
                borderBottom: "1px solid #eee",
              }}
            >
              {row.current !== undefined ? row.current : "N/A"}
            </td>
            <td
              style={{
                textAlign: "right", // Right-align the value for Indian Oil Corporation Ltd
                padding: "8px",
                borderBottom: "1px solid #eee",
              }}
            >
              {row.peer !== undefined ? row.peer : "N/A"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Stock = () => {
  const router = useRouter();
  const { fqn } = router.query;
  const [stock, setStock] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [peers, setPeers] = useState(null);
  const [stockHoldingChart, setStockHoldingChart] = useState(null);

  const { doesSessionExist } = useSessionContext();
  const isLoggedIn = doesSessionExist;

  const [showWatchlistPopup, setShowWatchlistPopup] = useState(false);

  // API integration: Fetch stock details using the fqn parameter
  useEffect(() => {
    if (!fqn) return;
    const fetchStockDetails = async () => {
      try {
        const [stockRes, peersRes, chartRes] = await Promise.all([
          client.get(`/stock/details/${fqn}`),
          client.get(`/stock/peers/${fqn}`),
          client.get(`/stock/chart/shareholding/${fqn}`),
        ]);
        setStock(stockRes.data);
        setPeers(peersRes.data);
        setStockHoldingChart(chartRes.data);
      } catch (err) {
        setError("Failed to fetch stock details.");
      } finally {
        setLoading(false);
      }
    };
    fetchStockDetails();
  }, [fqn]);

  const handleCompareClick = () => {
    if (stock && peers) {
      router.push(`/stocks/compare/${stock.fqn}/${peers[0].fqn}`);
    }
  };

  if (loading)
    return <Spin style={{ margin: "100px auto", display: "block" }} />;

  if (error) {
    return (
      <Wrapper>
        <Body1>{error}</Body1>
      </Wrapper>
    );
  }
  if (!stock) return null;

  // Calculate change color based on the change value
  const changeValue = parseFloat(stock.change || "0");
  const changeColor = changeValue >= 0 ? "green" : "red";

  return (
    <Wrapper>
      {/* Top Navigation (no stock image as requested) */}

      <HeaderRow>
        <LeftContainer>
          <H5 bold>{stock.companyName}</H5>
          <ExchangeLinksRow>
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
          <H4 bold style={{ fontSize: "1.25rem" }}>
            ₹ {stock.price}
          </H4>
          <Medium style={{ color: changeColor }}>{stock.change}</Medium>
        </RightContainer>
      </HeaderRow>
      <Hr />

      {/* Anchored Navigation */}
      <NavLinks>
        <NavLink href="#security">Security Information</NavLink>
        <NavLink href="#business">Business Description</NavLink>
        <NavLink href="#insights">APART Insights</NavLink>
        <NavLink href="#fundamentals">Financial Fundamentals</NavLink>
        <NavLink href="#cash">Cash Counter</NavLink>
        <NavLink href="#peers">Peer Comparison</NavLink>
      </NavLinks>

      {/* Security Section */}
      <SecuritySection id="security">
        <FlexBox width="100%" align="center" justify="space-between">
          <H5 bold>Security Information</H5>
          <FlexBox columnGap="16px">
            {isLoggedIn && (
              <Button outline onClick={() => setShowWatchlistPopup(true)}>
                <FaArrowsRotate size={18} />
                <Body1>Add to Watchlist</Body1>
              </Button>
            )}
            <Button outline onClick={handleCompareClick}>
              <CiExport />
              <Body1>Compare</Body1>
            </Button>
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
        <BusinessSectionLeft id="business">
          <Body1 bold>Business Description</Body1>
          <Body1>
            {/* Replace with actual business description if available */}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Body1>
          <FlexBox padding="0 0 0 1.5rem" width="100%">
            <ul>
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
            </ul>
          </FlexBox>
          <Body1>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, quis
            optio minus sunt dignissimos hic laborum.
          </Body1>
        </BusinessSectionLeft>
        <BusinessSectionRight id="insights">
          <Body1 bold>APART Insights</Body1>
          <Body1>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, quis
            optio minus sunt dignissimos hic laborum.
          </Body1>
          <Body1 bold>Strengths &amp; Moat:</Body1>
          <FlexBox padding="0 0 0 1.5rem" width="100%">
            <ul>
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
            </ul>
          </FlexBox>
          <Body1 bold>Risks &amp; Threats</Body1>
          <FlexBox padding="0 0 0 1.5rem" width="100%">
            <ul>
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
            </ul>
          </FlexBox>
        </BusinessSectionRight>
      </Section>

      {/* Financial Fundamentals Section */}
      <FlexBox column width="100%" id="fundamentals">
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
      <FlexBox width="100%" column id="cash">
        <H1 bold>Cash Counter</H1>
        <FlexBox padding="1rem 2rem" width="100%" justify="space-between">
          <Support bold>Cash Flow from Investing</Support>
          <Support bold>Cash Flow from Financing</Support>
          <Support bold>Cash Flow from Operating</Support>
          <Support bold>Cash Flow from Equivalents</Support>
        </FlexBox>
      </FlexBox>

      {/* Peer Comparison Section */}
      <FlexBox width="100%" column id="peers" rowGap="2rem">
        <FlexBox column>
          <H1 bold>Peer Comparison</H1>
          <Large bold>Similarity by APART</Large>
        </FlexBox>
        <FlexBox width="100%" justify="center" column>
          <Large>
            Conventional industrial classifications and peer determinations are
            cursory, biased & often inaccurate. APART's Similarity Score peeps
            through deep data to find securities & businesses that are more
            similar to each other than the rest. This ensure that you are
            comparing like to like and not apples to oranges! Phew!
          </Large>
          <ScoreCard>
            <Body1 color="#287897">Similarity Score: </Body1>
            <Body1 color="#287897">62%</Body1>
          </ScoreCard>
        </FlexBox>
        {peers && peers.length > 0 ? (
          <PeerComparisonTable peer={peers[0]} currentStock={stock} />
        ) : (
          <Body1>No peer data available.</Body1>
        )}
      </FlexBox>

      <FlexBox width="100%" column id="peers">
        <H1 bold>Shareholding Analysis</H1>
        {stockHoldingChart && (
          <StackedBarChart data={stockHoldingChart?.chartData} />
        )}
      </FlexBox>

      {isLoggedIn && (
        <AddToWatchlistPopup
          visible={showWatchlistPopup}
          onClose={() => setShowWatchlistPopup(false)}
          stockFqn={stock.fqn}
        />
      )}
    </Wrapper>
  );
};

export default Stock;
