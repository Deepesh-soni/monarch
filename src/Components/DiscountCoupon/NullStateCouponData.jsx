import React from "react";
import styled from "styled-components";
import { TfiClose } from "react-icons/tfi";

import Modal from "@common/UI/Modal";
import FlexBox from "@common/UI/FlexBox";
import { H1, H2 } from "@common/UI/Headings";
import CrossIcon from "../common/UI/CrossIcon";

const Cross = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
`;

const Heading = styled(FlexBox)`
  position: relative;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  align-items: center;
  width: 100%;
`;

const SubHeading = styled(FlexBox)`
  justify-content: left;
  padding: 1rem;
  align-items: center;
  width: 100%;
`;

const NullStateCouponData = ({ closeModal }) => (
  <Modal
    XS
    onClose={closeModal}
    height="fit-content"
    mobileHeight="fit-content"
    mobileWidth="90%"
    mobileBorderRadius="0.5rem"
    borderRadius="1rem"
  >
    <Heading>
      <CrossIcon onClick={closeModal} />
    </Heading>
    <SubHeading column rowGap="2rem">
      <img src="/assets/Coupons/hour-glass.webp" height="100px" width="100px" />
      <FlexBox column rowGap="0.5rem">
        <H1 bold textAlign="center">
          Coming Soon
        </H1>
        <H2 textAlign="center">
          This section is currently unavailable. Stay tuned for new features!
        </H2>
      </FlexBox>
    </SubHeading>
  </Modal>
);

export default NullStateCouponData;
