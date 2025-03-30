/* eslint-disable react/no-unescaped-entities */
import React from "react";
import styled from "styled-components";
import { SlArrowLeft } from "react-icons/sl";
import { FaStar } from "react-icons/fa";

import FlexBox from "@common/UI/FlexBox";
import { H3, Body2, H6 } from "@common/UI/Headings";
import { ACCENT_200, RATE_BACKGROUND, SECONDARY_200 } from "@common/UI/colors";
import { Button } from "@common/UI/Buttons";
import { device } from "@common/UI/Responsive";
import Chip from "@common/UI/Chips";

const Wrapper = styled(FlexBox)`
  width: 100%;
  padding: 1rem;
  flex-direction: column;
  row-gap: 30px;
  align-items: center;
`;

const Appointmentcard = styled(FlexBox)`
  width: 60%;
  padding: 1.5rem;
  border-radius: 10px;
  background-color: ${ACCENT_200};
  flex-direction: column;
  align-self: center;
`;

const StylistCard = styled(FlexBox)`
  flex-direction: column;
  row-gap: 10px;
  align-items: center;
  border: 1px solid ${SECONDARY_200};
  width: 10rem;
  height: 15rem;
  border-radius: 10px;
  justify-content: center;

  @media ${device.laptop} {
    width: 10rem;
    height: 15rem;
  }

  @media ${device.desktop} {
    width: 20rem;
    height: 15rem;
  }
`;

const Rating = styled(FlexBox)`
  width: 45%;
  align-items: center;
  border-radius: 10px;
  padding: 0.3rem;
  justify-content: center;
  column-gap: 8px;
`;

const Time = styled(FlexBox)`
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
  justify-content: center;
  column-gap: 20px;
  row-gap: 20px;

  @media ${device.laptop} {
    width: 60%;
  }
`;

const StylistContainer = styled(FlexBox)`
  column-gap: 30px;
  overflow-x: scroll;
  width: 100%;
  justify-content: center;
  max-width: 100%;
`;

const SchedulingScreen = () => {
  const stylist = [
    {
      id: 1,
      name: "Jessica Copper",
      Rating: 4.2,
      avatar: "/assets/stylist-avatar.svg",
    },
    {
      id: 2,
      name: "Daniel Stuart",
      Rating: 4.2,
      avatar: "/assets/stylist-avatar.svg",
    },
    {
      id: 3,
      name: "Harleen Dsouza",
      Rating: 4.2,
      avatar: "/assets/stylist-avatar.svg",
    },
    {
      id: 4,
      name: "Harleen Dsouza",
      Rating: 4.2,
      avatar: "/assets/stylist-avatar.svg",
    },
    {
      id: 5,
      name: "Harleen Dsouza",
      Rating: 4.2,
      avatar: "/assets/stylist-avatar.svg",
    },
  ];

  const time = [
    {
      id: 1,
      time: "11.30 AM",
    },
    {
      id: 2,
      time: "12.00 PM",
    },
    {
      id: 3,
      time: "12.30 PM",
    },
    {
      id: 4,
      time: "1.00 PM",
    },
    {
      id: 5,
      time: "1.30 PM",
    },
    {
      id: 6,
      time: "2.00 PM",
    },
  ];

  return (
    <Wrapper>
      <FlexBox width="100%" align="center" justify="center" columnGap="30px">
        <SlArrowLeft />
        <H3>Book Appointment</H3>
      </FlexBox>

      <Appointmentcard>
        <H3>Gigi's Salon</H3>
        <FlexBox justify="space-between">
          <Body2>Haircut Xl, Makeup Xl</Body2>
          <H6 bold>1000</H6>
        </FlexBox>
      </Appointmentcard>
      <H6 bold>Select Stylist</H6>
      <StylistContainer>
        {stylist.map(item => (
          <StylistCard key={item.id}>
            <img src={item.avatar} width="50px" height="50px" alt={item.name} />
            <Body2>{item.name}</Body2>
            <Rating backgroundColor={RATE_BACKGROUND}>
              <FaStar color="yellow" />
              <Body2>{item.Rating}</Body2>
            </Rating>
          </StylistCard>
        ))}
      </StylistContainer>
      <H6 bold>Select Time</H6>
      <Time>
        {time.map(item => (
          <Chip width="fit-content" key={item.id}>
            <Body2>{item.time}</Body2>
          </Chip>
        ))}
      </Time>
      <Button width="30%">Book Now</Button>
    </Wrapper>
  );
};

export default SchedulingScreen;
