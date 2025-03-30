import React from "react";
import styled from "styled-components";

import FlexBox from "@common/UI/FlexBox";
import { Body1 } from "@common/UI/Headings";
import { Button } from "@common/UI/Buttons";
import Modal from "@common/UI/Modal";
import { SECONDARY_200, ACCENT_400 } from "@common/UI/colors";
import CrossIcon from "@common/UI/CrossIcon";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
`;

const Container = styled(FlexBox)`
  padding: 1rem;
  border-top: 1px solid ${SECONDARY_200};
  row-gap: 3rem;
`;

const Header = styled(FlexBox)`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${ACCENT_400};
  padding: 0.75rem 1rem;
`;

const ButtonWrapper = styled(FlexBox)`
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const ConfirmModal = ({
  toggleModal,
  title,
  confirmationText,
  cancelButtonText = "No",
  confirmButtonText = "Yes",
  onConfirm = () => {},
  onCancel = () => {},
}) => (
  <Modal
    XS
    togglePopup={toggleModal}
    height="fit-content"
    mobileHeight="fit-content"
    mobileWidth="90%"
    mobileBorderRadius="0.5rem"
    borderRadius="1rem"
  >
    <Wrapper>
      <Header>
        <div />
        <Body1 bold>{title}</Body1>
        <CrossIcon onClick={toggleModal} />
      </Header>
      <Container column>
        <Body1 textAlign="center">{confirmationText}</Body1>
        <ButtonWrapper>
          <Button width="100%" outline secondary onClick={onCancel}>
            {cancelButtonText}
          </Button>
          <Button width="100%" onClick={onConfirm}>
            {confirmButtonText}
          </Button>
        </ButtonWrapper>
      </Container>
    </Wrapper>
  </Modal>
);

export default ConfirmModal;
