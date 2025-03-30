import styled from "styled-components";

import FlexBox from "@common/UI/FlexBox";
import { SECONDARY_901, WHITE } from "@common/UI/colors";
import Modal from "@common/UI/Modal";
import { TfiClose } from "react-icons/tfi";
import { H2, H3 } from "@common/UI/Headings";

const CloseButton = styled(FlexBox)`
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  row-gap: 1rem;
  padding: 1rem;
  align-items: center;
`;

const HeadWithClose = styled(FlexBox)`
  width: 100%;
  position: relative;
  padding: 1.5rem 1rem 1rem;
`;

const IconContainer = styled(FlexBox)`
  width: 1.5rem;
  height: 1.5rem;
  background-color: ${SECONDARY_901};
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`;

const Img = styled.img`
  width: 3rem;
  height: 3rem;
`;

const Completed = ({setOpenModalCompleted}) => {
  return (
    <Modal XS height="fit-content" overflow="none" bgColor={WHITE}>
      <HeadWithClose>
        <CloseButton onClick={()=>setOpenModalCompleted(false)}>
          <IconContainer>
            <TfiClose size="0.75rem" />
          </IconContainer>
        </CloseButton>
      </HeadWithClose>
      <Wrapper>
        <Img src="/assets/Booking/completed.svg" alt="completed" />
        <FlexBox rowGap="0.5rem" column align="center">
          <H2>Appointment Completed!</H2>
          <H3>Don’t forget to ask for customer’s feedback.</H3>
        </FlexBox>
      </Wrapper>
    </Modal>
  );
};

export default Completed;
