import React, { useEffect, useState } from "react";
import { orderBy } from "lodash";
import styled from "styled-components";
import dayjs from "dayjs";
import { DateParam, useQueryParam, withDefault } from "use-query-params";

import SessionLineItem from "./SessionsLineItem";
import Loader from "@components/common/UI/Loader";
import { Body2 } from "@components/common/UI/Headings";
import FlexBox from "@common/UI/FlexBox";

const Container = styled.div`
  height: 100%;
`;

const NullState = styled(FlexBox)`
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;
`;

const Img = styled.img`
  width: 100%;
  max-width: 10rem;
  aspect-ratio: 1;
`;

const SessionsList = ({ userTimeZone }) => {
  const [showJoiningLateAlert, setShowJoiningLateAlert] = useState(false);
  const [session, setSession] = useState(null);
  const [sortedSessions, setSortedSessions] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [selectedDate] = useQueryParam(
    "date",
    withDefault(DateParam, new Date())
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSessions();
  }, [selectedDate]);

  const getSessions = async (reset = false) => {
    setLoading(true);

    // const abortController = new AbortController();
    // const params = {
    //   page: reset ? 1 : currentPage,
    //   booking_status: "all",
    //   date: dayjs.tz(selectedDate, userTimeZone).format(),
    // };

    // try {
    //   const response = await axiosInstance.get(URL.sessionsURL, {
    //     params,
    //     signal: abortController.signal,
    //   });

    //   setSessions(response?.data?.data || []);
    // } catch (error) {
    //   Bugsnag.notify(error);
    // } finally {
    //   setLoading(false);
    // }
  };

  useEffect(() => {
    if (!session || session?.length === 0) return;
    handleSessionDetails();
  }, [session]);

  useEffect(() => {
    if (!sessions || sessions?.length === 0) return;
    const sessionsSorted = orderBy(
      sessions,
      session => new Date(dayjs(session?.datetime_at_provider_timezone)),
      ["desc"]
    );

    setSortedSessions(sessionsSorted);
  }, [sessions]);

  const toggleJoiningLateAlert = session => {
    setShowJoiningLateAlert(!showJoiningLateAlert);
    setSession(session);
  };

  const handleSessionDetails = () => {
    setBookingDetails({
      clientName: session?.customer?.firstname,
      clientId: session?.customer?.id,
      clientImage: session?.customer?.image,
      mode: session?.typeofsession,
      flow:
        session?.provider_role === "couple"
          ? "couples_therapy"
          : session?.provider_role,
      dateTime: session?.datetime_at_provider_timezone,
      duration: session?.duration,
      clinicId: session?.clinic_details?.id,
    });
  };

  const nullState = !loading && sessions?.length === 0;

  if (loading) {
    return <Loader />;
  }

  return (
    <Container>
      {/* Running late not shown to CF providers */}
      {/* {showJoiningLateAlert && !isCfProvider && (
        <RunningLateModal
          id="automated-call-modal"
          ignoreId="automated-call-modal"
          session={session}
          bookingId={session?.id}
          bookingDetails={bookingDetails}
          toggleModal={toggleJoiningLateAlert}
        />
      )} */}

      {nullState ? (
        <NullState>
          {/* <Img src={NullStateImg} alt="no sessions" /> */}
          <Body2 bold>You have no sessions scheduled today</Body2>
        </NullState>
      ) : (
        sortedSessions?.map(session => {
          return (
            <SessionLineItem
              key={session?.id}
              session={session}
              reloadSessionList={() => getSessions(true)}
            />
          );
        })
      )}
    </Container>
  );
};

export default SessionsList;
