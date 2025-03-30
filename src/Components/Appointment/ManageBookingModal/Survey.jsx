import styled, { css } from "styled-components";

import FlexBox from "@common/UI/FlexBox";
import { H3 } from "@common/UI/Headings";
import { Button } from "@common/UI/Buttons";
import { ACCENT_200, PRIMARY_800, ACCENT_600 } from "@common/UI/colors";
import { Body2 } from "@common/UI/Headings";
import { useState } from "react";
import { boxShadowDs2 } from "@common/UI/styles";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  height: calc(100% - 3.5625rem - 1rem);
  justify-content: space-between;
`;

const Chip = styled(FlexBox)`
  padding: 0.25rem 1rem;
  width: fit-content;
  border-radius: 1.5rem;
  background-color: ${ACCENT_200};
  cursor: pointer;

  ${({ selected }) =>
    selected &&
    css`
      background-color: ${PRIMARY_800};
    `}
`;

const Body = styled(Body2)`
  color: ${ACCENT_600};

  ${({ selected }) =>
    selected &&
    css`
      color: white;
    `};
`;

const OptionContainer = styled(FlexBox)`
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const ButtonContainer = styled(FlexBox)`
  padding: 0 1rem;
  width: 100%;
  ${boxShadowDs2}
`;

const options = [
  "Friend",
  "Instagram",
  "Website",
  "Facebook",
  "Event",
  "Other",
];
const SurveyStep = ({ setUpdatedDataToSend }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleClick = option => {
    setSelectedOption(option);
    setUpdatedDataToSend(prev => ({
      ...prev,
      sourceOfDiscovery: option,
    }));
  };

  const closeManageBookingModals = () => {
    setQueryParams(
      { show_manage_booking_modal: undefined, show_invoice: 1 },
      "replaceIn"
    );
  };

  return (
    <Wrapper>
      <FlexBox rowGap="1rem" column padding="1.5rem">
        <H3>How did you get to know about Pamprazzi?</H3>
        <OptionContainer>
          {options.map((option, index) => (
            <Chip
              key={index}
              selected={selectedOption === option}
              onClick={() => handleClick(option)}
            >
              <Body selected={selectedOption === option}>{option}</Body>
            </Chip>
          ))}
        </OptionContainer>
      </FlexBox>
      <ButtonContainer>
        <Button
          primary
          width="100%"
          background="#808080"
          onClick={() => {
            closeManageBookingModals();
            setUpdatedDataToSend(prev => ({
              ...prev,
              eventType: "final",
            }));
          }}
        >
          Save
        </Button>
      </ButtonContainer>
    </Wrapper>
  );
};

export default SurveyStep;
