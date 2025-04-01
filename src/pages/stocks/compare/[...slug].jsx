import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { client } from "@axiosClient";
import SearchableDropdown from "@common/UI/Search/SearchDropdownCmp";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import Layout from "../../../layout/HomePageLayout";

const Wrapper = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: auto;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1rem;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
`;

const CompareTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 2rem;
`;

const Th = styled.th`
  text-align: left;
  font-weight: 600;
  color: #555;
  padding: 0.5rem 1rem;
`;

const Td = styled.td`
  padding: 0.5rem 1rem;
  border-top: 1px solid #eee;
`;

const Difference = styled.span`
  font-weight: 600;
  color: ${props => (props.positive ? "green" : "red")};
`;

const metrics = [
  { key: "mcap", label: "Market Cap" },
  { key: "price", label: "Current Price" },
  { key: "high52WeekPrice", label: "52 Week High" },
  { key: "low52WeekPrice", label: "52 Week Low" },
  { key: "pbTtm", label: "P/B Ratio" },
  { key: "roeTtm", label: "ROE (TTM)" },
  { key: "peRatio", label: "P/E Ratio" },
  { key: "dividendYield", label: "Dividend Yield" },
  { key: "pegRatio", label: "PEG Ratio" },
];

export default function StockComparePage() {
  const router = useRouter();
  const { query } = router;
  const [stockA, setStockA] = useState(null);
  const [stockB, setStockB] = useState(null);
  const [dataA, setDataA] = useState(null);
  const [dataB, setDataB] = useState(null);

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
    if (stockA && typeof stockA === "string") fetchStock(stockA, setDataA);
  }, [stockA]);

  useEffect(() => {
    if (stockB && typeof stockB === "string") fetchStock(stockB, setDataB);
  }, [stockB]);

  const fetchStock = async (fqn, setter) => {
    try {
      const res = await client.get(`/stock/details/${fqn}`);
      setter(res.data);
    } catch (err) {
      console.error("Failed to fetch", fqn, err);
    }
  };

  return (
    <Layout>
      <Wrapper>
        <Title>Stock Comparison</Title>
        <Row>
          <SearchableDropdown
            placeholder="Select Stock A"
            width="100%"
            onChange={item => setStockA(item.fqn)}
            value={stockA}
          />
          <FaArrowRightArrowLeft size={24} />
          <SearchableDropdown
            placeholder="Select Stock B"
            width="100%"
            onChange={item => setStockB(item.fqn)}
            value={stockB}
          />
        </Row>

        {(dataA || dataB) && (
          <CompareTable>
            <thead>
              <tr>
                <Th>Metric</Th>
                <Th>{dataA?.companyName || (dataA ? stockA : "-")}</Th>
                <Th>{dataB?.companyName || (dataB ? stockB : "-")}</Th>
                <Th>Difference</Th>
              </tr>
            </thead>
            <tbody>
              {metrics.map(({ key, label }) => {
                const a = dataA?.[key];
                const b = dataB?.[key];
                const isNumeric =
                  typeof a === "number" && typeof b === "number";
                const diff = isNumeric
                  ? (((b - a) / a) * 100).toFixed(1)
                  : null;
                return (
                  <tr key={key}>
                    <Td>{label}</Td>
                    <Td>{a !== undefined ? `₹ ${a}` : "-"}</Td>
                    <Td>{b !== undefined ? `₹ ${b}` : "-"}</Td>
                    <Td>
                      {isNumeric ? (
                        <Difference positive={diff > 0}>
                          {diff > 0 ? `+${diff}%` : `${diff}%`}
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
        )}
      </Wrapper>
    </Layout>
  );
}
