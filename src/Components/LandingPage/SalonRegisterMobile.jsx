/* eslint-disable react/no-unescaped-entities */
import React, { useCallback } from "react";
import styled from "styled-components";
import { FaWhatsapp, FaArrowRight } from "react-icons/fa";

import FlexBox from "@common/UI/FlexBox";
import { Body1, Body2, Caption } from "@common/UI/Headings";
import { Button } from "@common/UI/Buttons";
import { PRIMARY_900, ACCENT_0 } from "@common/UI/colors";

const Wrapper = styled(FlexBox)`
  width: 100%;
  padding: 1rem 0.75rem 0rem 0.75rem;
  flex-direction: column;
  gap: 1rem;
  border-radius: 0.75rem;
  background: #dcedee;
`;

const Card = styled(FlexBox)`
  width: 100%;
  padding: 0.5rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  border-radius: 0.5rem;
  background: #fff;
`;

const Image = styled.img`
  width: 7.25rem;
  height: 8.25rem;
`;

const SalonRegisterMobile = () => {
  const handleListSalonClick = useCallback(() => {
    const merchantUrl = process.env.NEXT_PUBLIC_MERCHANT_URL;

    if (merchantUrl) {
      window.open(`${merchantUrl}?source=client-header`, "_blank");
    } else {
      console.error("Merchant URL is not defined in environment variables.");
    }
  }, []);

  return (
    <FlexBox padding="0 1rem">
      <Wrapper>
        <FlexBox column>
          <Body1 bold>Take Your Salon to the Next Level with Pamprazzi</Body1>
          <Caption>
            Grow your business with us and reach more clients effortlessly.
          </Caption>
        </FlexBox>
        <FlexBox
          width="100%"
          columnGap="0.5rem"
          style={{
            display: "flex",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
          }}
        >
          <Card style={{ flex: "0 0 calc(100% / 2)" }}>
            <Body2 bold>Increased Visibility</Body2>
            <Caption>
              Tap into a growing community of beauty enthusiasts looking for
              top-rated salons like yours.
            </Caption>
          </Card>
          <Card style={{ flex: "0 0 calc(100% / 2)" }}>
            <Body2 bold>Grow Your Revenue</Body2>
            <Caption>
              Expand your customer base and boost your profits by being part of
              our trusted network.
            </Caption>
          </Card>
          <Card style={{ flex: "0 0 calc(100% / 2)" }}>
            <Body2 bold>Client Management</Body2>
            <Caption>
              Streamline your appointment bookings, client communication, and
              payments.
            </Caption>
          </Card>
        </FlexBox>
        <FlexBox width="100%" columnGap="0.5rem">
          <FlexBox>
            <Image src="/assets/images/saloonRegister.webp" />
          </FlexBox>
          <FlexBox column rowGap="0.5rem" align="start" justify="center">
            <Button
              outline
              onClick={() => {
                window.open("https://wa.me/6289512121", "_blank");
              }}
            >
              <FlexBox align="center" columnGap="0.25rem">
                <FaWhatsapp size={18} />
                <Caption color={PRIMARY_900}>For direct enquiries</Caption>
              </FlexBox>
            </Button>
            <Button width="100%" onClick={handleListSalonClick}>
              <FlexBox align="center" columnGap="0.25rem" justify="center">
                <Caption color={ACCENT_0}>Let's get started</Caption>
                <FaArrowRight size={12} />
              </FlexBox>
            </Button>
          </FlexBox>
        </FlexBox>
      </Wrapper>
    </FlexBox>
  );
};

export default SalonRegisterMobile;
