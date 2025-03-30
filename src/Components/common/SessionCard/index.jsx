import React, { useState } from "react";
import { FiMoreHorizontal, FiX } from "react-icons/fi";
import styled from "styled-components";
import dayjs from "dayjs";

import FlexBox from "@common/UI/FlexBox";
import {
  ERROR,
  ACCENT_100,
  ACCENT_400,
  ACCENT_700,
  ACCENT_800,
  PRIMARY_400,
  PRIMARY_800,
  WHITE,
} from "@common/UI/colors";
import { Button } from "@common/UI/Buttons";
import { Body2, Support } from "@common/UI/Headings";

const Card = styled(FlexBox)`
  border-radius: 0.5rem;
  background: ${({ isNsp }) => (isNsp ? ERROR : ACCENT_100)};
  border: ${({ isNsp }) =>
    isNsp ? `1px dashed ${PRIMARY_800}` : `1px solid ${ACCENT_400}`};
  padding: 0.875rem;
  width: 100%;
  box-sizing: border-box;
`;

const ProviderImg = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
`;

const commonIconProps = {
  size: "1.5rem",
  cursor: "pointer",
  color: ACCENT_800,
};

const SessionDetails = styled.div`
  width: 100%;
  margin-top: 0.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30%, 1fr));
  grid-gap: 1em;
  div:nth-child(2) {
    justify-self: center;
    align-items: center;
  }
  @media screen and (max-width: 768px) {
    div:nth-child(2) {
      justify-self: end;
      align-items: flex-end;
    }
    div:last-child {
      grid-column: span 2;
      justify-content: center;
    }
    ${Button} {
      width: 100%;
    }
  }
`;

const RoundedCloseIcon = styled.div`
  display: flex;
  padding: 0.75rem;
  justify-content: center;
  align-items: center;
  background: ${WHITE};
  border-radius: 2.5rem;
  border: 1px solid ${PRIMARY_400};
`;

const NSPText = styled(Support)`
  @media screen and (max-width: 768px) {
    text-align: center;
  }
`;

const RelativeDiv = styled(FlexBox)`
  row-gap: 0.5rem;
  position: relative;
`;

const SessionCard = ({ session, isNsp }) => {
  const [showSessionOptions, setShowSessionOptions] = useState(false);
  // const [showViewLocationModal, setShowViewLocationModal] = useState(false);
  // const [showRescheduleScreen, setShowRescheduleScreen] = useState(false);

  // const [showChangeSessionModeModal, setShowChangeSessionModeModal] =
  //   useState(false);

  // const handleChangeSessionModal = () => {
  //   setShowChangeSessionModeModal(!showChangeSessionModeModal);
  // };

  const toggleSessionOptions = () => setShowSessionOptions(!showSessionOptions);
  // const toggleViewLocationModal = () =>
  //   setShowViewLocationModal(!showViewLocationModal);

  // const toggleShowRescheduleScreen = () =>
  //   setShowRescheduleScreen(!showRescheduleScreen);

  const providerName = session.provider?.firstname + session.provider?.lastname;
  return (
    <RelativeDiv column>
      {/* {showSessionOptions && (
        <SessionOptionsDropdown
          toggleDropdown={toggleSessionOptions}
          bookingId={session?.id}
          handleChangeSessionModal={handleChangeSessionModal}
          toggleShowRescheduleScreen={toggleShowRescheduleScreen}
        />
      )}
      {showViewLocationModal && (
        <ViewLocationModal
          toggleModal={toggleViewLocationModal}
          // clinicDetails={clinicDetails}    // TODO: Add clinicDetails
        />
      )}

      {false && (
        <RescheduleSession
          handleOnClose={toggleShowRescheduleScreen}
          bookingDetails={session}
          // reloadSessionList={reloadSessionList}
        />
      )}

      {true && (
        <CancelSession
          handleOnClose={toggleShowRescheduleScreen}
          bookingDetails={session}
          // reloadSessionList={reloadSessionList}
        />
      )} */}

      <Card column isNsp={isNsp}>
        <FlexBox align="center" justify="space-between" width="100%">
          <FlexBox align="center" columnGap="0.5rem">
            <ProviderImg src="/assets/images/stylists/men.jpg" />
            <FlexBox column justify="center">
              <Support color={ACCENT_700} textTransform="capitalize">
                session with
              </Support>
              <Body2 bold>{providerName || "Ganesh Hairstylist"}</Body2>
            </FlexBox>
          </FlexBox>
          {!isNsp && (
            <FlexBox>
              <FiMoreHorizontal
                {...commonIconProps}
                onClick={toggleSessionOptions}
              />
            </FlexBox>
          )}
        </FlexBox>
        <SessionDetails>
          <Support bold color={ACCENT_700}>
            {dayjs(session.datetime_at_customer_timezone?.datetime).format(
              "DD MMM YYYY"
            )}
            {" | "}
            {dayjs(session.datetime_at_customer_timezone?.slot, "HH:mm").format(
              "hh:mm A"
            )}
            {" | "}
            {session.duration} mins
          </Support>

          <FlexBox align="center" justify="flex-end" columnGap="0.5rem">
            {isNsp && <Button>BOOK</Button>}
            {isNsp && (
              <RoundedCloseIcon id="session-options">
                <FiX
                  color={PRIMARY_800}
                  size="1rem"
                  cursor="pointer"
                  strokeWidth={3}
                />
              </RoundedCloseIcon>
            )}
          </FlexBox>
        </SessionDetails>
      </Card>
      {isNsp && (
        <NSPText>
          Please ensure that you book this session before 08 Jan 2021, 04:35 PM.
        </NSPText>
      )}
    </RelativeDiv>
  );
};

export default SessionCard;
