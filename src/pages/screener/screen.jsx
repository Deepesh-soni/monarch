import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Skeleton, Card, Typography, Breadcrumb } from "antd";
import "react-querybuilder/dist/query-builder.css";
import { client } from "@axiosClient";
import { device } from "@common/UI/Responsive";
import { decode } from "js-base64";
import { useRouter } from "next/router";
import StockTableView from "../../Components/WatchList/StockTable";
import { toast } from "react-toastify";
import Layout from "../../layout/HomePageLayout";
import Meta from "@layout/Meta";
import Link from "next/link";

const { Title } = Typography;

const Wrapper = styled.div`
  padding: 2rem 1rem;
  min-height: 100vh;
  @media ${device.laptop} {
    width: 86.67%;
    max-width: 75rem;
    margin: auto;
  }
`;

const StyledCard = styled(Card)`
  border-radius: 12px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.05);
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
  gap: 0.75rem;
  padding-bottom: 5px;
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
                const decoded = JSON.parse(decode(preset));
                setScreener(decoded);
                setQuery(decoded?.query);
                setShouldRun(true);
            } catch (e) {
                toast.error("Invalid preset query");
                console.error("Invalid preset query", e);
            }
        }
    }, [router.query]);

    useEffect(() => {
        if (!preset) {
            router.replace("/screener");
        }
    }, [preset]);

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
                                    title: <Link href="/screener">Screener</Link>,
                                },
                                {
                                    title: screener?.details?.name ?? '',
                                },
                            ]}
                        />
                    </div>

                    <div style={{ width: "100%", marginBottom: "1rem" }}>
                        <Title level={2}>
                            {screener?.details?.name ?? "Stock Screener Query"}
                        </Title>
                        <Typography.Text>
                            {screener?.details?.description ?? ""}
                        </Typography.Text>
                    </div>

                    {loadingData ? (
                        <Skeleton
                            active
                            paragraph={{ rows: 8 }}
                            style={{ marginTop: "2rem" }}
                        />
                    ) : (
                        data?.length > 0 && <StockTableView data={data} />
                    )}
                </Wrapper>
            </Layout>
        </>
    );
};

export default ScreenerDefault;
