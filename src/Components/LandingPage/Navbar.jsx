import React, { useEffect, useState } from "react";
import styled from "styled-components";

import FlexBox from "@common/UI/FlexBox";
import { PRIMARY_900, ACCENT_0, VIOLET } from "@common/UI/colors";
import { Display, H3 } from "@common/UI/Headings";
import { device } from "@common/UI/Responsive";
import { Button } from "@common/UI/Buttons";
import { isWebView } from "@utils/detectWebView";

const NavbarContainer = styled(FlexBox)`
  background: linear-gradient(180deg, #533a71 0.13%, #c6426e 221.61%);
  flex-direction: column;
  height: 97vh;
  width: 100vw;
  position: relative;
  padding: 1.5rem;
  gap: 5rem;

  @media ${device.laptop} {
    gap: 2rem;
  }
`;

const Logo = styled.img`
  width: 100%;
  cursor: pointer;
  width: 7.5rem;
`;

const ImageContainer = styled(FlexBox)`
  position: absolute;
  bottom: 0;
  justify-content: center;
  align-items: center;
  align-self: center;

  @media ${device.laptop} {
    left: 50%;
    right: 50%;
  }
`;

const Frame = styled.img`
  width: 100%;
  object-fit: cover;
  height: 15rem;
  mix-blend-mode: normal;

  @media ${device.laptop} {
    height: 20rem;
    width: 50rem;
  }
`;

const Title = styled(Display)`
  color: ${ACCENT_0};
  font-size: 1.5rem;
  font-weight: 700;
  line-height: normal;
  text-align: center;

  span {
    background-color: ${VIOLET};
  }

  @media ${device.laptop} {
    font-size: 3rem;
  }
`;

const Content = styled(FlexBox)`
  padding: 1rem;
  align-items: center;
  @media ${device.laptop} {
    padding: unset;
  }
`;

const SubTitle = styled.span`
  color: #fff;
  text-align: center;
  font-family: "Work Sans";
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  max-width: 12rem;

  @media ${device.laptop} {
    font-size: 1.75rem;
    max-width: none;
  }
`;

export const Navbar = ({ onLoginClick, scrollToBookDemo }) => {
  const [isInWebView, setIsInWebView] = useState(false);

  useEffect(() => {
    setIsInWebView(isWebView());
  }, []);

  return (
    <NavbarContainer>
      <FlexBox justify="space-between">
        <Logo src="/assets/pamprazzi-logo-white.svg" alt="pamprazzi Logo" />
        <Button whiteButton onClick={onLoginClick} color={PRIMARY_900}>
          Login
        </Button>
      </FlexBox>
      <FlexBox column align="center" rowGap="1.5rem">
        <Content column>
          {isInWebView ? (
            <Title bold>Be A grooming Partner With Pamprazzi</Title>
          ) : (
            <Title bold>Be a grooming Partner With Pamprazzi</Title>
          )}

          <SubTitle color={ACCENT_0} textAlign="center">
            Grow business by collaborating with us
          </SubTitle>
        </Content>
        <Button whiteButton color={PRIMARY_900} onClick={scrollToBookDemo}>
          Book a Free Demo
        </Button>
      </FlexBox>
      <ImageContainer>
        <Frame src="/assets/images/merchant/Landingpage.webp" />
      </ImageContainer>
    </NavbarContainer>
  );
};
