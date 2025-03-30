import React, { useState } from "react";
import Calendar from "react-calendar";
import styled from "styled-components";
import "react-calendar/dist/Calendar.css";
import { TbChevronRight, TbChevronLeft } from "react-icons/tb";

import { Button } from "@common/UI/Buttons";
import FlexBox from "@common/UI/FlexBox";
import {
  PRIMARY_900,
  ACCENT_0,
  ACCENT_500,
  BLACK,
  SECONDARY_900,
} from "@common/UI/colors";
import { device } from "@common/UI/Responsive";

const CalendarStyles = styled.div`
  .react-calendar {
    width: ${props => props.width || "300px"};
    max-width: 100%;
    background-color: transparent;
    color: #222;
    line-height: 2rem;
    border: none;

    @media ${device.laptop} {
      width: 300px;
    }
  }

  .react-calendar__navigation button {
    color: ${BLACK};
    min-width: 30px;
    background: none;
    font-size: 16px;
    font-weight: bold;
  }

  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #f8f8fa;
  }
  .react-calendar__navigation button[disabled] {
    background-color: #f0f0f0;
  }

  .react-calendar__navigation__next2-button,
  .react-calendar__navigation__prev2-button {
    display: none;
  }

  .react-calendar__navigation__next-button,
  .react-calendar__navigation__prev-button {
    background-color: #d4a713;
    color: #fff;
    border-color: #d4a713;
    border-radius: 5px;
    padding: 8px 6px;
    margin: 8px 5px;
    border: 1px solid ${ACCENT_500};
    display: flex;
    justify-content: center;
    align-items: center;
  }

  abbr[title] {
    text-decoration: none;
  }

  .react-calendar__month-view__days__day--weekend {
    color: ${SECONDARY_900};
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background: rgba(83, 58, 113, 0.1);
    color: ${PRIMARY_900};
    border-radius: 6px;
  }

  .react-calendar__tile--now {
    background: transparent;
  }

  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #f8f8fa;
  }

  .react-calendar__tile--active {
    background: ${PRIMARY_900};
    border-radius: 6px;
    font-weight: bold;
    color: ${ACCENT_0};
  }

  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: ${PRIMARY_900};
    color: ${ACCENT_0};
  }

  .react-calendar__tile--start-date {
    background: ${PRIMARY_900};
    color: ${ACCENT_0};
  }

  .react-calendar__tile--end-date {
    background: ${PRIMARY_900};
    color: ${ACCENT_0};
  }
`;

const CustomCalendar = ({
  onDateChange,
  onSDateChange,
  width,
  handleSelected,
  minDate,
  clearTime,
}) => {
  const [date, setDate] = useState(null);
  const [range, setRange] = useState(false);

  const onChange = newDate => {
    setDate(newDate);
    setRange(true);
    if (newDate.length > 1) {
      const dateObject = {
        startDate: newDate[0],
        endDate: newDate[newDate.length - 1],
      };
      onDateChange(dateObject);
      handleSelected(true);
    } else {
      onSDateChange(newDate);
    }
  };

  const clearDate = () => {
    setDate(null);
    handleSelected(false);
    setRange(false);
    clearTime(true);
  };

  const minSelectableDate = minDate ? new Date() : null;

  return (
    <CalendarStyles width={width}>
      <FlexBox width="100%" column align="center">
        <Calendar
          nextLabel={<TbChevronRight />}
          prevLabel={<TbChevronLeft />}
          onChange={onChange}
          value={date}
          selectRange={range}
          minDate={minSelectableDate}
        />
        <Button textCta textDecoration="underline" onClick={clearDate}>
          Clear Date
        </Button>
      </FlexBox>
    </CalendarStyles>
  );
};

export default CustomCalendar;
