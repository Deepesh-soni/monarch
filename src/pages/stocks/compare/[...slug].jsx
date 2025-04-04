import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { client } from "@axiosClient";
import SearchableDropdown from "@common/UI/Search/SearchDropdownCmp";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import Layout from "../../../layout/HomePageLayout";
import Meta from "@layout/Meta";
import { Breadcrumb, Skeleton } from "antd";
import Link from "next/link";

const Wrapper = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: auto;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #6b7280;
  margin-bottom: 2rem;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const CompareCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const SectionSubtitle = styled.p`
  font-size: 0.9rem;
  color: #6b7280;
  margin-bottom: 1rem;
`;

const CompareTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  font-weight: 600;
  color: #6b7280;
  padding: 0.75rem 1rem;
`;

const Td = styled.td`
  padding: 0.75rem 1rem;
  border-top: 1px solid #e5e7eb;
`;

const Difference = styled.span`
  font-weight: 600;
  color: ${(props) => (props.positive ? "#16a34a" : "#dc2626")};
`;

const metrics = [
    { key: "mcap", label: "Market Cap", start: "₹ ", end: " Cr.", group: "Market Metrics" },
    { key: "price", label: "Current Price", start: "₹ ", group: "Market Metrics" },
    { key: "high52WeekPrice", label: "52 Week High", start: "₹ ", group: "Market Metrics" },
    { key: "low52WeekPrice", label: "52 Week Low", start: "₹ ", group: "Market Metrics" },
    { key: "eps", label: "Earnings Per Share (EPS)", group: "Financial Metrics" },
    { key: "bookvalue", label: "Book Value", start: "₹ ", group: "Financial Metrics" },
    { key: "networth", label: "Net Worth", start: "₹ ", group: "Financial Metrics" },
    { key: "totalassets", label: "Total Assets", start: "₹ ", group: "Financial Metrics" },
    { key: "netprofit", label: "Net Profit", start: "₹ ", group: "Financial Metrics" },
    { key: "revenue", label: "Revenue", start: "₹ ", group: "Financial Metrics" },
    { key: "pbTtm", label: "P/B Ratio", group: "Valuation Metrics" },
    { key: "peRatio", label: "P/E Ratio", group: "Valuation Metrics" },
    { key: "dividendYield", label: "Dividend Yield", group: "Valuation Metrics" },
    { key: "pegRatio", label: "PEG Ratio", group: "Valuation Metrics" },
    { key: "roeTtm", label: "ROE (TTM)", group: "Profitability Metrics" },
    { key: "roceTtm", label: "ROCE (TTM)", group: "Profitability Metrics" },
    { key: "roa", label: "ROA", group: "Profitability Metrics" },
    { key: "grossprofitmargin", label: "Gross Profit Margin", group: "Profitability Metrics" },
    { key: "netprofitmargin", label: "Net Profit Margin", group: "Profitability Metrics" },
    { key: "opm", label: "Operating Profit Margin (OPM)", group: "Profitability Metrics" },
    { key: "profitgrowth", label: "Profit Growth %", group: "Growth Metrics" },
    { key: "salesgrowth", label: "Sales Growth %", group: "Growth Metrics" },
    { key: "qtr_sales", label: "Quarterly Sales", start: "₹ ", group: "Growth Metrics" },
    { key: "qtr_pat", label: "Quarterly PAT", start: "₹ ", group: "Growth Metrics" },
    { key: "qtr_yoygrowth", label: "Qtr YoY Growth %", group: "Growth Metrics" },
    { key: "currentratio", label: "Current Ratio", group: "Balance Sheet Metrics" },
    { key: "debtToEquity", label: "Debt to Equity", group: "Balance Sheet Metrics" },
];

export default function StockComparePage() {
    const router = useRouter();
    const { query } = router;
    const [stockA, setStockA] = useState(null);
    const [stockB, setStockB] = useState(null);
    const [dataA, setDataA] = useState(null);
    const [dataB, setDataB] = useState(null);

    const [loadingA, setLoadingA] = useState(false);
    const [loadingB, setLoadingB] = useState(false);


    useEffect(() => {
        if (Array.isArray(query?.slug)) {
            if (query.slug.length === 2) {
                setStockA(query.slug[0]);
                setStockB(query.slug[1]);
            } else if (query.slug.length === 1) {
                setStockA(query.slug[0]);
            }
        }
    }, [query]);

    useEffect(() => {
        if (stockA && typeof stockA === "string") fetchStock(stockA, setDataA, setLoadingA);
    }, [stockA]);

    useEffect(() => {
        if (stockB && typeof stockB === "string") fetchStock(stockB, setDataB, setLoadingB);
    }, [stockB]);

    const fetchStock = async (fqn, setter, setLoading) => {
        try {
            setLoading(true);
            const res = await client.get(`/stock/details/${fqn}`);
            setter(res.data);
        } catch (err) {
            console.error("Failed to fetch", fqn, err);
        } finally {
            setLoading(false);
        }
    };


    const formatValue = (key, val, start = '', end = '') => {
        const invalid = val === undefined || val === null || val === 0 || isNaN(val);
        if (invalid) return "-";

        const inrKeys = [
            "mcap", "price", "high52WeekPrice", "low52WeekPrice", "bookvalue",
            "networth", "netprofit", "revenue", "totalassets", "qtr_sales", "qtr_pat"
        ];

        return inrKeys.includes(key)
            ? start + new Intl.NumberFormat("en-IN").format(parseFloat(val)?.toFixed(2)) + end
            : start + parseFloat(val)?.toFixed(2) + end;
    };

    const grouped = metrics.reduce((acc, metric) => {
        if (!acc[metric.group]) acc[metric.group] = [];
        acc[metric.group].push(metric);
        return acc;
    }, {});

    return (
        <>
            <Meta title="Compare Stock" />
            <Layout>
                <Wrapper>
                    <Breadcrumb
                        style={{ marginBottom: '1rem' }}
                        items={[
                            {
                                title: <Link href="/"> Home</Link>,
                            },
                            {
                                title: dataA ? <Link href={`/stocks/${dataA?.fqn}`}>{dataA?.companyName}</Link> : '',
                            },
                            {
                                title: "Compare",
                            },
                        ]}
                    />
                    <Title>Stock Comparison</Title>
                    <Subtitle>Compare key metrics between two stocks</Subtitle>
                    <Row>
                        <SearchableDropdown
                            placeholder="Select Stock A"
                            width="100%"
                            onChange={(item) => setStockA(item.fqn)}
                            value={stockA}
                        />
                        <FaArrowRightArrowLeft size={24} />
                        <SearchableDropdown
                            placeholder="Select Stock B"
                            width="100%"
                            onChange={(item) => setStockB(item.fqn)}
                            value={stockB}
                        />
                    </Row>

                    {(dataA || dataB || loadingA || loadingB) &&
                        Object.entries(grouped).map(([group, groupMetrics]) => (
                            <CompareCard key={group}>
                                <SectionTitle>{group}</SectionTitle>
                                <SectionSubtitle>Compare key market performance indicators</SectionSubtitle>

                                <Skeleton loading={loadingA || loadingB} active paragraph={{ rows: groupMetrics.length + 1 }}>
                                    <CompareTable>
                                        <thead>
                                            <tr>
                                                <Th>Metric</Th>
                                                <Th>{dataA?.companyName || stockA || "-"}</Th>
                                                <Th>{dataB?.companyName || stockB || "-"}</Th>
                                                <Th>Difference</Th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {groupMetrics.map(({ key, label, start = "", end = "" }) => {
                                                const a = dataA?.[key];
                                                const b = dataB?.[key];
                                                const isValid =
                                                    typeof a === "number" &&
                                                    typeof b === "number" &&
                                                    a !== 0 &&
                                                    !isNaN(a) &&
                                                    !isNaN(b);
                                                const diff = isValid ? (((b - a) / a) * 100).toFixed(2) : null;

                                                return (
                                                    <tr key={key}>
                                                        <Td>{label}</Td>
                                                        <Td>{formatValue(key, a, start, end)}</Td>
                                                        <Td>{formatValue(key, b, start, end)}</Td>
                                                        <Td>
                                                            {diff !== null ? (
                                                                <Difference positive={parseFloat(diff) > 0}>
                                                                    {parseFloat(diff) > 0 ? `+${diff}%` : `${diff}%`}
                                                                </Difference>
                                                            ) : (
                                                                "-"
                                                            )}
                                                        </Td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </CompareTable>
                                </Skeleton>
                            </CompareCard>
                        ))}

                </Wrapper>
            </Layout>
        </>
    );
}
