import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { trackEvent } from "@utils/helper";

import FlexBox from "@common/UI/FlexBox";
import { Body2, Body1 } from "@common/UI/Headings";
import { ACCENT_200, SECONDARY_200, SECONDARY_400 } from "@common/UI/colors";
import { OnboardingLayout } from "./OnboardingLayout";
import Footer from "./Footer";

const Container = styled(FlexBox)`
  align-items: center;
  max-width: 50rem;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
`;

const ListItem = styled(FlexBox)`
  width: 100%;
  flex-direction: column;
  border: 1px solid ${SECONDARY_200};
  border-radius: 0.75rem;
  padding: 1.5rem;
  gap: 0.25rem;
  cursor: pointer;

  ${({ selected }) =>
    selected &&
    css`
      background-color: ${ACCENT_200};
      border: 2px solid ${SECONDARY_400};
    `}
`;

const BookingOptions = [
  {
    label: "Allow automatic booking",
    description: "Customers can book appointments directly without approval.",
  },
  {
    label: "Require approval for bookings",
    description:
      "Customers need to request approval before booking (Applies to appointments booked within 36 hours).",
  },
];

const BookingRequest = ({
  pageNum,
  handleNextPage,
  handlePrevPage,
  storeData,
  slideDirection,
  commonAnalyticsPayload,
}) => {
  const [selectedOption, setSelectedOption] = useState(
    storeData?.bookingApproval
  );

  useEffect(() => {
    setSelectedOption(storeData?.bookingApproval);
  }, [storeData?.bookingApproval]);

  const handleSelect = index => {
    trackEvent("salon_booking_approval_card_click", {
      ...commonAnalyticsPayload,
      selected_option: index,
    });
    setSelectedOption(index);
  };

  const disableNext =
    selectedOption === undefined ||
    selectedOption === null ||
    selectedOption === "";

  return (
    <>
      <OnboardingLayout
        noPadding
        slideDirection={slideDirection}
        title="Last Minute Booking Request"
        subTitle="We know you’ll be busy. But do you offer Last Minute Bookings ?"
      >
        <Container>
          {BookingOptions.map((option, index) => (
            <ListItem
              key={option.label}
              selected={parseInt(selectedOption) === index}
              onClick={() => handleSelect(index)}
            >
              <Body1 bold>{option?.label}</Body1>
              <Body2>{option?.description}</Body2>
            </ListItem>
          ))}
        </Container>
      </OnboardingLayout>
      <Footer
        handleNext={() => handleNextPage({ bookingApproval: selectedOption })}
        handleBack={handlePrevPage}
        pageNum={pageNum}
        nextCtaLabel="Next"
        disableNext={disableNext}
      />
    </>
  );
};

export default BookingRequest;
