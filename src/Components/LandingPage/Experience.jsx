import React, { useState } from "react";
import styled from "styled-components";

import { Button } from "@Components/common/UI/Buttons";
import FlexBox from "@Components/common/UI/FlexBox";
import { Display, H2 } from "@Components/common/UI/Headings";
import { PRIMARY_900 } from "@common/UI/colors";
import { device } from "@common/UI/Responsive";
import { TfiClose } from "react-icons/tfi";
import CrossIcon from "@common/UI/CrossIcon";

import ModalHelp from "./ModalHelp";
const Wrapper = styled(FlexBox)`
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  background: linear-gradient(90deg, #533a71 -91.07%, #c6426e 180%);
  gap: 2.25rem;
  @media ${device.laptop} {
    padding: 4rem 2rem;
  }
`;

const Heading = styled(Display)`
  font-size: 0.875rem;
  @media ${device.laptop} {
    font-size: 2rem;
  }
`;
const SubHeading = styled(H2)`
  font-size: 0.75rem;
  text-align: center;
  line-height: normal;
  @media ${device.laptop} {
    font-size: 1.5rem;
  }
`;
const Experience = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  return (
    <Wrapper>
      {isModalOpen && <ModalHelp closeModal={closeModal} />}

      <FlexBox column columnGap="0.5rem" justify="center" align="center">
        <Heading color="#FFFFFF" bold>
          Experience Pamprazzi in Action
        </Heading>
        <SubHeading color="#FFFFFF">
          Book a free demo now to see how our innovative features can elevate
          your business.
        </SubHeading>
      </FlexBox>
      <FlexBox>
        <Button whiteButton color={PRIMARY_900} onClick={handleOpenModal}>
          Try a Free Demo
        </Button>
      </FlexBox>
    </Wrapper>
  );
};

export default Experience;
