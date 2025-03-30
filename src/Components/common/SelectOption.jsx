import React, { useState } from "react";
import Select from "react-select";
import styled from "styled-components";
import {
  ACCENT_500,
  ERROR,
  ACCENT_800,
  SECONDARY_200,
  ACCENT_200,
  WHITE,
} from "@common/UI/colors";

const Wrapper = styled.div`
  width: 100%;
  position: relative;
`;

const Label = styled.span`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1rem;
  color: ${SECONDARY_200};
  pointer-events: none;
  transition: 0.6s ease;
  z-index:100;

  ${({ isFocused, hasValue }) =>
    (isFocused || hasValue) &&
    `
    top: 0px;
    font-size: 0.75rem;
    background: ${WHITE};
    padding: 0 0.25rem;
  `}
`;

const RequiredIndicator = styled.span`
  color: ${({ theme }) => theme?.input?.requiredColor || ERROR};
`;

const CustomSelect = styled(Select)`
  width: 100%;
`;

const customStyles = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    borderColor: `${ACCENT_500}`,
    boxShadow: "none",
    "&:hover": {
      borderColor: `${ACCENT_500}`,
      cursor: "pointer",
    },
    padding: "0.25rem",
    borderRadius: "0.5rem",
    fontSize: "0.85rem",
    textAlign: "left",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state?.isSelected ? `${ACCENT_200}` : "white",
    color: `${ACCENT_800}`,
    textAlign: "left",
    "&:hover": {
      backgroundColor: `${ACCENT_200}`,
      color: `${ACCENT_800}`,
      cursor: "pointer",
    },
  }),
  singleValue: base => ({
    ...base,
    color: `${ACCENT_800}`,
  }),
};

const SelectOption = ({
  options,
  placeholder,
  className,
  setFormData,
  formData,
  field,
  required = false,
  value,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = selectedOption => {
    const selectedValue = selectedOption?.value;
    setFormData({ ...formData, [field]: selectedValue });
  };

  return (
    <Wrapper>
      <Label isFocused={isFocused} hasValue={value}>
        {placeholder} {required && <RequiredIndicator> *</RequiredIndicator>}
      </Label>
      <CustomSelect
        className={className}
        classNamePrefix="select"
        options={options}
        value={value}
        onChange={handleChange}
        placeholder=""
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        styles={{
          ...customStyles,
          control: (base, state) => ({
            ...base,
            background: "white",
            borderRadius: "0.5rem",
            paddingLeft: "0.5rem",
            borderWidth: "1px",
            boxShadow: null,
            height: "3rem",
            width: "100%",
            fontSize: "1rem",
            cursor: "pointer",
            borderColor: `${SECONDARY_200} !important`,
          }),
          menu: provided => ({
            ...provided,
            zIndex: 200,
            minHeight: "3rem",
            cursor: "pointer",
          }),
        }}
      />
    </Wrapper>
  );
};

export default SelectOption;
