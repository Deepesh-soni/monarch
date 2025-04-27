import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import FlexBox from "@common/UI/FlexBox";
import { Body1, H1 } from "@common/UI/Headings";
import { device } from "@common/UI/Responsive";
import { CiExport } from "react-icons/ci";
import { FaArrowsRotate } from "react-icons/fa6";
import { client } from "@axiosClient";
import { BiLinkExternal } from "react-icons/bi";
import { H5, H4 } from "../common/Typography";
import { Medium, Large } from "../common/Paragraph";
import { Modal, Select, Button, Spin, Result, Typography } from "antd";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { blue } from "@ant-design/colors";
import _ from "lodash";
import { LabelList } from "recharts";
import { ComposedChart, YAxis, CartesianGrid, Area } from "recharts";
import InsightsSection from "./InsightsSection";
import { Alert } from "antd";
import AnnualReportsSection from "./AnnualReports";

const TIME_FRAMES = ["1W", "1M", "3M", "6M", "1Y", "5Y", "MAX"];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const dateStr = new Date(label).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return (
      <div
        style={{
          backgroundColor: "#fff",
          padding: 10,
          border: "1px solid #ccc",
        }}
      >
        <p>{`Date: ${dateStr}`}</p>
        <p>{`Price: ${formatValue(payload[0]?.value, true)}`}</p>
        {payload[1] && <p>{`Volume: ${payload[1]?.value}`}</p>}
      </div>
    );
  }
  return null;
};

const StockChart = ({ stockCode = "delhivery" }) => {
  const [timeFrame, setTimeFrame] = useState("1Y");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    client
      .get(`/stock/chart/price/${stockCode}/${timeFrame}`)
      .then(res => {
        const formatted = res?.data?.data?.map(d => ({
          ...d,
          date: new Date(d.date),
          volume: +d.volume,
        }));
        if (!formatted || formatted.length === 0) {
          throw new Error("No data available");
        }
        setData(formatted);
      })
      .catch(err => {
        console.error("Error fetching data:", err);
        setError("Data is currently unavailable. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, [stockCode, timeFrame]);

  return (
    <div>
      <div style={{ marginBottom: 16, textAlign: "center" }}>
        {TIME_FRAMES.map(tf => (
          <Button
            key={tf}
            type={timeFrame === tf ? "primary" : "default"}
            onClick={() => setTimeFrame(tf)}
            style={{ margin: "0 5px" }}
          >
            {tf}
          </Button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: "center", paddingTop: 100 }}>
          <Spin size="large" />
        </div>
      ) : error ? (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          style={{ maxWidth: 600, margin: "0 auto" }}
        />
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis
              dataKey="date"
              fontSize={10}
              tickFormatter={date => {
                const d = new Date(date);
                const isShortTerm = ["1W", "1M", "3M"].includes(timeFrame);
                return d
                  .toLocaleDateString("en-US", {
                    month: "short",
                    ...(isShortTerm && { day: "numeric" }),
                    year: "2-digit",
                  })
                  .replace(" ", "' ");
              }}
            />
            <YAxis
              yAxisId="price"
              tickFormatter={val => `₹ ${val.toLocaleString("en-IN")}`}
              width={100}
            />
            <YAxis
              yAxisId="volume"
              orientation="right"
              domain={[0, dataMax => dataMax * 2]} // limit height
              hide // hide the axis scale, purely visual
            />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip content={<CustomTooltip />} />
            <Area
              yAxisId="price"
              type="monotone"
              dataKey="close"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.2}
            />
            <Bar
              yAxisId="volume"
              dataKey="volume"
              fill="#82ca9d"
              barSize={6}
              opacity={0.5}
            />
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

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

// Updated AddToWatchlistPopup with multi-select and looping over API calls.
const AddToWatchlistPopup = ({ visible, onClose, stockFqn }) => {
  const [watchlists, setWatchlists] = useState([]);
  const [selectedWatchlists, setSelectedWatchlists] = useState([]);
  const [loadingWatchlists, setLoadingWatchlists] = useState(false);
  const [adding, setAdding] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (visible) {
      setLoadingWatchlists(true);
      client
        .get("/watchlist")
        .then(res => {
          const lists = res.data || [];
          setWatchlists(lists);

          // Preselect watchlists that already contain this stock
          const preselected = lists
            .filter(w => Array.isArray(w.stocks) && w.stocks.includes(stockFqn))
            .map(w => w.fqn);
          setSelectedWatchlists(preselected);
        })
        .catch(err => console.error("Failed to fetch watchlists", err))
        .finally(() => setLoadingWatchlists(false));
    }
  }, [visible, stockFqn]);

  const handleAdd = async () => {
    setAdding(true);
    try {
      for (const w of watchlists) {
        const alreadyHas =
          Array.isArray(w.stocks) && w.stocks.includes(stockFqn);
        const shouldHave = selectedWatchlists.includes(w.fqn);

        // No change needed
        if (alreadyHas === shouldHave) continue;

        let updatedStocks = Array.isArray(w.stocks) ? [...w.stocks] : [];

        if (shouldHave && !alreadyHas) {
          updatedStocks.push(stockFqn);
        } else if (!shouldHave && alreadyHas) {
          updatedStocks = updatedStocks.filter(s => s !== stockFqn);
        }

        const payload = {
          name: w.name,
          description: w.description,
          stocks: updatedStocks,
        };

        await client.put(`/watchlist/${w.fqn}`, payload);
      }

      onClose();
    } catch (error) {
      console.error("Failed to update watchlist", error);
    } finally {
      setAdding(false);
    }
  };

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      title="Add to Watchlist"
      footer={null}
    >
      <Select
        mode="multiple"
        style={{ width: "100%" }}
        placeholder="Select one or more watchlists"
        loading={loadingWatchlists}
        value={selectedWatchlists}
        onChange={setSelectedWatchlists}
      >
        {watchlists.map(w => (
          <Select.Option key={w.fqn} value={w.fqn}>
            {w.name}
          </Select.Option>
        ))}
      </Select>

      <div style={{ marginTop: 16, textAlign: "right" }}>
        <Button type="link" onClick={() => router.push("/watch-list/")}>
          Create New Watchlist
        </Button>
        <Button onClick={onClose} style={{ marginLeft: 8 }}>
          Cancel
        </Button>
        <Button
          onClick={handleAdd}
          loading={adding}
          type="primary"
          style={{ marginLeft: 8 }}
        >
          Save
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
  position: sticky;
  top: 0;
  border: 1px solid #3c3c3c;
  border-radius: 12px;
  padding: 1rem;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  background-color: white;
  z-index: 10;
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
  background-color: white;
  @media ${device.laptop} {
    width: 60%;
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

const ResponsiveTableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  @media ${device.laptop} {
    overflow-x: unset;
  }
`;

const slugify = text =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-");

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
          backgroundColor:"white"

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

function formatValue(value, show = false) {
  return show
    ? `₹ ${new Intl.NumberFormat("en-IN").format(value?.toFixed(2))}`
    : `${new Intl.NumberFormat("en-IN").format(value?.toFixed(2))}`;
}

const cashFlowTabs = [
  { key: "cfo", label: "Cash Flow from Operating" },
  { key: "cfi", label: "Cash Flow from Investing" },
  { key: "cff", label: "Cash Flow from Financing" },
  { key: "netcashflow", label: "Net Cash Flow" },
];

function CustomCashflowTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    const { name, value, payload: fullData } = payload[0];
    return (
      <div
        style={{
          background: "#fff",
          padding: "10px",
          border: "1px solid #ccc",
        }}
      >
        <strong>Year: {label}</strong>
        <div style={{ marginTop: 4 }}>
          {cashFlowTabs.find(tab => tab.key === name).label} (Cr.): ₹{" "}
          {value.toLocaleString("en-IN")}
        </div>
      </div>
    );
  }
  return null;
}

export function CashFlowSection({ data }) {
  const [selectedKey, setSelectedKey] = useState("cfo");

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "10px",
          justifyContent: "center",
        }}
      >
        {cashFlowTabs.map(tab => (
          <div
            key={tab.key}
            onClick={() => setSelectedKey(tab.key)}
            style={{
              padding: "10px 20px",
              cursor: "pointer",
              borderBottom:
                selectedKey === tab.key
                  ? "2px solid black"
                  : "2px solid transparent",
              fontWeight: selectedKey === tab.key ? "bold" : "normal",
            }}
          >
            {tab.label}
          </div>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={[...data].sort((a, b) => a.year - b.year)}>
          <XAxis dataKey="year" />
          <YAxis
            tickFormatter={val => `₹ ${val.toLocaleString("en-IN")}`}
            width={100}
          />
          <Tooltip content={<CustomCashflowTooltip />} />
          <Bar dataKey={selectedKey} fill={blue[5]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function CustomShareholdingTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "#fff",
          padding: "10px",
          border: "1px solid #ccc",
        }}
      >
        <strong>Year: {label}</strong>
        {payload.map(entry => (
          <div key={entry.name} style={{ color: entry.color }}>
            {_.startCase(entry.name)}: {entry.value?.toFixed(2)}%
          </div>
        ))}
      </div>
    );
  }
  return null;
}

function Unavailble() {
  return (
    <Result
      status="warning"
      title="Data Unavailable for this stock right now."
    />
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
  const [balanceSheetChartData, setBalanceSheetChartData] = useState(null);
  const [pnlChartData, setPnlChartData] = useState(null);
  const [insightsData, setInsightsData] = useState(null);
  const [newsData, setNewsData] = useState(null); //ISKO KAR

  const financialData = useMemo(() => {
    return {
      "Profit & Loss": pnlChartData
        ? [
            {
              metric: "Book Value (Cr.)",
              values: pnlChartData.map(d => d.bookvalue),
              years: pnlChartData.map(d => d.year),
            },
            {
              metric: "EPS",
              values: pnlChartData.map(d => d.eps),
              years: pnlChartData.map(d => d.year),
            },
            {
              metric: "Net Profit (Cr.)",
              values: pnlChartData.map(d => d.netprofit),
              years: pnlChartData.map(d => d.year),
            },
            {
              metric: "Operating Profit (Cr.)",
              values: pnlChartData.map(d => d.opprofit),
              years: pnlChartData.map(d => d.year),
            },
            {
              metric: "Revenue (Cr.)",
              values: pnlChartData.map(d => d.revenue),
              years: pnlChartData.map(d => d.year),
            },
          ]
        : [],
      "Balance Sheet": balanceSheetChartData
        ? [
            {
              metric: "Cash & Equivalents (Cr.)",
              values: balanceSheetChartData.map(d => d.cashEq),
              years: balanceSheetChartData.map(d => d.year),
            },
            {
              metric: "Debt (Cr.)",
              values: balanceSheetChartData.map(d => d.debt),
              years: balanceSheetChartData.map(d => d.year),
            },
            {
              metric: "Net Worth (Cr.)",
              values: balanceSheetChartData.map(d => d.networth),
              years: balanceSheetChartData.map(d => d.year),
            },
            {
              metric: "Total Assets (Cr.)",
              values: balanceSheetChartData.map(d => d.totalAssets),
              years: balanceSheetChartData.map(d => d.year),
            },
            {
              metric: "Total Liabilities (Cr.)",
              values: balanceSheetChartData.map(d => d.totalLiabilities),
              years: balanceSheetChartData.map(d => d.year),
            },
          ]
        : [],
    };
  }, [balanceSheetChartData, pnlChartData]);

  useEffect(() => {
    if (!fqn) return;
    setLoading(true);
    setError(null);
    setStock(null);
    setPeers(null);
    setStockHoldingChart(null);
    setCashflowChartData(null);
    setInsightsData(null);
    setNewsData(null);

    const fetchStockDetails = async () => {
      try {
        const res = await client.get(`/stock/details/${fqn}`);
        setStock(res.data);
      } catch {
        setError("Failed to fetch stock details.");
      } finally {
        setLoading(false);
      }
    };

    fetchStockDetails();

    client
      .get(`/stock/peers/${fqn}`)
      .then(res => setPeers(res.data))
      .catch(() => setPeers(null));
    client
      .get(`/stock/chart/shareholding/${fqn}`)
      .then(res => setStockHoldingChart(res.data))
      .catch(() => setStockHoldingChart(null));
    client
      .get(`/stock/chart/cashflow/${fqn}`)
      .then(res => {
        const sorted = [...res.data.chartData].sort((a, b) => a.year - b.year);
        setCashflowChartData(sorted);
      })
      .catch(() => setCashflowChartData(null));

    client
      .get(`/stock/chart/balancesheet/${fqn}`)
      .then(res => {
        setBalanceSheetChartData(
          res.data.chartData.sort((a, b) => a.year - b.year)
        );
      })
      .catch(() => setBalanceSheetChartData(null));

    client
      .get(`/stock/chart/pnl/${fqn}`)
      .then(res => {
        setPnlChartData(res.data.chartData.sort((a, b) => a.year - b.year));
      })
      .catch(() => setPnlChartData(null));

    client
      .get(`/stock/chart/annualreport/${fqn}`)
      .then(res => {
        setNewsData(res.data.chartData);
      })
      .catch(() => setPnlChartData(null));

    client
      .get(`/stock/insights/${fqn}`)
      .then(res => {
        setInsightsData(res.data.data);
      })
      .catch(() => setPnlChartData(null));
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

  console.log(insightsData);

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
            {formatValue(stock.price, true)}
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
            {(
              <>
                {stock.details?.slice(0, 1024)}{" "}
                <a
                  href={`https://www.bseindia.com/stock-share-price/${slugify(
                    stock.companyName
                  )}/${stock.companyShortName}/${
                    stock.bseCode
                  }/corp-information/`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ...(read more)
                </a>
              </>
            ) ?? "Company Information Unavailable"}
          </Body1>
        </BusinessSectionLeft>
        <InsightsSection />
      </Section>
      <FlexBox
        column
        width="100%"
        id="pricechart"
        style={{ paddingTop: "1.5em" }}
      >
        <StockChart stockCode={stock.fqn} />
      </FlexBox>
      <FlexBox column width="100%" id="fundamentals">
        <H1 bold>Financial Fundamentals</H1>
        <TableContainer>
          {Object.entries(financialData).map(([section, data]) => {
            // Extract last 3 years from data
            const years = data[0]?.values?.length
              ? data[0].years.slice(-3)
              : [];

            return (
              <div key={section} style={{ width: "48%" }}>
                <Body1 bold>{section}</Body1>

                {!data.length || !years.length ? (
                  <Body1>
                    <br />
                    <Unavailble />
                  </Body1>
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
                              {row.values.slice(-3).map((value, index) => (
                                <TableCell key={index}>
                                  {value !== undefined
                                    ? formatValue(value, true)
                                    : "N/A"}
                                </TableCell>
                              ))}
                            </TableRow>
                          ))}
                        </tbody>
                      </StyledTable>
                    </Table>
                  </ResponsiveTableWrapper>
                )}
              </div>
            );
          })}
        </TableContainer>
      </FlexBox>
      {cashflowChartData && cashflowChartData?.length > 0 && (
        <FlexBox width="100%" column id="cash">
          <H1 bold>Cash Counter</H1>
          <CashFlowSection data={cashflowChartData} />
        </FlexBox>
      )}
      <FlexBox width="100%" column id="peers" rowGap="2rem">
        <FlexBox column>
          <H1 bold>Peer Comparison</H1>
          <Large bold>Similarity by APART</Large>
        </FlexBox>
        <FlexBox width="100%" justify="center" column>
          <Large>
            Conventional industrial classifications and peer determinations are
            cursory, biased &amp; often inaccurate. APART's Similarity Score
            peeps through deep data to find securities &amp; businesses that are
            more similar to each other than the rest. This ensures that you are
            comparing like to like and not apples to oranges!
          </Large>
        </FlexBox>
        {peers && peers.length > 0 ? (
          <PeerComparisonTable peer={peers[0]} currentStock={stock} />
        ) : (
          <Body1>
            <Unavailble />
          </Body1>
        )}
      </FlexBox>
      <Section>
        <ShareholdingLeft width="100%" column id="peers">
          <H1 bold>Shareholding Analysis</H1>
          {stockHoldingChart ? (
            <StackedBarChart data={stockHoldingChart?.chartData} />
          ) : (
            <Unavailble />
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
      <AnnualReportsSection newsData={newsData} />
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
