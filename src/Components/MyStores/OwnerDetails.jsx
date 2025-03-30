import React, { useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import Bugsnag from "@bugsnag/js";

import FlexBox from "@common/UI/FlexBox";
import { H1, Body1, Body2 } from "@common/UI/Headings";
import { TEXTGREY } from "@common/UI/colors";
import { URL } from "@constants/urls";
import { client } from "@axiosClient";
import { device } from "@common/UI/Responsive";
import { roleLookUp } from "@metaData/lookUps";
import Avatar from "./Avatar";

const Wrapper = styled(FlexBox)`
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  @media ${device.laptop} {
    gap: 3rem;
    flex-direction: row;
  }
`;

const Socialists = styled(FlexBox)`
  gap: 1rem;
  cursor: pointer;
`;

const Img = styled.img`
  height: 100%;
  max-height: 7rem;
  max-width: 7rem;
  aspect-ratio: 1;
  border-radius: 50%;
  object-fit: cover;

  @media ${device.laptop} {
    max-height: 12.5rem;
    max-width: 12.5rem;
  }
`;

const SocialIcon = ({ src, alt }) => (
  <img src={src} alt={alt} height={24} width={24} />
);

const OwnerDetails = () => {
  const [ownerDetails, setOwnerDetails] = useState({});

  const socialIcons = useMemo(
    () => [
      { src: "/assets/socialIcons/Facebook.webp", alt: "Facebook" },
      { src: "/assets/socialIcons/Instagram.webp", alt: "Instagram" },
      { src: "/assets/socialIcons/Youtube.webp", alt: "Youtube" },
      { src: "/assets/socialIcons/Snapchat.webp", alt: "Snapchat" },
      { src: "/assets/socialIcons/X.webp", alt: "X" },
    ],
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.get(URL.ownerDetails);
        setOwnerDetails(response?.data?.data || {});
      } catch (error) {
        Bugsnag.notify(error);
        console.error("Failed to fetch owner details:", error);
      }
    };
    fetchData();
  }, []);

  const { name, gender, description, phoneNumber, emailId, avatar, userType } =
    ownerDetails;

  return (
    <Wrapper>
      <FlexBox>
        {avatar ? (
          <Img src={avatar} alt="profile picture" />
        ) : (
          <Avatar name={name} />
        )}
      </FlexBox>
      <FlexBox column rowGap="1rem">
        <FlexBox columnGap="1rem" wrap="wrap" align="center">
          <H1 bold>{name}</H1>
          <Body1 color={TEXTGREY}>{roleLookUp[userType]}</Body1>
        </FlexBox>
        <FlexBox column rowGap="0.25rem">
          {gender && <Body2>{gender}</Body2>}
          {description && <Body2 color={TEXTGREY}>{description}</Body2>}
          {phoneNumber && <Body2 bold>{phoneNumber}</Body2>}
          {emailId && <Body2 bold>{emailId}</Body2>}
        </FlexBox>
        <Socialists>
          {socialIcons.map(icon => (
            <SocialIcon key={icon.alt} {...icon} />
          ))}
        </Socialists>
      </FlexBox>
    </Wrapper>
  );
};

export default OwnerDetails;
