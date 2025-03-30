import React, { useState, useEffect } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { useQueryParams, BooleanParam, StringParam } from "use-query-params";

import { Body1, Body2, H4 } from "@common/UI/Headings";
import { PRIMARY_900, DARKGREY } from "@common/UI/colors";
import FlexBox from "@common/UI/FlexBox";
import { useWebSocket } from "../../../webSocket";

const Wrapper = styled(FlexBox)`
  width: 100%;
  padding: 1rem 0.5rem;
  justify-content: space-between;
  flex-direction: column;
  row-gap: 0.5rem;
  padding: 1rem;
`;

const AppointmentItem = styled(FlexBox)`
  align-items: center;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
`;

const AppointmentDetails = styled(FlexBox)`
  flex-direction: column;
`;

const ProgressWrapper = styled(FlexBox)`
  flex: 1;
  margin-left: 1rem;
  flex-direction: column;
  text-align: center;
`;

const ProgressBar = styled(FlexBox)`
  width: 100%;
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
`;

const Progress = styled.div`
  width: ${props => props.progress}%;
  height: 100%;
  background-color: ${PRIMARY_900};
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 4px 0 0 4px;
`;

const NullState = styled(FlexBox)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  flex: 1 0 0;
`;

const AppointmentProgress = () => {
  const socket = useWebSocket();

  const [liveAppointments, setLiveAppointments] = useState([]);

  const [, setQueryParams] = useQueryParams({
    show_manage_booking_modal: BooleanParam,
    id: StringParam,
  });

  useEffect(() => {
    if (!socket) return;
    const changeProgress = data => {
      setLiveAppointments(data.data);
    };

    socket.on("progress", changeProgress);

    return () => {
      socket.off("progress", changeProgress);
    };
  }, [socket]);

  if (!liveAppointments.length) {
    return (
      <NullState>
        <img src="/assets/Coupons/no-task.webp" alt="null" />
        <Body1 color={DARKGREY} textAlign="center">
          No Currently Running <br /> Appointment To Show.
        </Body1>
      </NullState>
    );
  }

  return (
    <Wrapper>
      {liveAppointments.map((appointment, index) => (
        <AppointmentItem
          key={index}
          onClick={() =>
            setQueryParams(
              {
                show_manage_booking_modal: true,
                id: appointment?._id,
              },
              "replaceIn"
            )
          }
        >
          <AppointmentDetails>
            <Body2 bold>{appointment.name}</Body2>
            <H4>
              {appointment.bookingTime} •{" "}
              {dayjs(appointment.bookingDate).format("MMM D")}
            </H4>
          </AppointmentDetails>
          <ProgressWrapper>
            <ProgressBar>
              <Progress progress={appointment.progress}></Progress>
            </ProgressBar>
            <H4 textAlign={"center"}>
              {appointment.progress.toFixed(2)}% Completed
            </H4>
          </ProgressWrapper>
        </AppointmentItem>
      ))}
    </Wrapper>
  );
};

export default AppointmentProgress;
