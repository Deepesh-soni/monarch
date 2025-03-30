import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import FlexBox from "@common/UI/FlexBox";
import { H5 } from "@common/UI/Headings";
import { ERROR } from "@common/UI/colors";

const Td = styled.td`
  text-align: ${({ align }) => align || "left"};
  padding: 1.5rem;
  white-space: nowrap;
`;

const Chip = styled(FlexBox)`
  padding: 0.25rem 0;
  justify-content: center;
  border-radius: 0.75rem;
  border: 1px solid ${({ active }) => (active ? "#008000" : ERROR)};
  background: ${({ active }) =>
    active ? "rgba(0, 255, 0, 0.3)" : "rgba(255, 0, 0, 0.3)"};
`;

const IndividualCouponListItem = ({ data }) => {
  return (
    <tr>
      <Td>{data?.couponCode}</Td>
      <Td>{data?.discountType === 1 ? "Flat Rate" : "Percent Rate"}</Td>
      <Td>{dayjs(data?.startedFrom).utc().format("DD-MM-YY")}</Td>
      <Td>{dayjs(data?.expiredAt).utc().format("DD-MM-YY")}</Td>
      <Td>
        <Chip active={data?.active}>
          <H5 bold color={data?.active ? "#008000" : ERROR}>
            {data?.active ? "Active" : "Inactive"}
          </H5>
        </Chip>
      </Td>
    </tr>
  );
};

export default IndividualCouponListItem;
