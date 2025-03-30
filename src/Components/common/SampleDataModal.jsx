import React from "react";
import styled from "styled-components";
import { TfiClose } from "react-icons/tfi";

import FlexBox from "@common/UI/FlexBox";
import { Body1, Body2 } from "@common/UI/Headings";
import Modal from "@common/UI/Modal";

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

const SampleDataModal = ({ closeModal }) => (
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
      <Cross onClick={closeModal}>
        <TfiClose />
      </Cross>
      <Body1>Insufficient Data for Analytics</Body1>
    </Heading>
    <SubHeading column rowGap="2rem">
      <img
        src="/assets/DashboardIcons/warning.webp"
        height="100px"
        width="100px"
      />
      <Body2 textAlign="center">
        We can&apos;t provide shop analytics due to insufficient data. Please
        ensure proper data collection for accurate future analytics. Thank you
        for your understanding.- Team Pamprazzi.
      </Body2>
    </SubHeading>
  </Modal>
);

export default SampleDataModal;
