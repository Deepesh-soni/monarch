import React, { useState } from "react";
import styled from "styled-components";
import { client } from "@axiosClient";
import { URL } from "@constants/urls";
import { useSelector } from "react-redux";
import Bugsnag from "@bugsnag/js";
import { toast } from "react-toastify";

import FlexBox from "@common/UI/FlexBox";
import ReactSelect from "@common/UI/AnimationSelect";
import { device } from "@common/UI/Responsive";
import { SECONDARY_500 } from "@common/UI/colors";
import { Body1 } from "@common/UI/Headings";
import { Button } from "@common/UI/Buttons";
import SectionContainer from "@common/SectionContainer";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  width: 100%;
`;

const SingleDayBox = styled(FlexBox)`
  width: 100%;
  padding: 1rem 0;
  gap: 1rem;
  justify-content: space-between;
  flex-direction: column;

  @media ${device.laptop} {
    align-items: center;
    flex-direction: row;
    padding: 0.875rem 0;
  }
`;

const GapFlexBox = styled(FlexBox)`
  gap: 0.5rem;
  align-items: center;

  .select__control {
    width: 9rem;
    height: 2rem;

    @media ${device.laptop} {
      width: 10rem;
    }
  }

  @media ${device.laptop} {
    gap: 1rem;
  }
`;

const generateTimes = () => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const ampm = hour >= 12 ? "PM" : "AM";
      const formattedHour = (((hour + 11) % 12) + 1)
        .toString()
        .padStart(2, "0");
      const formattedMinute = minute.toString().padStart(2, "0");
      times.push(`${formattedHour}:${formattedMinute} ${ampm}`);
    }
  }
  return times;
};

const ShopTiming = () => {
  const storeId = useSelector(state => state.auth.storeId);
  //TODO: TO BE OPTIMIZE
  const storeDetails = useSelector(state => state.activeStore.storeDetails);

  const [timeSelections, setTimeSelections] = useState(storeDetails?.timing);
  const [loading, setLoading] = useState(false);

  const times = generateTimes();

  const handleToggle = id => {
    const updatedTimings = timeSelections.map(item => {
      if (item._id === id) {
        return { ...item, open: !item.open };
      }
      return item;
    });
    setTimeSelections(updatedTimings);
  };

  const findValue = (id, fieldName) => {
    const time = timeSelections?.filter(item => item?._id === id)?.[0]?.[
      fieldName
    ];
    return { value: time ?? "", label: time ?? "" };
  };

  const handleTimeChange = (id, fieldName, value) => {
    const updatedTimings = timeSelections.map(item => {
      //TODO: validate closeTime
      // if (fieldName === "closeTime" && item?.openTime >= value && item?._id===id) {
      //   toast.error(
      //     `Close time must be later than open time for ${item?.day}.`
      //   );
      //   return item;
      // }
      if (item?._id === id) {
        return { ...item, [fieldName]: value };
      }
      return item;
    });
    setTimeSelections(updatedTimings);
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await client.patch(URL?.updateStore, {
        storeId,
        timing: timeSelections,
      });
      toast.success("Shop timing updated!");
    } catch (error) {
      toast.error("Failed to update");
      Bugsnag.notify(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionContainer
      title="Shop Timing"
      cta={
        <Button onClick={handleUpdate} disabled={loading}>
          Update
        </Button>
      }
    >
      <Wrapper>
        {timeSelections?.map(singleDay => (
          <SingleDayBox key={singleDay?._id}>
            {singleDay?.open ? (
              <Button primary onClick={() => handleToggle(singleDay?._id)} width="8rem">
                {singleDay?.day}
              </Button>
            ) : (
              <Button outline onClick={() => handleToggle(singleDay?._id)}>
                {singleDay?.day}
              </Button>
            )}
            {!singleDay?.open ? (
              <Body1 color={SECONDARY_500}>Closed</Body1>
            ) : (
              <GapFlexBox>
                <ReactSelect
                  placeholder="Open time"
                  isSearchable={false}
                  escapeClearsValue={true}
                  options={times.map(time => ({ value: time, label: time }))}
                  value={
                    timeSelections ? findValue(singleDay?._id, "openTime") : ""
                  }
                  onChange={selectedOption => {
                    handleTimeChange(
                      singleDay?._id,
                      "openTime",
                      selectedOption?.value || ""
                    );
                  }}
                />
                <Body1>to</Body1>
                <ReactSelect
                  placeholder="Close time"
                  isSearchable={false}
                  escapeClearsValue={false}
                  options={times.map(time => ({ value: time, label: time }))}
                  value={findValue(singleDay?._id, "closeTime")}
                  onChange={selectedOption => {
                    handleTimeChange(
                      singleDay?._id,
                      "closeTime",
                      selectedOption?.value || ""
                    );
                  }}
                />
              </GapFlexBox>
            )}
          </SingleDayBox>
        ))}
      </Wrapper>
    </SectionContainer>
  );
};

export default ShopTiming;
