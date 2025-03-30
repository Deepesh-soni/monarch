import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import Bugsnag from "@bugsnag/js";
import { client } from "@axiosClient";

import { URL } from "@constants/urls";
import FlexBox from "@common/UI/FlexBox";
import { Body1 } from "@common/UI/Headings";
import Loader from "@common/Loader";
import { device } from "@common/UI/Responsive";
import { Case, Default, Switch } from "@common/ConditionalRendering";
import { CDN } from "@constants/urls";
import { OnboardingLayout } from "./OnboardingLayout";
import Footer from "./Footer";
import Chip from "../common/UI/Chips";
import { ACCENT_0, ACCENT_800 } from "@common/UI/colors";
import { trackEvent } from "@utils/helper";

const Container = styled.div`
  margin-bottom: 110px;
`;

const AmenitiesWrapper = styled(FlexBox)`
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const AmenityWrapper = styled(FlexBox)`
  gap: 1rem;
  @media ${device.laptop} {
    gap: 1.5rem;
    padding: 0.5rem 1rem;
  }
`;

const AmenitiesService = ({
  pageNum,
  handleNextPage,
  handlePrevPage,
  slideDirection,
  storeData,
  commonAnalyticsPayload,
}) => {
  const [amenitiesList, setAmenitiesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [storeAmenities, setStoreAmenities] = useState(
    storeData?.storeAmenities || []
  );

  useEffect(() => {
    if (storeData?.storeAmenities && storeData?.storeAmenities?.length)
      setStoreAmenities(storeData?.storeAmenities);
  }, [storeData]);

  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const res = await client.get(`${URL.getAllAmenities}`);
        setAmenitiesList(res?.data?.data);
      } catch (error) {
        toast.error(error.message);
        Bugsnag.notify(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAmenities();
  }, []);

  const toggleSelect = serviceName => {
    const isSelected = storeAmenities?.includes(serviceName);

    trackEvent("salon_amenities_chip_click", {
      ...commonAnalyticsPayload,
      chip_label: storeAmenities,
      chip_value: isSelected,
    });

    setStoreAmenities(prevSelectedServices => {
      if (prevSelectedServices?.includes(serviceName)) {
        return prevSelectedServices?.filter(service => service !== serviceName);
      } else {
        return [...prevSelectedServices, serviceName];
      }
    });
  };

  return (
    <>
      <OnboardingLayout
        slideDirection={slideDirection}
        title="Select the amenities you have"
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
              <AmenitiesWrapper>
                {amenitiesList?.map(amenity => (
                  <Chip
                    width="fit-content"
                    key={amenity?._id}
                    selected={storeAmenities?.includes(amenity?.name)}
                    onClick={() => toggleSelect(amenity?.name)}
                  >
                    <AmenityWrapper>
                      {storeAmenities?.includes(amenity?.name) ? (
                        <img
                          src={`${CDN}/amenities/light-icons/${amenity?.icon?.lightIcon}`}
                          width="24"
                          height="24"
                        />
                      ) : (
                        <img
                          src={`${CDN}/amenities/dark-icons/${amenity?.icon?.darkIcon}`}
                          width="24"
                          height="24"
                        />
                      )}
                      <Body1
                        color={
                          storeAmenities?.includes(amenity?.name)
                            ? ACCENT_0
                            : ACCENT_800
                        }
                      >
                        {amenity?.name}
                      </Body1>
                    </AmenityWrapper>
                  </Chip>
                ))}
              </AmenitiesWrapper>
            </Default>
          </Switch>
        </Container>
      </OnboardingLayout>
      <Footer
        handleNext={() => handleNextPage({ storeAmenities: storeAmenities })}
        handleBack={handlePrevPage}
        pageNum={pageNum}
        nextCtaLabel="Next"
      />
    </>
  );
};

export default AmenitiesService;
