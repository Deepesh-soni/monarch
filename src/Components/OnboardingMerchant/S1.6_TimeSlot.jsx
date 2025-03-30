import React, { useState, useCallback, useMemo, useEffect } from "react";
import styled from "styled-components";
import { trackEvent } from "@utils/helper";

import FlexBox from "@common/UI/FlexBox";
import CustomToggle from "@common/UI/Toggle";
import { Body1 } from "@common/UI/Headings";
import { device } from "@common/UI/Responsive";
import Footer from "./Footer";
import { OnboardingLayout } from "./OnboardingLayout";
import Slider from "./Slider";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  align-items: center;
  margin-top: 5rem;

  @media ${device.laptop} {
    margin: auto;
  }
`;

const Container = styled(FlexBox)`
  max-width: 50rem;
  width: 100%;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  gap: 2.5rem;
`;

const WeekDaysWrapper = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  @media ${device.laptop} {
    gap: 1.5rem;
    justify-content: center;
  }
`;

const DayContainer = styled(FlexBox)`
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  cursor: pointer;
`;

const lookUpWeekdays = {
  MONDAY: "Monday",
  TUESDAY: "Tuesday",
  WEDNESDAY: "Wednesday",
  THURSDAY: "Thursday",
  FRIDAY: "Friday",
  SATURDAY: "Saturday",
  SUNDAY: "Sunday",
};

const initialTimingData = [
  { day: "MONDAY", open: false },
  { day: "TUESDAY", open: false },
  { day: "WEDNESDAY", open: false },
  { day: "THURSDAY", open: false },
  { day: "FRIDAY", open: false },
  { day: "SATURDAY", open: false },
  { day: "SUNDAY", open: false },
];

const TimeSlot = ({
  pageNum,
  handleNextPage,
  handlePrevPage,
  slideDirection,
  storeData,
  commonAnalyticsPayload,
}) => {
  const defaultStartTime = "10:00AM";
  const defaultEndTime = "6:00PM";

  const [selectedDays, setSelectedDays] = useState(
    storeData?.timing?.length !== 0 ? storeData?.timing : initialTimingData
  );
  const [startTime, setStartTime] = useState(
    storeData?.timing?.[0]?.openTime || defaultStartTime
  );
  const [endTime, setEndTime] = useState(
    storeData?.timing?.[0]?.closeTime || defaultEndTime
  );

  useEffect(() => {
    setSelectedDays(
      storeData?.timing?.length !== 0 ? storeData?.timing : initialTimingData
    );
    setStartTime(storeData?.timing?.[0]?.openTime || defaultStartTime);
    setEndTime(storeData?.timing?.[0]?.closeTime || defaultEndTime);
  }, [storeData?.timing]);

  const toggleDay = index => {
    const modifiedSelectedDays = [...selectedDays];
    modifiedSelectedDays[index].open = !modifiedSelectedDays[index].open;
    setSelectedDays(modifiedSelectedDays);

    const toggleLabel = modifiedSelectedDays[index].day;
    const toggleValue = modifiedSelectedDays[index].open;

    trackEvent("salon_timing_toggle_click", {
      ...commonAnalyticsPayload,
      toggle_label: toggleLabel,
      toggle_value: toggleValue,
    });
  };

  const disableNext = selectedDays?.every(day => !day.open);

  const handleNext = useCallback(() => {
    const withTime = selectedDays?.map(day => ({
      ...day,
      openTime: startTime,
      closeTime: endTime,
    }));
    handleNextPage({ timing: withTime });
  }, [selectedDays, startTime, endTime, handleNextPage]);

  const memoizedDays = useMemo(
    () =>
      selectedDays?.map((day, index) => (
        <DayContainer key={day?.day} onClick={() => toggleDay(index)}>
          <Body1>{lookUpWeekdays?.[day?.day]}</Body1>
          <CustomToggle small checked={day?.open} primaryColor="Green" />
        </DayContainer>
      )),
    [selectedDays, toggleDay]
  );

  return (
    <>
      <OnboardingLayout
        slideDirection={slideDirection}
        title="When can your customers visit?"
        subTitle="You can change these later on too!"
      >
        <Wrapper>
          <Container>
            <Slider
              startTime={startTime}
              setStartTime={setStartTime}
              endTime={endTime}
              setEndTime={setEndTime}
            />
            <WeekDaysWrapper>{memoizedDays}</WeekDaysWrapper>
          </Container>
        </Wrapper>
      </OnboardingLayout>
      <Footer
        handleNext={handleNext}
        handleBack={handlePrevPage}
        pageNum={pageNum}
        nextCtaLabel="Next"
        disableNext={disableNext}
      />
    </>
  );
};

export default TimeSlot;
