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

const data = [
  {
    name: "Zomato",
    CMP: 192,
    PE: 37,
    marketCap: 654,
    dividend: 478,
    netProfit: 308,
    profitVar: 39,
    sales: 241,
    salesVar: 550,
    ROCE: 339,
  },
  ...Array(9).fill({
    name: "Info Beans Tech",
    CMP: 192,
    PE: 37,
    marketCap: 654,
    dividend: 478,
    netProfit: 308,
    profitVar: 39,
    sales: 241,
    salesVar: 550,
    ROCE: 339,
  }),
];

const Table = () => {
  const [queryParams] = useQueryParams({
    stocks: withDefault(ArrayParam, []),
  });
  const [loading, setLoading] = useState();

  const fetchWatchlists = async () => {
    setLoading(true);
    try {
      const res = await client.post("/stock/by-fqns", {
        fqns: queryParams?.stocks,
      });
      // setWatchlists(response.data || []);
    } catch (error) {
      console.error("Failed to fetch watchlists", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWatchlists();
  }, []);

  return (
    <Wrapper>
      <FlexBox width="100%" height="100%" column>
        <TableContainer>
          <StyledTable>
            <thead>
              <tr>
                <Th>Name</Th>
                <Th>CMP</Th>
                <Th>P/E</Th>
                <Th>Market Cap</Th>
                <Th>Dividend</Th>
                <Th>Net Profit</Th>
                <Th>Profit Var</Th>
                <Th>Sales</Th>
                <Th>Sales Var</Th>
                <Th>ROCE</Th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <Tr key={index}>
                  <Td>{row.name}</Td>
                  <Td>{row.CMP}</Td>
                  <Td>{row.PE}</Td>
                  <Td>{row.marketCap}</Td>
                  <Td>{row.dividend}</Td>
                  <Td>{row.netProfit}</Td>
                  <Td>{row.profitVar}</Td>
                  <Td>{row.sales}</Td>
                  <Td>{row.salesVar}</Td>
                  <Td>{row.ROCE}</Td>
                </Tr>
              ))}
            </tbody>
          </StyledTable>
        </TableContainer>
      </FlexBox>
    </Wrapper>
  );
};

export default Table;
