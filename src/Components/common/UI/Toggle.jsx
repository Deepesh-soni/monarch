import React from "react";
import styled, { css } from "styled-components";

import FlexBox from "./FlexBox";
import { ACCENT_600, ACCENT_0 } from "./colors";

const ToggleContainer = styled(FlexBox)`
  width: ${({ small }) => (small ? "2.5rem" : "4rem")};
  height: ${({ small }) => (small ? "1.3rem" : "auto")};
  padding: 2px;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  align-items: center;
  border-radius: 6rem;
  gap: 0.25rem;
  background-color: ${({ checked, toggleBgColor }) =>
    checked ? "green" : toggleBgColor};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  ${({ checked, primaryColor }) =>
    checked &&
    css`
      background-color: ${primaryColor};
    `};
`;

const Switch = styled(FlexBox)`
  width: ${({ small }) => (small ? "1rem" : "1.75rem")};
  aspect-ratio: 1;
  border-radius: 50%;
  transition: transform 300ms ease-in-out;
  background-color: ${({ accentColor }) => accentColor};
  transform: ${({ checked, small }) =>
    checked ? (small ? "translateX(1.25rem)" : "translateX(2rem)") : "none"};
`;

const CustomToggle = ({
  checked,
  disabled,
  small,
  primaryColor = "green",
  toggleBgColor = ACCENT_600,
  accentColor = ACCENT_0,
  onChange,
}) => {
  return (
    <ToggleContainer
      checked={checked}
      disabled={disabled}
      small={small}
      primaryColor={primaryColor}
      toggleBgColor={toggleBgColor}
      onClick={() => {
        if (!disabled && onChange) {
          onChange(!checked);
        }
      }}
    >
      <Switch accentColor={accentColor} checked={checked} small={small} />
    </ToggleContainer>
  );
};

export default CustomToggle;
