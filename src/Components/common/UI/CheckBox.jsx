import styled, { css } from "styled-components";
import { ACCENT_400, ACCENT_500, PRIMARY_800, ACCENT_0 } from "./colors";
import { FiCheck } from "react-icons/fi";

const Container = styled.div`
  padding: ${({ padding }) => padding || "0.25rem"};
  cursor: pointer;

  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
      cursor: not-allowed;
    `}
`;

const Wrapper = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 0.25rem;
  border: 1px solid ${PRIMARY_800};
  background-color: ${(props) => (props.check ? PRIMARY_800 : "none")};

  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
      border: 1px solid ${ACCENT_400};
      cursor: not-allowed;
      background-color: ${(props) => (props.check ? ACCENT_500 : "none")};
    `}
`;

const CheckBox = ({ check, disabled, onClick }) => (
  //Container adds extra padding around it to ensure the minimum interactive target space is 32x32 pixels
  <Container disabled={disabled} onClick={onClick}>
    <Wrapper check={check} disabled={disabled}>
      <FiCheck color={ACCENT_0} strokeWidth={3} />
    </Wrapper>
  </Container>
);

export default CheckBox;
