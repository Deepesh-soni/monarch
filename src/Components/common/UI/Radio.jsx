import styled, { css } from "styled-components";
import { PRIMARY_800 } from "./colors";

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
  border-radius: 4rem;
  border: 1px solid ${PRIMARY_800};
`;

const InnerCircle = styled.div`
  width: 1rem;
  height: 1rem;
  border-radius: 4rem;
  background-color: ${PRIMARY_800};
`;

const Radio = ({ active, disabled, onClick }) => (
  //Container adds extra padding around it to ensure the minimum interactive target space is 32x32 pixels
  <Container disabled={disabled}>
    <Wrapper onClick={onClick}>{active && <InnerCircle />}</Wrapper>
  </Container>
);

export default Radio;
