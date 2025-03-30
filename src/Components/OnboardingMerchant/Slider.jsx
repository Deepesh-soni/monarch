import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import FlexBox from "@common/UI/FlexBox";
import { Body2 } from "@common/UI/Headings";
import { PRIMARY_800, SECONDARY_100 } from "@common/UI/colors";

const SliderContainer = styled(FlexBox)`
  width: 100%;
  flex-direction: column;
`;

const SliderTrack = styled(FlexBox)`
  width: 100%;
  height: 0.5rem;
  background-color: ${SECONDARY_100};
  position: relative;
  border-radius: 0.75rem;
`;

const SliderRange = styled(FlexBox)`
  position: absolute;
  height: 100%;
  background-color: ${PRIMARY_800};
`;

const SliderHandle = styled(FlexBox)`
  width: 1.5rem;
  height: 1.5rem;
  background-color: ${PRIMARY_800};
  border-radius: 50%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const Tooltip = styled.div`
  display: block;
  position: absolute;
  top: calc(-100% - 0.3rem);
  transform: translateX(-50%);
  width: 100%;
`;

const Tooltip2 = styled.div`
  display: block;
  position: absolute;
  top: calc(-100% - 0.3rem);
  transform: translateX(-50%);
  z-index: 2;
  width: 100%;
`;

const Slider = ({ startTime, setStartTime, endTime, setEndTime }) => {
  const [startX, setStartX] = useState(null);
  const [endX, setEndX] = useState(null);
  const [draggingStart, setDraggingStart] = useState(false);
  const [draggingEnd, setDraggingEnd] = useState(false);

  const sliderTrackRef = useRef();

  useEffect(() => {
    setStartX(getXFromTime(startTime));
    setEndX(getXFromTime(endTime));
  }, []);

  useEffect(() => {
    setStartTime(getTimeFromX(startX));
    setEndTime(getTimeFromX(endX));
  }, [startX, endX]);

  useEffect(() => {
    const handleMouseMove = e => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      handleDrag(clientX);
    };

    if (draggingStart || draggingEnd) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("touchmove", handleMouseMove);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleMouseMove);
    };
  }, [draggingStart, draggingEnd, startX, endX]);

  const handleDrag = clientX => {
    const handleWidthInPixels = 24;
    const containerWidth =
      sliderTrackRef.current?.getBoundingClientRect()?.width ||
      window.innerWidth;
    const newX =
      clientX - sliderTrackRef.current?.getBoundingClientRect()?.left;

    if (draggingStart && newX >= 0 && newX <= endX - 20) {
      setStartX(newX);
    }
    if (draggingEnd && newX >= startX + 20 && newX <= containerWidth) {
      const adjustedNewX = Math.min(newX, containerWidth - handleWidthInPixels);
      setEndX(adjustedNewX);
    }
  };

  const handleMouseUp = () => {
    setDraggingStart(false);
    setDraggingEnd(false);
    document.removeEventListener("mouseup", handleMouseUp);
    document.removeEventListener("touchend", handleMouseUp);
  };

  const startDrag = type => {
    if (type === "start") {
      setDraggingStart(true);
    } else {
      setDraggingEnd(true);
    }
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchend", handleMouseUp);
  };

  const getTimeFromX = x => {
    const handleWidthInPixels = 24;
    const totalWidth =
      sliderTrackRef.current?.getBoundingClientRect()?.width -
      handleWidthInPixels;
    const totalSeconds = (x / totalWidth) * 86400;
    const roundedMinutes = Math.round(totalSeconds / 60 / 15) * 15;
    const hours = Math.floor(roundedMinutes / 60) % 12 || 12;
    const minutes = roundedMinutes % 60;
    const ampm = roundedMinutes >= 720 ? "PM" : "AM";
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}${ampm}`;
  };

  const getXFromTime = timeString => {
    const separateString = timeString.indexOf(":");
    const hours = timeString.slice(0, separateString);
    const minutes = timeString.slice(separateString + 1, separateString + 3);
    const ampm = timeString.slice(separateString + 3);

    let totalSeconds = (hours % 12) * 3600 + minutes * 60;
    if (ampm === "PM") {
      totalSeconds += 12 * 3600;
    }

    const totalWidth = sliderTrackRef.current?.getBoundingClientRect()?.width;
    const x = (totalSeconds / 86400) * totalWidth;
    return x;
  };

  return (
    <SliderContainer>
      <SliderTrack ref={sliderTrackRef}>
        <SliderRange
          style={{ width: `${endX - startX}px`, left: `${startX}px` }}
        />
        <SliderHandle
          style={{ left: `${startX}px` }}
          onMouseDown={() => startDrag("start")}
          onTouchStart={() => startDrag("start")}
        >
          <Tooltip>
            <Body2>{getTimeFromX(startX)}</Body2>
          </Tooltip>
        </SliderHandle>
        <SliderHandle
          style={{ left: `${endX}px` }}
          onMouseDown={() => startDrag("end")}
          onTouchStart={() => startDrag("end")}
        >
          <Tooltip2>
            <Body2>{getTimeFromX(endX)}</Body2>
          </Tooltip2>
        </SliderHandle>
      </SliderTrack>
    </SliderContainer>
  );
};

export default Slider;
