import React, { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useQueryParam, StringParam } from "use-query-params";

import FlexBox from "@common/UI/FlexBox";
import CheckBox from "@common/UI/CheckBox";
import { trackEvent } from "@utils/helper";
import SlideContainer from "@common/SlideContainer";
import { Display, H3 } from "@common/UI/Headings";
import { device } from "@common/UI/Responsive";
import Footer from "./Footer";
import Card from "./Card";

const DesktopWrapper = styled.div`
  display: none;
  @media ${device.laptop} {
    display: flex;
    width: 86.67%;
    height: calc(100% - 4.8519rem);
    max-width: 75rem;
    margin: 0 auto;
    align-items: center;
  }
`;

const MobileWrapper = styled(FlexBox)`
  width: 100%;
  height: calc(100% - 4.8519rem);
  flex-direction: column;
  padding: 1.5rem;
  overflow: auto;
  gap: 1.5rem;

  @media ${device.laptop} {
    display: none;
  }
`;

const LeftSide = styled(FlexBox)`
  flex: 1;
  flex-direction: column;
  gap: 5rem;
`;

const RightSide = styled(FlexBox)`
  flex: 1;
  justify-content: end;
`;

const SelectWrapper = styled(FlexBox)`
  align-self: baseline;
  gap: 0.5rem;

  span {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const ReviewPages = ({
  pageNum,
  handlePrevPage,
  slideDirection,
  storeData,
  commonAnalyticsPayload,
}) => {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  const [storeId] = useQueryParam("id", StringParam);
  const [source] = useQueryParam("source", StringParam);

  const handleNext = () => {
    router.replace(
      `/onboarding-merchant/welcome-page?id=${storeId}&source=${source || null}`
    );
  };

  const toggleCheckbox = () => {
    trackEvent("salon_review_checkbox_click", {
      ...commonAnalyticsPayload,
      checkbox_value: checked,
    });
    setChecked(prev => !prev);
  };

  const handleOpenTnC = () => {
    trackEvent("terms_and_conditions_click", commonAnalyticsPayload);
    window.open("/terms-and-conditions", "_blank");
  };

  const handleOpenPP = () => {
    trackEvent("privacy_policy_click", commonAnalyticsPayload);
    window.open("/privacy-policy", "_blank");
  };

  const disableNext = !checked;

  return (
    <>
      <SlideContainer slideDirection={slideDirection}>
        <DesktopWrapper>
          <LeftSide>
            <FlexBox column rowGap="1rem">
              <Display bold>Review Profiles</Display>
              <H3>
                Take one last look at your salon&apos;s profile before it goes
                live.
                <br />
                Make sure all the information is correct and appealing!
              </H3>
            </FlexBox>
            <SelectWrapper>
              <CheckBox check={checked} onClick={toggleCheckbox} />
              <H3>
                I hereby declare that all the information provided by me are
                correct and I have read{" "}
                <span onClick={handleOpenTnC}>terms & conditions</span> as well
                as the <span onClick={handleOpenPP}>privacy policy</span> of
                pamprazzi.
              </H3>
            </SelectWrapper>
          </LeftSide>
          <RightSide>
            <Card data={storeData} />
          </RightSide>
        </DesktopWrapper>
        <MobileWrapper>
          <FlexBox column rowGap="1rem">
            <Display bold>Review Profiles</Display>
            <H3>
              Take one last look at your salon&apos;s profile before it goes
              live. Make sure all the information is correct and appealing!
            </H3>
          </FlexBox>
          <Card data={storeData} />
          <SelectWrapper>
            <CheckBox check={checked} onClick={toggleCheckbox} />
            <H3>
              I hereby declare that all the information provided by me are
              correct and I have read{" "}
              <span onClick={handleOpenTnC}>terms & conditions</span> as well as
              the <span onClick={handleOpenPP}>privacy policy</span> of
              pamprazzi.
            </H3>
          </SelectWrapper>
        </MobileWrapper>
      </SlideContainer>
      <Footer
        handleNext={handleNext}
        handleBack={handlePrevPage}
        pageNum={pageNum}
        nextCtaLabel="Next"
        disableNext={disableNext}
        storeData={storeData}
      />
    </>
  );
};

export default ReviewPages;
