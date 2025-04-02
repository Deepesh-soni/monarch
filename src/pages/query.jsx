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
import Layout from "../layout/HomePageLayout";

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
  const [query, setQuery] = useState({
    combinator: "and",
    rules: [],
  });
  const [loadingFields, setLoadingFields] = useState(true);
  const [running, setRunning] = useState(false);
  const [shouldRun, setShouldRun] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const { preset } = router.query;
    if (preset) {
      try {
        const decoded = JSON.parse(decode(preset));
        setQuery(decoded);
        setShouldRun(true); // trigger Run Query
      } catch (e) {
        console.error("Invalid preset query", e);
      }
    }
  }, [router.query]);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await client.get("/stock/query-config");
        const parsedFields = response?.data?.fields.map(f => ({
          field: f.name,
          name: f.name,
          label: f.label,
          inputType: f.type === "select" ? "select" : f.type,
          ...(f.type === "select" && f.options ? { values: f.options } : {}),
        }));
        setFields(parsedFields);
      } catch (err) {
        console.error("Error loading query config", err);
      } finally {
        setLoadingFields(false);
      }
    };
    fetchConfig();
  }, []);

  const handleRun = async () => {
    setRunning(true);
    try {
      const response = await client.post("/stock/query", { query });
      console.log(response.data);
    } catch (err) {
      console.error("Query failed", err);
    } finally {
      setRunning(false);
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
        <Title level={3} style={{ color: "#142C8E", marginBottom: "1rem" }}>
          Stock Screener
        </Title>

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
                translations={{ fields: { title: "Select query" } }}
              />
            </QueryBuilderAntD>
          )}

          <ButtonRow>
            <Button type="primary" loading={running} onClick={handleRun}>
              Run Screen
            </Button>
          </ButtonRow>
        </StyledCard>
      </Wrapper>{" "}
    </Layout>
  );
};

export default Query;
