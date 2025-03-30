import { useRef } from "react";
import { FiChevronRight } from "react-icons/fi";
import styled from "styled-components";
import { BooleanParam, StringParam, useQueryParams } from "use-query-params";

import DropdownWrapper from "@common/Dashboard/DropdownWrapper";
import { Body2, Support } from "@common/UI/Headings";
import FlexBox from "@common/UI/FlexBox";
import {
  ACCENT_400,
  ACCENT_200,
  ACCENT_800,
  PRIMARY_800,
} from "@common/UI/colors";
import useOutsideAlert from "@hooks/useOutsideAlert";

const DropdownContainer = styled(FlexBox)`
  right: 1rem;
  top: 4.5rem;
  width: 22.5rem;
  position: absolute;
  border-radius: 1rem;
  overflow: hidden;
`;

const DropdownOption = styled(FlexBox)`
  padding: 1rem;
  cursor: pointer;
  column-gap: 0.5rem;
  align-items: center;
  justify-content: space-between;
  transition: background-color 250ms ease-in-out;
  border-bottom: 1px solid ${ACCENT_400};
  svg {
    color: var(--accent-500);
    transition: color 250ms ease-in-out;
  }

  :hover {
    border-radius: 1rem 1rem 0 0;
    background-color: ${ACCENT_200};

    svg {
      color: ${ACCENT_800};
    }
  }
  :last-child {
    border-bottom: none;
  }
`;

const SessionOptionsDropdown = ({
  bookingId,
  toggleDropdown = () => {},
  handleChangeSessionModal,
  toggleShowRescheduleScreen,
}) => {
  const containerRef = useRef(null);

  useOutsideAlert(containerRef, toggleDropdown, "session-options");

  // eslint-disable-next-line no-unused-vars
  const [_, setQueryParams] = useQueryParams({
    showSessionDetailsModal: BooleanParam,
    bookingId: StringParam,
  });

  const sessionOptions = [
    {
      id: 1,
      title: "Add to Calendar",
      subtitle: "A calendar event will be downloaded for you",
      handleClick: () => {},
    },
    {
      id: 2,
      title: "Reschedule",
      subtitle: "Sessions can be rescheduled up to 24 hour prior",
      handleClick: toggleShowRescheduleScreen,
    },
    {
      id: 3,
      title: "Change Session Mode",
      subtitle: "It’s not possible to switch from virtual to in-person",
      handleClick: handleChangeSessionModal,
    },
    {
      id: 4,
      title: "Session Details",
      subtitle: "Download your invoice for this session",
      handleClick: () => {
        setQueryParams({ showSessionDetailsModal: 1, bookingId }, "replaceIn");
      },
    },
    {
      id: 5,
      title: "Cancel Session",
      subtitle:
        "Session credits cannot be reimbursed if cancelled 12 hours prior to the scheduled time. ",
      handleClick: () => {},
    },
  ];

  return (
    <DropdownContainer ref={containerRef}>
      <DropdownWrapper>
        <FlexBox column>
          {sessionOptions?.map(({ title, subtitle, handleClick }, index) => (
            <DropdownOption key={index} onClick={handleClick}>
              <FlexBox column>
                <Body2 bold color={index === 0 ? PRIMARY_800 : ACCENT_800}>
                  {title}
                </Body2>
                <Support>{subtitle}</Support>
              </FlexBox>
              <FiChevronRight size="1.5rem" color={ACCENT_800} />
            </DropdownOption>
          ))}
        </FlexBox>
      </DropdownWrapper>
    </DropdownContainer>
  );
};

export default SessionOptionsDropdown;
