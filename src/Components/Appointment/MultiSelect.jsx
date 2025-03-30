import { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import { TfiClose } from "react-icons/tfi";

import {
  TAB_COLOR,
  PRIMARY_900,
  ACCENT_0,
  ACCENT_200,
  SECONDARY_901,
  SECONDARY_200,
} from "@common/UI/colors";
import { Support } from "@common/UI/Headings";
import FlexBox from "@common/UI/FlexBox";

const Container = styled(FlexBox)`
  flex-direction: column;
  position: relative;
  gap: 1rem;
`;

const InputArea = styled.div`
  border: 1px solid ${SECONDARY_200};
  border-radius: 0.5rem;
  padding: 0.75rem 0.5rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  cursor: text;
  background-color: ${ACCENT_0};
  position: relative;
  min-height: 3rem;
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
  display: flex;
  align-items: center;

  ${({ isFocused }) =>
    isFocused &&
    css`
      top: -0.5rem;
      transform: translateY(0);
      background-color: ${ACCENT_0};
      font-size: 0.75rem;
      width: fit-content;
    `}
`;

const RequiredStar = styled.span`
  color: red;
  margin-left: 0.25rem;
`;

const SelectedOptions = styled(FlexBox)`
  flex-wrap: wrap;
  gap: 0.25rem;
  display: flex;
  align-items: center;
  flex-grow: 1;
`;

const OptionsList = styled(FlexBox)`
  flex-direction: column;
  position: absolute;
  top: 110%;
  left: 0;
  right: 0;
  background-color: ${ACCENT_200};
  border: 1px solid ${SECONDARY_901};
  border-radius: 0.5rem;
  max-height: 120px;
  overflow-y: auto;
  z-index: 200;
`;

const Option = styled(Support)`
  padding: 0.25rem 1rem;
  cursor: pointer;

  &:hover {
    background-color: ${TAB_COLOR};
  }
`;

const Chip = styled(FlexBox)`
  padding: 0.25rem 0.5rem;
  border-radius: 2.5rem;
  background-color: ${PRIMARY_900};
  color: ${ACCENT_0};
  font-size: 0.625rem;
  font-family: "poppins";
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const SearchInput = styled.input`
  padding: 0.25rem;
  border: none;
  outline: none;
  background: transparent;
  flex-grow: 1;
  min-width: 150px;
`;

const MultiSelect = ({ options, setFormData, formData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputAreaRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        inputAreaRef.current &&
        !inputAreaRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const servicesOptions = options?.filter(
    service =>
      !formData.servicesChoosen.some(
        item => item?.serviceId === service?._id
      ) && service?.serviceName.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleOptionClick = item => {
    const updatedServices = [
      ...formData.servicesChoosen,
      { serviceId: item?._id },
    ];
    setFormData({ ...formData, servicesChoosen: updatedServices });
    setSearchText("");
  };

  const removeSelectedValue = id => {
    const updatedServices = formData?.servicesChoosen?.filter(
      service => service.serviceId !== id
    );
    setFormData({ ...formData, servicesChoosen: updatedServices });
  };

  const handleInputAreaClick = () => {
    setIsOpen(true);
    setIsFocused(true);
    inputAreaRef.current.querySelector("input").focus();
  };

  //fixed
  return (
    <Container ref={inputAreaRef}>
      {!!formData?.servicesChoosen?.length && (
        <SelectedOptions>
          {formData.servicesChoosen.map(selected => {
            const option = options.find(
              option => option?._id === selected.serviceId
            );
            return option ? (
              <Chip
                key={option?._id}
                onClick={() => removeSelectedValue(option?._id)}
              >
                {option?.serviceName}
                <TfiClose color={ACCENT_0} />
              </Chip>
            ) : null;
          })}
        </SelectedOptions>
      )}
      <InputArea onClick={handleInputAreaClick}>
        <SearchInput
          type="text"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          onFocus={() => {
            setIsOpen(true);
            setIsFocused(true);
          }}
          onBlur={() => {
            if (!searchText && !formData.servicesChoosen.length) {
              setIsFocused(false);
            }
          }}
        />
        <Label
          isFocused={
            isFocused || searchText || formData?.servicesChoosen?.length
          }
        >
          Services <RequiredStar>*</RequiredStar>
        </Label>
      </InputArea>
      {isOpen && (
        <OptionsList>
          {servicesOptions.map(option => (
            <Option key={option?._id} onClick={() => handleOptionClick(option)}>
              {option?.serviceName}
            </Option>
          ))}
        </OptionsList>
      )}
    </Container>
  );
};

export default MultiSelect;
