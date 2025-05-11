import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import FlexBox from "@common/UI/FlexBox";
import { Body1, H1 } from "@common/UI/Headings";
import { device } from "@common/UI/Responsive";
import { client } from "@axiosClient";
import { Modal, Select, Button, Spin } from "antd";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import dynamic from "next/dynamic";
import InsightsSection from "./InsightsSection";
import AnnualReportsSection from "./AnnualReports";
import News from "@Components/News";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  padding: 20px;
  align-items: center;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const NavLinks = styled(FlexBox)`
  width: 100%;
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
    width: 50%;
  }
`;

const slugify = text =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-");

// Dynamic imports
const StockHeader = dynamic(() => import("./StockHeader"), { ssr: false });
const SecurityInfo = dynamic(() => import("./SecurityInfo"), { ssr: false });
const StockChart = dynamic(() => import("./StockChart"), { ssr: false });
const FinancialFundamentals = dynamic(() => import("./FinancialFundamentals"), { ssr: false });
const CashFlow = dynamic(() => import("./CashFlow"), { ssr: false });
const PeerComparison = dynamic(() => import("./PeerComparison"), { ssr: false });
const ShareholdingAnalysis = dynamic(() => import("./ShareholdingAnalysis"), { ssr: false });

// AddToWatchlistPopup component
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
  const [newsData, setNewsData] = useState(null);

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
      router.push(`/stocks/compare/${stock.fqn}/${peers?.length > 0 ? peers[0].fqn : ''}`);
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

  return (
    <Wrapper>
      <StockHeader stock={stock} />
      <NavLinks>
        <NavLink href="#security">Security Information</NavLink>
        <NavLink href="#business">Business Description</NavLink>
        <NavLink href="#insights">APART Insights</NavLink>
        <NavLink href="#fundamentals">Financial Fundamentals</NavLink>
        <NavLink href="#cash">Cash Counter</NavLink>
        <NavLink href="#peers">Peer Comparison</NavLink>
      </NavLinks>

      <SecurityInfo
        stock={stock}
        isLoggedIn={isLoggedIn}
        onWatchlistClick={() => setShowWatchlistPopup(true)}
        onCompareClick={handleCompareClick}
      />

      <Section>
        <BusinessSectionLeft id="business">
          <Body1 bold>Business Description</Body1>
          <Body1>
            {stock.details?.slice(0, 756)}{" "}
            <a
              href={`https://www.bseindia.com/stock-share-price/${slugify(
                stock.companyName
              )}/${stock.companyShortName}/${stock.bseCode}/corp-information/`}
              target="_blank"
              rel="noopener noreferrer"
            >
              ...(read more)
            </a>
          </Body1>
        </BusinessSectionLeft>
        <InsightsSection insightsData={insightsData} />
      </Section>

      <FlexBox
        column
        width="100%"
        id="pricechart"
        style={{ paddingTop: "1.5em" }}
      >
        <StockChart stockCode={stock.fqn} />
      </FlexBox>

      <FinancialFundamentals financialData={financialData} />

      {cashflowChartData && cashflowChartData?.length > 0 && (
        <FlexBox width="100%" column id="cash">
          <H1 bold>Cash Counter</H1>
          <CashFlow data={cashflowChartData} />
        </FlexBox>
      )}

      <PeerComparison peers={peers} currentStock={stock} />

      <ShareholdingAnalysis stockHoldingChart={stockHoldingChart} stock={stock} />

      <AnnualReportsSection newsData={newsData} />

      {isLoggedIn && (
        <AddToWatchlistPopup
          visible={showWatchlistPopup}
          onClose={() => setShowWatchlistPopup(false)}
          stockFqn={stock.fqn}
        />
      )}

      <FlexBox width="100%" column id="news">
        <H1 bold>Corporate News</H1>
        <div style={{ paddingTop: '16px' }}>
          <News onlyCompanyNews={true} companyFqn={fqn} />
        </div>
      </FlexBox>
    </Wrapper>
  );
};

export default Stock;
