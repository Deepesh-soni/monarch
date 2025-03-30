import React, { useCallback } from "react";
import styled from "styled-components";
import { FaWhatsapp, FaArrowRight } from "react-icons/fa";

import FlexBox from "@common/UI/FlexBox";
import { H5, H1 } from "@common/UI/Headings";
import { Body2 } from "@common/UI/Headings";
import { Button } from "@common/UI/Buttons";
import { SalonContainerData } from "@metadata/SalonContainerData";
import { device } from "@common/UI/Responsive";

const SalonContent = styled(FlexBox)`
  width: 100%;
  background: linear-gradient(263deg, #dceced 71.09%, #b2b2b2 104.65%);
  border-radius: 1rem;
  position: relative;

  @media ${device.laptop} {
    align-items: center;
    justify-content: end;
    padding: 2rem;
    margin: auto;
    width: 86.67%;
    max-width: 75rem;
  }
`;

const Left = styled.div`
  position: absolute;
  width: 30%;
  left: -4rem;
  top: -4.5rem;
`;

const Content = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  width: 28%;
  padding: 0.75rem;

  @media ${device.laptop} {
    width: 100%;
  }
`;

const Image = styled.img`
  width: 23rem;
`;

const SalonRegister = () => {
  const handleListSalonClick = useCallback(() => {
    const merchantUrl = process.env.NEXT_PUBLIC_MERCHANT_URL;

    if (merchantUrl) {
      window.open(`${merchantUrl}?source=client-header`, "_blank");
    } else {
      console.error("Merchant URL is not defined in environment variables.");
    }
  }, []);

  return (
    <SalonContent>
      <Left>
        <Image src="/assets/images/saloonRegister.webp" alt="man with a comb" />
      </Left>
      <FlexBox width="70%" column justify="center" rowGap="1.5rem">
        <FlexBox column>
          <H1 bold>Take Your Salon to the Next Level with Pamprazzi</H1>
          <Body2>
            Grow your business with us and reach more clients effortlessly.
          </Body2>
        </FlexBox>
        <FlexBox columnGap="1rem">
          {SalonContainerData.map(({ id, heading, info }) => (
            <Content column key={id}>
              <H5 bold>{heading}</H5>
              <Body2>{info}</Body2>
            </Content>
          ))}
        </FlexBox>
        <FlexBox columnGap="1rem" align="center">
          <Button
            outline
            width="100%"
            onClick={() => {
              window.open(
                "https://web.whatsapp.com/send?phone=6289512121",
                "_blank"
              );
            }}
          >
            <FlexBox
              width="100%"
              align="center"
              justify="center"
              columnGap="0.25rem"
            >
              <FaWhatsapp size={18} />
              Whats chat for direct enquiries
            </FlexBox>
          </Button>

          <Button width="100%" onClick={handleListSalonClick}>
            <FlexBox
              width="100%"
              align="center"
              justify="center"
              columnGap="0.25rem"
            >
              Let&apos;s get started <FaArrowRight size={18} />
            </FlexBox>
          </Button>
        </FlexBox>
      </FlexBox>
    </SalonContent>
  );
};

export default SalonRegister;
