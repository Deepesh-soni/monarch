import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { trackEvent } from "@utils/helper";
import FlexBox from "@common/UI/FlexBox";
import AnimationInput from "@common/UI/AnimationInput";
import Footer from "./Footer";
import { OnboardingLayout } from "./OnboardingLayout";

const AddressBox = styled(FlexBox)`
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding-bottom: 5rem;
`;

const addressData = [
  { id: "address1", placeholder: "Flat, house, shop no." },
  { id: "address2", placeholder: "Street address" },
  { id: "landmark", placeholder: "Landmark" },
  { id: "city", placeholder: "City" },
  { id: "state", placeholder: "State" },
  { id: "postalCode", placeholder: "PIN code" },
];

const SalonAddress = ({
  pageNum,
  handleNextPage,
  handlePrevPage,
  slideDirection,
  storeData,
  commonAnalyticsPayload,
}) => {
  const [location, setLocation] = useState({
    lat: storeData?.lat,
    lng: storeData?.lng,
  });

  const [addressFieldsData, setAddressFieldsData] = useState({
    address1: "",
    address2: "",
    landmark: "",
    city: "",
    state: "",
    postalCode: "",
  });

  useEffect(() => {
    // Fetch geolocation only once when component mounts
    const fetchGeoLocation = () => {
      if (navigator?.geolocation && !location?.latitude) {
        navigator.geolocation.getCurrentPosition(function (position) {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    };
    fetchGeoLocation();
  }, []);

  useEffect(() => {
    const { address, lat, lng } = storeData || {};
    if (!address) return;

    trackEvent("salon_address_step_load", {
      ...commonAnalyticsPayload,
      ...address,
      has_coordinates: !!lat && !!lng,
    });

    // Update addressFieldsData when storeData changes
    const updateAddressData = () => {
      setAddressFieldsData(prevData => ({
        ...prevData,
        ...address,
        ...location,
      }));
    };
    updateAddressData();
  }, [storeData]);

  const handleInputChange = (id, value) => {
    let newValue = value;

    if (id === "postalCode") {
      newValue = newValue.replace(/\D/g, "").slice(0, 6); // Remove non-digits and limit to 6 characters
    }

    if (id === "city" || id === "state") {
      newValue = newValue.replace(/[^a-zA-Z\s]/g, ""); // Remove non-alphabetic characters
    }

    setAddressFieldsData(prevData => ({
      ...prevData,
      [id]: newValue,
    }));
  };

  const disableNext = Object.values(addressFieldsData).some(value => !value);

  return (
    <>
      <OnboardingLayout
        slideDirection={slideDirection}
        title="Where can we find you?"
      >
        <AddressBox>
          {addressData.map(({ id, placeholder }) => (
            <AnimationInput
              required
              key={id}
              type="text"
              value={addressFieldsData[id]}
              onFocus={() => {
                trackEvent("salon_address_input_click", {
                  ...commonAnalyticsPayload,
                  fieldName: id,
                  has_value: !!addressFieldsData[id],
                });
              }}
              onChange={e => handleInputChange(id, e.target.value)}
              label={placeholder}
            />
          ))}
        </AddressBox>
      </OnboardingLayout>
      <Footer
        handleNext={() => handleNextPage({ address: addressFieldsData })}
        handleBack={handlePrevPage}
        pageNum={pageNum}
        nextCtaLabel="Next"
        disableNext={disableNext}
      />
    </>
  );
};

export default SalonAddress;
