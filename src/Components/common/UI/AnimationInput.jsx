import React from "react";
import styled, { css } from "styled-components";
import {
  WHITE,
  ERROR,
  ACCENT_600,
  ACCENT_800,
  SECONDARY_200,
  SECONDARY_300,
} from "@common/UI/colors";
import { Support } from "@common/UI/Headings";

const Wrapper = styled.div`
  width: 100%;

  ${({ readOnly }) =>
    readOnly &&
    css`
      opacity: 0.6;
      cursor: not-allowed;
    `}
`;

const Container = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
`;

const InputStyled = styled.input`
  width: 100%;
  border: 1px solid ${SECONDARY_200};
  font-size: 1rem;
  padding: 0.875rem;
  outline-color: transparent;
  border-radius: 0.5rem;

  &:focus {
    border: 1px solid ${SECONDARY_300};
  }

  &:not(:placeholder-shown) + span,
  &:focus + span {
    color: ${SECONDARY_200};
    transform: translateX(2px) translateY(-25px);
    font-size: 0.75rem;
    padding-inline: 0.5rem;
    background-color: ${WHITE};
  }
`;

const Label = styled.span`
  position: absolute;
  left: 1rem;
  font-size: 1rem;
  color: ${SECONDARY_200};
  pointer-events: none;
  transition: 0.6s;
`;

const RequiredIndicator = styled.span`
  color: ${({ theme }) => theme?.input?.requiredColor || ERROR};
`;

const AnimationInput = ({
  label,
  error,
  type,
  disabled,
  showCross,
  required = false,
  value,
  onChange,
  onFocus,
  onSubmit,
  onKeyDown,
  theme,
  onBlur,
  readOnly = false,
  max,
  min,
  name,
}) => {
  const handleKeyDown = e => {
    if (e.keyCode === 13) {
      onSubmit?.();
    }
  };
  return (
    <Wrapper readOnly={readOnly}>
      <Container>
        <InputStyled
          name={name}
          value={value}
          type={type}
          onFocus={e => onFocus?.(e)}
          onBlur={e => onBlur?.(e)}
          placeholder=""
          disabled={disabled}
          onChange={onChange}
          onKeyDown={onKeyDown}
          theme={theme}
          readOnly={readOnly}
          max={max}
          min={min}
          handleKeyDown={handleKeyDown}
        />
        <Label>
          {label}
          {required && <RequiredIndicator> *</RequiredIndicator>}
        </Label>
      </Container>
      {error && <Support color={ERROR}>{error}</Support>}
    </Wrapper>
  );
};

AnimationInput.defaultProps = {
  theme: {
    input: {
      padding: "0.75rem",
      border: ACCENT_600,
      requiredColor: "red",
      IconColor: ACCENT_800,
      crossIconColor: ACCENT_800,
    },
  },
};

export default AnimationInput;
