import React from "react";
import { Breadcrumb, Typography, Button } from "antd";
import Link from "next/link";
import styled from "styled-components";
import { FaSave } from "react-icons/fa";

const { Title } = Typography;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
  gap: 0.75rem;
`;

const ScreenerHeader = ({ screener, query, handleSave }) => (
    <>
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
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: 8,
                }}
            >
                <ButtonRow>
                    {query && query?.rules?.length > 0 && (
                        <Button type={'primary'} onClick={handleSave}><FaSave /> Save Screen</Button>
                    )}
                </ButtonRow>
            </div>
        </div>
        <div style={{ width: "100%", marginBottom: "1rem" }}>
            <Title level={2}>
                {screener?.details?.name ?? "Stock Screener Query"}
            </Title>
            <Typography.Text>
                {screener?.details?.description ?? ""}
            </Typography.Text>
        </div>
    </>
);

export default ScreenerHeader; 