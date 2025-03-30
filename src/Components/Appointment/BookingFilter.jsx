import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { GiSettingsKnobs } from "react-icons/gi";
import { useSelector } from "react-redux";
import { H2, H3, Body1 } from "@common/UI/Headings";
import Chip from "@common/UI/Chips";
import { Button } from "@common/UI/Buttons";
import Modal from "@common/UI/Modal";
import CrossIcon from "@common/UI/CrossIcon";
import { ACCENT_0, ACCENT_800, SECONDARY_200 } from "@common/UI/colors";
import FlexBox from "@common/UI/FlexBox";

const Cross = styled.div`
  cursor: pointer;
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

const AppointmentOptions = [
  { id: "2", label: "Upcoming" },
  { id: "7", label: "Abandoned" },
  { id: "6", label: "Completed" },
  { id: "4", label: "In Progress" },
  { id: "9", label: "Cancelled" },
  { id: "8", label: "Reschedule" },
];

const BookingFilter = ({ closeModal, filters, setFilters, initialState }) => {
  const [localFilterState, setLocalFilterState] = useState(filters);

  const storeStylists = useSelector(state => state.activeStore.storeStylist);
  const Stylist = storeStylists.map(stylist => ({
    id: stylist?._id,
    label: stylist?.name,
  }));

  const handleOptionClick = useCallback((filterName, value) => {
    setLocalFilterState(prevFilters => {
      const updatedValue = prevFilters[filterName] === value ? "" : value;
      return {
        ...prevFilters,
        [filterName]: updatedValue,
      };
    });
  }, []);

  const handleApplyFilter = useCallback(() => {
    const selectedStylist = storeStylists.find(
      stylist => stylist?._id === localFilterState?.stylist
    );
    const selectedStylistName = selectedStylist ? selectedStylist.name : "";
    setFilters({ ...localFilterState, stylistName: selectedStylistName });
    closeModal();
  }, [localFilterState, closeModal, setFilters, storeStylists]);

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
          handleOptionClick(filterName, option?.id);
        };

        return (
          <Chip key={option.id} selected={isSelected} onClick={handleChipClick}>
            <H3 color={isSelected ? ACCENT_0 : ACCENT_800}>{label}</H3>
          </Chip>
        );
      });
    },
    [localFilterState, handleOptionClick]
  );

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
        <Header>
          <div />
          <FlexBox columnGap="0.5rem" align="center">
            <GiSettingsKnobs />
            <H2 bold>Filters</H2>
          </FlexBox>
          <CrossIcon onClick={closeModal} />
        </Header>
        <Body>
          <SubHeading column rowGap="0.5rem">
            <Body1 bold>Appointment</Body1>
            <FilterOptions>
              {renderOptions(AppointmentOptions, "appointment")}
            </FilterOptions>
          </SubHeading>
          <SubHeading column rowGap="0.5rem">
            <Body1 bold>Stylist</Body1>
            <FilterOptions>{renderOptions(Stylist, "stylist")}</FilterOptions>
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

export default BookingFilter;
