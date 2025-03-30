import React from "react";
import styled from "styled-components";

import FlexBox from "@common/UI/FlexBox";
import { Display, H1, Body2 } from "@common/UI/Headings";
import { device } from "@common/UI/Responsive";
import { PRIMARY_800, PRIMARY_900 } from "@common/UI/colors";

const Wrapper = styled(FlexBox)`
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  @media ${device.laptop} {
    padding: 2rem;
    background-color: ${PRIMARY_900};
  }
`;

const Title = styled(Display)`
  font-size: 3rem;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  flex-direction: column;
  gap: 0.75rem;
  padding: 0 1rem;

  @media ${device.laptop} {
    gap: 3rem;
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Card = styled(FlexBox)`
  flex-direction: column;
  width: 100%;
  background-color: ${PRIMARY_800};
  padding: 1rem;
  border-radius: 0.75rem;

  @media ${device.laptop} {
    background-color: transparent;
    max-width: 19.375rem;
  }
`;

const Heading = styled(H1)`
  @media ${device.laptop} {
    color: #ffffff;
  }
`;

const SubHeading = styled(Display)`
  @media ${device.laptop} {
    color: #ffffff;
  }
`;

const cardData = [
  {
    display: "50%",
    title: "Footfall Increase",
    description:
      "Boost your salon's visibility and attract more clients with Pamprazzi. Watch your footfall grow as we connect you with customers seeking the best salon experience.",
  },
  {
    display: "500+",
    title: "Happy Clients",
    description:
      "Satisfied salon owners who trust Pamprazzi to elevate their business. Experience the growth and success that comes with our thriving community.",
  },
  {
    display: "3x",
    title: "Revenue Boost",
    description:
      "Unlock a 3x revenue boost with Pamprazzi! Transform your salon’s potential, attract more clients, and watch your profits soar to new heights.",
  },
  {
    display: "40%",
    title: "Higher Client Satisfaction",
    description:
      "Enhance client satisfaction by 40% with personalized services, exclusive offers, and seamless booking experiences that keep clients coming back.",
  },
];

const Effect = () => (
  <Wrapper>
    <FlexBox column gap="0.5rem" align="center">
      <Heading>client results</Heading>
      <SubHeading bold>The Pamprazzi Effect</SubHeading>
    </FlexBox>
    <Container>
      {cardData.map((card, index) => (
        <Card key={index}>
          <Title color="#FFFFFF" bold>
            {card.display}
          </Title>
          <H1 color="#FFFFFF" bold>
            {card.title}
          </H1>
          <Body2 color="#D3D3D3">{card.description}</Body2>
        </Card>
      ))}
    </Container>
  </Wrapper>
);

export default Effect;
