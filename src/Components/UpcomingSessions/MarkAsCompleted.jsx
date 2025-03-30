import React from "react";
import dayjs from "dayjs";
import styled from "styled-components";

import FlexBox from "@common/UI/FlexBox";
import { ACCENT_400, ACCENT_800 } from "@components/common/UI/colors";
import { Body2, H3, Support } from "@components/common/UI/Headings";
import { Modal } from "@components/common/UI/Modal";
import { Button } from "@components/common/UI/Buttons";
import SessionIcon from "../common/SessionIcon";

const ContentWrapper = styled(FlexBox)`
  flex-direction: column;
  padding: 1.5rem;
  gap: 1rem;
  width: 100%;
`;

const ClientInfo = styled(FlexBox)`
  padding: 1rem;
  width: 100%;
  flex-direction: column;
  gap: 0.25rem;
  border-radius: 0.5rem;
  border: 1px solid ${ACCENT_400};
`;

const MarkAsCompleted = ({
  bookingDetails,
  sessionId,
  bookingType,
  toggleModal,
  reloadSessionList,
}) => {
  const handleConfirm = async session => {
    // try {
    //   await axiosInstance.post(`${URL.endSession}`, {
    //     booking_id: sessionId,
    //     user_attended: true,
    //     partner_attended: bookingType === "couple" ? true : false,
    //   });
    // } catch (error) {
    //   Bugsnag.notify(error);
    // }
    setTimeout(() => {
      reloadSessionList();
    }, 1000);

    toggleModal?.();
  };

  return (
    <Modal borderRadius="1rem" maxWidth="27rem" togglePopup={toggleModal}>
      <ContentWrapper>
        <H3 bold>Are you sure you want to mark this session as completed?</H3>
        <ClientInfo>
          <FlexBox align="center" columnGap="0.5rem">
            <SessionIcon type={bookingDetails?.mode} color={ACCENT_800} />
            <Body2 bold>{bookingDetails?.clientName}</Body2>
          </FlexBox>
          <Support>
            {dayjs(bookingDetails?.dateTime).format("DD MMM YYYY, hh:mm A")} |{" "}
            {bookingDetails?.duration / 60} MIN
          </Support>
        </ClientInfo>
        <FlexBox align="center" justify="space-between">
          <Button outline secondary onClick={toggleModal}>
            NO, GO BACK
          </Button>
          <Button primary onClick={handleConfirm}>
            CONFIRM
          </Button>
        </FlexBox>
      </ContentWrapper>
    </Modal>
  );
};

export default MarkAsCompleted;
