import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Skeleton, Button, Card, Typography } from "antd";
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
import { useSessionContext } from "supertokens-auth-react/recipe/session";

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

const Query = () => {
  const [fields, setFields] = useState([]);
  const [query, setQuery] = useState({ combinator: "and", rules: [] });
  const [loadingFields, setLoadingFields] = useState(true);
  const [running, setRunning] = useState(false);
  const [shouldRun, setShouldRun] = useState(false);
  const [data, setData] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [screener, setScreener] = useState(null);
  const router = useRouter();

  const { doesSessionExist } = useSessionContext();

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
        console.error("Error loading query config", err);
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

  return (
    <Layout>
      <Wrapper>
        <div style={{ width: "100%", marginBottom: "1rem" }}>
          <Title level={2}>
            {screener?.details?.name ?? "Stock Screener Query"}
          </Title>
          <Typography.Text>
            {screener?.details?.description ?? ""}
          </Typography.Text>
        </div>

        {doesSessionExist && !preset && (
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

            <ButtonRow>
              <Button type="primary" loading={running} onClick={handleRun}>
                Run Screen
              </Button>
            </ButtonRow>
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
  );
};

export default Query;
