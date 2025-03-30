import styled from "styled-components";

import FlexBox from "@common/UI/FlexBox";
import { ACCENT_300, ACCENT_200 } from "@common/UI/colors";

const IconContainer = styled(FlexBox)`
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  background-color: ${ACCENT_200};

  &:hover {
    background-color: ${ACCENT_300};
  }
`;

export const EditAndDelete = ({ handleEditClick, handleDeleteClick }) => (
  <FlexBox columnGap="0.5rem" align="center" justify="center">
    <IconContainer>
      <img src="/assets/edit.svg" onClick={handleEditClick} />
    </IconContainer>
    <IconContainer>
      <img src="/assets/delete.svg" onClick={handleDeleteClick} />
    </IconContainer>
  </FlexBox>
);
