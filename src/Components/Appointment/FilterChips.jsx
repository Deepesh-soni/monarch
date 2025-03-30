import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { GiSettingsKnobs } from "react-icons/gi";
import { TfiClose } from "react-icons/tfi";

import FlexBox from "@common/UI/FlexBox";
import { Body1, Body2 } from "@common/UI/Headings";
import { PRIMARY_800, SECONDARY_901 } from "@common/UI/colors";

dayjs.extend(advancedFormat);

const APPOINTMENT_OPTIONS = [
  { id: "2", label: "Upcoming" },
  { id: "7", label: "Abandoned" },
  { id: "6", label: "Completed" },
  { id: "4", label: "In Progress" },
  { id: "9", label: "Cancelled" },
  { id: "8", label: "Reschedule" },
];

const SingleFilterBox = styled(FlexBox)`
  padding: 0.25rem 1rem;
  width: fit-content;
  align-items: center;
  border-radius: 1.5rem;
  column-gap: 0.25rem;
  cursor: pointer;
  background-color: ${SECONDARY_901};
`;

export const FilterChips = ({ filters, removeFilter, openFilterModal }) => (
  <FlexBox columnGap="0.5rem" align="center" style={{ cursor: "pointer" }}>
    {filters?.stylistName && (
      <SingleFilterBox
        onClick={() => {
          removeFilter("stylist");
          removeFilter("stylistName");
        }}
      >
        <Body2 color={PRIMARY_800}>{filters?.stylistName}</Body2>
        <TfiClose size={12} color={PRIMARY_800} />
      </SingleFilterBox>
    )}
    {filters?.appointment && (
      <SingleFilterBox onClick={() => removeFilter("appointment")}>
        <Body2 color={PRIMARY_800}>
          {
            APPOINTMENT_OPTIONS.find(
              option => option.id === filters.appointment
            )?.label
          }
        </Body2>
        <TfiClose size={12} color={PRIMARY_800} />
      </SingleFilterBox>
    )}
    <FlexBox columnGap="0.25rem" align="center" onClick={openFilterModal}>
      <GiSettingsKnobs />
      <Body1>Filters</Body1>
    </FlexBox>
  </FlexBox>
);
