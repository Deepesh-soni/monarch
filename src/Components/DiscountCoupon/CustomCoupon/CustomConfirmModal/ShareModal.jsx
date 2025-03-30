import React, { useState } from "react";
import styled from "styled-components";
import Modal from "@common/UI/Modal";
import ShareComponent from "./ShareComponent";
import CrossIcon from "@common/UI/CrossIcon";
import FlexBox from "@common/UI/FlexBox";
import { Body2, H2 } from "@common/UI/Headings";
import { SECONDARY_200 } from "@common/UI/colors";

const Wrapper = styled(FlexBox)`
  position: relative;
  flex-direction: column;
  overflow: hidden;
`;

const Container = styled(FlexBox)`
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;

const HeadBox = styled(FlexBox)`
  width: 100%;
  position: sticky;
  padding: 1rem;
  top: 0;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${SECONDARY_200};
`;

const Copiedmsg = styled(FlexBox)`
  background-color: black;
  border-radius: 0.5rem;
  padding: 0.25rem 0.5rem;
  color: white;
  width: fit-content;
  position: absolute;
  bottom: 0.25rem;
  align-self: center;
  opacity: 0.7;
`;

const ShareModal = ({ setModalOpen, couponCode, couponString }) => {
  const [copied, setCopied] = useState(false);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Modal
      XS
      height="fit-content"
      togglePopup={handleCloseModal}
      mobileBorderRadius="0.5rem"
      borderRadius="1rem"
    >
      <Wrapper>
        <HeadBox>
          <div />
          <FlexBox align="center">
            <H2 bold>Share</H2>
          </FlexBox>
          <CrossIcon onClick={handleCloseModal} />
        </HeadBox>
        <FlexBox column padding="1rem">
          <Body2>Share this Salon with Your Clients</Body2>
          <Container>
            <ShareComponent
              setCopied={setCopied}
              couponCode={couponCode}
              couponString={couponString}
            />
          </Container>
          {copied && <Copiedmsg>Copied!</Copiedmsg>}
        </FlexBox>
      </Wrapper>
    </Modal>
  );
};

export default ShareModal;
