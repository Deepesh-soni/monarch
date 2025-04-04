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
import { H5, H4 } from "../Components/common/Typography";
import { Medium, Large } from "../Components/common/Paragraph";
import { Modal, Select, Button, Spin } from "antd";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
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
        <Tooltip formatter={(value, name) => [`${value.toFixed(2)}%`, _.startCase(name)]} />
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
  );
}

// Updated AddToWatchlistPopup with multi-select and looping over API calls.
const AddToWatchlistPopup = ({ visible, onClose, stockFqn }) => {
  const [watchlists, setWatchlists] = useState([]);
  const [selectedWatchlists, setSelectedWatchlists] = useState([]); // Now an array
  const [loadingWatchlists, setLoadingWatchlists] = useState(false);
  const [adding, setAdding] = useState(false);
  const router = useRouter();

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
    if (!selectedWatchlists.length) return;
    setAdding(true);
    try {
      // Loop through each selected watchlist and update
      for (const watchlistFqn of selectedWatchlists) {
        const watchlist = watchlists.find(w => w.fqn === watchlistFqn);
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
      }
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
        mode="multiple"
        style={{ width: "100%" }}
        placeholder="Select one or more watchlists"
        loading={loadingWatchlists}
        onChange={setSelectedWatchlists}
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
            router.push('/watch-list/');
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

const Hr = styled.hr`
  width: 100%;
  border: 1px solid #ebf0f4;
`;

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

const CashContainer = styled(FlexBox)`
  width: 100%;
  justify-content: space-between;
  @media ${device.laptop} {
    padding: 1rem 2rem;
  }
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

const Section = styled(FlexBox)`
  width: 100%;
  justify-content: space-between;
  flex-direction: column;
  row-gap: 1rem;
  @media ${device.laptop} {
    flex-direction: row;
    column-gap: 1rem;
  }
`;

const BusinessSectionLeft = styled(FlexBox)`
  border: 1px solid #3c3c3c;
  width: 100%;
  border-radius: 12px;
  padding: 0.5rem;
  flex-direction: column;
  gap: 1rem;
  @media ${device.laptop} {
    width: 60%;
  }
`;

const BusinessSectionRight = styled(FlexBox)`
  border: 1px solid #3c3c3c;
  width: 100%;
  border-radius: 12px;
  padding: 0.5rem;
  flex-direction: column;
  gap: 1rem;
  @media ${device.laptop} {
    width: 40%;
  }
`;

const ShareholdingLeft = styled(FlexBox)`
  border: 1px solid #3c3c3c;
  width: 100%;
  border-radius: 12px;
  padding: 0.5rem;
  flex-direction: column;
  gap: 1rem;
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
  @media ${device.laptop} {
    width: 45%;
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

const HeaderRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
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

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 8px 0;
  font-size: 14px;
`;

const slugify = text =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-");

const PeerComparisonTable = ({ peer, currentStock }) => {
  const rows = [
    { label: "Price", peer: formatValue(peer.price, true), current: formatValue(currentStock.price, true) },
    { label: "Market Cap", peer: `${formatValue(peer.mcap, true)} Cr.`, current: `${formatValue(currentStock.mcap, true)} Cr.` },
    { label: "Volume", peer: formatValue(peer.volume), current: formatValue(currentStock.volume) },
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
          <th style={{ textAlign: "left", borderBottom: "2px solid #ccc", padding: "0.75rem" }}>
            Metric
          </th>
          <th style={{ textAlign: "center", borderBottom: "2px solid #ccc", padding: "8px" }}>
            <strong>{currentStock.companyName}</strong>
          </th>
          <th style={{ textAlign: "right", borderBottom: "2px solid #ccc", padding: "8px" }}>
            <strong>
              <a href={`/stocks/${peer.fqn}`}>{peer.companyName}</a>
            </strong>
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map(row => (
          <tr key={row.label}>
            <td style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #eee" }}>
              {row.label}
            </td>
            <td style={{ textAlign: "center", padding: "8px", borderBottom: "1px solid #eee" }}>
              {row.current !== undefined ? row.current : "N/A"}
            </td>
            <td style={{ textAlign: "right", padding: "8px", borderBottom: "1px solid #eee" }}>
              {row.peer !== undefined ? row.peer : "N/A"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};


function formatValue(value, show = false){
  return show ? `₹ ${new Intl.NumberFormat("en-IN").format(value?.toFixed(2))}` : `${new Intl.NumberFormat("en-IN").format(value?.toFixed(2))}`;
}


function CashflowChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <XAxis dataKey="year" />
        <Tooltip />
        <Bar dataKey="cfo" stackId="a" fill={blue[2]} />
        <Bar dataKey="cfi" stackId="a" fill={blue[4]} />
        <Bar dataKey="cff" stackId="a" fill={blue[6]} />
        <Bar dataKey="netcashflow" stackId="a" fill={blue[8]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

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
  const [cashflowChartData, setCashflowChartData] = useState(null);


  const financialData = stock
    ? {
      "Profit & Loss": [
        { metric: "Book Value", values: [stock.bookvalue, stock.bookvalue, stock.bookvalue] },
        { metric: "EPS", values: [stock.eps, stock.eps, stock.eps] },
        { metric: "Net Profit", values: [stock.netprofit, stock.netprofit, stock.netprofit] },
        { metric: "Operating Profit", values: [stock.opm, stock.opm, stock.opm] },
        { metric: "Revenue", values: [stock.revenue, stock.revenue, stock.revenue] },
      ],
      "Balance Sheet": [
        { metric: "Cash & Equivalents", values: [stock.cash_op, stock.cash_investing, stock.cash_financing] },
        { metric: "Debt", values: [stock.debtToEquity, stock.debtToEquity, stock.debtToEquity] },
        { metric: "Net Worth", values: [stock.networth, stock.networth, stock.networth] },
        { metric: "Total Assets", values: [stock.totalassets, stock.totalassets, stock.totalassets] },
        { metric: "Total Liabilities", values: [stock.totalliabilities, stock.totalliabilities, stock.totalliabilities] },
      ],
    }
    : {};

  useEffect(() => {
    if (!fqn) return;
    // Reset state before fetching new data
    setLoading(true);
    setError(null);
    setStock(null);
    setPeers(null);
    setStockHoldingChart(null);

    const fetchStockDetails = async () => {
      try {
        const [stockRes, peersRes, chartRes, cashflowRes] = await Promise.all([
          client.get(`/stock/details/${fqn}`),
          client.get(`/stock/peers/${fqn}`),
          client.get(`/stock/chart/shareholding/${fqn}`),
          client.get(`/stock/chart/cashflow/${fqn}`),
        ]);
        setStock(stockRes.data);
        setPeers(peersRes.data);
        setStockHoldingChart(chartRes.data);
        setCashflowChartData(cashflowRes.data?.chartData || []);
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

  const changeValue = parseFloat(stock.change || "0");
  const changeColor = changeValue >= 0 ? "green" : "red";

  return (
    <Wrapper>
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
                href={`https://www.bseindia.com/stock-share-price/${slugify(stock.companyName)}/${stock.companyShortName}/${stock.bseCode}/`}
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
      <NavLinks>
        <NavLink href="#security">Security Information</NavLink>
        <NavLink href="#business">Business Description</NavLink>
        <NavLink href="#insights">APART Insights</NavLink>
        <NavLink href="#fundamentals">Financial Fundamentals</NavLink>
        <NavLink href="#cash">Cash Counter</NavLink>
        <NavLink href="#peers">Peer Comparison</NavLink>
      </NavLinks>
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
      <Section>
        <BusinessSectionLeft id="business">
          <Body1 bold>Business Description</Body1>
          <Body1>
            {<>{stock.details?.slice(0, 1024)} <a href={`https://www.bseindia.com/stock-share-price/${slugify(stock.companyName)}/${stock.companyShortName}/${stock.bseCode}/corp-information/`} target="_blank"
              rel="noopener noreferrer">...(read more)</a></> ?? 'Company Information Unavailable'}
          </Body1>
        </BusinessSectionLeft>
        <BusinessSectionRight id="insights">
          <Body1 bold>APART Insights</Body1>
          <Body1>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, quis optio minus sunt dignissimos hic laborum.
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
                          <TableCell key={index}>
                            {value !== undefined ? value?.toFixed(2) : "N/A"}
                          </TableCell>
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
      <FlexBox width="100%" column id="cash">
        <H1 bold>Cash Counter</H1>
        <CashContainer>
          <Support bold>Cash Flow from Investing</Support>
          <Support bold>Cash Flow from Financing</Support>
          <Support bold>Cash Flow from Operating</Support>
          <Support bold>Cash Flow from Equivalents</Support>
        </CashContainer>
        {cashflowChartData && <CashflowChart data={cashflowChartData} />}

      </FlexBox>
      <FlexBox width="100%" column id="peers" rowGap="2rem">
        <FlexBox column>
          <H1 bold>Peer Comparison</H1>
          <Large bold>Similarity by APART</Large>
        </FlexBox>
        <FlexBox width="100%" justify="center" column>
          <Large>
            Conventional industrial classifications and peer determinations are cursory, biased &amp; often inaccurate. APART's Similarity Score peeps through deep data to find securities &amp; businesses that are more similar to each other than the rest. This ensures that you are comparing like to like and not apples to oranges!
          </Large>
        </FlexBox>
        {peers && peers.length > 0 ? (
          <PeerComparisonTable peer={peers[0]} currentStock={stock} />
        ) : (
          <Body1>No peer data available.</Body1>
        )}
      </FlexBox>
      <Section>
        <ShareholdingLeft width="100%" column id="peers">
          <H1 bold>Shareholding Analysis</H1>
          {stockHoldingChart && (
            <StackedBarChart data={stockHoldingChart?.chartData} />
          )}
        </ShareholdingLeft>
        <ShareholdingRight>
          <H1 bold>Valuation</H1>
          <Row>
            <Large bold>52 Week High</Large>
            <Large>{formatValue(stock?.high52WeekPrice, true)}</Large>
          </Row>
          <Row>
            <Large bold>52 Week Low</Large>
            <Large>{formatValue(stock?.low52WeekPrice, true)}</Large>
          </Row>
          <Row>
            <Large bold>P/E Ratio</Large>
            <Large>{stock?.pegRatio}</Large>
          </Row>
          <Row>
            <Large bold>PBV</Large>
            <Large>{stock?.pbv}</Large>
          </Row>
          <Row>
            <Large bold>EV to EBITDA</Large>
            <Large>{stock?.evToEbitda}</Large>
          </Row>
          <Row>
            <Large bold>EV to Capital Employed</Large>
            <Large>₹ 1,234</Large>
          </Row>
          <Row>
            <Large bold>EV to Sales</Large>
            <Large>{stock?.evToSales}</Large>
          </Row>
          <Row>
            <Large bold>PEG</Large>
            <Large>{stock?.pegRatio}</Large>
          </Row>
        </ShareholdingRight>
      </Section>
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
