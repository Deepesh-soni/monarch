import React, { useEffect, useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";

import FlexBox from "@common/UI/FlexBox";
import { Body2 } from "@common/UI/Headings";
import { PRIMARY_800 } from "@common/UI/colors";
import { Button } from "@common/UI/Buttons";

const TimerButtonBox = styled(FlexBox)`
  align-items: center;
  column-gap: 0.5rem;
`;

const Timer = ({ startTime, endTime }) => {
  const [currentTime, setCurrentTime] = useState(dayjs());

  useEffect(() => {
    if (endTime) {
      setCurrentTime(dayjs(endTime));
      return;
    }

    const intervalId = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);

    // Ensure the initial update
    setCurrentTime(dayjs());

    return () => clearInterval(intervalId);
  }, [endTime, startTime]);

  let diffInSeconds = dayjs(currentTime).diff(dayjs(startTime), "second");

  // Reset timer to 0 if current time is before start time
  if (diffInSeconds < 0) {
    diffInSeconds = 0;
  }

  const minutes = Math.floor(diffInSeconds / 60);
  const seconds = diffInSeconds % 60;
  const paddedSeconds = String(seconds).padStart(2, "0");
  const result = `${minutes}:${paddedSeconds}`;

  return <Body2 color={PRIMARY_800}>{result}</Body2>;
};

const ActionButtons = ({ setUpdatedDataToSend, removeService, service }) => {
  const { serviceId, serviceStartTime, serviceEndTime } = service ?? {};

  return (
    <TimerButtonBox>
      {serviceStartTime ? (
        <>
          <Timer startTime={serviceStartTime} endTime={serviceEndTime} />
          {!serviceEndTime && (
            <Button
              outline
              oval
              width="fit-content"
              onClick={() =>
                setUpdatedDataToSend({
                  endServiceId: serviceId,
                })
              }
            >
              end
            </Button>
          )}
        </>
      ) : (
        <>
          <Button
            outline
            oval
            width="fit-content"
            onClick={() => removeService(serviceId)}
          >
            Remove
          </Button>
          <Button
            primary
            oval
            width="fit-content"
            onClick={() =>
              setUpdatedDataToSend({
                startServiceId: serviceId,
              })
            }
          >
            start
          </Button>
        </>
      )}
    </TimerButtonBox>
  );
};

export default ActionButtons;
