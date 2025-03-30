import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import FlexBox from "./FlexBox";
import { boxShadowDs1, boxShadowDs2 } from "./styles";
import { Body2 } from "./Headings";
import { FiChevronRight, FiCheck } from "react-icons/fi";
import useOutsideAlert from "../../../hooks/useOutsideAlert";
import {
  ACCENT_100,
  ACCENT_200,
  ACCENT_400,
  ACCENT_500,
  PRIMARY_100,
  PRIMARY_900,
} from "./colors";
import { Button } from "./Buttons";

const Container = styled.div`
  position: absolute;
  z-index: 5;
  width: ${({ width }) => width || "20rem"};
  top: ${({ top }) => top || "2.5rem"};
  right: ${({ right }) => right || "0"};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  background-color: ${ACCENT_100};
  border: 1px solid ${ACCENT_400};
  border-radius: ${({ size }) => (size === "small" ? "0.5rem" : "1rem")};
  overflow: hidden;
  transition: all 200ms ease-in-out;
  ${({ size }) => (size === "small" ? boxShadowDs1 : boxShadowDs2)};
  ${({ alignLeft }) =>
    alignLeft &&
    css`
      right: unset;
      left: 0;
    `};

  ${({ maxHeight }) =>
    maxHeight &&
    css`
      max-height: ${maxHeight};
      overflow-y: auto;
    `};
`;

const Options = styled(FlexBox)`
  width: 100%;
  flex-direction: column;
  box-sizing: border-box;
`;

const Option = styled(FlexBox)`
  padding: ${({ size }) => (size === "small" ? "0.5rem" : "1rem")} 1rem;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  column-gap: 0.5rem;
  align-items: center;
  justify-content: space-between;
  transition: all 200ms ease-in-out;
  background-color: ${({ isSelected }) =>
    isSelected ? PRIMARY_100 : ACCENT_100};

  :first-child {
    padding-top: ${({ size }) => (size === "small" ? "0.75rem" : "1.5rem")};
  }

  :last-child {
    padding-bottom: ${({ size }) => (size === "small" ? "0.75rem" : "1.5rem")};
  }

  ${({ isSelectDropdown, isSelected }) =>
    isSelectDropdown &&
    !isSelected &&
    css`
      &:hover {
        background-color: ${ACCENT_200};
      }
    `}

  ${({ size, isSelected, disabled }) =>
    size === "large" &&
    !isSelected &&
    css`
      svg {
        color: ${ACCENT_500};
      }
      &:hover {
        background-color: ${disabled ? ACCENT_100 : ACCENT_200};
        svg {
          color: ${PRIMARY_900};
        }
      }
    `}
`;

const ApplyButton = styled(Button)`
  display: flex;
  width: 100%;
  padding: 1rem;
  justify-content: center;
  align-items: center;
`;

/**
 * Common Dropdown for Navigation and Selection
 * 
 * Set position relative on parent and pass it's ref
 * Add toggle dropdown onclick handler on parent
 *
 * @typedef {Object} Option - For Navigation Dropdown
 * @property {string} label
 * @property {string} [labelColor] 
 * @property {string} [disabled] 
 * @property {function} [handleNavigation] - handle navigation logic (required for Nav dropdown)
 *
 * @typedef {Object} Option - For Selection Dropdown
 * @property {string} label
 * @property {string} [value]
 *
 * @param {Option[]} options
 
 * @param parentRef - Parent Container Ref for useOutsideAlert
 * @param {boolean} isOpen - Parent state to indicate open / close state
 * @param {function} setIsOpen - Parent state updater for open / close state
 * @param {string} [ignoreId] - id of element to be ignored for useOutsideAlert 
 * 
 * @param {string} [isSingleSelect] - Single select dropdown
 * @param {object} [selectedOption] - Parent state to indicate the selected option (required for single-select)
 
 * @param {string} [isMultiSelect] - Multi select dropdown
 * @param {string} [appliedOptions] - Parent state to indicate the applied options (required for multi-select)
 * 
 * @param {function} [applyOption] - Parent state updater for single / multi select option(s) 
 * 
 * Style props
 * @param {string} size - Dropdown Size: small or large (as defined in design system)
 * @param {string} [width] - Dropdown width
 * @param {string} [top] - Top offset from parent container
 * @param {string} [alignLeft] - Align to the left instead of right
 */

const Dropdown = ({
  parentRef,
  isOpen,
  setIsOpen,
  options,
  size,
  width,
  top,
  right,
  ignoreId = null,
  isSingleSelect = false,
  selectedOption,
  isMultiSelect = false,
  appliedOptions,
  applyOption,
  alignLeft,
  maxHeight,
  bottomThreshold = 650,
}) => {
  const [selectedOptions, setSelectedOptions] = useState(appliedOptions);
  const dropdownRef = useRef(null);

  const closeDropdown = () => setIsOpen(false);

  useOutsideAlert(parentRef, closeDropdown, ignoreId);

  useEffect(() => {
    if (isMultiSelect && !isOpen) setSelectedOptions(appliedOptions);

    //If dropdown goes out of view bounds scroll into view
    if (isOpen) {
      const element = dropdownRef?.current;
      if (element?.getBoundingClientRect()?.bottom > bottomThreshold) {
        element?.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [isOpen, isMultiSelect, appliedOptions]);

  const isSelectDropdown = isSingleSelect || isMultiSelect;

  const getSelectedStatus = (label) => {
    if (!isSelectDropdown) return false;
    if (isSingleSelect) return label === selectedOption?.label;
    if (isMultiSelect) {
      const isSelectedCheck = (option) => label === option?.label;
      return !!selectedOptions?.find(isSelectedCheck);
    }
  };

  const handleOptionClick = (event, option) => {
    const handleNavigation = option.handleNavigation;
    if (!!handleNavigation) {
      if (option.disabled) {
        event?.stopPropagation();
        return;
      }
      handleNavigation(event, option);
    }
    if (isSingleSelect) applyOption(option);
    if (isMultiSelect) {
      event?.stopPropagation();
      setSelectedOptions((currentOptions) => {
        const isSelectedCheck = (currentOption) =>
          currentOption?.label === option?.label;

        const filterCondition = (currentOption) =>
          currentOption?.label !== option?.label;

        if (!!currentOptions?.find(isSelectedCheck))
          return currentOptions?.filter(filterCondition);

        return [...currentOptions, option];
      });
    }
  };

  return (
    <Container
      isOpen={isOpen}
      width={width}
      maxHeight={maxHeight}
      top={top}
      size={size}
      alignLeft={alignLeft}
      right={right}
      className="hide-scrollbar"
      ref={dropdownRef}
    >
      <Options size={size}>
        {options?.map((option) => {
          if (!option) return null;
          const { label, labelColor, disabled } = option;
          const isSelected = getSelectedStatus(label);
          const textColor = disabled ? ACCENT_500 : labelColor;
          const showChevron =
            !isSelectDropdown && !disabled && size === "large";

          return (
            <Option
              key={label}
              onClick={(event) => handleOptionClick(event, option)}
              size={size}
              isSelectDropdown={isSelectDropdown}
              isSelected={isSelected}
              disabled={disabled}
            >
              <Body2 bold={!isSelectDropdown} color={textColor}>
                {label}
              </Body2>
              {showChevron && <FiChevronRight size="1.5rem" />}
              {isSelected && <FiCheck size="1.25rem" color={PRIMARY_900} />}
            </Option>
          );
        })}
        {isMultiSelect && (
          <ApplyButton
            textCta
            secondary
            onClick={() => applyOption(selectedOptions)}
          >
            APPLY
          </ApplyButton>
        )}
      </Options>
    </Container>
  );
};

export default Dropdown;
