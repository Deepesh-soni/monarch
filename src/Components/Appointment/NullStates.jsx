import React from "react";
import FlexBox from "@common/UI/FlexBox";
import { Body1 } from "@common/UI/Headings";
import { SECONDARY_500 } from "@common/UI/colors";

const NullState = ({ content, imgUrl }) => {
  return (
    <FlexBox
      column
      width="100%"
      height="100%"
      justify="center"
      align="center"
      rowGap="1rem"
      padding="1rem"
    >
      <img src={imgUrl} alt="No Booking" width="40px" height="50px" />
      <Body1 textAlign="center" color={SECONDARY_500}>
        {content}
      </Body1>
    </FlexBox>
  );
};

export default NullState;
