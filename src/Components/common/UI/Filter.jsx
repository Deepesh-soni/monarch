import styled from "styled-components";
import { ACCENT_300, ACCENT_800, ACCENT_400, ERROR } from "./colors";
import { FiFilter } from "react-icons/fi";

const Wrapper = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 0.25rem;
  padding: 0.5rem;
  border: 1px solid ${ACCENT_400};
  cursor: pointer;

  &:hover {
    background-color: ${ACCENT_300};
  }
`;

const Dot = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  position: relative;
  right: -1.5rem;
  top: -2rem;
  border-radius: 4rem;
  background-color: ${ERROR};
`;

const Filter = ({ active, onClick }) => (
  <div onClick={onClick}>
    <Wrapper>
      <FiFilter color={ACCENT_800} strokeWidth={2} />
    </Wrapper>
    {active && <Dot />}
  </div>
);

export default Filter;
