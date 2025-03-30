import React, { useEffect } from "react";
import FlexBox from "@common/UI/FlexBox";
import { ACCENT_400, ACCENT_800 } from "@components/common/UI/colors";
import { Body2, H3, Support } from "@components/common/UI/Headings";
import { Modal } from "@components/common/UI/Modal";
import styled from "styled-components";
import dayjs from "dayjs";
import { Button } from "@components/common/UI/Buttons";
import { trackEvent } from "../../../helperFunctions";
import { useDispatch, useSelector } from "react-redux";
import { cancelNSP } from "../../../Store/Actions";
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

const RetractNsp = ({
  bookingDetails,
  session,
  reloadSessionList,
  toggleModal,
}) => {
  const dispatch = useDispatch();

  const { userName, userId, userUUID, userType } = useSelector(state => ({
    userName: `${state.auth.user.firstname} ${
      !!state.auth.user.lastname && state.auth.user.lastname
    }`,
    userId: state.auth.user.id,
    userUUID: state.auth.user.uuid,
    userType: state.auth.user.usertype,
  }));

  const analyticsPayload = {
    [`${userType}_name`]: userName,
    [`${userType}_uuid`]: userUUID,
    ih_clinic_name: session?.clinic_details?.name || "",
    ih_clinic_id: session?.clinic_details?.id || "",
    session_mode: session?.session_mode === "offline" ? "offline" : "online",
  };

  useEffect(() => {
    trackEvent({
      event: "next_session_prompt_cancel_click",
      payload: analyticsPayload,
    });
  }, []);

  const handleCancel = () => {
    trackEvent({
      event: "next_session_prompt_cancel_dismiss",
      payload: analyticsPayload,
    });
    toggleModal?.();
  };

  const retractNsp = session => {
    trackEvent({
      event: "next_session_prompt_cancel_confirm",
      payload: analyticsPayload,
    });
    dispatch(
      cancelNSP(session, () => {
        reloadSessionList?.();
      })
    );
    toggleModal?.();
  };

  return (
    <Modal borderRadius="1rem" maxWidth="27rem" togglePopup={toggleModal}>
      <ContentWrapper>
        <H3 bold>
          Are you sure you want to withdraw this next session prompt?
        </H3>
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
          <Button outline secondary onClick={handleCancel}>
            GO BACK
          </Button>
          <Button primary onClick={retractNsp}>
            YES, CONFIRM
          </Button>
        </FlexBox>
      </ContentWrapper>
    </Modal>
  );
};

export default RetractNsp;
