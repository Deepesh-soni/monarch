import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Skeleton, Button, Card, Typography, Breadcrumb } from "antd";
import { QueryBuilder } from "react-querybuilder";
import "react-querybuilder/dist/query-builder.css";
import { client } from "@axiosClient";
import { device } from "@common/UI/Responsive";
import { QueryBuilderAntD } from "@react-querybuilder/antd";
import { decode } from "js-base64";
import { useRouter } from "next/router";
import StockTableView from "../WatchList/StockTable";
import { toast } from "react-toastify";
import Layout from "../../layout/HomePageLayout";
import { SessionAuth, useSessionContext } from "supertokens-auth-react/recipe/session";
import Meta from "@layout/Meta";
import Link from "next/link";
import NewUpdatePopup from "../common/NewUpdatePopup";
import { FaSave } from "react-icons/fa";
import ScreenerHeader from "./ScreenerHeader";
import QueryBuilderSection from "./QueryBuilderSection";
import ScreenerResultTable from "./ScreenerResultTable";

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
`;

const StockQueryBuilderIndex = () => {

    const [isNewModalOpen, setIsNewModalOpen] = useState(false);
    const [fields, setFields] = useState([]);
    const [query, setQuery] = useState({ combinator: "and", rules: [] });
    const [loadingFields, setLoadingFields] = useState(true);
    const [running, setRunning] = useState(false);
    const [shouldRun, setShouldRun] = useState(false);
    const [data, setData] = useState([]);
    const [loadingData, setLoadingData] = useState(false);
    const [screener, setScreener] = useState(null);
    const router = useRouter();
    const [pendingNavigation, setPendingNavigation] = useState(null);

    const { doesSessionExist } = useSessionContext();

    const { fqn } = router.query;

    const fetchDetails = async () => {
        try {
            const response = await client.get(`/screener/${fqn}`);
            if (response?.data) {
                setScreener(decoded);
                setQuery(decoded?.query);
                setShouldRun(true);
            } else {
                throw Error();
            }
        } catch (e) {
            toast.error('Fetching details failed');
        }
    }

    useEffect(() => {
        if (fqn) {
            fetchDetails();
        }
    }, [router.query]);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const response = await client.get("/stock/query-config");
                const parsedFields = response?.data?.fields.map(f => {
                    const isSelect = f.type === "select" && Array.isArray(f.options);

                    return {
                        field: f.name,
                        name: f.name,
                        label: f.label,
                        inputType: isSelect ? "select" : f.type,
                        valueEditorType: isSelect ? "select" : undefined,
                        ...(isSelect
                            ? {
                                values: f.options.map(opt => ({ name: opt, label: opt })),
                            }
                            : {}),
                    };
                });

                setFields(parsedFields);
            } catch (err) {
                toast.error("Failed to load query config");
            } finally {
                setLoadingFields(false);
            }
        };
        fetchConfig();
    }, []);

    const handleRun = async () => {
        setRunning(true);
        setLoadingData(true);
        try {
            const response = await client.post("/stock/query", { query });
            setData(response.data);
        } catch (err) {
            toast.error("Query failed");
            console.error("Query failed", err);
        } finally {
            setRunning(false);
            setLoadingData(false);
        }
    };

    useEffect(() => {
        if (!loadingFields && shouldRun) {
            handleRun();
            setShouldRun(false);
        }
    }, [loadingFields, shouldRun]);

    const handleSave = () => {
        setIsNewModalOpen(true);
    }

    useEffect(() => {
        if (pendingNavigation && !isNewModalOpen) {
            router.push(pendingNavigation);
            setPendingNavigation(null);
        }
    }, [pendingNavigation, router, isNewModalOpen]);

    return (
        <>
            <SessionAuth>
                <Meta title="Stock Screener Builder" />
                <NewUpdatePopup
                    visible={isNewModalOpen}
                    toggleModal={() => setIsNewModalOpen(false)}
                    itemType="screener"
                    mode="new"
                    onConfirm={(response) => {
                        if (response?.data) {
                            setIsNewModalOpen(false); // Close the modal first
                            setPendingNavigation(`/screener/query/${response?.data.fqn}`);
                        }
                    }}
                    initialValues={{
                        name: '',
                        description: '',
                        query: query
                    }}
                />
                <Layout>
                    <Wrapper>
                        <ScreenerHeader screener={screener} query={query} handleSave={handleSave} />
                        {doesSessionExist && !pendingNavigation && (
                            <QueryBuilderSection
                                fields={fields}
                                query={query}
                                setQuery={setQuery}
                                running={running}
                                handleRun={handleRun}
                                loadingFields={loadingFields}
                            />
                        )}
                        <ScreenerResultTable loadingData={loadingData} data={data} />
                    </Wrapper>
                </Layout>
            </SessionAuth>
        </>
    );
};

export default StockQueryBuilderIndex;
