import React, { useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";

import FlexBox from "@common/UI/FlexBox";
import { Body1, Body2 } from "@common/UI/Headings";
import { device } from "@common/UI/Responsive";
import { Button } from "@common/UI/Buttons";
import { ACCENT_200, PRIMARY_800 } from "@common/UI/colors";
import CustomCalendar from "@common/CustomCalendar";

const Wrapper = styled(FlexBox)`
  row-gap: 0.75rem;
  flex-direction: column-reverse;

  @media ${device.laptop} {
    column-gap: 1.5rem;
    flex-direction: row;
  }
`;

const SelectTime = ({
  setCurrentStep,
  handleCouponChange,
  discountType,
  couponCode,
  minAmount,
  couponString,
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateChange = date => {
    setStartDate(date?.startDate);
    setEndDate(date?.endDate);
    handleCouponChange({
      startDate: date?.startDate,
      endDate: date?.endDate,
    });
  };

  const handleStartDateChange = date => {
    setStartDate(date);
    handleCouponChange({
      startDate: date,
      endDate: endDate,
    });
    setIsSelected(date !== null && endDate !== null);
  };

  const clearTime = () => {
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <Wrapper>
      <FlexBox column rowGap="1.5rem">
        <FlexBox column rowGap="0.5rem">
          <Body1 bold>Select your start and end date from the calendar</Body1>
          {startDate && !endDate ? (
            <Body2>Please choose your end date</Body2>
          ) : startDate && endDate ? (
            <Body2>
              {startDate && endDate
                ? `Your coupon will run for ${dayjs(endDate)
                    .utc()
                    .startOf("day")
                    .diff(dayjs(startDate).utc().startOf("day"), "day")} days.`
                : "Please choose your start date"}
            </Body2>
          ) : (
            <Body2>Please choose your start date</Body2>
          )}
          <Body2>
            {startDate && endDate
              ? `${dayjs(startDate).format("DD MMMM YYYY")} - ${dayjs(
                  endDate
                ).format("DD MMMM YYYY")}`
              : startDate
              ? `${dayjs(startDate).format("DD MMMM YYYY")} - End Date`
              : "Start Date - End Date"}
          </Body2>
        </FlexBox>
        <FlexBox
          column
          padding="1rem 1.5rem"
          backgroundColor={ACCENT_200}
          rowGap="0.5rem"
        >
          <FlexBox>
            <FlexBox justify="flex-start" width="50%">
              <Body1>Offer Type:</Body1>
            </FlexBox>
            <FlexBox justify="flex-end" width="50%">
              <Body2>{discountType == 1 ? "Flat Rate" : "Percentage"}</Body2>
            </FlexBox>
          </FlexBox>

          <FlexBox>
            <FlexBox justify="flex-start" width="50%">
              <Body1>Offer Applied:</Body1>
            </FlexBox>
            <FlexBox justify="flex-end" width="50%">
              <Body2>{couponCode}</Body2>
            </FlexBox>
          </FlexBox>

          <FlexBox>
            <FlexBox justify="flex-start" width="50%">
              <Body1>Valid Above:</Body1>
            </FlexBox>
            <FlexBox justify="flex-end" width="50%">
              <Body2>{minAmount}</Body2>
            </FlexBox>
          </FlexBox>
          <Body2 color={PRIMARY_800}>
            {`This Coupon Provides ${couponString} of ${minAmount} & above`}
          </Body2>
        </FlexBox>
        <Button
          width="100%"
          onClick={() => setCurrentStep(2)}
          disabled={!isSelected}
        >
          Select
        </Button>
      </FlexBox>

      <FlexBox justify="center">
        <CustomCalendar
          onDateChange={handleDateChange}
          onSDateChange={handleStartDateChange}
          minDate={true}
          handleSelected={setIsSelected}
          clearTime={clearTime}
        />
      </FlexBox>
    </Wrapper>
  );
};

export default SelectTime;
