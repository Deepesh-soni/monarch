import React, { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import styled from "styled-components";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { BooleanParam, useQueryParams } from "use-query-params";

import { device } from "@common/UI/Responsive";
import FlexBox from "@common/UI/FlexBox";
import SectionContainer from "@common/SectionContainer";
import BookingListing from "./BookingListing";
import ConfirmationListing from "./ConfirmationListing";
import { WHITE } from "@common/UI/colors";

dayjs.extend(advancedFormat);

const Wrapper = styled(FlexBox)`
  width: 100%;
  flex-direction: column-reverse;
  row-gap: 1rem;
  position: relative;
  justify-content: space-between;
  overflow: hidden;

  @media ${device.laptop} {
    flex-direction: row;
    column-gap: 1.5rem;
  }
`;

const FloatingCTA = styled(FlexBox)`
  position: absolute;
  right: 1.5rem;
  bottom: 1.5rem;
  cursor: pointer;
`;

const IconContainer = styled.div`
  height: 2.5rem;
  width: 2.5rem;
  padding: 0.5rem;
  border-radius: 50%;
  background-image: linear-gradient(180deg, #c6426e 0%, #533a71 100%);
`;

const Booking = () => {
  const [, setQueryParams] = useQueryParams({
    show_add_appointment_modal: BooleanParam,
  });

  const openModal = () => {
    setQueryParams({ show_add_appointment_modal: true }, "replaceIn");
  };

  const [showMobile, setShowMobile] = useState(false);

  return (
    <Wrapper>
      <SectionContainer showHeader={false} width="100%" mobileHeight="100%">
        <BookingListing />
      </SectionContainer>

      {showMobile && (
        <SectionContainer
          title="Last Min Bookings"
          width="30%"
          noPadding
          mobileHeight="30%"
        >
          <ConfirmationListing setShowMobile={setShowMobile} />
        </SectionContainer>
      )}
      <FloatingCTA onClick={openModal}>
        <IconContainer>
          <IoAddOutline size="1.5rem" color={WHITE} />
        </IconContainer>
      </FloatingCTA>
    </Wrapper>
  );
};

export default Booking;
