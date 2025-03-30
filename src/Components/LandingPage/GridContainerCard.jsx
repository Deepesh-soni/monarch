import React from "react";
import styled from "styled-components";

import { device } from "@common/UI/Responsive";
import FlexBox from "@common/UI/FlexBox";
import { H5, Body2 } from "@common/UI/Headings";

const GridBox = styled(FlexBox)`
  border: 1px solid rgba(0, 0, 0, 0.8);
  width: 12rem;
  height: 13rem;
  border-radius: 1rem;
  background: ${({ backgroundColor }) => backgroundColor};
  padding: 1rem;
  flex-direction: column;
  row-gap: 1rem;

  @media ${device.laptop} {
    width: 16rem;
    height: 17rem;
  }
`;

const Icon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;

const GridContainerCard = ({ item }) => (
  <GridBox backgroundColor={item.backgroundColor}>
    <FlexBox
      width="3.125rem"
      height="3.125rem"
      borderRadius="50%"
      backgroundColor={item.iconBackgroundColor}
      align="center"
      justify="center"
    >
      <Icon src={item.icon} alt="icon" />
    </FlexBox>
    <FlexBox column rowGap="0.75rem">
      <H5 bold>{item.title}</H5>
      <Body2>{item.subtitle}</Body2>
    </FlexBox>
  </GridBox>
);

export default GridContainerCard;
