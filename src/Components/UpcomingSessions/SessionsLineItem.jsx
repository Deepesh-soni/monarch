import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import {
  ACCENT_300,
  PRIMARY_800,
  ACCENT_0,
} from "@components/common/UI/colors";
import { Body2, Support } from "@components/common/UI/Headings";
import FlexBox from "@common/UI/FlexBox";
import ToolTip from "@components/common/UI/ToolTip";

const Container = styled.div`
  display: grid;
  grid-template-columns: ${props =>
    props.inClientProfile ? "1.75fr 1.75fr 1.25fr" : "1.5fr 1.5fr 0.75fr 2fr"};
  justify-items: start;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid ${ACCENT_300};
  text-overflow: ellipsis;
  &:last-child {
    border-bottom: none;
  }
`;

const ActionWrapper = styled(FlexBox)`
  width: 100%;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
`;

const SessionLineItem = ({
  session,
  reloadSessionList,
  inClientProfile = false,
}) => {
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [showAutomatedCall, setShowAutomatedCall] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [reschedule, setReschedule] = useState(false);
  const [modeChange, setModeChange] = useState(false);
  const [showBookingDetails, setShowBookingDetails] = useState(false);
  const [cancelSession, setCancelSession] = useState(false);
  const [markSessionAsCompleted, setMarkSessionAsCompleted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPostSessionActions, setShowPostSessionActions] = useState(false);
  const [showRetractNsp, setShowRetractNsp] = useState(false);
  const [showRunningLate, setShowRunningLate] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const sessionDatetime = session?.datetime_at_provider_timezone;

  useEffect(() => {
    handleSessionDetails();
  }, [session]);

  // const toggleDropdown = () => setIsMenuOpen(!isMenuOpen);

  // const toggleMarkAsCompleted = () => {
  //   setMarkSessionAsCompleted(!markSessionAsCompleted);
  // };

  // const togglePostSessionActions = () => {
  //   setShowPostSessionActions(!showPostSessionActions);
  // };

  // const toggleChangeMode = () => {
  //   trackEvent({
  //     event: "session_mode_change_click",
  //     payload: {
  //       [`${userType}_name`]: userName,
  //       [`${userType}_uuid`]: userUUID,
  //       initiated_by: "provider",
  //     },
  //   });
  //   setModeChange(!modeChange);
  // };

  // const toggleRetractNsp = () => setShowRetractNsp(!showRetractNsp);

  // const toggleReschedule = () => {
  //   trackEvent({
  //     event: "session_reschedule_click",
  //     payload: {
  //       [`${userType}_name`]: userName,
  //       [`${userType}_uuid`]: userUUID,
  //     },
  //   });
  //   trackEvent({
  //     event: "twa_session_reschedule_flow_start",
  //     payload: {
  //       flow: bookingDetails?.flow,
  //       [`${userType}_name`]: userName,
  //       [`${userType}_uuid`]: userUUID,
  //     },
  //   });
  //   setReschedule(!reschedule);
  // };

  // const toggleCancelSession = () => {
  //   trackEvent({
  //     event: "twa_session_cancel_flow_start",
  //     payload: {
  //       flow: bookingDetails?.flow,
  //       [`${userType}_name`]: userName,
  //       [`${userType}_uuid`]: userUUID,
  //     },
  //   });
  //   setCancelSession(!cancelSession);
  // };

  // const toggleRunningLateModal = () => setShowRunningLate(!showRunningLate);

  // const toggleAutomatedCall = () => {
  //   setShowAutomatedCall(!showAutomatedCall);
  //   if (!showAutomatedCall) {
  //     trackEvent({
  //       event: "automated_call_icon_click",
  //       payload: {
  //         [`${userType}_name`]: userName,
  //         [`${userType}_uuid`]: userUUID,
  //       },
  //     });
  //   }
  // };

  const handleSessionDetails = () => {
    setBookingDetails({
      clientName: session?.customer?.firstname,
      clientId: session?.customer?.id,
      clientUuid: session?.customer?.uuid,
      clientImage: session?.customer?.image,
      mode: session?.typeofsession,
      flow:
        session?.provider_role === "couple"
          ? "couples_therapy"
          : session?.provider_role,
      dateTime: sessionDatetime,
      duration: session?.duration,
      isNewClient: session?.is_new_user,
      clinicId: session?.clinic_details?.id,
      clientFirebaseId: session?.customer?.firebaseid,
      isEhrCompleted: session?.is_ehr_completed,
      isFirstSession: session?.is_first_session,
      isCoupleSession: session?.bookingtype === "couple",
    });
  };

  const approveSession = session => {
    // dispatch(
    //   approveUserSession(session, () => {
    //     reloadSessionList();
    //   })
    // );
  };

  const rejectSession = session => {
    // dispatch(
    //   approveUserSession(
    //     session,
    //     () => {
    //       reloadSessionList();
    //     },
    //     "no"
    //   )
    // );
  };

  const renderDetails = () => {
    return session?.ih_clinic_id ? "In-person Session" : "Online Session";
  };

  const showViewEhrCta = session?.is_first_session && session?.is_ehr_completed;

  return (
    <Container key={session?.id} inClientProfile={inClientProfile}>
      {/* {modeChange && (
        <ModeChange
          bookingId={session?.id}
          bookingDetails={bookingDetails}
          toggleModal={toggleChangeMode}
          reloadSessionList={reloadSessionList}
        />
      )}

      {markSessionAsCompleted && (
        <MarkAsCompleted
          sessionId={session?.id}
          bookingDetails={bookingDetails}
          toggleModal={toggleMarkAsCompleted}
          reloadSessionList={reloadSessionList}
        />
      )}

      {showRetractNsp && (
        <RetractNsp
          bookingId={session?.id}
          session={session}
          bookingDetails={bookingDetails}
          toggleModal={toggleRetractNsp}
          reloadSessionList={reloadSessionList}
        />
      )}

      {showBookingDetails && (
        <BookingDetails
          bookingId={session?.id}
          bookingDetails={bookingDetails}
          toggleModal={() => setShowBookingDetails(false)}
        />
      )}

      {showPostSessionActions && (
        <PostSessionActions
          bookingId={session?.id}
          bookingDetails={bookingDetails}
          toggleModal={togglePostSessionActions}
          reloadSessionList={reloadSessionList}
          isClientDisabled={isClientDisabled}
        />
      )}

      {reschedule && (
        <RescheduleSession
          bookingId={session?.id}
          bookingDetails={bookingDetails}
          toggleModal={toggleReschedule}
          reloadSessionList={reloadSessionList}
        />
      )}

      {cancelSession && (
        <CancelSession
          bookingId={session?.id}
          bookingDetails={bookingDetails}
          toggleModal={toggleCancelSession}
          reloadSessionList={reloadSessionList}
        />
      )}

      {showAutomatedCall && (
        <AutomatedCall
          bookingId={session?.id}
          toggleModal={toggleAutomatedCall}
        />
      )}

      {showRunningLate && (
        <RunningLateModal
          bookingId={session?.id}
          bookingDetails={bookingDetails}
          toggleModal={toggleRunningLateModal}
          session={session}
        />
      )} */}

      {!inClientProfile && (
        <FlexBox width="100%" column rowGap="0.25rem">
          <Body2
            bold
            textTransform="capitalize"
            color={PRIMARY_800}
            cursor="pointer"
            onClick={() => {
              router.push(
                `/clients/${session?.customer?.firebaseid}?client_uuid=${session?.customer?.uuid}`
              );
            }}
            style={{
              ACCENT_0Space: "nowrap",
              width: "90%",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            title={
              session?.customer?.firstname +
              " " +
              (!!session?.customer?.lastname ? session?.customer?.lastname : "")
            }
          >
            {session?.customer?.firstname}{" "}
            {!!session?.customer?.lastname && session?.customer?.lastname}
          </Body2>
          <FlexBox columnGap="0.5rem">
            {bookingDetails?.isCoupleSession ? (
              <Support
                style={{
                  ACCENT_0Space: "nowrap",
                  width: "50%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                title={
                  session?.partner?.firstname +
                  " " +
                  (session?.partner?.lastname ? session?.partner?.lastname : "")
                }
              >
                and{" "}
                <Support textTransform="capitalize">
                  {session?.partner?.firstname}
                  {session?.partner?.lastname ? session?.partner?.lastname : ""}
                </Support>
              </Support>
            ) : (
              <>
                <Support data-tip data-for="client-id">
                  #{session?.customer?.id}
                </Support>
                <ToolTip id="client-id" place="top">
                  <Support bold color={ACCENT_0} textTransform="capitalize">
                    Client ID
                  </Support>
                </ToolTip>
              </>
            )}
            {session?.is_new_user && <Support>New Client!</Support>}
          </FlexBox>
        </FlexBox>
      )}

      <FlexBox width="100%" column rowGap="0.25rem">
        {inClientProfile ? (
          <Body2 bold>
            {dayjs(sessionDatetime).format("DD MMM YYYY, hh:mm A")}
          </Body2>
        ) : (
          <Body2 bold>{dayjs(sessionDatetime).format("hh:mm A")}</Body2>
        )}

        <Support>{renderDetails()}</Support>
      </FlexBox>
      <FlexBox width="100%" column rowGap="0.25rem">
        <FlexBox
          width="fit-content"
          data-tip
          data-for={`session-mode-${session?.id}`}
        >
          {/* <SessionIcon type={session?.typeofsession} color={PRIMARY_800} /> */}
        </FlexBox>
        <Support bold>{session?.duration / 60} min</Support>
        <ToolTip id={`session-mode-${session?.id}`} place="top">
          <Support bold color={ACCENT_0} textTransform="capitalize">
            {!!session?.ih_clinic_id
              ? session?.clinic_details?.short_name
              : session?.typeofsession}
          </Support>
        </ToolTip>
      </FlexBox>
      {/* <ActionWrapper>
        <SessionStatusComponent
          session={session}
          showViewEhrCta={showViewEhrCta}
          isClientDisabled={isClientDisabled}
          toggleRetractNsp={toggleRetractNsp}
          toggleRunningLateModal={toggleRunningLateModal}
          getEhrLink={getEhrLink}
          rejectSession={rejectSession}
          approveSession={approveSession}
          toggleDropdown={toggleDropdown}
          setDropdownOptions={setDropdownOptions}
          setShowBookingDetails={setShowBookingDetails}
          toggleReschedule={toggleReschedule}
          toggleCancelSession={toggleCancelSession}
          toggleMarkAsCompleted={toggleMarkAsCompleted}
          toggleAutomatedCall={toggleAutomatedCall}
          toggleChangeMode={toggleChangeMode}
          togglePostSessionActions={togglePostSessionActions}
        />
        <FlexBox ref={menuRef} position="relative" onClick={toggleDropdown}>
          {isMenuOpen && (
            <Dropdown
              parentRef={menuRef}
              options={dropdownOptions}
              isOpen={isMenuOpen}
              setIsOpen={setIsMenuOpen}
              closeDropdown={toggleDropdown}
              size="small"
              width="10rem"
              top="1.5rem"
              left="0"
            />
          )}
        </FlexBox>
      </ActionWrapper> */}
    </Container>
  );
};

export default SessionLineItem;
