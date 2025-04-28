import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Table, Input, Button, Checkbox, Dropdown, Menu, Skeleton, Typography, Breadcrumb } from "antd";
import { SearchOutlined, SettingOutlined } from "@ant-design/icons";
import { client } from "@axiosClient";
import styled from "styled-components";
import FlexBox from "@common/UI/FlexBox";
import { device } from "@common/UI/Responsive";
import { useRouter } from "next/router";
import StockTableView from "./StockTable";
import Link from "next/link";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  align-items: center;
  padding: 16px;

  @media ${device.laptop} {
    width: 86.67%;
    margin: auto;
    max-width: 75rem;
  }
`;


export default function StockTable() {
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

  if (loading) {
    return (
      <Wrapper>
        <Skeleton active paragraph={{ rows: 10 }} />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
        <Breadcrumb
          style={{ marginBottom: '1rem' }}
          items={[
            {
              title: <Link href="/watch-list">Watchlists</Link>,
            },
            {
              title: watchlist?.details?.name ?? '',
            },
          ]}
        />
      </div>

      <StockTableView data={data} title={watchlist?.details?.name ?? ''} description={watchlist?.details?.description ?? ''} />
      
    </Wrapper>
  );

}
