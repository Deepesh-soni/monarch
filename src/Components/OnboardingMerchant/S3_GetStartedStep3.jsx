import React from "react";
import StepIntroLayout from "./StepIntroLayout";

const Step3Intro = ({
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
      step: "Step 3",
      title: "Finish and go live!",
      description:
        "You are nearly there! Let's wrap things up quickly so you can get started and expand your business with us!",
      imageUrl: "/assets/Onboarding/step-3.webp",
    }}
  />
);

export default Step3Intro;
