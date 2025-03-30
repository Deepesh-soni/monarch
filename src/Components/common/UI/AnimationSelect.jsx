import React from "react";
import Select, { components } from "react-select";
import styled, { css } from "styled-components";
import {
  ERROR,
  ACCENT_0,
  SECONDARY_200,
  ACCENT_800,
  ACCENT_200,
  ACCENT_500,
  ACCENT_600,
} from "@common/UI/colors";

const { ValueContainer, Placeholder } = components;

const RequiredIndicator = styled.span`
  color: ${ERROR};
`;

const customStyles = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    borderColor: ACCENT_500,
    boxShadow: "none",
    "&:hover": {
      borderColor: ACCENT_500,
      cursor: "pointer",
    },
    padding: "0.25rem",
    borderRadius: "0.5rem",
    fontSize: "0.85rem",
    textAlign: "left",
  }),
  placeholder: base => ({
    ...base,
    color: `${ACCENT_800} !important`,
    opacity: 0.4,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state?.isSelected ? ACCENT_200 : ACCENT_0,
    color: `${ACCENT_800}`,
    textAlign: "left",
    "&:hover": {
      backgroundColor: `${ACCENT_200}`,
      color: `${ACCENT_800}`,
      cursor: "pointer",
    },
  }),
};

const CustomValueContainer = ({ children, ...props }) => {
  return (
    <ValueContainer {...props}>
      <Placeholder {...props} isFocused={props.isFocused}>
        {props.selectProps.placeholder}
        {props.selectProps.isRequired && (
          <RequiredIndicator> *</RequiredIndicator>
        )}
      </Placeholder>
      {React.Children.map(children, child =>
        child && child.type !== Placeholder ? child : null
      )}
    </ValueContainer>
  );
};

const ReactSelect = ({
  options,
  placeholder,
  name,
  isClearable,
  isSearchable,
  onChange,
  value,
  isRequired,
}) => (
  <Select
    className="basic-single"
    classNamePrefix="select"
    name={name}
    options={options}
    isClearable={isClearable}
    isSearchable={isSearchable}
    value={value}
    isRequired={isRequired}
    components={{
      ValueContainer: CustomValueContainer,
    }}
    placeholder={placeholder}
    styles={{
      ...customStyles,
      control: (base, state) => ({
        ...base,
        background: ACCENT_0,
        borderRadius: "0.5rem",
        paddingLeft: "0.5rem",
        borderWidth: "1px",
        boxShadow: null,
        height: "3rem",
        width: "100%",
        color: "yellow",
        fontSize: "1rem",
        cursor: "pointer",
        borderColor: `${SECONDARY_200} !important`,
      }),
      menu: provided => ({
        ...provided,
        zIndex: 200,
        minHeight: "5rem",
        cursor: "pointer",
      }),
      container: (provided, state) => ({
        ...provided,
      }),
      valueContainer: (provided, state) => ({
        ...provided,
        paddingTop: 0,
        color: ACCENT_800,
        cursor: "pointer",
        overflow: "visible",
      }),
      placeholder: (provided, state) => ({
        ...provided,
        gridArea: "unset",
        margin: 0,
        position: "absolute",
        top: state.hasValue || state.selectProps.inputValue ? -16 : "17%",
        transition: "top 0.5s, font-size 0.1s",
        fontSize:
          state.hasValue || state.selectProps.inputValue
            ? "0.75rem"
            : "0.875rem",
        color: `${ACCENT_600} !important`,
        letterSpacing: "0.26px",
        cursor: "pointer",
        backgroundColor: ACCENT_0,
        padding: "0 0.5rem",
      }),
    }}
    onChange={onChange}
  />
);

export default ReactSelect;
