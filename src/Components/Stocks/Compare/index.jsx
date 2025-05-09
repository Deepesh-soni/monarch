import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { client } from "@axiosClient";
import Layout from "../../../layout/HomePageLayout";
import Meta from "@layout/Meta";
import { groupedMetrics } from "./metrics";
import dynamic from "next/dynamic";

const CompareHeader = dynamic(() => import("./CompareHeader"), { ssr: false });
const CompareTableSection = dynamic(() => import("./CompareTableSection"), { ssr: false });

const Wrapper = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: auto;
`;

export default function StockCompare() {
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

    return (
        <>
            <Meta title="Compare Stock" />
            <Layout>
                <Wrapper>
                    <CompareHeader
                        dataA={dataA}
                        dataB={dataB}
                        stockA={stockA}
                        stockB={stockB}
                        setStockA={setStockA}
                        setStockB={setStockB}
                        loadingA={loadingA}
                        loadingB={loadingB}
                    />
                    {(dataA || dataB || loadingA || loadingB) &&
                        Object.entries(groupedMetrics).map(([group, groupMetrics]) => (
                            <CompareTableSection
                                key={group}
                                group={group}
                                groupMetrics={groupMetrics}
                                dataA={dataA}
                                dataB={dataB}
                                loadingA={loadingA}
                                loadingB={loadingB}
                                stockA={stockA}
                                stockB={stockB}
                                formatValue={formatValue}
                            />
                        ))}
                </Wrapper>
            </Layout>
        </>
    );
}
