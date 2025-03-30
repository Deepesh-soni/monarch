import React, { useState, useCallback } from "react";
import styled from "styled-components";
import Image from "next/image";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

import FlexBox from "@common/UI/FlexBox";
import { Body1, H2, H3 } from "@common/UI/Headings";
import {
  ACCENT_0,
  ACCENT_800,
  SECONDARY_200,
  ACCENT_200,
} from "@common/UI/colors";
import Chip from "@common/UI/Chips";
import { Button } from "@common/UI/Buttons";
import Modal from "@common/UI/Modal";
import { FiX } from "react-icons/fi";

dayjs.extend(advancedFormat);

const Text = styled(H2)`
  font-size: 1.125rem;
`;

const OptionText = styled(H3)`
  font-size: 1rem;
`;

const Wrapper = styled(FlexBox)`
  position: relative;
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled(FlexBox)`
  width: 100%;
  position: sticky;
  top: 0;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid ${SECONDARY_200};
`;

const Body = styled(FlexBox)`
  overflow: scroll;
  flex-direction: column;
  padding: 1rem;
`;

const FixedSection = styled(FlexBox)`
  width: 100%;
  position: sticky;
  padding: 1rem;
  background-color: ${ACCENT_0};
  gap: 1rem;
  justify-content: center;
`;

const SubHeading = styled(FlexBox)`
  padding: 0.5rem;
  width: 100%;
`;

const FilterOptions = styled(FlexBox)`
  flex-wrap: wrap;
  gap: 1rem;
`;

const ratingTypeOptions = [
  { id: "all", label: "All" },
  { id: "excellent", label: "Excellent" },
  { id: "very-good", label: "Very Good" },
  { id: "average", label: "Average" },
  { id: "poor", label: "Poor" },
  { id: "terrible", label: "Terrible" },
];

const timeOptions = [
  { id: "today", label: "Today" },
  { id: "this week", label: "This Week" },
  { id: "this month", label: "This Month" },
];

const ReviewFilter = ({ closeModal, filters, setFilters, initialState }) => {
  const [localFilterState, setLocalFilterState] = useState(filters);

  const handleOptionClick = useCallback((filterName, value) => {
    setLocalFilterState(prevFilters => ({
      ...prevFilters,
      [filterName]: value,
    }));
  });

  const handleApplyFilter = useCallback(() => {
    setFilters({
      ...localFilterState,
    });
    closeModal();
  }, [localFilterState, closeModal]);

  const handleClearFilters = () => {
    setLocalFilterState(initialState);
    setFilters(initialState);
  };

  const renderOptions = useCallback(
    (options, filterName) => {
      return options.map(option => {
        const isSelected = localFilterState?.[filterName] === option?.id;
        const label = option.label;

        const handleChipClick = () => {
          handleOptionClick(filterName, option.id);
        };

        return (
          <Chip
            bgColor={ACCENT_200}
            borderColor="none"
            key={option.id}
            selected={isSelected}
            onClick={handleChipClick}
          >
            <OptionText color={isSelected ? ACCENT_0 : ACCENT_800}>
              {label}
            </OptionText>
          </Chip>
        );
      });
    },
    [localFilterState, handleOptionClick]
  );

  return (
    <Modal XS onClose={closeModal} height="fit-content" borderRadius="1rem">
      <Wrapper>
        <Header>
          <div />
          <FlexBox columnGap="0.5rem" align="center">
            <Image src="/assets/images/filter.svg" width={16} height={16} />
            <Text bold>Filters</Text>
          </FlexBox>
          <FiX onClick={closeModal} cursor="pointer" />
        </Header>
        <Body>
          <SubHeading column rowGap="0.5rem">
            <Body1 bold>Review Type</Body1>
            <FilterOptions>
              {renderOptions(ratingTypeOptions, "ratingType")}
            </FilterOptions>
          </SubHeading>
          <SubHeading column rowGap="0.5rem">
            <Body1 bold>Time</Body1>
            <FilterOptions>{renderOptions(timeOptions, "day")}</FilterOptions>
          </SubHeading>
        </Body>
        <FixedSection>
          <Button outline tertiary width="100%" onClick={handleClearFilters}>
            Clear
          </Button>
          <Button width="100%" onClick={handleApplyFilter}>
            Apply
          </Button>
        </FixedSection>
      </Wrapper>
    </Modal>
  );
};

export default ReviewFilter;
