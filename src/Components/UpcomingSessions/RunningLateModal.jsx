import React, { useState } from "react";
import FlexBox from "@common/UI/FlexBox";
import { ACCENT_400, ACCENT_800, ACCENT_0 } from "@components/common/UI/colors";
import { Body2, H3, Support } from "@components/common/UI/Headings";
import { Modal } from "@components/common/UI/Modal";
import { Button } from "@components/common/UI/Buttons";
import dayjs from "dayjs";
import styled from "styled-components";
import { FiX } from "react-icons/fi";
import Chip from "@components/common/UI/Chips";
import { useDispatch, useSelector } from "react-redux";
import { TYPE_PSYCHIATRIST } from "../../../variable";
import SessionIcon from "../common/SessionIcon";

const ModalHeader = styled(FlexBox)`
  padding: 1rem 1rem 1rem 1.5rem;
  justify-content: space-between;
  border-bottom: 1px solid ${ACCENT_400};
`;

const CloseIconWrapper = styled(FlexBox)`
  width: 2rem;
  height: 2rem;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  flex: 1;
  gap: 1.5rem;
  padding: 1.5rem;
`;

const ModalFooter = styled(FlexBox)`
  width: 100%;
  justify-content: end;
  align-self: flex-end;
  padding: 1rem 1.5rem 1.5rem;
  border-top: 1px solid ${ACCENT_400};
  box-sizing: border-box;
`;

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

const reasons = [
  "Network Issues",
  "Session Spillover",
  "Technical Issues",
  "Emergency",
  "Prefer not to share",
];
const delay = ["5 min", "10 mins", "15 mins", "20 mins"];

const RunningLateModal = ({
  bookingDetails,
  session,
  bookingId,
  toggleModal,
}) => {
  const [showDelayMessageModal, setShowDelayMessageModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const dispatch = useDispatch();

  const { userType, userUUID, userName } = useSelector(state => ({
    userId: state.auth.user.id,
    userUUID: state.auth.user.uuid,
    userType: state.auth.user.usertype,
    userName: `${state.auth.user.firstname} ${
      !!state.auth.user.lastname && state.auth.user.lastname
    }`,
  }));

  const sessionDatetime = session?.datetime_at_provider_timezone;

  const handleSendMessage = async () => {
    // try {
    //   let payload = {
    //     delay_reason: selectedReason,
    //     estimated_delay: selectedDuration,
    //     booking_id: bookingId,
    //   };
    //   await axiosInstance.post(
    //     `${URL.sessionsURL}/${bookingId}/save_meeting_notification`,
    //     payload
    //   );
    //   toggleModal();
    //   dispatch(
    //     addToast({
    //       msg: "Message sent successfully",
    //       appearance: "success",
    //       autoDismiss: true,
    //     })
    //   );
    //   trackEvent({
    //     event: "twa_joining_late_message_success",
    //     payload: {
    //       source: "twa_popup",
    //       provider_type:
    //         session?.provider_role === "couple"
    //           ? "couple therapist"
    //           : session?.provider_role,
    //       [`${userType}_name`]: userName,
    //       [`${userType}_uuid`]: userUUID,
    //       reasons: selectedReason,
    //       delay_time: selectedDuration,
    //     },
    //   });
    // } catch (error) {
    //   Bugsnag.notify(err);
    //   dispatch(
    //     addToast({
    //       msg: "Error while sending message",
    //       appearance: "error",
    //       autoDismiss: true,
    //     })
    //   );
    // }
  };

  const getMessage = () => {
    switch (selectedReason) {
      case "Network Issues":
        return "I am facing network issues at the moment";
      case "Technical Issues":
        return "I am facing technical issues at the moment";
      case "Session Spillover":
        return "I am facing a network issue";
      case "Emergency":
        return "I am experiencing an emergency at the moment";
      default:
        return "I am experiencing some network issues";
    }
  };

  return (
    <>
      {!showDelayMessageModal ? (
        <Modal borderRadius="1rem" maxWidth="27rem" togglePopup={toggleModal}>
          <ContentWrapper>
            <H3 bold>Are you running late for your next session?</H3>
            <ClientInfo>
              <FlexBox align="center" columnGap="0.5rem">
                <SessionIcon type={bookingDetails?.mode} color={ACCENT_800} />
                <Body2 bold>{bookingDetails?.clientName}</Body2>
              </FlexBox>
              <Support>
                {dayjs(bookingDetails?.dateTime).format("DD MMM YYYY, hh:mm A")}{" "}
                | {bookingDetails?.duration / 60} MIN
              </Support>
            </ClientInfo>
            <FlexBox align="center" justify="space-between">
              <Button outline secondary onClick={toggleModal}>
                GO BACK
              </Button>
              <Button primary onClick={() => setShowDelayMessageModal(true)}>
                SEND MESSAGE
              </Button>
            </FlexBox>
          </ContentWrapper>
        </Modal>
      ) : (
        <Modal M1 borderRadius="1rem" togglePopup={toggleModal}>
          <ModalHeader>
            <H3 bold>Send a delay message</H3>
            <CloseIconWrapper onClick={toggleModal}>
              <FiX />
            </CloseIconWrapper>
          </ModalHeader>
          <ModalBody>
            <FlexBox column rowGap="1rem">
              <Body2 bold>Please provide a reason for the delay:</Body2>
              <FlexBox wrap="wrap" columnGap="1rem" rowGap="1rem">
                {reasons?.map(item => (
                  <Chip
                    key={item}
                    width="fit-content"
                    selected={selectedReason === item}
                    onClick={() => setSelectedReason(item)}
                  >
                    <Body2
                      bold
                      ACCENT_0Space="nowrap"
                      color={selectedReason === item && ACCENT_0}
                    >
                      {item}
                    </Body2>
                  </Chip>
                ))}
              </FlexBox>
            </FlexBox>
            <FlexBox column rowGap="1rem">
              <Body2 bold>Estimated delay:</Body2>
              <FlexBox wrap="wrap" columnGap="1rem" rowGap="1rem">
                {delay?.map(item => (
                  <Chip
                    key={item}
                    width="fit-content"
                    selected={selectedDuration === item}
                    onClick={() => setSelectedDuration(item)}
                  >
                    <Body2
                      ACCENT_0Space="nowrap"
                      bold
                      color={selectedDuration === item && ACCENT_0}
                    >
                      {item}
                    </Body2>
                  </Chip>
                ))}
              </FlexBox>
            </FlexBox>
            <FlexBox column rowGap="1rem">
              <Body2 bold>Message Preview:</Body2>
              <Body2>
                Hello {bookingDetails?.clientName}, this is your{" "}
                {userType === TYPE_PSYCHIATRIST ? "psychiatrist" : "therapist"}
                <span style={{ textTransform: "capitalize" }}> {userName}</span>
                . {getMessage()} and will join our session scheduled for{" "}
                {dayjs(sessionDatetime).format("Do MMM, YYYY")} at{" "}
                {dayjs(sessionDatetime).format("Do MMM, YYYY")} in{" "}
                {selectedDuration} minutes. Thank you for your patience.
              </Body2>
            </FlexBox>
          </ModalBody>
          <ModalFooter>
            <Button primary onClick={handleSendMessage}>
              Confirm
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </>
  );
};

export default RunningLateModal;
