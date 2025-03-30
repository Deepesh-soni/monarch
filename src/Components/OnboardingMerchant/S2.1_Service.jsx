import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { client } from "@axiosClient";
import { URL } from "@constants/urls";
import { toast } from "react-toastify";
import { CDN } from "@constants/urls";
import Bugsnag from "@bugsnag/js";

import FlexBox from "@common/UI/FlexBox";
import { Body1 } from "@common/UI/Headings";
import { ACCENT_0, ACCENT_800 } from "@common/UI/colors";
import { device } from "@common/UI/Responsive";
import Loader from "@common/Loader";
import { Case, Default, Switch } from "@common/ConditionalRendering";
import Chip from "@common/UI/Chips";
import { trackEvent } from "@utils/helper";
import { OnboardingLayout } from "./OnboardingLayout";
import Footer from "./Footer";

const Container = styled(FlexBox)`
  max-width: 40rem;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;

  @media ${device.laptop} {
    gap: 1rem;
  }
`;

const Service = ({
  pageNum,
  handleNextPage,
  handlePrevPage,
  slideDirection,
  storeData,
  commonAnalyticsPayload,
}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedServices, setSelectedServices] = useState(
    storeData?.storeServiceList || []
  );

  useEffect(() => {
    if (!storeData?.storeServiceList || !storeData?.storeServiceList?.length)
      return;
    setSelectedServices(storeData?.storeServiceList);
  }, [storeData?.storeServiceList]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await client.get(URL.getAllCategory);
        setCategories(res.data);
      } catch (error) {
        Bugsnag.notify(error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const toggleSelect = id => {
    const isSelected = selectedServices?.includes(id);

    trackEvent("salon_service_chip_click", {
      ...commonAnalyticsPayload,
      chip_label: selectedServices,
      chip_value: !isSelected,
    });

    setSelectedServices(prevSelected => {
      const updatedSelected = new Set([...prevSelected]);
      updatedSelected.has(id)
        ? updatedSelected.delete(id)
        : updatedSelected.add(id);
      return [...updatedSelected];
    });
  };

  const handleNext = useCallback(() => {
    handleNextPage({ storeServiceList: selectedServices });
  }, [handleNextPage, selectedServices]);

  const disableNext = selectedServices?.length === 0;

  return (
    <>
      <OnboardingLayout
        slideDirection={slideDirection}
        title="Select the services you provide"
      >
        <Container>
          <Switch>
            <Case condition={loading}>
              {/* added fixed height to make it in center */}
              <FlexBox align="center" justify="center" height="28rem">
                <Loader fitContent />
              </FlexBox>
            </Case>
            <Default>
              {categories?.map(service => (
                <Chip
                  fitContent
                  key={service?._id}
                  selected={selectedServices?.includes(service?._id)}
                  onClick={() => toggleSelect(service?._id)}
                >
                  <FlexBox columnGap="0.5rem" padding="0.25rem 0.5rem">
                    <img
                      src={
                        selectedServices?.includes(service?._id)
                          ? `${CDN}/categories/light-icons/${service?.lightIcon}`
                          : `${CDN}/categories/dark-icons/${service?.darkIcon}`
                      }
                      width="24"
                      height="24"
                    />
                    <Body1
                      color={
                        selectedServices?.includes(service?._id)
                          ? ACCENT_0
                          : ACCENT_800
                      }
                    >
                      {service?.title}
                    </Body1>
                  </FlexBox>
                </Chip>
              ))}
            </Default>
          </Switch>
        </Container>
      </OnboardingLayout>
      <Footer
        handleNext={handleNext}
        handleBack={handlePrevPage}
        pageNum={pageNum}
        nextCtaLabel="Next"
        disableNext={disableNext}
      />
    </>
  );
};

export default Service;
