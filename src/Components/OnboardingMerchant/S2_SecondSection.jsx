import React from "react";
import StepIntroLayout from "./StepIntroLayout";

const Step2Intro = ({
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
      step: "Step 2",
      title: "What do you offer?",
      description:
        "Show off your salon's offerings! Highlight the services and amenities that make your salon stand out.",
      imageUrl: "/assets/Onboarding/step-2.webp",
    }}
  />
);

export default Step2Intro;
