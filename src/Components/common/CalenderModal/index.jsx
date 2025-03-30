import React from "react"; // Import useState
import styled from "styled-components";

import Modal from "@common/UI/Modal";
import FlexBox from "@common/UI/FlexBox";
import { Button } from "@common/UI/Buttons";
import { H3 } from "@common/UI/Headings";
import { SECONDARY_901 } from "@common/UI/colors";
import CrossIcon from "@common/UI/CrossIcon";
import CustomCalendar from "../CustomCalendar";

const Wrapper = styled(FlexBox)`
  padding: 1rem;
  align-items: center;
  justify-content: center;
`;

const Header = styled(FlexBox)`
  width: 100%;
  justify-content: space-between;
  border-bottom: 1px solid ${SECONDARY_901};
  padding: 1rem;
`;

const Footer = styled(FlexBox)`
  width: 100%;
  border-top: 1px solid ${SECONDARY_901};
  padding: 1rem;
`;

const CalendarModal = ({ closeModal, setDateRange }) => {
  const handleDateChange = date => {
    setDateRange({
      startDate: date.startDate,
      endDate: date.endDate,
    });
  };

  return (
    <Modal
      XS
      height="fit-content"
      maxHeight="fit-content"
      mobileHeight="fit-content"
      mobileWidth="90%"
      mobileBorderRadius="0.5rem"
      borderRadius="1rem"
    >
      <Header>
        <div />
        <H3 bold textAlign="center">
          Pick a Date
        </H3>
        <CrossIcon onClick={closeModal} />
      </Header>
      <Wrapper>
        <CustomCalendar onDateChange={handleDateChange} />
      </Wrapper>
      <Footer>
        <Button width="100%" onClick={closeModal}>
          Select
        </Button>
      </Footer>
    </Modal>
  );
};

export default CalendarModal;
