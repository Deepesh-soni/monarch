import React, { useState, useEffect } from "react";
import styled from "styled-components";

import FlexBox from "@common/UI/FlexBox";
import { SECONDARY_200, ACCENT_800, ERROR } from "@common/UI/colors";
import AnimationInput from "@common/UI/AnimationInput";
import { trackEvent } from "@utils/helper";
import Footer from "./Footer";
import { OnboardingLayout } from "./OnboardingLayout";

const InputSection = styled(FlexBox)`
  flex-direction: column;
  align-items: center;
  margin-inline: auto;
  gap: 1rem;
  width: 100%;
  max-width: 40rem;
`;

const CustomTextArea = styled.textarea`
  width: 100%;
  height: 13.8rem;
  padding: 1rem;
  border: 1px solid ${SECONDARY_200};
  border-radius: 0.5rem;
  font-size: 0.875rem;
  resize: none;
`;

const CharacterCount = styled.span`
  align-self: flex-end;
  font-size: 0.875rem;
  color: ${({ exceeded }) => (exceeded ? ERROR : ACCENT_800)};
`;

const maxDescriptionLength = 1000;

const StoreName = ({
  pageNum,
  handleNextPage,
  handlePrevPage,
  storeData,
  slideDirection,
  commonAnalyticsPayload,
}) => {
  const [storeName, setStoreName] = useState(storeData?.storeName || "");
  const [storeDescription, setStoreDescription] = useState(
    storeData?.storeDescription || ""
  );

  useEffect(() => {
    setStoreName(storeData?.storeName);
    setStoreDescription(storeData?.storeDescription);
  }, [storeData?.storeName, storeData?.storeDescription]);

  const handleDescriptionChange = event => {
    const description = event.target.value.slice(0, maxDescriptionLength);
    setStoreDescription(description);
  };

  const disableNext = !storeName;

  return (
    <>
      <OnboardingLayout
        slideDirection={slideDirection}
        title="Let's start with the basics."
        subTitle="Set the stage for your salon with a short, engaging intro!"
      >
        <InputSection>
          <AnimationInput
            type="text"
            label="Name of your store"
            value={storeName}
            onFocus={() =>
              trackEvent("salon_name_input_click", commonAnalyticsPayload)
            }
            onChange={e => setStoreName(e.target.value)}
          />
          <FlexBox column width="100%" rowGap="0.5rem">
            <CustomTextArea
              placeholder={`Description (max ${maxDescriptionLength} characters)`}
              value={storeDescription}
              onChange={handleDescriptionChange}
              onFocus={() => {
                trackEvent("salon_desc_input_click", commonAnalyticsPayload);
              }}
              onBlur={() => {
                trackEvent("salon_desc_type_end", {
                  ...commonAnalyticsPayload,
                  char_count: storeDescription?.length,
                });
              }}
            />
            <CharacterCount
              exceeded={storeDescription?.length > maxDescriptionLength}
            >
              {storeDescription?.length || 0}/{maxDescriptionLength}
              characters
            </CharacterCount>
          </FlexBox>
        </InputSection>
      </OnboardingLayout>
      <Footer
        handleNext={() =>
          handleNextPage({
            storeName,
            storeDescription,
          })
        }
        handleBack={handlePrevPage}
        pageNum={pageNum}
        nextCtaLabel="Next"
        disableNext={disableNext}
      />
    </>
  );
};

export default StoreName;
