import React from "react";
import styled from "styled-components";

import FlexBox from "@common/UI/FlexBox";
import { H2, H1, Support } from "@common/UI/Headings";
import { device } from "@common/UI/Responsive";
import { Button } from "@common/UI/Buttons";
import { PRIMARY_800 } from "@common/UI/colors";

const featuresData = {
  features: [
    {
      title: "Client",
      description: "invoices, appointments, reminders",
      imageSrc: "/assets/landingPage/feature/Client.svg",
    },
    {
      title: "Services",
      description: "Manage the services for your salon",
      imageSrc: "/assets/landingPage/feature/Services.svg",
    },
    {
      title: "Analytics",
      description: "Data-driven salon insights",
      imageSrc: "/assets/landingPage/feature/Analytics.svg",
    },
    {
      title: "Bookings",
      description: "calendar, enquiry, online booking",
      imageSrc: "/assets/landingPage/feature/Bookings.svg",
    },
    {
      title: "Transaction",
      description: "Seamless payment tracking",
      imageSrc: "/assets/landingPage/feature/Transaction.svg",
    },
    {
      title: "Staff Management",
      description: "shifts, attendance and  payroll",
      imageSrc: "/assets/landingPage/feature/Staffmanagement.svg",
    },
    {
      title: "Coupons",
      description: "Discount coupons, analytics",
      imageSrc: "/assets/landingPage/feature/Coupons.svg",
    },
    {
      title: "Shop Settings",
      description: "Shop information and Timings  ",
      imageSrc: "/assets/landingPage/feature/Shopsettings.svg",
    },
    {
      title: "Reviews",
      description: "Ratings and comments on services",
      imageSrc: "/assets/landingPage/feature/Review.svg",
    },
  ],
};

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 0 1rem;
  border-radius: 1.5rem;

  @media ${device.laptop} {
    flex-direction: column;
    margin: auto;
    gap: 2.5rem;
    width: 86.67%;
    max-width: 75rem;
  }
`;

const Heading = styled(H1)`
  font-size: 1.25rem;
  text-align: center;
  @media ${device.laptop} {
    font-size: 2rem;
  }
`;

const Image = styled.img`
  width: 2rem;
  height: 2rem;

  @media ${device.laptop} {
    width: 3.25rem;
    height: 3.25rem;
  }
`;

const Card = styled(FlexBox)`
  flex-direction: column;
  background: #f2e8ff;
  gap: 1.5rem;
  padding: 1.5rem;
  border-radius: 1.5rem;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 0.75rem;
  row-gap: 1rem;

  @media ${device.laptop} {
    grid-template-columns: repeat(3, 1fr);
    column-gap: 2.5rem;
    row-gap: 2.5rem;
  }
`;

const Title = styled(H2)`
  font-size: 0.75rem;
  @media ${device.laptop} {
    font-size: 1.25rem;
  }
`;

const Description = styled(Support)`
  font-size: 0.625rem;
  line-height: normal;

  @media ${device.laptop} {
    font-size: 0.875rem;
  }
`;

const Btn = styled(Button)`
  background: linear-gradient(90deg, #533a71 -91.07%, #c6426e 180%);
`;

const Features = () => (
  <Wrapper>
    <FlexBox column columnGap="0.5rem" align="center">
      <H1>our features</H1>
      <Heading bold>Built with inputs from industry experts</Heading>
    </FlexBox>
    <Card>
      <Container>
        {featuresData.features.map((feature, index) => (
          <FlexBox key={index} columnGap="0.5rem" align="center">
            <Image src={feature.imageSrc} alt={feature.title} />
            <FlexBox column>
              <Title>{feature.title}</Title>
              <Description color={PRIMARY_800}>
                {feature.description}
              </Description>
            </FlexBox>
          </FlexBox>
        ))}
      </Container>
      <Btn>Additional Features Awaits!</Btn>
    </Card>
  </Wrapper>
);

export default Features;
