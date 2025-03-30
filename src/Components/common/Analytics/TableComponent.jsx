import React from "react";
import styled from "styled-components";

import FlexBox from "@common/UI/FlexBox";
import { LIGHT_BLUE_GREY, LINE_GREY } from "@common/UI/colors";

const Table = styled.table`
  width: 100%;
  overflow: hidden;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 1rem;
  background-color: ${LIGHT_BLUE_GREY};
`;

const Td = styled.td`
  text-align: left;
  padding: 1rem;
  border-bottom: 1px solid ${LINE_GREY};
`;

const TableComponent = ({ headers, data }) => {
  return (
    <Table>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <Th key={index}>{header}</Th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {Object.values(row).map((cell, cellIndex) => (
              <Td key={cellIndex}>
                <FlexBox align="center" columnGap="0.5rem">
                  {cell}
                </FlexBox>
              </Td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableComponent;
