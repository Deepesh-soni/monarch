import dayjs from "dayjs";
import { useEffect } from "react";
import styled from "styled-components";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import weekday from "dayjs/plugin/weekday";
import isToday from "dayjs/plugin/isToday";

import { Button } from "@components/common/UI/Buttons";
import FlexBox from "@common/UI/FlexBox";
import Chip from "@components/common/UI/Chips";
import {
  ACCENT_800,
  ACCENT_400,
  PRIMARY_800,
  ACCENT_0,
} from "@components/common/UI/colors";
import { Body1, H3, Support } from "@components/common/UI/Headings";
import { useState } from "react";

dayjs.extend(weekday);
dayjs.extend(isToday);

const CalendarStripWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
`;

const WeekStrip = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 1rem;
`;

const ActionWrapper = styled.div`
  width: 100%;
  min-height: 2.625rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Chevron = styled(FlexBox)`
  height: 2rem;
  width: 2rem;
  border-radius: 2.5rem;
  border: 1px solid ${ACCENT_400};
  cursor: pointer;
  align-items: center;
  justify-content: center;

  svg {
    stroke-width: 3px;
  }
`;

const CalendarStrip = ({ dayCount, visibleDateRange, setVisibleDateRange }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    setRange();
  }, []);

  const todayDate = dayjs().startOf("day");

  const setRange = (date = dayjs()) => {
    const startDate = date.startOf("week");
    const range = Array.from({ length: dayCount }, (_, i) =>
      startDate.add(i, "day").toDate()
    );

    const prevSelectedDay = dayjs(selectedDate).weekday();
    const updatedSelectedDay = range[prevSelectedDay];

    setVisibleDateRange(range);
    setSelectedDate(updatedSelectedDay);
  };

  const setPreviousWeek = () => {
    setRange(dayjs(visibleDateRange[0]).subtract(1, "day"));
  };

  const setNextWeek = () => {
    setRange(dayjs(visibleDateRange[dayCount - 1]).add(1, "day"));
  };

  const setPreviousMonth = () => {
    setRange(dayjs(visibleDateRange[dayCount / 2]).subtract(1, "month"));
  };

  const setNextMonth = () => {
    setRange(dayjs(visibleDateRange[dayCount / 2]).add(1, "month"));
  };

  return (
    <CalendarStripWrapper>
      <ActionWrapper>
        <FlexBox align="center" justify="center" columnGap="1rem">
          <Chevron onClick={setPreviousMonth}>
            <FiChevronLeft color={PRIMARY_800} />
          </Chevron>
          <Chevron onClick={setNextMonth}>
            <FiChevronRight color={PRIMARY_800} />
          </Chevron>
          <H3 bold>
            {dayjs(visibleDateRange?.[dayCount / 2]).format("MMMM YY")}
          </H3>
        </FlexBox>
        {!dayjs(selectedDate).isToday() && (
          <Button
            outline
            secondary
            onClick={() => {
              setRange();
              setSelectedDate(todayDate.toDate());
            }}
          >
            TODAY
          </Button>
        )}
      </ActionWrapper>

      <WeekStrip>
        <Chevron onClick={setPreviousWeek}>
          <FiChevronLeft color={PRIMARY_800} />
        </Chevron>
        {visibleDateRange?.map(date => (
          <Chip
            key={date.getTime()}
            selected={dayjs(date).isSame(dayjs(selectedDate))}
            onClick={() => setSelectedDate(date)}
          >
            <Support
              color={
                dayjs(date).isSame(dayjs(selectedDate)) ? ACCENT_0 : ACCENT_800
              }
            >
              {dayjs(date).format("ddd")}
            </Support>
            <Body1
              bold
              color={
                dayjs(date).isSame(dayjs(selectedDate)) ? ACCENT_0 : ACCENT_800
              }
            >
              {dayjs(date).format("D")}
            </Body1>
          </Chip>
        ))}
        <Chevron onClick={setNextWeek}>
          <FiChevronRight color={PRIMARY_800} />
        </Chevron>
      </WeekStrip>
    </CalendarStripWrapper>
  );
};

export default CalendarStrip;
