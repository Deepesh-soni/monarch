import React, { useMemo, useState, useCallback, useEffect } from "react";
import { Table, Input, Dropdown, Checkbox, Button, Menu, Typography } from "antd";
import { SearchOutlined, SettingOutlined } from "@ant-design/icons";
import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css";
import { isNumber } from "lodash";
const { Title } = Typography;
const STORAGE_KEY = "stock_table_preferences";

const columnKeysToShow = [
    "companyName", "nseSymbol", "bseCode", "price", "change", "volume",
    "mcap", "sectorName", "industryName", "high52WeekPrice", "low52WeekPrice",
    "roeTtm", "debtToEquity",
    "cashcc", "cash_op", "eps", "grossprofitmargin", "netprofit",
    "netprofitmargin", "netcashflow", "profitgrowth", "roa", "revenue",
    "salesgrowth", "bookvalue", "networth", "totalassets", "totalliabilities",
    "qtr_sales", "opm", "qtr_pat", "qtr_yoygrowth", "pts", "enterpricevalue",
    "cash_investing", "cash_financing", "currentratio"
];


const allColumns = {
    companyName: "Company",
    nseSymbol: "NSE Symbol",
    bseCode: "BSE Code",
    price: "Price",
    change: "Change",
    volume: "Volume",
    mcap: "Market Cap (Cr.)",
    sectorName: "Sector",
    industryName: "Industry",
    high52WeekPrice: "52W High",
    low52WeekPrice: "52W Low",
    roeTtm: "ROE TTM",
    debtToEquity: "Debt/Equity",
    cashcc: "Cash from Core",
    cash_op: "Cash from Ops",
    eps: "EPS",
    grossprofitmargin: "Gross Profit Margin",
    netprofit: "Net Profit",
    netprofitmargin: "Net Profit Margin",
    netcashflow: "Net Cash Flow",
    profitgrowth: "Profit Growth",
    roa: "ROA",
    revenue: "Revenue",
    salesgrowth: "Sales Growth",
    bookvalue: "Book Value",
    networth: "Net Worth",
    totalassets: "Total Assets",
    totalliabilities: "Total Liabilities",
    qtr_sales: "Quarterly Sales",
    opm: "Operating Profit Margin",
    qtr_pat: "Quarterly PAT",
    qtr_yoygrowth: "Qtr YoY Growth",
    pts: "Price to Sales",
    enterpricevalue: "Enterprise Value",
    cash_investing: "Cash from Investing",
    cash_financing: "Cash from Financing",
    currentratio: "Current Ratio"
};

const inrKeys = [
    "price",
    "mcap",
    "high52WeekPrice",
    "low52WeekPrice",
    "bookvalue",
    "networth",
    "netprofit",
    "revenue",
    "totalassets",
    "cashcc",             // Cash from Core
    "cash_op",            // Cash from Operations
    "netcashflow",        // Net Cash Flow
    "qtr_sales",          // Quarterly Sales
    "qtr_pat",            // Quarterly Profit After Tax
    "enterpricevalue",    // Enterprise Value
    "cash_investing",     // Cash from Investing Activities
    "cash_financing"      // Cash from Financing Activities
];

const NON_REMOVABLE_COLUMNS = ["companyName", "price"];


const ResizableTitle = props => {
    const { onResize, width, ...restProps } = props;
    if (!width) return <th {...restProps} />;
    return (
        <Resizable
            width={width}
            height={0}
            handle={<span className="react-resizable-handle" />}
            onResize={onResize}
            draggableOpts={{ enableUserSelectHack: false }}
        >
            <th {...restProps} />
        </Resizable>
    );
};

const StockTableView = ({ data, title = '', description = '' }) => {
    const [visibleColumns, setVisibleColumns] = useState(columnKeysToShow);
    const [columnWidths, setColumnWidths] = useState({});
    const [searchText, setSearchText] = useState("");
    const [pageSize, setPageSize] = useState(10);

    // Load saved preferences
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            setVisibleColumns(parsed.visibleColumns || columnKeysToShow);
            setColumnWidths(parsed.columnWidths || {});
            setPageSize(parsed.pageSize || 10);
        }
    }, []);

    // Save preferences to localStorage
    const saveToLocalStorage = (updates) => {
        const current = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
        const updated = { ...current, ...updates };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    };

    const handleSearch = useCallback(e => {
        setSearchText(e.target.value.toLowerCase());
    }, []);


    const handleColumnChange = useCallback((key, checked) => {
        setVisibleColumns(prev => {
            let updated = checked ? [...prev, key] : prev.filter(col => col !== key);
            NON_REMOVABLE_COLUMNS.forEach(col => {
                if (!updated.includes(col)) updated.push(col);
            });
            saveToLocalStorage({ visibleColumns: updated });
            return updated;
        });
    }, []);


    const handleResize = index => (e, { size }) => {
        const key = visibleColumns[index];
        setColumnWidths(prev => {
            const updated = { ...prev, [key]: size.width };
            saveToLocalStorage({ columnWidths: updated });
            return updated;
        });
    };

    const columnSelectorMenu = (
        <Menu
            style={{
                maxHeight: 350,
                overflowY: "scroll", // always show scrollbar
                scrollbarWidth: "auto", // Firefox
            }}
        >
            {Object.entries(allColumns).map(([key, label]) => (
                <Menu.Item key={key}>
                    <Checkbox
                        checked={visibleColumns.includes(key)}
                        disabled={NON_REMOVABLE_COLUMNS.includes(key)}
                        onChange={e => handleColumnChange(key, e.target.checked)}
                    >
                        {label}
                    </Checkbox>
                </Menu.Item>
            ))}
        </Menu>
    );

    const filteredData = useMemo(() => {
        return data?.filter(item =>
            visibleColumns.some(key =>
                String(item[key] ?? "").toLowerCase().includes(searchText)
            )
        );
    }, [data, visibleColumns, searchText]);

    const columns = useMemo(() => {
        return visibleColumns.map((key, index) => ({
            title: allColumns[key],
            dataIndex: key,
            key,
            width: columnWidths[key] || 150,
            onHeaderCell: column => ({
                width: columnWidths[key] || 150,
                onResize: handleResize(index),
            }),
            render: (value, record) => {
                if (key === "companyName" && record?.fqn) {
                    return <a href={`/stocks/${record.fqn}`} target="_blank" rel="noopener noreferrer">{value}</a>;
                }
                if (inrKeys.includes(key) && typeof value === "number") {
                    return `₹ ${new Intl.NumberFormat("en-IN").format(value?.toFixed(2))}`;
                }
                if(isNumber(value)) return value?.toFixed(2);
                return value;
            },
            sorter: (a, b) => {
                const valA = a[key];
                const valB = b[key];
                if (typeof valA === "number" && typeof valB === "number") {
                    return valA - valB;
                }
                return String(valA ?? "").localeCompare(String(valB ?? ""));
            },
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        placeholder={`Search ${key}`}
                        value={selectedKeys[0]}
                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => confirm()}
                        style={{ marginBottom: 8, display: "block" }}
                    />
                    <div style={{ display: "flex", gap: 8 }}>
                        <Button type="primary" onClick={() => confirm()} size="small">Search</Button>
                        <Button onClick={() => {
                            clearFilters()
                            confirm()
                        }} size="small">Reset</Button>
                    </div>
                </div>
            ),
            onFilter: (value, record) =>
                String(record[key] ?? "").toLowerCase().includes(value.toLowerCase()),
        }));
    }, [visibleColumns, columnWidths]);


    return (
        <>
            <div
                style={{
                    paddingTop: '14px',
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    width: "100%",
                    marginBottom: "1.5rem",
                    gap: "1rem",
                    flexWrap: "wrap", // Optional: wrap on small screens
                    alignItems: "end",
                }}
            >
                {/* Left: Title and Description */}
                <div style={{ flex: 1, minWidth: 300 }}>
                    {title && <>
                        <Title level={2}>
                            {title}
                        </Title>
                        <Typography.Text>
                            {description}
                        </Typography.Text>
                    </>}
                </div>

                {/* Right: Search + Dropdown */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        gap: 8,
                    }}
                >
                    <Input
                        placeholder="Search..."
                        prefix={<SearchOutlined />}
                        onChange={handleSearch}
                        style={{ width: 300 }}
                    />
                    <Dropdown overlay={columnSelectorMenu} trigger={["click"]}>
                        <Button icon={<SettingOutlined />}>Columns</Button>
                    </Dropdown>
                </div>
            </div>

            <div style={{ width: "100%", overflowX: "auto" }}>
                <Table
                    dataSource={filteredData}
                    columns={columns}
                    rowKey="stockId"
                    scroll={{ x: 2000, y: 500 }}
                    virtual
                    pagination={{
                        pageSize,
                        showSizeChanger: true,
                        onShowSizeChange: (_, size) => {
                            setPageSize(size);
                            saveToLocalStorage({ pageSize: size });
                        }
                    }}
                    components={{ header: { cell: ResizableTitle } }} // 👈 this is key
                />
            </div>
        </>
    );
};

export default StockTableView;
