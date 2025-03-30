import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import {
  cancellationReasonsProviders,
  cancellationReasonsUsers,
} from "../../../metaData/CancellationReasons";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { FiX } from "react-icons/fi";
import { Button } from "@components/common/UI/Buttons";
import { Body2, H1, H3, Support } from "@components/common/UI/Headings";
import FlexBox from "@common/UI/FlexBox";
import {
  ACCENT_400,
  ACCENT_600,
  ACCENT_800,
} from "@components/common/UI/colors";
// import {
//   cancelUserSession,
//   sessionCount,
// } from "../../../Store/Actions/providerActions";
import Radio from "@components/common/UI/Radio";
import CustomToggle from "@components/common/UI/Toggle";
import InputBox from "@components/common/UI/InputBox";
import { Modal } from "@components/common/UI/Modal";
import Dropdown from "@components/common/UI/Dropdown";
import Bugsnag from "@bugsnag/js";
// import axiosInstance from "../../../axiosInstance";
// import URL from "../../../urls";
import SessionIcon from "../common/SessionIcon";

dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);

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
  height: auto;
  display: flex;
  flex: 1;
`;

const ModalFooter = styled(FlexBox)`
  width: 100%;
  justify-content: end;
  align-self: flex-end;
  padding: 1rem 1.5rem 1.5rem;
  border-top: 1px solid ${ACCENT_400};
  box-sizing: border-box;
`;

const Left = styled(FlexBox)`
  padding: 1.5rem;
  flex: 1;
  border-right: 1px solid ${ACCENT_400};
`;

const CountContainer = styled.div`
  display: flex;
  padding: 1rem;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  border: 1px solid ${ACCENT_400};
  border-radius: 0.5rem;
`;

const Right = styled(FlexBox)`
  padding: 1.5rem;
  flex: 1;
`;

const TextArea = styled.textarea`
  height: 7.5rem;
  padding: 0.75rem;
  gap: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid ${ACCENT_600};
  font-family: "Quicksand";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.5rem;
  color: ${ACCENT_800};

  ::placeholder {
    color: ${ACCENT_600};
  }
`;

const SelectWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  position: relative;
`;

const CreditsContainer = styled(FlexBox)`
  justify-content: space-between;
  ${({ isDisabled }) =>
    isDisabled &&
    css`
      opacity: 0.2;
      pointer-events: none;
    `}
`;

const ClientInfo = styled(FlexBox)`
  padding: 1rem;
  width: 100%;
  flex-direction: column;
  gap: 0.25rem;
  border-radius: 0.5rem;
  border: 1px solid ${ACCENT_400};
`;

const CancelSession = ({
  bookingDetails,
  bookingId,
  toggleModal,
  reloadSessionList,
}) => {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  const { userName, userId, userUUID, userType } = useSelector(state => ({
    userName: `${state.auth.user.firstname} ${
      !!state.auth.user.lastname && state.auth.user.lastname
    }`,
    userId: state.auth.user.id,
    userUUID: state.auth.user.uuid,
    userType: state.auth.user.usertype,
  }));

  const initialReason = {
    value: "--not selected--",
    label: "--Not Selected--",
  };

  const [cancellationReasonText, setCancellationReasonText] = useState(null);
  const [isUserCancelling, setIsUserCancelling] = useState(false);
  const [creditToggle, setCreditToggle] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [reasonValue, setReasonValue] = useState(initialReason);
  const [cancelledSession, , setCancelledSession] = useState(null);
  const [scheduledSession, setScheduledSession] = useState(null);

  const { therapistID } = useSelector(state => ({
    therapistID: state.auth.user.id,
  }));

  const options = reasons =>
    reasons.map(o => ({ value: o.toLowerCase(), label: o }));

  useEffect(() => {
    if (bookingDetails?.clientId && therapistID) {
      fetchSessionCounts();
    }
  }, [bookingDetails?.clientId, therapistID]);

  const fetchSessionCounts = async () => {
    // try {
    //   const res = await axiosInstance.get(
    //     `${URL.sessionCount}?patient_id=${bookingDetails?.clientId}&provider_id=${therapistID}`
    //   );
    //   setCancelledSession(res?.data?.cancelled);
    //   setScheduledSession(res?.data?.scheduled);
    // } catch (error) {
    //   Bugsnag.notify(error);
    // }
  };

  const handleConfirm = () => {
    let cancelPayload = {
      id: bookingId,
      cancellation_self_initiated:
        reasonValue?.value === "session cancellation initiated by me",
      modified_by: isUserCancelling ? "user" : "provider",
      long_reason: cancellationReasonText,
      short_reason: reasonValue?.label,
    };
    let cancelAnalyticsPayload = {
      event: "twa_cancellation_confirm",
      payload: {
        flow: bookingDetails?.flow,
        [`${userType}_name`]: userName,
        [`${userType}_uuid`]: userUUID,
        credit_refunded: creditToggle,
        reason: reasonValue?.value,
        text_input: cancellationReasonText || "null",
        cancelled_by: isUserCancelling ? "user" : "provider",
        within_12hrs:
          dayjs(bookingDetails.dateTime).diff(Date.now(), "hours") < 12,
      },
    };
    const cancellationCallback = () => {
      reloadSessionList();
    };
    dispatch(
      cancelUserSession(
        cancelPayload,
        cancellationCallback,
        cancelAnalyticsPayload,
        creditToggle
      )
    );
    toggleModal?.();
  };

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <Modal M1 borderRadius="1rem" togglePopup={toggleModal}>
      <ModalHeader>
        <H3 bold>Cancel Session</H3>
        <CloseIconWrapper onClick={toggleModal}>
          <FiX />
        </CloseIconWrapper>
      </ModalHeader>
      <ModalBody>
        <Left column rowGap="1.5rem">
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
          <FlexBox column rowGap="0.5rem">
            <Body2 fontSize="1rem" bold>
              Who is cancelling the session?*
            </Body2>
            <FlexBox columnGap="1.5rem">
              <FlexBox
                align="center"
                columnGap="0.25rem"
                onClick={() => {
                  setIsUserCancelling(false);
                  setReasonValue(initialReason);
                  setCreditToggle(true);
                }}
              >
                <Radio active={!isUserCancelling} />
                <Body2 fontSize="1rem" bold>
                  ME
                </Body2>
              </FlexBox>
              <FlexBox
                align="center"
                columnGap="0.25rem"
                onClick={() => {
                  setIsUserCancelling(true);
                  setReasonValue(initialReason);
                }}
              >
                <Radio active={isUserCancelling} />
                <Body2 fontSize="1rem" bold>
                  USER
                </Body2>
              </FlexBox>
            </FlexBox>
          </FlexBox>
          <FlexBox width="100%">
            <CountContainer>
              <Support>
                Sessions
                <br />
                cancelled
              </Support>
              <H1 bold>{cancelledSession}</H1>
            </CountContainer>
            <CountContainer>
              <Support>
                Sessions
                <br />
                Scheduled
              </Support>
              <H1 bold>{scheduledSession}</H1>
            </CountContainer>
          </FlexBox>
          <FlexBox column rowGap="0.5rem">
            <CreditsContainer isDisabled={!isUserCancelling}>
              <Body2 bold>Give user session credits</Body2>
              <CustomToggle
                checked={creditToggle}
                disabled={!isUserCancelling}
                onChange={newValue => setCreditToggle(newValue)}
              />
            </CreditsContainer>
            {!isUserCancelling && (
              <Support>
                User will automatically get credits if you cancel the session
              </Support>
            )}
          </FlexBox>
        </Left>
        <Right column rowGap="1.5rem">
          <FlexBox column rowGap="0.5rem" width="100%">
            <Body2 bold>Reason for cancelling*</Body2>
            <SelectWrapper ref={dropdownRef} onClick={toggleDropdown}>
              <InputBox value={reasonValue?.value} />
              {showDropdown && (
                <Dropdown
                  isSingleSelect
                  applyOption={value => setReasonValue(value)}
                  options={
                    isUserCancelling
                      ? options(cancellationReasonsUsers)
                      : options(cancellationReasonsProviders)
                  }
                  closeDropdown={toggleDropdown}
                  parentRef={dropdownRef}
                  isOpen={showDropdown}
                  setIsOpen={toggleDropdown}
                  selectedOption={reasonValue}
                  size="large"
                  width="100%"
                  top="3.5rem"
                />
              )}
            </SelectWrapper>
          </FlexBox>
          <TextArea
            placeholder="Help us understand (optional)"
            value={cancellationReasonText}
            onChange={e => setCancellationReasonText(e.target.value)}
          />
        </Right>
      </ModalBody>
      <ModalFooter>
        <Button
          primary
          onClick={handleConfirm}
          disabled={reasonValue?.value === initialReason?.value}
        >
          Confirm
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CancelSession;
