import React, { useState } from "react";
import styled from "styled-components";

import FlexBox from "@common/UI/FlexBox";
import { device } from "@common/UI/Responsive";
import DesktopImages from "@common/ImageContainer/DesktopImages";
import MobileImages from "@common/ImageContainer/MobileImages";
import useIsDesktop from "@hooks/useIsDesktop";
import { OnboardingLayout } from "./OnboardingLayout";
import Footer from "./Footer";

const Wrapper = styled(FlexBox)`
  max-width: 65rem;
  width: 100%;
  flex-direction: column;
  align-items: center;
  margin: auto;
  gap: 0.5rem;
  height: 100vh;
  overflow: hidden;

  @media ${device.laptop} {
    gap: 2.5rem;
  }
`;

const ImagePicker = ({
  pageNum,
  handleNextPage,
  handlePrevPage,
  slideDirection,
  storeData,
  storeId,
}) => {
  const initialData = Array.from({ length: 5 }, (_, index) => ({
    imageUrl: null,
    sort: index,
    isThumbnail: index === 0,
  }));

  const isDesktop = useIsDesktop();

  const [storeImages, setStoreImages] = useState(() => {
    return storeData?.storeImages?.length === 5
      ? storeData?.storeImages
      : initialData;
  });

  const hasLoadingOrNullImageUrl = storeImages?.some(
    item => item.loading === true
  );

  return (
    <>
      <OnboardingLayout
        slideDirection={slideDirection}
        title="Show what your Salon looks like"
        subTitle="Upload clear and nice pictures between 500 Kb to 10 MB to ensure it looks good in your listing. Bad pictures can lead to a delay in verification of your listing."
      >
        <Wrapper>
          {isDesktop ? (
            <DesktopImages
              storeImages={storeImages}
              setStoreImages={setStoreImages}
              storeId={storeId}
            />
          ) : (
            <MobileImages
              storeImages={storeImages}
              setStoreImages={setStoreImages}
              storeId={storeId}
            />
          )}
        </Wrapper>
      </OnboardingLayout>
      <Footer
        handleNext={() => handleNextPage({ storeImages })}
        handleBack={handlePrevPage}
        pageNum={pageNum}
        disableNext={hasLoadingOrNullImageUrl}
        nextCtaLabel="Next"
      />
    </>
  );
};

export default ImagePicker;