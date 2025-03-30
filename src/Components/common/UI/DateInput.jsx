import React, { useState } from "react";
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
  cursor: pointer;
  font-size: 1rem;
  padding: 0.875rem;
  outline-color: transparent;
  border-radius: 0.5rem;
  position: relative;
  z-index: 1;
  background-color: transparent;

  &:focus {
    border: 1px solid ${SECONDARY_300};
  }

  &:focus::-webkit-datetime-edit,
  &:not(:placeholder-shown)::-webkit-datetime-edit,
  &:valid::-webkit-datetime-edit {
    color: black;
  }

  &::-webkit-datetime-edit,
  &::-webkit-datetime-edit-text,
  &::-webkit-datetime-edit-month-field,
  &::-webkit-datetime-edit-day-field,
  &::-webkit-datetime-edit-year-field {
    color: transparent;
    background: none;
  }

  ${({ hasValue }) =>
    hasValue &&
    css`
      &::-webkit-datetime-edit,
      &::-webkit-datetime-edit-text,
      &::-webkit-datetime-edit-month-field,
      &::-webkit-datetime-edit-day-field,
      &::-webkit-datetime-edit-year-field {
        color: black;
      }
    `}
`;

const Label = styled.span`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1rem;
  color: ${SECONDARY_200};
  pointer-events: none;
  transition: transform 0.6s, top 0.6s;

  ${({ isFocused }) =>
    isFocused &&
    css`
      top: -0.5rem;
      transform: translateY(0);
      background-color: ${WHITE};
      font-size: 0.75rem;
      height: fit-content;
      width: fit-content;
      padding-inline: 0.25rem;
      z-index:100;
    `}
`;

const RequiredIndicator = styled.span`
  color: ${({ theme }) => theme?.input?.requiredColor || ERROR};
`;

const DateInput = ({
  label,
  error,
  disabled,
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
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyDown = e => {
    if (e.keyCode === 13) {
      onSubmit?.();
    }
  };

  const handleFocus = e => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = e => {
    setIsFocused(!!value);
    onBlur?.(e);
  };

  const handleClick = e => {
    e.target.showPicker();
  };

  return (
    <Wrapper readOnly={readOnly}>
      <Container>
        <InputStyled
          name={name}
          value={value}
          type="date"
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder=""
          disabled={disabled}
          onChange={onChange}
          onKeyDown={onKeyDown}
          theme={theme}
          readOnly={readOnly}
          max={max}
          min={min}
          onClick={handleClick}
          hasValue={!!value}
          required={required}
        />
        <Label isFocused={isFocused || !!value}>
          {label}
          {required && <RequiredIndicator> *</RequiredIndicator>}
        </Label>
      </Container>
      {error && <Support color={ERROR}>{error}</Support>}
    </Wrapper>
  );
};

DateInput.defaultProps = {
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

export default DateInput;
