import { useQueryParams, ArrayParam, withDefault } from "use-query-params";
import { useState, useEffect } from "react";
import styled from "styled-components";

import FlexBox from "@common/UI/FlexBox";
import { device } from "@common/UI/Responsive";
import { client } from "@axiosClient";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  padding: 0 1rem;
  align-items: center;
  gap: 0.5rem;
  height: 100%;

  @media ${device.laptop} {
    flex-direction: column;
    justify-content: space-between;
    margin: auto;
    gap: 2.5rem;
    width: 86.67%;
  }
`;

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  padding: 20px;
  border-radius: 10px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Th = styled.th`
  border-bottom: 1px solid #e0e0e0;
  padding: 12px;
  text-align: left;
  font-weight: bold;
  font-size: 14px;
  color: #333;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #e0e0e0;
  font-size: 14px;
  color: #555;
`;

const Tr = styled.tr``;

// const Table = () => {
//   const [queryParams] = useQueryParams({
//     stocks: withDefault(ArrayParam, []),
//   });
//   const [loading, setLoading] = useState();
//   const [stocks, setStocks] = useState();

//   const fetchWatchlists = async () => {
//     debugger;
//     setLoading(true);
//     try {
//       const res = await client.post("/stock/by-fqns", {
//         fqns: queryParams?.stocks,
//       });
//       setStocks(res.data || []);
//       debugger;
//     } catch (error) {
//       console.error("Failed to fetch watchlists", error);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     if (!!queryParams?.stocks?.length) fetchWatchlists();
//   }, [queryParams?.stocks]);

//   //       "stockId": 3172,
//   //       "cmotsCo": 20659,
//   //       "lastRefreshed": "2025-03-30T18:06:56.000Z",
//   //       "fqn": "hathway",
//   //       "bseCode": "533162",
//   //       "nseSymbol": "HATHWAY",
//   //       "companyName": "Hathway Cable & Datacom Ltd",
//   //       "companyShortName": "Hathway Cable",
//   //       "categoryName": "company",
//   //       "isin": "INE982F01036",
//   //       "bseGroup": "B",
//   //       "mcapType": "Small Cap",
//   //       "sectorCode": "00000061",
//   //       "sectorName": "Telecomm-Service",
//   //       "industryCode": "00000090",
//   //       "industryName": "Telecommunications - Service Provider",
//   //       "bseListed": 1,
//   //       "nseListed": 1,
//   //       "mcap": 2299.37,
//   //       "displayType": "GEN",
//   //       "price": 13,
//   //       "open": 13.15,
//   //       "high": 13.6,
//   //       "low": 12.92,
//   //       "volume": 5185239,
//   //       "high52WeekPrice": 25.66,
//   //       "low52WeekPrice": 12.12,
//   //       "change": "-1.14",
//   //       "dividendYield": 0,
//   //       "pbTtm": 0.53,
//   //       "roeTtm": 2.33,
//   //       "roceTtm": 3.28,
//   //       "debtToEquity": 0,
//   //       "ebitdaGrowth": 10.87,
//   //       "evToSales": 1.06,
//   //       "evToEbitda": 4.64,
//   //       "interestCoverageRatios": 54.89,
//   //       "pegRatio": 0.68

//   return (
//     <Wrapper>
//       <FlexBox width="100%" height="100%" column>
//         <TableContainer>
//           <StyledTable>
//             <thead>
//               <tr>
//                 <Th>Name</Th>
//                 <Th>CMP</Th>
//                 <Th>P/E</Th>
//                 <Th>Market Cap</Th>
//                 <Th>Dividend</Th>
//                 <Th>Net Profit</Th>
//                 <Th>Profit Var</Th>
//                 <Th>Sales</Th>
//                 <Th>Sales Var</Th>
//                 <Th>ROCE</Th>
//               </tr>
//             </thead>
//             <tbody>
//               {stocks?.map((stock, index) => (
//                 <Tr key={index}>
//                   <Td>{stock?.companyShortName}</Td>
//                   <Td>{stock?.CMP}</Td>
//                   <Td>{stock?.PE}</Td>
//                   <Td>{stock?.marketCap}</Td>
//                   <Td>{stock?.dividendYield}</Td>
//                   <Td>{stock?.netProfit}</Td>
//                   <Td>{stock?.profitVar}</Td>
//                   <Td>{stock?.price}</Td>
//                   <Td>{stock?.salesVar}</Td>
//                   <Td>{stock?.ROCE}</Td>
//                 </Tr>
//               ))}
//             </tbody>
//           </StyledTable>
//         </TableContainer>
//       </FlexBox>
//     </Wrapper>
//   );
// };

import { Table, Input, Button, Checkbox, Dropdown, Menu } from 'antd';
import { useMemo } from 'react';
import { SearchOutlined, SettingOutlined } from '@ant-design/icons';

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
  const [searchText, setSearchText] = useState('');
  const [visibleColumns, setVisibleColumns] = useState(columnKeysToShow);
  const [data, setData] = useState([]);

  const fetchWatchlists = async () => {
    //setLoading(true);
    try {
      const res = await client.post("/stock/by-fqns", {
        fqns:
          ["ieml", "reliance", "hathway", "ioc"],
      });
      setData(res.data || []);
    } catch (error) {
      console.error("Failed to fetch watchlists", error);
    }
    //setLoading(false);
  };

  useEffect(() => {
    fetchWatchlists();
  }, [])


  const handleSearch = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const filteredData = useMemo(() => {
    return data?.filter((item) =>
      visibleColumns.some(key => String(item[key] ?? '').toLowerCase().includes(searchText))
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
    debtToEquity: "Debt/Equity"
  };

  const columns = visibleColumns.map((key) => ({
    title: allColumns[key],
    dataIndex: key,
    key,
    sorter: (a, b) => (a[key] ?? '').toString().localeCompare((b[key] ?? '').toString()),
  }));

  const columnSelectorMenu = (
    <Menu>
      {Object.entries(allColumns).map(([key, label]) => (
        <Menu.Item key={key}>
          <Checkbox
            checked={visibleColumns.includes(key)}
            onChange={(e) => {
              const checked = e.target.checked;
              setVisibleColumns((prev) =>
                checked ? [...prev, key] : prev.filter((col) => col !== key)
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
      <div style={{ marginBottom: 16, display: 'flex', gap: 8 }}>
        <Input
          placeholder="Search..."
          prefix={<SearchOutlined />}
          onChange={handleSearch}
          style={{ width: 300 }}
        />
        <Dropdown overlay={columnSelectorMenu} trigger={['click']}>
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

