import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { blue } from "@ant-design/colors";
import styled from "styled-components";
import useMobileView from "@hooks/useMobileView";

const TabList = styled.div`
  display: flex;
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  gap: 12px;
  margin-bottom: 16px;
  padding: 0 16px;
  justify-content: center;

  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0,0,0,0.2);
    border-radius: 2px;
  }
`;

const TabItem = styled.div`
  flex: 0 0 auto;
  padding: 8px 16px;
  cursor: pointer;
  white-space: nowrap;
  border-bottom: 2px solid ${({ selected }) => (selected ? "#000" : "transparent")};
  font-weight: ${({ selected }) => (selected ? "bold" : "normal")};
`;

const cashFlowTabs = [
    { key: "cfo", label: "Cash Flow from Operating" },
    { key: "cfi", label: "Cash Flow from Investing" },
    { key: "cff", label: "Cash Flow from Financing" },
    { key: "netcashflow", label: "Net Cash Flow" },
];

function CustomCashflowTooltip({ active, payload, label }) {
    if (active && payload && payload.length) {
        const { name, value, payload: fullData } = payload[0];
        return (
            <div
                style={{
                    background: "#fff",
                    padding: "10px",
                    border: "1px solid #ccc",
                }}
            >
                <strong>Year: {label}</strong>
                <div style={{ marginTop: 4 }}>
                    {cashFlowTabs.find(tab => tab.key === name).label} (Cr.): ₹{" "}
                    {value.toLocaleString("en-IN")}
                </div>
            </div>
        );
    }
    return null;
}

const CashFlow = ({ data = [] }) => {
    const [selectedKey, setSelectedKey] = useState("cfo");
    const isMobile = useMobileView();

    return (
        <>
            <TabList>
                {cashFlowTabs.map(tab => (
                    <TabItem
                        key={tab.key}
                        selected={tab.key === selectedKey}
                        onClick={() => setSelectedKey(tab.key)}
                    >
                        {tab.label}
                    </TabItem>
                ))}
            </TabList>

            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={[...data].sort((a, b) => a.year - b.year)}>
                    <XAxis dataKey="year" />
                    <YAxis
                        tickFormatter={val => `₹ ${val.toLocaleString("en-IN")}`}
                        width={isMobile ? 60 : 100}
                        fontSize={isMobile ? 10 : 'default'}
                    />
                    <Tooltip content={<CustomCashflowTooltip />} />
                    <Bar dataKey={selectedKey} fill={blue[5]} />
                </BarChart>
            </ResponsiveContainer>
        </>
    );
};

export default CashFlow; 