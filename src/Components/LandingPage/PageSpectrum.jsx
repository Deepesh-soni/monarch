import React from "react";
import styled from "styled-components";

import FlexBox from "@common/UI/FlexBox";
import { H5, H1 } from "@common/UI/Headings";
import { device } from "@common/UI/Responsive";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  padding: 0 1rem;
  gap: 1.5rem;

  @media ${device.laptop} {
    margin: auto;
    width: 86.67%;
    max-width: 75rem;
  }
`;

const Heading = styled(H1)`
  font-size: 1.25rem;
  text-align: center;

  @media ${device.laptop} {
    text-align: start;
    font-size: 2rem;
  }
`;

const Image = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  object-fit: cover;

  @media ${device.laptop} {
    width: 4rem;
    height: 4rem;
  }
`;

const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  @media ${device.laptop} {
    grid-template-columns: repeat(10, 1fr);
  }
`;

const PageSpectrum = () => {
  const salonData = [
    {
      name: "Beauty Salon",
      image: "/assets/landingPage/salonspectrumIcon/BeautySalon.svg",
    },
    {
      name: "Unisex Salon",
      image: "/assets/landingPage/salonspectrumIcon/UnisexSalon.svg",
    },
    {
      name: "Bridal Studio",
      image: "/assets/landingPage/salonspectrumIcon/BridalStudio.svg",
    },
    {
      name: "Men's Salon",
      image: "/assets/landingPage/salonspectrumIcon/Men'sSalon.svg",
    },
    {
      name: "Nail Art Studio",
      image: "/assets/landingPage/salonspectrumIcon/NailArtStudio.svg",
    },
    {
      name: "Tattoo Studio",
      image: "/assets/landingPage/salonspectrumIcon/TattooStudio.svg",
    },
    { name: "Spa", image: "/assets/landingPage/salonspectrumIcon/Spa.svg" },
    {
      name: "Ayurvedic",
      image: "/assets/landingPage/salonspectrumIcon/Ayurvedic.svg",
    },
    {
      name: "Permanent Makeup",
      image: "/assets/landingPage/salonspectrumIcon/Permanentmakeup.svg",
    },
    {
      name: "Facial",
      image: "/assets/landingPage/salonspectrumIcon/Facial.svg",
    },
  ];

  return (
    <Wrapper>
      <Heading bold>Salon Spectrum</Heading>
      <ImageContainer>
        {salonData.map((salon, index) => (
          <FlexBox key={index} column rowGap="0.75rem" align="center">
            <Image src={salon.image} alt={salon.name} />
            <H5 bold textAlign="center">
              {salon.name}
            </H5>
          </FlexBox>
        ))}
      </ImageContainer>
    </Wrapper>
  );
};

export default PageSpectrum;
