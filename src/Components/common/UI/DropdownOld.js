import styled from "styled-components";
import FlexBox from "./FlexBox";
import { boxShadowDs1 } from "./styles";

const Wrapper = styled(FlexBox)`
  width: 100%;
  z-index: 5;
  border-radius: 1rem;
  overflow: hidden;
  flex-direction: column;
  box-sizing: border-box;
  ${boxShadowDs1}
`;

const Dropdown = ({ onClick, active, disabled, children }) => (
  <Wrapper active={active} onClick={onClick} disabled={disabled}>
    {children}
  </Wrapper>
);

export default Dropdown;
