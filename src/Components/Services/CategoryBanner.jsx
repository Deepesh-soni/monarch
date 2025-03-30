import React from "react";
import styled from "styled-components";

import FlexBox from "../common/UI/FlexBox";
import { Body2 } from "../common/UI/Headings";
import { ACCENT_800, PRIMARY_600 } from "../common/UI/colors";

const Wrapper = styled(FlexBox)`
  background-color: ${props => props.backgroundColor || PRIMARY_600};
  padding: 1rem 1rem 0;
  justify-content: space-around;
  img {
    max-width: 100%;
  }
`;

const OfferBox = styled(FlexBox)`
  background-color: ${props => props.offerBoxColor || ACCENT_800};
  border-radius: 1rem;
  padding-inline: 1rem;
`;

const CategoryBanner = ({ categoryConfig }) => {
  const {
    bannerimg,
    bannerdesc,
    offerDesc,
    backgroundColor,
    offerBoxColor,
    offerTextColor,
  } = categoryConfig || {};

  return (
    <Wrapper backgroundColor={backgroundColor}>
      <img src={bannerimg} alt={bannerdesc} />
      <FlexBox column align="center">
        <Body2>{bannerdesc}</Body2>
        <OfferBox offerBoxColor={offerBoxColor}>
          <Body2 color={offerTextColor} textAlign="center">
            {offerDesc}
          </Body2>
        </OfferBox>
      </FlexBox>
    </Wrapper>
  );
};

export default CategoryBanner;
