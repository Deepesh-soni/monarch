import React, { useState } from "react";
import styled from "styled-components";
import { SlSymbolMale, SlSymbleFemale } from "react-icons/sl";
import { IoMaleFemale } from "react-icons/io5";

import FlexBox from "@common/UI/FlexBox";
import Chip from "@common/UI/Chips";
import { H3 } from "@common/UI/Headings";
import { ACCENT_0, ACCENT_800 } from "@common/UI/colors";
import { device } from "@common/UI/Responsive";
import { trackEvent } from "@utils/helper";
import { OnboardingLayout } from "./OnboardingLayout";
import Footer from "./Footer";

const salonTypes = [
  {
    id: "male",
    label: "Male",
    icon: SlSymbolMale,
  },
  {
    id: "female",
    label: "Female",
    icon: SlSymbleFemale,
  },
  {
    id: "unisex",
    label: "Unisex",
    icon: IoMaleFemale,
  },
];

const onboardingLayout = {
  title: "What type of Salon do you own?",
  subTitle: " Select the type that best describes your establishment!",
};

const Wrapper = styled(FlexBox)`
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  @media ${device.laptop} {
    gap: 2rem;
  }
`;

const TypesOfSalon = ({
  pageNum,
  handleNextPage,
  handlePrevPage,
  slideDirection,
  storeData,
  commonAnalyticsPayload,
}) => {
  const [selectedOption, setSelectedOption] = useState(storeData?.gender);

  const handleOptionSelect = option => {
    trackEvent("salon_type_chip_click", {
      ...commonAnalyticsPayload,
      chip_label: option,
      chip_value: selectedOption === option,
    });
    setSelectedOption(prevSelectedOption =>
      prevSelectedOption === option ? null : option
    );
  };

  const disableNext = !selectedOption;

  return (
    <>
      <OnboardingLayout
        slideDirection={slideDirection}
        title={onboardingLayout.title}
        subTitle={onboardingLayout.subTitle}
      >
        <Wrapper>
          {salonTypes.map(salonType => {
            const Icon = salonType?.icon;
            const isSelected = selectedOption === salonType?.id;
            const color = isSelected ? ACCENT_0 : ACCENT_800;

            return (
              <Chip
                fitContent
                key={salonType?.id}
                selected={isSelected}
                onClick={() => handleOptionSelect(salonType?.id)}
              >
                <FlexBox columnGap="1rem" padding="0.5rem 1rem" align="center">
                  <Icon color={color} size={20} />
                  <H3 color={color}>{salonType?.label}</H3>
                </FlexBox>
              </Chip>
            );
          })}
        </Wrapper>
      </OnboardingLayout>
      <Footer
        handleNext={() => handleNextPage({ gender: selectedOption })}
        handleBack={handlePrevPage}
        pageNum={pageNum}
        nextCtaLabel="Next"
        disableNext={disableNext}
      />
    </>
  );
};

export default TypesOfSalon;
