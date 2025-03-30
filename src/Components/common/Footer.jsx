import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import FlexBox from "@common/UI/FlexBox";
import { H6, Body1, Body2, H1, Display, H3 } from "@common/UI/Headings";
import {
  ACCENT_0,
  ACCENT_400,
  PRIMARY_800,
  SECONDARY_800,
} from "@common/UI/colors";
import { device } from "@common/UI/Responsive";
import { socialIconsData } from "@metadata/footer";

const FooterContainer = styled(FlexBox)`
  width: 100%;
  height: 100%;
  flex-direction: column;
  padding: 1.5rem;
  gap: 2.5rem;
  background-color: ${SECONDARY_800};

  @media ${device.laptop} {
    padding: 2.5rem;
  }
`;

const ContentContainer = styled(FlexBox)`
  width: 100%;
  align-items: flex-start;
  justify-content: center;
  background-color: ${SECONDARY_800};
  flex-direction: column;
  height: 35rem;
  gap: 2.5rem;

  @media ${device.laptop} {
    justify-content: space-evenly;
    flex-direction: row;
    height: 11rem;
  }
`;

const ContentBox = styled(FlexBox)`
  flex-direction: column;
  width: 100%;
  align-items: center;
  @media ${device.laptop} {
    width: ${({ isLarge }) => (isLarge ? "40%" : "20%")};
    row-gap: 0.625rem;
    align-items: baseline;
  }
`;

const CopyRightBox = styled(FlexBox)`
  background-color: ${PRIMARY_800};
  width: 100%;
  height: 3rem;
  justify-content: center;
  align-items: center;
`;

const HeadingText = styled(H3)`
  font-weight: bold;
  color: ${ACCENT_0};
`;

const NavLink = styled(Body2)`
  cursor: pointer;
  width: fit-content;
  color: ${ACCENT_0};
`;

const IconContainer = styled(FlexBox)`
  box-sizing: border-box;
  padding: 0.625rem;
  align-items: center;

  border-radius: 0.5rem;
  border: 2px solid ${ACCENT_400};

  &:hover {
    border: 2px solid ${ACCENT_0};
  }
`;

const AnimatedWord = styled.div`
  max-width: 6.5rem;
  min-width: 6.5rem;
  text-align: center;

  @media ${device.laptop} {
    max-width: 8.5rem;
    min-width: 8.5rem;
  }
`;

const TaglineContainer = styled(FlexBox)`
  flex-wrap: wrap;
`;

const Subtag = styled(H1)`
  font-size: 1.25rem;

  @media ${device.laptop} {
    font-size: 1.5rem;
  }
`;

const servicesNavLinkData = [
  { name: "For Merchants", onClick: () => "" },
  {
    name: "For Our Customers",
    onClick: () => console.log("2Services clicked"),
  },
];

const aboutNavLinkData = [
  { name: "Privacy Policy", path: "/privacy-policy" },
  {
    name: "Terms and Conditions",
    onClick: () => console.log("Services clicked"),
  },
  { name: "FAQs", onClick: () => console.log("About Us clicked") },
  { name: "Contact Us", path: "/contact" },
];

const getInTouchNavLinkData = [
  {
    name: "Kolkata, West Bengal",
    onClick: () => console.log("Home clicked"),
  },
  {
    name: "support@pamprazzi.com",
    onClick: () => {
      location.href = "mailto:support@pamprazzi.com";
    },
  },
];

const RotatingText = () => {
  const words = ["पैम्पर", "প্যাম্পার"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex(prevIndex => (prevIndex + 1) % words.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const currentWord = words[currentWordIndex];

  return (
    <>
      <Display color={ACCENT_0}>Don’t forget to </Display>
      <AnimatedWord>
        <Display color={ACCENT_0}>{currentWord}</Display>
      </AnimatedWord>{" "}
      <Display color={ACCENT_0}> yourself!</Display>
    </>
  );
};

const Footer = () => {
  const router = useRouter();

  return (
    <>
      <FooterContainer>
        <FlexBox column rowGap="0.25rem">
          <TaglineContainer justify="center">
            <RotatingText />
          </TaglineContainer>
          <FlexBox justify="center" columnGap="0.57rem">
            <img src="/assets/heartlogo.svg" />
            <Subtag color={ACCENT_0}>Proudly built in Kolkata</Subtag>
          </FlexBox>
        </FlexBox>
        <FlexBox justify="center" columnGap="1.31rem">
          {socialIconsData &&
            socialIconsData.map((icon, index) => {
              const Icon = icon.icon;
              return (
                <a
                  key={index}
                  href={icon.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconContainer>
                    <Icon color={ACCENT_0} size={24} />
                  </IconContainer>
                </a>
              );
            })}
        </FlexBox>
        <ContentContainer>
          <ContentBox isLarge align="center">
            <img src="/assets/pamprazzi-logo-white.svg"></img>
            <Body1 color={ACCENT_0}>Simplifying Self-Care</Body1>
          </ContentBox>
          <ContentBox>
            <HeadingText>Services</HeadingText>
            {servicesNavLinkData.map((button, index) => (
              <NavLink
                key={index}
                cursor="pointer"
                onClick={() => router.push(button?.link)}
                color={ACCENT_0}
              >
                {button.name}
              </NavLink>
            ))}
          </ContentBox>
          <ContentBox>
            <HeadingText>Quick Links</HeadingText>
            {aboutNavLinkData.map((button, index) => (
              <NavLink
                key={index}
                onClick={() => {
                  if (!button?.path) return;
                  router.push(button.path);
                }}
              >
                {button.name}
              </NavLink>
            ))}
          </ContentBox>
          <ContentBox>
            <HeadingText>Get in touch</HeadingText>
            {getInTouchNavLinkData.map((button, index) => (
              <NavLink key={index} onClick={button.onClick}>
                {button.name}
              </NavLink>
            ))}
          </ContentBox>
        </ContentContainer>
      </FooterContainer>
      <CopyRightBox>
        <H6 color={ACCENT_0}>
          Copyright © 2024 Self Care Simplified-Pamprazzi. All rights reserved.
        </H6>
      </CopyRightBox>
    </>
  );
};

export default Footer;
