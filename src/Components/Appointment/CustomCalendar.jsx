import Calendar from "react-calendar";
import styled from "styled-components";
import "react-calendar/dist/Calendar.css";
import { TbChevronRight, TbChevronLeft } from "react-icons/tb";

import { PRIMARY_900, ACCENT_0, ACCENT_500, BLACK } from "@common/UI/colors";

const CalendarStyles = styled.div`
  .react-calendar {
    width: 400px;
    max-width: 100%;
    background-color: transparent;
    color: #222;
    line-height: 1.125em;
    border: none;
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
    color: ${ACCENT_500};
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
`;

const CustomCalendar = ({ current, setDate,minDate }) => {

  const minSelectableDate = minDate ? new Date() : null;
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 1);
  return (
    <CalendarStyles>
      <Calendar
        nextLabel={<TbChevronRight />}
        prevLabel={<TbChevronLeft />}
        onChange={newDate => setDate(newDate)}
        value={current}
        minDate={minSelectableDate}
        maxDate={maxDate}
      />
    </CalendarStyles>
  );
};

export default CustomCalendar;
