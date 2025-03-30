import { useState } from "react";
import styled from "styled-components";
import { FiChevronRight } from "react-icons/fi";
import { useRouter } from "next/router";

import FlexBox from "@common/UI/FlexBox";
import CalendarStrip from "./CalendarStrip";
import { H3 } from "@common/UI/Headings";
import { TextButton } from "@common/UI/Buttons";
import SessionCard from "@common/SessionCard";
import { sessions, suggestedSessions } from "@metadata/sessions";
import { ACCENT_0 } from "@common/UI/colors";
import { boxShadowDs1 } from "@common/UI/styles";

const Container = styled(FlexBox)`
  width: 100%;
  padding: 1.5rem;
  gap: 1.5rem;
  flex-direction: column;
  background-color: ${ACCENT_0};
  border-radius: 0.5rem;
  ${boxShadowDs1}
`;

const ViewAllContainer = styled(FlexBox)`
  align-items: center;
  justify-content: space-between;
`;

const ListContainer = styled.div`
  overflow-y: auto;
`;

const UpcomingSessions = () => {
  const [visibleDateRange, setVisibleDateRange] = useState([]);

  const router = useRouter();

  return (
    <Container>
      {/* {showPostSessionActions && (
        <PostSessionActions
          id="post-sesions-modal"
          ignoreId="post-sesions-modal"
          bookingId={id}
          toggleModal={togglePostSessionActions}
        />
      )} */}
      <CalendarStrip
        dayCount={7}
        visibleDateRange={visibleDateRange}
        setVisibleDateRange={setVisibleDateRange}
      />
      <ViewAllContainer>
        <H3 bold>Today&apos;s Sessions</H3>
        <TextButton
          secondary
          Icon={FiChevronRight}
          iconPosition="right"
          onClick={() => router.push("/dashboard/sessions")}
        >
          view all
        </TextButton>
      </ViewAllContainer>
      <ListContainer className="hide-scrollbar">
        <FlexBox column rowGap="1rem">
          {sessions?.map((session, index) => (
            <SessionCard session={session} key={index} />
          ))}
          {suggestedSessions?.map((session, index) => (
            <SessionCard session={session} key={index} isNsp />
          ))}
        </FlexBox>
      </ListContainer>
    </Container>
  );
};

export default UpcomingSessions;
