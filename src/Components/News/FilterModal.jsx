import React from "react";
import styled from "styled-components";

import FlexBox from "@common/UI/FlexBox";
import Input from "@common/UI/InputBox";
import { Small, Medium } from "@Components/common/Paragraph";
import { Button } from "@Components/common/UI/Buttons";
import CheckBox from "@Components/common/UI/CheckBox";

const Hr = styled.hr`
  width: 100%;
  border: 1px solid #ebf0f4;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 0.75rem;
  border-radius: 10px;
  min-width: fit-content;
  text-align: center;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 15px;
  border: none;
  background: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #142c8e;
`;

const ButtonDay = styled(FlexBox)`
  width: 213px;
  height: 54px;
  border-radius: 13.55px;
  padding: 0 5.65px;
  border: 1.13px solid #ecedf0;
  align-items: center;
  justify-content: center;
`;

const FilterSection = ({ title, children, resettable }) => (
  <>
    <FlexBox columnGap="1rem">
      <Medium bold>{title}</Medium>
      {resettable && <Medium>Reset</Medium>}
    </FlexBox>
    {children}
    <Hr />
  </>
);

const DateInput = ({ label, value, onChange }) => (
  <FlexBox column width="100%" rowGap="0.25rem">
    <Medium bold color="#687792">
      {label}
    </Medium>
    <Input type="date" value={value} onChange={onChange} />
  </FlexBox>
);

// const DateQuickOptions = () => (
//   <FlexBox columnGap="1rem">
//     {"Today", "This Week", "Month".map(option => (
//       <ButtonDay key={option}>
//         <Medium>{option}</Medium>
//       </ButtonDay>
//     ))}
//   </FlexBox>
// );

const CheckboxGroup = ({ options, selectedOptions, onChange }) => (
  <FlexBox columnGap="1rem" wrap>
    {options.map(option => (
      <FlexBox key={option} align="center" columnGap="0.25rem">
        <CheckBox
          checked={selectedOptions.includes(option)}
          onChange={() => onChange(option)}
        />
        <Medium color="#687792">{option}</Medium>
      </FlexBox>
    ))}
  </FlexBox>
);

const FilterModal = ({
  setIsModalOpen,
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,
  newsTypeOptions = [],
  selectedNewsTypes = [],
  onNewsTypeChange,
}) => (
  <ModalOverlay onClick={() => setIsModalOpen(false)}>
    <ModalContent onClick={e => e.stopPropagation()}>
      <CloseButton onClick={() => setIsModalOpen(false)}>&times;</CloseButton>
      <FlexBox column rowGap="1rem">
        <Small>Filter by:</Small>
        <FilterSection title="Date Range" resettable>
          <FlexBox columnGap="18px">
            <DateInput
              label="From"
              value={fromDate}
              onChange={onFromDateChange}
            />
            <DateInput label="To" value={toDate} onChange={onToDateChange} />
          </FlexBox>
          {/* <DateQuickOptions /> */}
        </FilterSection>
        <FilterSection title="News Type">
          <CheckboxGroup
            options={newsTypeOptions}
            selectedOptions={selectedNewsTypes}
            onChange={onNewsTypeChange}
          />
        </FilterSection>
        {/* <FilterSection title="Source">
          <CheckboxGroup options={"BBC", "CNN", "Reuters", "Bloomberg"} />
        </FilterSection> */}
        <FlexBox columnGap="18px">
          <Button outline width="100%" onClick={() => setIsModalOpen(false)}>
            Reset
          </Button>
          <Button width="100%" onClick={() => setIsModalOpen(false)}>
            Apply Filter
          </Button>
        </FlexBox>
      </FlexBox>
    </ModalContent>
  </ModalOverlay>
);

export default FilterModal;
