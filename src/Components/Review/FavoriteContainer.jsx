import React from "react";
import styled from "styled-components";

import FlexBox from "@common/UI/FlexBox";
import { boxShadowDs1 } from "@common/UI/styles";
import { H4 } from "@common/UI/Headings";
import { ACCENT_0 } from "@common/UI/colors";

const Wrapper = styled(FlexBox)`
  width: 100%;
  padding: 0.75rem 1.5rem;
  align-items: flex-start;
  gap: 1.5rem;
  background: ${ACCENT_0};
  border-radius: 0.75rem;
  ${boxShadowDs1}
`;

const LeftContainer = styled(FlexBox)`
  width: 2.875rem;
  height: 2.875rem;
`;
const Favorite = ({ data }) => {
  return (
    <Wrapper>
      <LeftContainer>
        <img src="/assets/Review/heartIcon.svg"></img>
      </LeftContainer>
      <FlexBox column columnGap="0.5rem">
        <FlexBox columnGap="2.5rem">
          <H4 bold>Favorited by :</H4>
          <H4 bold>{data} people</H4>
        </FlexBox>
        <FlexBox>
          <H4>WOW! you are winning hearts</H4>
        </FlexBox>
      </FlexBox>
    </Wrapper>
  );
};
export default Favorite;
