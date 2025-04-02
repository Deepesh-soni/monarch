import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Table, Input, Button, Checkbox, Dropdown, Menu, Skeleton } from "antd";
import { SearchOutlined, SettingOutlined } from "@ant-design/icons";
import { client } from "@axiosClient";
import styled from "styled-components";
import FlexBox from "@common/UI/FlexBox";
import { device } from "@common/UI/Responsive";
import { useRouter } from "next/router";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  align-items: center;

  @media ${device.laptop} {
    width: 86.67%;
    margin: auto;
    max-width: 75rem;
  }
`;

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
  mcap: "Market Cap",
  sectorName: "Sector",
  industryName: "Industry",
  high52WeekPrice: "52W High",
  low52WeekPrice: "52W Low",
  roeTtm: "ROE TTM",
  debtToEquity: "Debt/Equity",
};

export default function StockTable() {
  const [searchText, setSearchText] = useState("");
  const [visibleColumns, setVisibleColumns] = useState(columnKeysToShow);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [watchlist, setWatchlist] = useState();

  const router = useRouter();

  const fetchWatchlists = useCallback(async () => {
    if (!router?.isReady) return;

    setLoading(true);
    try {
      const response = await client.get(`/watchlist/${router.query.fqn}`);
      const fqns = response.data?.details?.watchlistStocks;
      setWatchlist(response.data);
      const res = await client.post("/stock/by-fqns", {
        fqns: JSON.parse(fqns || []),
      });
      setData(res.data || []);
    } catch (error) {
      console.error("Failed to fetch watchlists", error);
    }
    setLoading(false);
  }, [router.isReady, router.query.fqn]);

  useEffect(() => {
    fetchWatchlists();
  }, [fetchWatchlists]);

  const handleSearch = useCallback(e => {
    setSearchText(e.target.value.toLowerCase());
  }, []);

  const filteredData = useMemo(() => {
    return data?.filter(item =>
      visibleColumns.some(key =>
        String(item[key] ?? "")
          .toLowerCase()
          .includes(searchText)
      )
    );
  }, [searchText, data, visibleColumns]);

  const columns = useMemo(() => {
    return visibleColumns.map(key => ({
      title: allColumns[key],
      dataIndex: key,
      key,
      sorter: (a, b) =>
        (a[key] ?? "").toString().localeCompare((b[key] ?? "").toString()),
    }));
  }, [visibleColumns]);

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

  if (loading) {
    return (
      <Wrapper>
        <Skeleton active paragraph={{ rows: 10 }} />
      </Wrapper>
    );
  }

  console.log(watchlist);

  return (
    <Wrapper>
      <div style={{ width: "100%", marginBottom: "1rem" }}>
        <h2>{watchlist?.details?.name ?? ''}</h2>
        <p>{watchlist?.details?.description ?? ''}</p>
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          gap: 8,
          marginBottom: "1.5rem",
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
    </Wrapper>
  );

}
