import React from "react";
import StepIntroLayout from "./StepIntroLayout";

const Step1Intro = ({
  pageNum,
  handleNextPage,
  handlePrevPage,
  slideDirection,
}) => (
  <StepIntroLayout
    handleNextPage={handleNextPage}
    handlePrevPage={handlePrevPage}
    slideDirection={slideDirection}
    pageNum={pageNum}
    stepInfo={{
      step: "Step 1",
      title: "Details about your salon",
      description:
        " Your salon, your story! Share a brief overview of your services and style.",
      imageUrl: "/assets/Onboarding/step-1.webp",
    }}
  />
);

export default Step1Intro;
