import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { GiSettingsKnobs } from "react-icons/gi";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import dynamic from "next/dynamic";

import FlexBox from "@common/UI/FlexBox";
import { Body1, H2, H3 } from "@common/UI/Headings";
import { ACCENT_0, ACCENT_800, SECONDARY_200 } from "@common/UI/colors";
import Chip from "@common/UI/Chips";
import { Button } from "@common/UI/Buttons";
import Modal from "@common/UI/Modal";
import CrossIcon from "@common/UI/CrossIcon";
import { filterMeta, filterMetaDiscount } from "../../../metaData/filterMeta";

const CalendarModal = dynamic(() => import("@common/CalenderModal"));

dayjs.extend(advancedFormat);

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

const CouponFilter = ({
  closeModal,
  filters,
  setFilters,
  initialState,
  showDistinct,
}) => {
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [localFilterState, setLocalFilterState] = useState(filters);
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  const [formattedDateRange, setFormattedDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    if (!dateRange.startDate) return;

    const { startDate, endDate } = dateRange || {};

    const handleDateChange = () => {
      const formattedStartDate = dayjs(startDate).format("YYYY-MM-DD");
      const formattedEndDate = dayjs(endDate).format("YYYY-MM-DD");

      setFormattedDateRange({
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      });

      handleDateSelect(
        `${dayjs(startDate).format("Do MMM")} - ${dayjs(endDate).format(
          "Do MMM, YY"
        )}`
      );
    };
    handleDateChange();
  }, [dateRange]);

  const handleDateSelect = useCallback(dateString => {
    setLocalFilterState(prevFilters => ({ ...prevFilters, time: dateString }));
  }, []);

  const handleRadioClick = useCallback((filterName, value) => {
    setLocalFilterState(prevFilters => ({
      ...prevFilters,
      [filterName]: value,
    }));

    if (value === "pickDate") {
      setShowCalendarModal(true);
    }
  }, []);

  const handleCheckboxClick = useCallback((filterName, value) => {
    setLocalFilterState(prevFilters => {
      const updatedOptions = prevFilters[filterName]?.includes(value)
        ? prevFilters[filterName].filter(option => option !== value)
        : [...(prevFilters[filterName] || []), value];
      return {
        ...prevFilters,
        [filterName]: updatedOptions,
      };
    });
  }, []);

  const handleApplyFilter = useCallback(() => {
    setFilters({ ...localFilterState, ...formattedDateRange });
    closeModal();
  }, [localFilterState, formattedDateRange, setFilters, closeModal]);

  const handleClearFilters = () => {
    setLocalFilterState(initialState);
    setFilters(initialState);
  };

  const renderOptions = (options, filterName, type) => {
    return options.map(option => {
      const isSelected =
        type === "checkbox"
          ? localFilterState?.[filterName]?.includes(option?.slug)
          : localFilterState?.[filterName] === option?.slug;
      const label =
        localFilterState?.day === "pickDate" && option?.slug === "pickDate"
          ? localFilterState?.time
          : option.label;

      const handleChipClick = () => {
        if (type === "checkbox") {
          handleCheckboxClick(filterName, option.slug);
        } else {
          handleRadioClick(filterName, option.slug);
        }
      };

      return (
        <Chip key={option.slug} selected={isSelected} onClick={handleChipClick}>
          <H3 color={isSelected ? ACCENT_0 : ACCENT_800}>{label}</H3>
        </Chip>
      );
    });
  };

  return (
    <Modal
      XS
      onClose={closeModal}
      height="fit-content"
      mobileHeight="fit-content"
      mobileWidth="90%"
      mobileBorderRadius="0.5rem"
      borderRadius="1rem"
    >
      <Wrapper>
        {showCalendarModal && (
          <CalendarModal
            closeModal={() => setShowCalendarModal(false)}
            setDateRange={setDateRange}
          />
        )}
        <Header>
          <div />
          <FlexBox columnGap="0.5rem" align="center">
            <GiSettingsKnobs />
            <H2 bold>Filters</H2>
          </FlexBox>
          <CrossIcon onClick={closeModal} />
        </Header>
        <Body>
          {(showDistinct ? filterMetaDiscount : filterMeta)?.map(item => (
            <SubHeading key={item.slug} column rowGap="0.5rem">
              <Body1 bold>{item?.title}</Body1>
              <FilterOptions>
                {renderOptions(item?.options, item?.slug, item?.type)}
              </FilterOptions>
            </SubHeading>
          ))}
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

export default CouponFilter;
