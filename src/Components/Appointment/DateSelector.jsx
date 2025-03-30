import React from "react";
import styled, { css } from "styled-components";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

import FlexBox from "@common/UI/FlexBox";
import { Body2 } from "@common/UI/Headings";
import { ACCENT_0, PRIMARY_800, SECONDARY_100 } from "@common/UI/colors";

dayjs.extend(advancedFormat);

const DATE_SELECTOR_OPTIONS = [
  "All",
  "Today",
  "Yesterday",
  "Tomorrow",
  "Pick a Date",
];

const Wrapper = styled(FlexBox)`
  max-width: calc(100vw - 3.25rem);
  overflow: auto;
`;

const SingleDateBox = styled(FlexBox)`
  padding: 0.25rem 1rem;
  width: fit-content;
  border-radius: 1.5rem;
  border: 1px solid ${SECONDARY_100};
  cursor: pointer;
  white-space: nowrap;

  ${({ selected }) =>
    selected &&
    css`
      background-color: ${PRIMARY_800};
      color: white;
    `}
`;

const Body = styled(Body2)`
  ${({ selected }) =>
    selected &&
    css`
      color: ${ACCENT_0};
    `}
`;

export const DateSelector = ({ selectedDate, handleDateClick }) => (
  <Wrapper columnGap="0.5rem" rowGap="0.5rem">
    {DATE_SELECTOR_OPTIONS.map((item, index) => (
      <SingleDateBox
        key={item}
        selected={selectedDate === item}
        onClick={() => handleDateClick(item, index)}
      >
        <Body selected={selectedDate === item}>{item}</Body>
      </SingleDateBox>
    ))}
  </Wrapper>
);
