export const metrics = [
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

export const groupedMetrics = metrics.reduce((acc, metric) => {
    if (!acc[metric.group]) acc[metric.group] = [];
    acc[metric.group].push(metric);
    return acc;
}, {}); 