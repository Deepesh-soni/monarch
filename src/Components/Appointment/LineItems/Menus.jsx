import React from "react";

import styled from "styled-components";
import { ACCENT_0, SECONDARY_901, TAB_COLOR } from "@common/UI/colors";

const OptionsList = styled.div`
  position: absolute;
  top: 60%;
  right: 2rem;
  background-color: ${ACCENT_0};
  border: 1px solid ${SECONDARY_901};
  border-radius: 0.5rem;
  padding: 0.5rem 0;
  max-height: 7.5rem;
  overflow-y: auto;
  z-index: 50;
`;

const Option = styled.div`
  padding: 0.25rem 1rem;
  cursor: pointer;

  &:hover {
    background-color: ${TAB_COLOR};
  }
`;

const Menu = ({
  bookingStatus,
  onReschedule,
  onView,
  onCancel,
  onBookingDetails,
  onClose,
  innerRef,
}) => {
  const optionsToDisplay =
    bookingStatus === "Upcoming" || bookingStatus === "Reschedule"
      ? [
          { label: "View", action: onView },
          { label: "Reschedule", action: onReschedule },
          { label: "Cancel", action: onCancel },
        ]
      : [{ label: "Booking Details", action: onBookingDetails }];

  const handleOptionClick = action => {
    action();
    onClose();
  };

  return (
    <OptionsList ref={innerRef}>
      {optionsToDisplay.map(option => (
        <Option
          key={option?.label}
          onClick={() => handleOptionClick(option?.action)}
        >
          {option?.label}
        </Option>
      ))}
    </OptionsList>
  );
};

export default Menu;
