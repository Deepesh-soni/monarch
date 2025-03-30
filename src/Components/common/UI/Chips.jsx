import styled, { css } from "styled-components";
import {
  ACCENT_200,
  ACCENT_300,
  ACCENT_400,
  PRIMARY_400,
  PRIMARY_800,
} from "./colors";
import FlexBox from "./FlexBox";

const Wrapper = styled(FlexBox)`
  cursor: pointer;
  align-items: center;
  border-radius: 0.5rem;
  flex-direction: column;
  justify-content: center;
  background-color: ${ACCENT_200};
  white-space: nowrap;
  border: ${({ border }) => border || "1px solid ACCENT_500 "};
  max-width: ${({ width }) => width};
  padding: ${({ padding }) => padding || "0.25rem 1rem"};

  &:hover {
    border-color: ${ACCENT_400};
    background-color: ${ACCENT_300};
  }

  ${({ selected }) =>
    selected &&
    css`
      border-color: ${PRIMARY_800};
      background-color: ${PRIMARY_800};

      &:hover {
        border-color: ${PRIMARY_800};
        background-color: ${PRIMARY_800};
      }
    `}

  ${({ selected2 }) =>
    selected2 &&
    css`
      border-color: ${PRIMARY_400};
      background-color: ${PRIMARY_400};

      &:hover {
        border-color: ${PRIMARY_400};
        background-color: ${PRIMARY_400};
      }
    `}

  ${({ disabled }) =>
    !!disabled &&
    css`
      opacity: 0.6;
      pointer-events: none;
      cursor: not-allowed;
    `}

  ${({ fitContent }) =>
    fitContent &&
    css`
      width: fit-content;
    `}
`;

const Chip = ({
  onClick,
  selected,
  selected2,
  disabled,
  children,
  width,
  margin,
  padding,
  fitContent,
  height,
  borderRadius,
}) => (
  <Wrapper
    selected={selected}
    selected2={selected2}
    onClick={onClick}
    disabled={disabled}
    width={width}
    margin={margin}
    padding={padding}
    fitContent={fitContent}
    height={height}
    borderRadius={borderRadius}
  >
    {children}
  </Wrapper>
);

export default Chip;
