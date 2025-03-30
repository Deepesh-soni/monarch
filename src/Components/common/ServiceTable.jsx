import React from "react";
import styled from "styled-components";

import FlexBox from "@common/UI/FlexBox";
import { device } from "@common/UI/Responsive";
import { LIGHT_BLUE_GREY, LINE_GREY, DARKGREY } from "@common/UI/colors";
import { Body1 } from "@common/UI/Headings";

const Table = styled.table`
  width: 100%;
  overflow: hidden;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 0 0.25rem;

  background-color: ${LIGHT_BLUE_GREY};

  @media ${device.laptop} {
    padding: 1rem;
  }
`;

const Td = styled.td`
  text-align: left;
  padding: 0.25rem;
  border-bottom: 1px solid ${LINE_GREY};

  @media ${device.laptop} {
    padding: 1rem;
  }
`;

const NullState = styled(FlexBox)`
  padding: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  flex: 1 0 0;
`;

const ServiceTable = ({ data }) => {
  return (
    <>
      {data.length > 0 ? (
        <Table>
          <thead>
            <tr>
              <Th>Service</Th>
              <Th>Quantity</Th>
              <Th>Total</Th>
            </tr>
          </thead>

          <tbody>
            {data.map(item => (
              <tr key={item.serviceId}>
                <Td>
                  <FlexBox columnGap="0.5rem">{item.serviceName}</FlexBox>
                </Td>
                <Td>{item.totalQuantity}</Td>
                <Td>{item.totalPrice}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <NullState>
          <img src="/assets/Coupons/no-task.webp" alt="null" />
          <Body1 color={DARKGREY} textAlign="center">
            Looks Like We Have nothing To Display Here
          </Body1>
        </NullState>
      )}
    </>
  );
};
export default ServiceTable;
