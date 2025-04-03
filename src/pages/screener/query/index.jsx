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
import StockTableView from "../../../Components/WatchList/StockTable";
import { toast } from "react-toastify";
import Layout from "../../../layout/HomePageLayout";
import { SessionAuth, useSessionContext } from "supertokens-auth-react/recipe/session";
import Meta from "@layout/Meta";
import Link from "next/link";
import NewUpdatePopup from "../../../Components/common/NewUpdatePopup";

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

class DummyAddGroupAction extends React.Component {
    render() {
        return null;
    }
    destroy() {
        // instance destroy: no-op
    }
    static destroy() {
        // static destroy: no-op
    }
}

const StockQueryBuilderIndex = () => {
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



    const [isNewModalOpen, setIsNewModalOpen] = useState(false);


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
                        <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
                            <Breadcrumb
                                style={{ marginBottom: '1rem' }}
                                items={[
                                    {
                                        title: <Link href="/screener">Screener</Link>,
                                    },
                                    {
                                        title: screener?.details?.name ?? 'New Query',
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

                        {query && query?.rules?.length > 0 && <Button type={'primary'} onClick={handleSave}>Save Screen</Button>}

                        {doesSessionExist && !pendingNavigation && (
                            <StyledCard>
                                <Title level={5}>Query Builder</Title>
                                {loadingFields ? (
                                    <Skeleton active paragraph={{ rows: 2 }} />
                                ) : (
                                    <QueryBuilderAntD>
                                        <QueryBuilder
                                            fields={fields}
                                            query={query}
                                            onQueryChange={setQuery}
                                            controlElements={{ addGroupAction: () => null }}
                                            showCombinatorsBetweenRules={false}
                                            enableDragAndDrop={false}
                                        />
                                    </QueryBuilderAntD>
                                )}

                                {query && query?.rules?.length > 0 && <ButtonRow>
                                    <Button type="primary" loading={running} onClick={handleRun}>
                                        Run Screen
                                    </Button>
                                </ButtonRow>}
                            </StyledCard>
                        )}

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
            </SessionAuth>
        </>
    );
};

export default StockQueryBuilderIndex;
