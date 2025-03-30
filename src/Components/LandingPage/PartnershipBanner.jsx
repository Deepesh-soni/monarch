import React from "react";
import styled, { keyframes } from "styled-components";

import FlexBox from "@common/UI/FlexBox";
import { Display, H1 } from "@Components/common/UI/Headings";
import { device } from "@common/UI/Responsive";

// Animation keyframes for moving right and left
const moveRight = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
`;

const moveLeft = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const Headings = styled(Display)`
  font-size: 1.25rem;
  @media ${device.laptop} {
    font-size: 2rem;
  }
`;
const SubHeadings = styled(H1)`
  font-size: 1rem;
  text-align: center;
  @media ${device.laptop} {
    font-size: 1.5rem;
  }
`;

const ImagesRow = styled(FlexBox)`
  width: 100%;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  column-gap: 1rem;

  img {
    width: 16rem;
    height: 7rem;
    object-fit: cover;
  }
`;

const AnimatedImagesRowRight = styled(ImagesRow)`
  animation: ${moveRight} 10s linear infinite;
  overflow: hidden;
  width: 100vw;
`;

const AnimatedImagesRowLeft = styled(ImagesRow)`
  animation: ${moveLeft} 10s linear infinite;
  overflow: hidden;
  width: 100vw;
`;

const PartnershipBanner = () => {
  return (
    <FlexBox column justify="center" align="center" rowGap="2.5rem">
      <FlexBox column align="center" justify="center">
        <Headings bold>Partner Spotlight</Headings>
        <SubHeadings>
          Join Pamprazzi and streamline your bookings in just a couple of
          clicks.
        </SubHeadings>
      </FlexBox>
      {/* First row of images, animating to the right */}
      <AnimatedImagesRowRight>
        <img src="/assets/images/merchant/partner1.webp" alt="Partner 1" />
        <img src="/assets/images/merchant/partner2.webp" alt="Partner 1" />
        <img src="/assets/images/merchant/partner3.webp" alt="Partner 1" />
        <img src="/assets/images/merchant/partner4.webp" alt="Partner 1" />
        <img src="/assets/images/merchant/partner5.webp" alt="Partner 1" />
        <img src="/assets/images/merchant/partner6.webp" alt="Partner 1" />
        <img src="/assets/images/merchant/partner7.webp" alt="Partner 1" />
      </AnimatedImagesRowRight>

      {/* Second row of images, animating to the left */}
      <AnimatedImagesRowLeft>
        <img src="/assets/images/merchant/partner1.webp" alt="Partner 1" />
        <img src="/assets/images/merchant/partner2.webp" alt="Partner 1" />
        <img src="/assets/images/merchant/partner3.webp" alt="Partner 1" />
        <img src="/assets/images/merchant/partner4.webp" alt="Partner 1" />
        <img src="/assets/images/merchant/partner5.webp" alt="Partner 1" />
        <img src="/assets/images/merchant/partner6.webp" alt="Partner 1" />
        <img src="/assets/images/merchant/partner7.webp" alt="Partner 1" />
      </AnimatedImagesRowLeft>
    </FlexBox>
  );
};

export default PartnershipBanner;
