import React from "react";

import FlexBox from "@common/UI/FlexBox";
import { Body2, Body1 } from "@common/UI/Headings";
import { Button } from "@common/UI/Buttons";
import { BLACK, SECONDARY_GREY } from "@common/UI/colors";

const RegistrationCompleted = ({ closeModal }) => (
  <FlexBox column alignItems="center" padding="0.5rem" rowGap="1rem">
    <Body1 color={BLACK} bold>
      The Stylist has been registered successfully.
    </Body1>
    <Body2 color={SECONDARY_GREY}>
      The stylist can now login to the stylist portal using their registered
      mobile number.
    </Body2>
    <Button width="100%" onClick={closeModal}>
      Done
    </Button>
  </FlexBox>
);

export default RegistrationCompleted;
