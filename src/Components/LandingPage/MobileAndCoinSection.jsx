import React, { useState, useRef } from "react";
import styled from "styled-components";
import { TbChevronRight, TbChevronLeft } from "react-icons/tb"; // Import Chevron icons
import FlexBox from "@common/UI/FlexBox";
import { H1, H3, H5 } from "@common/UI/Headings";
import { device } from "@common/UI/Responsive";
import { PRIMARY_900 } from "@common/UI/colors";

const data = [
  {
    imageslider: "/assets/landingPage/mobileslider.svg",
    image: "/assets/images/merchant/share.png",
    heading: "Introduction to Pamprazzi",
    subheading:
      "Designed to connect salons with more clients, streamline bookings, and enhance customer satisfaction.",
  },
  {
    imageslider: "/assets/landingPage/mobileslider.svg",
    image: "/assets/images/merchant/performance.png",
    heading: "Performance Analytics",
    subheading:
      "Track your salon's growth with detailed analytics and insights.",
  },
  {
    imageslider: "/assets/landingPage/mobileslider.svg",
    image: "/assets/images/merchant/coupons.png",
    heading: "Coupons",
    subheading: "Boost your offers by adding new coupons.",
  },
  {
    imageslider: "/assets/landingPage/mobileslider.svg",
    image: "/assets/images/merchant/reviews.png",
    heading: "Reviews",
    subheading: "Amplify trust by showcasing customer reviews.",
  },
];

const CustomButton = styled.button`
  background-color: #5c3a7f;
  border: none;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3f2a59;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px #0088ff;
  }

  svg {
    color: white;
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const Header = styled(FlexBox)`
  gap: 0.25rem;
  align-items: center;

  @media ${device.laptop} {
    gap: 0.5rem;
    align-items: start;
  }
`;

const Heading = styled(H1)`
  @media ${device.laptop} {
    font-size: 2rem;
  }
`;

const MobileAndCoinContainer = styled(FlexBox)`
  flex-direction: column;
  padding: 0 1rem;
  align-items: center;
  gap: 0.5rem;

  @media ${device.laptop} {
    flex-direction: row;
    justify-content: space-between;
    margin: auto;
    gap: 2.5rem;
    width: 86.67%;
    max-width: 75rem;
  }
`;

const RightSection = styled(FlexBox)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  @media ${device.laptop} {
    gap: 4.75rem;
    flex-direction: row;
  }
`;

const MobileImg = styled.img`
  height: 20rem;
  @media ${device.laptop} {
    height: 35rem;
  }
`;

const LeftSection = styled(FlexBox)`
  flex: 1;
  flex-direction: column;

  @media ${device.laptop} {
    max-width: 50%;
    gap: 2.625rem;
  }
`;

const HideMobile = styled.div`
  display: none;
  @media ${device.laptop} {
    display: flex;
  }
`;

const HideDesktop = styled.div`
  display: flex;
  @media ${device.laptop} {
    display: none;
  }
`;

export const MobileAndCoinSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % data.length);
  };

  const handlePrev = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  };

  return (
    <MobileAndCoinContainer>
      <LeftSection justify="center" rowGap="1rem">
        <Header column>
          <Heading bold>Discover Pamprazzi</Heading>
          <H3>Revolutionize Your Salon with Pamprazzi</H3>
        </Header>
        <HideMobile>
          <FlexBox column rowGap="2rem">
            {data.map((item, index) => (
              <FlexBox key={index} column rowGap="0.5rem">
                <FlexBox align="center" columnGap="0.75rem">
                  <img src={item.image} alt={item.heading} />

                  <H3
                    bold
                    color={index === currentIndex ? PRIMARY_900 : "#8F8F8F"}
                  >
                    {item.heading}
                  </H3>
                </FlexBox>
                <FlexBox padding="0rem 2.25rem">
                  <H5 color={index === currentIndex ? PRIMARY_900 : "#8F8F8F"}>
                    {item.subheading}
                  </H5>
                </FlexBox>
              </FlexBox>
            ))}
          </FlexBox>
        </HideMobile>
      </LeftSection>

      <RightSection>
        <HideMobile>
          <CustomButton onClick={handlePrev} ref={prevRef}>
            <TbChevronLeft />
          </CustomButton>
        </HideMobile>

        <MobileImg
          src={data[currentIndex].imageslider}
          alt={data[currentIndex].heading}
        />

        <HideMobile>
          <CustomButton onClick={handleNext} ref={nextRef}>
            <TbChevronRight />
          </CustomButton>
        </HideMobile>
      </RightSection>

      <HideDesktop>
        <FlexBox align="center" justify="center" columnGap="1.5rem">
          <CustomButton onClick={handlePrev}>
            <TbChevronLeft />
          </CustomButton>
          <FlexBox column align="center" justify="center">
            <H3 bold color={PRIMARY_900} textAlign="center">
              {data[currentIndex].heading}
            </H3>
            <H5 color={PRIMARY_900} textAlign="center">
              {data[currentIndex].subheading}
            </H5>
          </FlexBox>
          <CustomButton onClick={handleNext}>
            <TbChevronRight />
          </CustomButton>
        </FlexBox>
      </HideDesktop>
    </MobileAndCoinContainer>
  );
};
