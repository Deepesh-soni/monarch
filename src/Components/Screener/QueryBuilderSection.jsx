import React from "react";
import { Skeleton, Button, Typography, Card } from "antd";
import { QueryBuilder } from "react-querybuilder";
import { QueryBuilderAntD } from "@react-querybuilder/antd";
import styled from "styled-components";
import { FaSave } from "react-icons/fa";

const { Title } = Typography;

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

const QueryBuilderSection = ({
    fields,
    query,
    setQuery,
    running,
    handleRun,
    loadingFields
}) => {
    if (loadingFields) {
        return <Skeleton active paragraph={{ rows: 2 }} />;
    }
    return (
        <StyledCard style={{ background: 'rgba(0, 75, 183, 0.2)' }}>
            <Title level={5} style={{ position: 'absolute' }}>Query Builder</Title>
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
            {query && query?.rules?.length > 0 && (
                <ButtonRow>
                    <Button type="primary" loading={running} onClick={handleRun}>
                        Run Screen
                    </Button>
                </ButtonRow>
            )}
        </StyledCard>
    );
};

export default QueryBuilderSection; 