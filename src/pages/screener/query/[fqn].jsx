import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Skeleton, Button, Card, Typography, Breadcrumb } from "antd";
import { QueryBuilder } from "react-querybuilder";
import "react-querybuilder/dist/query-builder.css";
import { client } from "@axiosClient";
import { device } from "@common/UI/Responsive";
import { QueryBuilderAntD } from "@react-querybuilder/antd";
import { useRouter } from "next/router";
import StockTableView from "../../../Components/WatchList/StockTable";
import { toast } from "react-toastify";
import Layout from "../../../layout/HomePageLayout";
import Meta from "@layout/Meta";
import Link from "next/link";
import NewUpdatePopup from "../../../Components/common/NewUpdatePopup";
import { Modal } from "antd"; // for delete confirmation
import { SessionAuth } from "supertokens-auth-react/recipe/session";

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

const QueryPage = () => {
    const [fields, setFields] = useState([]);
    const [query, setQuery] = useState({ combinator: "and", rules: [] });
    const [loadingFields, setLoadingFields] = useState(true);
    const [running, setRunning] = useState(false);
    const [shouldRun, setShouldRun] = useState(false);
    const [data, setData] = useState([]);
    const [loadingData, setLoadingData] = useState(false);
    const [screener, setScreener] = useState(null);
    const router = useRouter();

    const [editMode, setEditMode] = useState(false);

    const { fqn } = router.query;

    useEffect(() => {
        const fetchScreenerData = async () => {
            if (fqn) {
                try {
                    const response = await client.get(`/screener/${fqn}`);
                    if (response?.data) {
                        // Use response.data instead of undefined "decoded"
                        setScreener(response.data);
                        setQuery(response.data.query);
                        setShouldRun(true);
                    } else {
                        throw new Error("No data");
                    }
                } catch (e) {
                    toast.error("Fetching details failed");
                    router.push("/screener");
                }
            }
        };
        fetchScreenerData();
    }, [fqn]);


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
        if (!editMode) {
            setEditMode(true);
        } else {
            setIsNewModalOpen(true);
        }
    }

    const handleDelete = (fqn, name) => {
        Modal.confirm({
            title: `Delete ${name}?`,
            content: `Are you sure you want to delete "${name}"?`,
            onOk: async () => {
                try {
                    await client.delete(`/screener/${fqn}`);
                    toast.success(`${name} deleted successfully!`);
                    setTimeout(() => {
                        router.push('/screener');
                    }, 200);
                } catch (error) {
                    toast.error(`Failed to delete "${name}".`);
                }
            },
        });
    };


    const [isNewModalOpen, setIsNewModalOpen] = useState(false);

    const DummyAddGroupAction = () => null;
    DummyAddGroupAction.destroy = () => { };

    return (
        <>
            <SessionAuth>
                <Meta title="Stock Screener Builder" />
                <NewUpdatePopup
                    visible={isNewModalOpen}
                    toggleModal={() => setIsNewModalOpen(false)}
                    itemType="screener"
                    mode="update"
                    onConfirm={() => {
                        fetchScreener();
                    }}
                    initialValues={{
                        name: screener?.name,
                        description: screener?.description,
                        query: query,
                        fqn: screener?.fqn,
                    }}
                />
                <Layout>
                    <Wrapper>
                        <div
                            style={{
                                paddingTop: '14px',
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                width: "100%",
                                gap: "1rem",
                                flexWrap: "wrap",
                                alignItems: "center",
                            }}
                        >
                            <div style={{ flex: 1, minWidth: 300 }}>
                                <Breadcrumb
                                    items={[
                                        {
                                            title: <Link href="/screener">Screener</Link>,
                                        },
                                        {
                                            title: screener?.name ?? 'New Query',
                                        },
                                    ]}
                                />
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    alignItems: "center",
                                    gap: 8,
                                }}
                            >
                                <ButtonRow>
                                    {query && query?.rules?.length > 0 &&
                                        <Button type={'primary'} onClick={handleSave}>{editMode ? 'Update Screener' : 'Edit Screener'}</Button>
                                    }
                                    <Button color="danger" variant="solid" onClick={() => handleDelete(screener.fqn, screener.name)}>Delete</Button>
                                </ButtonRow>
                            </div>
                        </div>

                        {editMode && <div style={{ width: "100%", marginBottom: "1rem" }}>
                            <Title level={2}>
                                {screener?.name ?? "Stock Screener Query"}
                            </Title>
                            <Typography.Text>
                                {screener?.description ?? ""}
                            </Typography.Text>
                        </div>}



                        {editMode && (
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
                                            controlElements={{ addGroupAction: DummyAddGroupAction }}
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
                            data?.length > 0 && <StockTableView data={data} title={!editMode ? screener?.name ?? 'New Query' : ''} description={!editMode ? screener?.description ?? '' : ''} />
                        )}
                    </Wrapper>
                </Layout>
            </SessionAuth>
        </>
    );
};

export default QueryPage;
