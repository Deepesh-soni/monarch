import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { FiX } from "react-icons/fi";

import FlexBox from "@common/UI/FlexBox";
import { ACCENT_400, RED } from "@components/common/UI/colors";
import { Modal } from "@components/common/UI/Modal";
import { Body2, H3 } from "@components/common/UI/Headings";
// import axiosInstance from "../../../axiosInstance";
// import URL from "../../../urls";

dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);

const ContentWrapper = styled(FlexBox)`
  flex-direction: column;
  width: 100%;
`;

const Header = styled(FlexBox)`
  padding: 1rem 1rem 1rem 1.5rem;
  justify-content: space-between;
  border-bottom: 1px solid ${ACCENT_400};
`;

const Body = styled.div`
  display: flex;
  padding: 1.5rem;
  flex-direction: column;
  gap: 1rem;
`;

const LineItem = styled(FlexBox)`
  align-items: center;
  justify-content: space-between;
  order: 1;

  ${({ labelColor }) =>
    labelColor &&
    css`
      order: 2;
      ${Body2} {
        color: ${labelColor};
      }
    `}
`;

const CloseIconWrapper = styled(FlexBox)`
  width: 2rem;
  height: 2rem;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ActionsMap = {
  cancelled_on: { label: "Cancelled on", isDate: true, labelColor: RED },
  created_on: { label: "Booking created on", isDate: true },
  id: { label: "Booking ID", isDate: false, isId: true },
  mode_changed_on: { label: "Session mode changed on", isDate: false },
  credit_remaining: { label: "Credits remaining", isDate: false },
  package_type: { label: "Booking Type", isDate: false },
  rescheduled_on: { label: "Rescheduled on", isDate: true },
};

const BookingDetails = ({ bookingId, toggleModal }) => {
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    fetchBookingDetails(bookingId, setBookingDetails);
  }, [bookingId]);

  const fetchBookingDetails = async (bookingId, setBookingDetails) => {
    // try {
    //   const res = await axiosInstance.get(`${URL.bookingDetails}/${bookingId}`);
    //   setBookingDetails(res?.data?.data);
    // } catch (e) {
    //   Bugsnag.notify(e);
    // }
  };

  return (
    <Modal borderRadius="1rem" maxWidth="27rem" togglePopup={toggleModal}>
      <ContentWrapper>
        <Header>
          <H3 bold>Booking Details</H3>
          <CloseIconWrapper onClick={toggleModal}>
            <FiX />
          </CloseIconWrapper>
        </Header>
        <Body>
          {!!bookingDetails &&
            Object.keys(bookingDetails)?.map(item => {
              return (
                !!bookingDetails?.[item] && (
                  <LineItem labelColor={ActionsMap?.[item]?.labelColor}>
                    <Body2>{ActionsMap?.[item]?.label}</Body2>
                    <Body2 bold>
                      {ActionsMap?.[item]?.isDate
                        ? dayjs(bookingDetails?.[item]).format(
                            "DD MMM YYYY, hh:mm A"
                          )
                        : ActionsMap?.[item]?.isId
                        ? `#${bookingDetails?.[item]}`
                        : bookingDetails?.[item]}
                    </Body2>
                  </LineItem>
                )
              );
            })}
        </Body>
      </ContentWrapper>
    </Modal>
  );
};

export default BookingDetails;
