import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TfiClose } from "react-icons/tfi";

import Modal from "@common/UI/Modal";
import FlexBox from "@common/UI/FlexBox";
import { Button } from "@common/UI/Buttons";
import { H3 } from "@common/UI/Headings";
import { SECONDARY_901 } from "@common/UI/colors";
import CustomCalendar from "./CustomCalendar";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  row-gap: 1rem;
  padding: 1.5rem;
`;

const HeadWithClose = styled(FlexBox)`
  width: 100%;
  justify-content: center;
  position: relative;
  align-items: center;
  border-bottom: 2px solid ${SECONDARY_901};
  padding: 1.5rem 1rem 1rem;
`;

const CloseButton = styled(FlexBox)`
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const IconContainer = styled(FlexBox)`
  width: 1.5rem;
  height: 1.5rem;
  background-color: ${SECONDARY_901};
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`;

const TimeInputWrapper = styled(FlexBox)`
  width: 100%;
  column-gap: 0.5rem;
  align-items: center;
`;

const TimeInput = styled.input`
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
  width: 100%;
`;

const AmPmSelect = styled.select`
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
`;

const CalendarModal = ({
  toggleModal,
  closeModal,
  setCurrentDate,
  setCurrentTime,
  initialTime,
  actionMode,
}) => {
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [amPm, setAmPm] = useState("AM");

  useEffect(() => {
    if (initialTime) {
      const [time, period] = initialTime.split(" ");
      setSelectedTime(time);
      setAmPm(period);
    }
  }, [initialTime]);

  const selectDate = () => {
    if (actionMode === "reschedule" && !selectedTime) {
      return;
    }
  
    const [hoursStr, minutesStr] = selectedTime ? selectedTime.split(":") : ["00", "00"];
    const hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);
  
    let formattedTime;
    if (amPm === "PM" && hours < 12) {
      formattedTime = `${hours + 12}:${minutes.toString().padStart(2, "0")}`;
    } else if (amPm === "AM" && hours === 12) {
      formattedTime = `00:${minutes.toString().padStart(2, "0")}`;
    } else {
      formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
    }
  
    setCurrentDate(date);
    if (setCurrentTime) {
      setCurrentTime(formattedTime);
    }
    
    if (actionMode === "reschedule") {
      toggleModal();
    } else {
      closeModal();
    }
  };
  

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleAmPmChange = (event) => {
    setAmPm(event.target.value);
  };

  return (
    <Modal
      XS
      height="fit-content"
      overflow="none"
      maxHeight="fit-content"
      width="fit-content"
    >
      <HeadWithClose>
        <H3 bold textAlign="center">
          Pick a Date {actionMode === "reschedule" && "and Time"}
        </H3>
        <CloseButton onClick={closeModal}>
          <IconContainer>
            <TfiClose size="0.75rem" />
          </IconContainer>
        </CloseButton>
      </HeadWithClose>
      <Wrapper>
        <FlexBox align="center" justify="center">
          <CustomCalendar current={date} setDate={setDate} minDate={true}/>
        </FlexBox>
        {actionMode === "reschedule" && (
          <TimeInputWrapper>
            <TimeInput
              type="time"
              value={selectedTime}
              onChange={handleTimeChange}
            />
            <AmPmSelect value={amPm} onChange={handleAmPmChange}>
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </AmPmSelect>
          </TimeInputWrapper>
        )}
        <Button primary width="100%" onClick={selectDate}>
          Select
        </Button>
      </Wrapper>
    </Modal>
  );
};

export default CalendarModal;
