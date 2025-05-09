import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Skeleton, Breadcrumb } from "antd";
import "react-querybuilder/dist/query-builder.css";
import { client } from "@axiosClient";
import { device } from "@common/UI/Responsive";
import { decode } from "js-base64";
import { useRouter } from "next/router";
import StockTableView from "../WatchList/StockTable";
import { toast } from "react-toastify";
import Layout from "../../layout/HomePageLayout";
import Meta from "@layout/Meta";
import Link from "next/link";

const Wrapper = styled.div`
  padding: 2rem 1rem;
  min-height: 100vh;
  @media ${device.laptop} {
    width: 86.67%;
    max-width: 75rem;
    margin: auto;
  }
`;

const ScreenerDefault = () => {
    const [query, setQuery] = useState({ combinator: "and", rules: [] });
    const [shouldRun, setShouldRun] = useState(false);
    const [data, setData] = useState([]);
    const [loadingData, setLoadingData] = useState(false);
    const [screener, setScreener] = useState(null);
    const router = useRouter();

    const { preset } = router.query;

    useEffect(() => {
        if (preset) {
            try {
                const decoded = JSON.parse(decode(decodeURIComponent(preset)));
                setScreener(decoded);
                setQuery(decoded?.query);
                setShouldRun(true);
            } catch (e) {
                toast.error("Invalid preset query");
                console.error("Invalid preset query", e);
            }
        }
    }, [preset, router.query]);

    useEffect(() => {
        if (!preset) {
            router.replace("/screener");
        }
    }, [preset, router]);

    const handleRun = async () => {
        setLoadingData(true);
        try {
            const response = await client.post("/stock/query", { query });
            setData(response.data);
        } catch (err) {
            toast.error("Query failed");
            console.error("Query failed", err);
        } finally {
            setLoadingData(false);
        }
    };

    useEffect(() => {
        if (shouldRun) {
            handleRun();
            setShouldRun(false);
        }
    }, [shouldRun]);

    return (
        <>
            <Meta title="Stock Screener Builder" />
            <Layout>
                <Wrapper>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
                        <Breadcrumb
                            style={{ marginBottom: '1rem' }}
                            items={[
                                {
                                    title: <Link href="/screener">Screens</Link>,
                                },
                                {
                                    title: screener?.details?.name ?? '',
                                },
                            ]}
                        />
                    </div>

                    {loadingData ? (
                        <Skeleton
                            active
                            paragraph={{ rows: 8 }}
                            style={{ marginTop: "2rem" }}
                        />
                    ) : (
                        data?.length > 0 && <StockTableView title={screener?.details?.name ?? "Stock Screens Query"} description={screener?.details?.description ?? ""} data={data} />
                    )}
                </Wrapper>
            </Layout>
        </>
    );
};

export default ScreenerDefault;
