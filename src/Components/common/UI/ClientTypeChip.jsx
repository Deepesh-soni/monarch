import styled, { css } from "styled-components";
import { BUTTERSCOTH_200, ACCENT_400, ACCENT_800 } from "./colors";
import FlexBox from "./FlexBox";

const Wrapper = styled(FlexBox)`
  justify-content: center;
  align-items: center;
  padding: 0 0.5rem;
  background-color: ${BUTTERSCOTH_200};
  border-radius: 1.25rem;
  font-size: 0.625rem;
  font-weight: 700;
  line-height: 1rem;
  color: ${ACCENT_800};
  text-transform: uppercase;

  ${({ disabled }) =>
    !!disabled &&
    css`
      background-color: ${ACCENT_400};
    `}
`;

const ClientTypeChip = ({ isDisabled, children }) => (
  <Wrapper disabled={isDisabled}>{children}</Wrapper>
);

export default ClientTypeChip;
