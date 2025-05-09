import React from "react";
import { Skeleton } from "antd";
import TextWithEllipsis from "@common/ElipsisText";
import styled from "styled-components";

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`;

const CompareTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  min-width: 650px;
`;

const Th = styled.th`
  text-align: left;
  font-weight: 600;
  color: #6b7280;
  padding: 0.75rem 1rem;
  white-space: nowrap;
`;

const Td = styled.td`
  padding: 0.75rem 1rem;
  border-top: 1px solid #e5e7eb;
  white-space: nowrap;
`;

const MetricColumn = styled(Th)`
  width: 20%;
`;

const ValueColumn = styled(Th)`
  width: 30%;
`;

const DiffColumn = styled(Th)`
  width: 20%;
`;

const Difference = styled.span`
  font-weight: 600;
  color: ${(props) => (props.positive ? "#16a34a" : "#dc2626")};
`;

const CompareTableSection = ({ group, groupMetrics, dataA, dataB, loadingA, loadingB, stockA, stockB, formatValue }) => (
    <Skeleton loading={loadingA || loadingB} active paragraph={{ rows: groupMetrics.length + 1 }}>
        <TableContainer>
            <CompareTable>
                <thead>
                    <tr>
                        <MetricColumn>Metric</MetricColumn>
                        <ValueColumn>
                            <TextWithEllipsis>
                                {dataA?.companyName || stockA || "-"}
                            </TextWithEllipsis>
                        </ValueColumn>
                        <ValueColumn>
                            <TextWithEllipsis>
                                {dataB?.companyName || stockB || "-"}
                            </TextWithEllipsis>
                        </ValueColumn>
                        <DiffColumn>Difference</DiffColumn>
                    </tr>
                </thead>
                <tbody>
                    {groupMetrics.map(({ key, label, start = "", end = "" }) => {
                        const a = dataA?.[key];
                        const b = dataB?.[key];
                        const isValid =
                            typeof a === "number" &&
                            typeof b === "number" &&
                            a !== 0 &&
                            !isNaN(a) &&
                            !isNaN(b);
                        const diff = isValid ? (((b - a) / a) * 100).toFixed(2) : null;

                        return (
                            <tr key={key}>
                                <Td style={{ width: "40%" }}>
                                    <TextWithEllipsis>{label}</TextWithEllipsis>
                                </Td>
                                <Td style={{ width: "20%" }}>
                                    <TextWithEllipsis>{formatValue(key, a, start, end)}</TextWithEllipsis>
                                </Td>
                                <Td style={{ width: "20%" }}>
                                    <TextWithEllipsis>{formatValue(key, b, start, end)}</TextWithEllipsis>
                                </Td>
                                <Td style={{ width: "20%" }}>
                                    {diff !== null ? (
                                        <Difference positive={parseFloat(diff) > 0}>
                                            {parseFloat(diff) > 0 ? `+${diff}%` : `${diff}%`}
                                        </Difference>
                                    ) : (
                                        "-"
                                    )}
                                </Td>
                            </tr>
                        );
                    })}
                </tbody>
            </CompareTable>
        </TableContainer>
    </Skeleton>
);

export default CompareTableSection; 