import React, { useMemo, useState, useCallback } from "react";
import { Table, Input, Dropdown, Checkbox, Button, Menu } from "antd";
import { SearchOutlined, SettingOutlined } from "@ant-design/icons";

const columnKeysToShow = [
    "companyName",
    "nseSymbol",
    "bseCode",
    "price",
    "change",
    "volume",
    "mcap",
    "sectorName",
    "industryName",
    "high52WeekPrice",
    "low52WeekPrice",
    "roeTtm",
    "debtToEquity",
];

const allColumns = {
    companyName: "Company",
    nseSymbol: "NSE Symbol",
    bseCode: "BSE Code",
    price: "Price",
    change: "Change",
    mcap: "Market Cap (Cr.)",
    sectorName: "Sector",
    industryName: "Industry",
    high52WeekPrice: "52W High",
    low52WeekPrice: "52W Low",
    roeTtm: "ROE TTM",
    debtToEquity: "Debt/Equity",
};

const inrKeys = ["price", "mcap", "high52WeekPrice", "low52WeekPrice"];

const StockTableView = ({ data }) => {
    const [visibleColumns, setVisibleColumns] = useState(columnKeysToShow);
    const [searchText, setSearchText] = useState("");

    const handleSearch = useCallback(e => {
        setSearchText(e.target.value.toLowerCase());
    }, []);

    const handleColumnChange = useCallback((key, checked) => {
        setVisibleColumns(prev =>
            checked ? [...prev, key] : prev.filter(col => col !== key)
        );
    }, []);

    const columnSelectorMenu = (
        <Menu>
            {Object.entries(allColumns).map(([key, label]) => (
                <Menu.Item key={key}>
                    <Checkbox
                        checked={visibleColumns.includes(key)}
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
        return visibleColumns.map(key => ({
            title: allColumns[key],
            dataIndex: key,
            key,
            render: (value) => {
                if (inrKeys.includes(key) && typeof value === "number") {
                    return `₹ ${new Intl.NumberFormat("en-IN").format(value)}`;
                }
                return value;
            },
            sorter: (a, b) =>
                (a[key] ?? "").toString().localeCompare((b[key] ?? "").toString()),
        }));
    }, [visibleColumns]);

    return (
        <>
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 8,
                    marginBottom: "1.5rem",
                    paddingTop: '1em'
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

            <Table
                dataSource={filteredData}
                columns={columns}
                rowKey="stockId"
                pagination={{ pageSize: 10 }}
            />
        </>
    );
};

export default StockTableView;
