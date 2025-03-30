import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import _isEqual from "lodash/isEqual";
import Bugsnag from "@bugsnag/js";

import { client } from "@axiosClient";
import { URL } from "@constants/urls";
import SectionContainer from "@common/SectionContainer";
import FlexBox from "@common/UI/FlexBox";
import { device } from "@common/UI/Responsive";
import DesktopImages from "@common/ImageContainer/DesktopImages";
import MobileImages from "@common/ImageContainer/MobileImages";
import useIsDesktop from "@hooks/useIsDesktop";

const Wrapper = styled(FlexBox)`
  width: 100%;
  max-width: 25rem;
  flex-direction: column;
  align-items: center;
  margin: auto;
  gap: 0.5rem;

  @media ${device.laptop} {
    gap: 2.5rem;
    max-width: 65rem;
  }
`;

const fillMissingImages = images => {
  const initialData = Array.from({ length: 5 }, (_, index) => ({
    imageUrl: null,
    sort: index,
    isThumbnail: index === 0,
  }));
  return images.concat(initialData.slice(images.length, 5));
};

const Images = () => {
  const isDesktop = useIsDesktop();
  const storeId = useSelector(state => state.auth.storeId);

  const [storeImages, setStoreImages] = useState(() => fillMissingImages([]));
  const [initialApiData, setInitialApiData] = useState([]);
  const [updating, setUpdating] = useState(false);

  const fetchStoreData = async () => {
    try {
      const { data } = await client.get(
        `${URL.getStoreDetails}?storeId=${storeId}`
      );
      const fetchedImages = data?.data?.storeImages || [];
      const filledImages = fillMissingImages(fetchedImages);
      setStoreImages(filledImages);
      setInitialApiData(filledImages);
    } catch (error) {
      toast.error("Error fetching store data. Please try again later.");
    }
  };

  useEffect(() => {
    if (storeId) {
      fetchStoreData();
    }
  }, [storeId]);

  const hasLoadingImage = storeImages.some(item => item.loading === true);

  const updateStoreImagesData = async () => {
    if (!storeId) return;
    setUpdating(true);
    try {
      await client.patch(URL.updateStore, { storeImages, storeId });
      toast.success("Images updated successfully.");
    } catch (error) {
      toast.error("Failed to update");
      Bugsnag.notify(error);
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    if (!hasLoadingImage && storeImages.some(img => img.imageUrl)) {
      updateStoreImagesData();
    }
  }, [storeImages, hasLoadingImage]);

  return (
    <SectionContainer title="Salon Images">
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
    </SectionContainer>
  );
};

export default Images;
