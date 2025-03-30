import React from "react";
import { CDN } from "@constants/urls";

import styled from "styled-components";
import { H3, Body2, H5 } from "@common/UI/Headings";
import FlexBox from "@common/UI/FlexBox";
import { device } from "@common/UI/Responsive";

const CardMain = styled(FlexBox)`
  width: 100%;
  border-radius: 0.75rem;
  max-height: 15rem;
  overflow: hidden;

  @media (max-width: 768px) {
    max-height: 100%;
  }
`;

const LeftSection = styled(FlexBox)`
  width: 65%;
  justify-content: space-between;
  padding: 0.875rem 0 1rem;
  gap: 1rem;

  @media ${device.laptop} {
    width: 80%;
    padding: 1.5rem 0 2rem;
  }
`;

const ShadowBox = styled(FlexBox)`
  width: 75%;
  border-radius: 0rem 1.125rem 1.125rem 0rem;
  align-items: center;
  padding: 0.25rem 1rem;
`;

const Image = styled.img`
  width: 100%;
  max-width: 9rem;
  object-fit: cover;

  @media ${device.laptop} {
    max-width: 15rem;
  }
`;

const Text = styled(Body2)`
  font-size: 0.5rem;

  @media ${device.laptop} {
    font-size: 0.875rem;
  }
`;

const Title = styled(H3)`
  font-size: 0.875rem;

  @media ${device.laptop} {
    font-size: 1.5rem;
  }
`;

const Description = styled(H5)`
  font-size: 0.625rem;

  @media ${device.laptop} {
    font-size: 0.8rem;
  }
`;

const ServicesBanner = ({
  data,
  caption = "Pamper Yourself with Pamprazzi",
}) => {
  const cardStyle = {
    background: data?.bannerColor,
  };

  return (
    <CardMain style={cardStyle}>
      <LeftSection column>
        <FlexBox column padding="0 1rem">
          <Title bold color={data?.titleColor}>
            {data?.title}
          </Title>
          <Description bold>{data?.bannerSubTitle}</Description>
        </FlexBox>
        <ShadowBox backgroundColor={data?.smallBannerColor}>
          <Text>{caption}</Text>
        </ShadowBox>
      </LeftSection>
      <Image
        src={
          data?.bannerImg
            ? `${CDN}/${data?.bannerImg}`
            : "/assets/serviceBanner.svg"
        }
        alt="banner"
      />
    </CardMain>
  );
};

export default ServicesBanner;
