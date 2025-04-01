import { useState, useEffect } from "react";
import { Table, Input, Button, Checkbox, Dropdown, Menu } from "antd";
import { useMemo } from "react";
import { SearchOutlined, SettingOutlined } from "@ant-design/icons";

import { client } from "@axiosClient";

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

export default function StockTable() {
  const [searchText, setSearchText] = useState("");
  const [visibleColumns, setVisibleColumns] = useState(columnKeysToShow);
  const [data, setData] = useState([]);

  const fetchWatchlists = async () => {
    //setLoading(true);
    try {
      const res = await client.post("/stock/by-fqns", {
        fqns: ["ieml", "reliance", "hathway", "ioc"],
      });
      setData(res.data || []);
    } catch (error) {
      console.error("Failed to fetch watchlists", error);
    }
    //setLoading(false);
  };

  useEffect(() => {
    fetchWatchlists();
  }, []);

  const handleSearch = e => {
    setSearchText(e.target.value.toLowerCase());
  };

  const filteredData = useMemo(() => {
    return data?.filter(item =>
      visibleColumns.some(key =>
        String(item[key] ?? "")
          .toLowerCase()
          .includes(searchText)
      )
    );
  }, [searchText, data, visibleColumns]);

  const allColumns = {
    companyName: "Company",
    nseSymbol: "NSE Symbol",
    bseCode: "BSE Code",
    price: "Price",
    change: "Change",
    volume: "Volume",
    mcap: "Market Cap",
    sectorName: "Sector",
    industryName: "Industry",
    high52WeekPrice: "52W High",
    low52WeekPrice: "52W Low",
    roeTtm: "ROE TTM",
    debtToEquity: "Debt/Equity",
  };

  const columns = visibleColumns.map(key => ({
    title: allColumns[key],
    dataIndex: key,
    key,
    sorter: (a, b) =>
      (a[key] ?? "").toString().localeCompare((b[key] ?? "").toString()),
  }));

  const columnSelectorMenu = (
    <Menu>
      {Object.entries(allColumns).map(([key, label]) => (
        <Menu.Item key={key}>
          <Checkbox
            checked={visibleColumns.includes(key)}
            onChange={e => {
              const checked = e.target.checked;
              setVisibleColumns(prev =>
                checked ? [...prev, key] : prev.filter(col => col !== key)
              );
            }}
          >
            {label}
          </Checkbox>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div>
      <div style={{ marginBottom: 16, display: "flex", gap: 8 }}>
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
    </div>
  );
}
