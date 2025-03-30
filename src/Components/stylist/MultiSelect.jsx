import { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import { TfiClose } from "react-icons/tfi";

import {
  TAB_COLOR,
  PRIMARY_900,
  ACCENT_0,
  SECONDARY_901,
  SECONDARY_200,
  WHITE,
} from "@common/UI/colors";

const Container = styled.div`
  position: relative;
`;

const InputArea = styled.div`
  border: 1px solid ${SECONDARY_200};
  border-radius: 0.5rem;
  padding: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  cursor: text;
  background-color: ${ACCENT_0};
  position: relative;
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
      padding: 0 0.25rem;
    `}
`;

const SelectedOptionsBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  cursor: text;
  background-color: ${ACCENT_0};
  padding: 0.25rem 0.5rem;
  max-height: 6rem;
  overflow: auto;
`;

const OptionsList = styled.div`
  position: absolute;
  top: 105%;
  left: 0;
  right: 0;
  background-color: ${ACCENT_0};
  border: 1px solid ${SECONDARY_901};
  border-radius: 0.5rem;
  padding: 0.5rem 0;
  max-height: 120px;
  overflow-y: auto;
  z-index: 200;
`;

const Option = styled.div`
  padding: 0.25rem 1rem;
  cursor: pointer;

  &:hover {
    background-color: ${TAB_COLOR};
  }
`;

const Chip = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 2.5rem;
  background-color: ${PRIMARY_900};
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  color: ${ACCENT_0};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 0.8rem;
  margin-left: 0.25rem;
  cursor: pointer;
  color: ${ACCENT_0};
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: none;
  outline: none;

  &:placeholder-shown {
    font-size: 1rem;
    color: ${SECONDARY_200};
  }
`;

const MultiSelect = ({ options, setFormData, formData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputAreaRef = useRef(null);

  const handleClickOutside = event => {
    if (inputAreaRef.current && !inputAreaRef.current.contains(event.target)) {
      setIsOpen(false);
      setIsFocused(false);
    }
  };

  const servicesOptions = options?.filter(
    service =>
      !formData.expertise?.includes(service.key) &&
      service?.value.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleOptionClick = id => {
    setFormData(prev => ({
      ...prev,
      expertise: [...prev?.expertise, id],
    }));
    setIsOpen(false);
    setSearchText("");
  };

  const removeSelectedValue = id => {
    const updatedExpertise = formData?.expertise?.filter(val => val !== id);
    setFormData({
      ...formData,
      expertise: [...updatedExpertise],
    });
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Container ref={inputAreaRef}>
      <InputArea>
        <SelectedOptionsBox>
          {options?.map(option => {
            if (!formData?.expertise?.includes(option.key)) return null;
            return (
              <Chip
                key={option.key}
                onClick={() => removeSelectedValue(option.key)}
              >
                {option.value}
                <CloseButton>
                  <TfiClose />
                </CloseButton>
              </Chip>
            );
          })}
        </SelectedOptionsBox>
        <SearchInput
          type="text"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          onFocus={() => {
            setIsOpen(true);
            setIsFocused(true);
          }}
          onBlur={() => {
            if (searchText === "" && formData?.expertise?.length === 0) {
              setIsFocused(false);
            }
          }}
        />
        <Label
          isFocused={
            isFocused || searchText !== "" || formData?.expertise?.length > 0
          }
        >
          Expertise
        </Label>
      </InputArea>
      {isOpen && (
        <OptionsList>
          {servicesOptions?.map(option => (
            <Option
              key={option.key}
              onClick={() => handleOptionClick(option?.key)}
            >
              {option.value}
            </Option>
          ))}
        </OptionsList>
      )}
    </Container>
  );
};

export default MultiSelect;
