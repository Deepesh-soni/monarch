import React, { useContext } from "react";
import { FiClock, FiMoreVertical, FiX } from "react-icons/fi";
import { redirectToTherapyRoom, trackEvent } from "../../../helperFunctions";
import { useSelector } from "react-redux";
import { Button } from "@components/common/UI/Buttons";
import { Body2 } from "@components/common/UI/Headings";
import FlexBox from "@common/UI/FlexBox";
import {
  ACCENT_400,
  ACCENT_500,
  PRIMARY_800,
  RED,
} from "@components/common/UI/colors";
import styled from "styled-components";
import dayjs from "dayjs";
import { CF_PROVIDER_ROLE, TYPE_PSYCHIATRIST } from "../../../variable";
import { SuperviseeProfileContext } from "../../../context/SuperviseeProfileProvider";

const IconWrapper = styled(FlexBox)`
  height: 2rem;
  width: 2rem;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const IconBtn = styled(FlexBox)`
  display: flex;
  padding: 1rem 1.25rem;
  align-items: center;
  justify-content: center;
  border-radius: 2.5rem;
  min-width: auto;
  border: 1px solid ${ACCENT_400};
  cursor: pointer;
`;

const SessionStatusComponent = ({
  session,
  toggleRetractNsp,
  toggleRunningLateModal,
  approveSession,
  rejectSession,
  toggleDropdown,
  setDropdownOptions,
  setShowBookingDetails,
  toggleReschedule,
  toggleCancelSession,
  togglePostSessionActions,
  toggleMarkAsCompleted,
  toggleChangeMode,
  toggleAutomatedCall,
  isClientDisabled,
}) => {
  const { status, summary_status } = session;
  const { userName, userUUID, userType } = useSelector(state => ({
    userName: `${state.auth.user.firstname} ${
      !!state.auth.user.lastname && state.auth.user.lastname
    }`,
    userUUID: state.auth.user.uuid,
    userType: state.auth.user.usertype,
  }));
  const providerProfile = useSelector(state => state.provider.providerProfile);

  const isCfProvider = providerProfile?.roles?.includes(CF_PROVIDER_ROLE);

  const { isSupervisionMode } = useContext(SuperviseeProfileContext);

  const isActionDisabled = isSupervisionMode || isClientDisabled;

  const hasDiffOf15 = () => {
    const sessionDatetime = session?.datetime_at_provider_timezone;

    return (dayjs(sessionDatetime) - dayjs()) / (60 * 1000) < 15;
  };

  const commonDropdownOptions = [
    {
      label: "Booking details",
      handleNavigation: () => setShowBookingDetails(true),
    },
  ];

  const cfBookedOptions = [
    {
      label: "Reschedule",
      handleNavigation: toggleReschedule,
    },
    ...commonDropdownOptions,
    {
      label: "Cancel session",
      labelColor: RED,
      handleNavigation: toggleCancelSession,
    },
  ];

  const statusCases = {
    completed: {
      render: () => (
        <>
          {session?.post_session_actions_pending ? (
            <Button outline onClick={togglePostSessionActions}>
              ACTIONS
            </Button>
          ) : (
            <Button textCta secondary onClick={togglePostSessionActions}>
              COMPLETED
            </Button>
          )}
        </>
      ),
      dropdownOptions: [
        {
          label: "Post session actions",
          handleNavigation: togglePostSessionActions,
        },
        ...commonDropdownOptions,
      ],
    },
    abandoned: {
      render: () => (
        <>
          <Body2 bold color={ACCENT_500}>
            ABANDONED
          </Body2>
        </>
      ),
      dropdownOptions: [
        {
          label: "Mark as completed",
          handleNavigation: toggleMarkAsCompleted,
        },
        ...commonDropdownOptions,
      ],
    },
    cancel: {
      render: () => (
        <>
          <Body2 bold color={ACCENT_500}>
            CANCELLED
          </Body2>
        </>
      ),
      dropdownOptions: commonDropdownOptions,
    },
    tentative: {
      render: () => (
        <>
          <Body2 bold color={ACCENT_500}>
            TENTATIVE
          </Body2>
        </>
      ),
      dropdownOptions: [
        ...commonDropdownOptions,
        {
          label: "Withdraw",
          labelColor: RED,
          handleNavigation: toggleRetractNsp,
        },
      ],
    },
    booked: {
      render: () => {
        const isRescheduled = !!session?.rescheduled_at;
        const statusText = isRescheduled ? "RESCHEDULED" : "CONFIRMED";

        return hasDiffOf15() ? (
          <>
            {/* Joining late not shown to CF */}
            {!isCfProvider && (
              <IconBtn
                outline
                secondary
                disabled={isActionDisabled}
                onClick={() => {
                  toggleRunningLateModal();
                  trackEvent({
                    event: "twa_joining_late_cta_click",
                    payload: {
                      source: "session_flow",
                      provider_type:
                        session.provider_role === "couple"
                          ? "couple therapist"
                          : session.provider_role,
                      [`${userType}_name`]: userName,
                      [`${userType}_uuid`]: userUUID,
                    },
                  });
                }}
              >
                <FiClock color={PRIMARY_800} />
              </IconBtn>
            )}
            <Button
              primary
              onClick={() => redirectToTherapyRoom(session)}
              disabled={isActionDisabled}
            >
              Join
            </Button>
          </>
        ) : (
          <>
            {statusText && (
              <Body2 bold color={ACCENT_500}>
                {statusText}
              </Body2>
            )}
          </>
        );
      },
      dropdownOptions: isCfProvider
        ? cfBookedOptions
        : [
            {
              label: "Reschedule",
              handleNavigation: toggleReschedule,
            },
            {
              label: "Change mode",
              handleNavigation: toggleChangeMode,
            },
            {
              label: "Contact client",
              handleNavigation: toggleAutomatedCall,
            },
            ...commonDropdownOptions,
            {
              label: "Cancel session",
              labelColor: RED,
              handleNavigation: toggleCancelSession,
            },
          ],
    },
    approval_pending: {
      render: () => (
        <>
          <IconBtn
            outline
            secondary
            onClick={() => {
              rejectSession(session);
            }}
            disabled={isActionDisabled}
          >
            <FiX strokeWidth={3} size={16} color={RED} />
          </IconBtn>
          <Button
            primary
            onClick={() => {
              approveSession(session);
            }}
            disabled={isActionDisabled}
          >
            Approve
          </Button>
        </>
      ),
      dropdownOptions: null,
    },
  };

  const renderStatusComponent = statusCases[status];

  if (renderStatusComponent) {
    return (
      <>
        {renderStatusComponent.render()}
        {renderStatusComponent?.dropdownOptions && !isActionDisabled && (
          <IconWrapper
            onClick={() => {
              toggleDropdown();
              setDropdownOptions(renderStatusComponent?.dropdownOptions);
            }}
          >
            <FiMoreVertical size={24} strokeWidth={2} />
          </IconWrapper>
        )}
      </>
    );
  }

  return null;
};

export default SessionStatusComponent;
