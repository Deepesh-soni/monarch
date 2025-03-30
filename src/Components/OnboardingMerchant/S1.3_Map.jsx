import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { MAP_API_KEY } from "@constants/urls";
import { SlMagnifier } from "react-icons/sl";
import { TbCurrentLocation } from "react-icons/tb";
import { toast } from "react-toastify";
import Bugsnag from "@bugsnag/js";

import Loader from "@common/Loader";
import { ACCENT_0, SECONDARY_200 } from "@common/UI/colors";
import { boxShadowDs1 } from "@common/UI/styles";
import FlexBox from "@common/UI/FlexBox";
import Dropdown from "@common/UI/DropdownOld";
import { device } from "@common/UI/Responsive";
import { Body2 } from "@common/UI/Headings";
import Spinner from "@common/UI/Spinner";
import useIsDesktop from "@hooks/useIsDesktop";
import { OnboardingLayout } from "./OnboardingLayout";
import Footer from "./Footer";
import { trackEvent } from "@utils/helper";

const Wrapper = styled(FlexBox)`
  max-width: 40rem;
`;

const SearchBoxContainer = styled(FlexBox)`
  width: 100%;
  align-items: center;
  border: 1px solid ${SECONDARY_200};
  padding: 0.75rem;
  gap: 0.5rem;
  justify-content: space-between;
  border-radius: 0.5rem;

  .hImwyL {
    font-size: 0.875rem;
    line-height: normal;
  }
`;

const LineSeparator = styled.div`
  height: 100%;
  background-color: ${SECONDARY_200};
  border-right: 1px solid ${SECONDARY_200};
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  font-size: 0.875rem;
  width: inherit;

  @media ${device.laptop} {
    font-size: 1.5rem;
  }
`;

const DetectButton = styled(FlexBox)`
  cursor: pointer;
  align-items: center;
`;

const InsideMap = styled.div`
  border-radius: 1rem;
  width: 100%;
  height: 10.5rem;

  @media ${device.laptop} {
    height: 14rem;
  }
`;

const DropdownContainer = styled(FlexBox)`
  width: 100%;
  background-color: ${ACCENT_0};
  position: absolute;
  right: 0;
  top: 2.5rem;
  border-radius: 1rem;
  overflow: hidden;
  ${boxShadowDs1}
`;

const Span = styled.span`
  color: ${SECONDARY_200};
`;

const DetectIcon = styled(TbCurrentLocation)`
  width: 24px;
  height: 24px;
  color: ${SECONDARY_200};
  flex-shrink: 0;
  @media ${device.laptop} {
    width: 32px;
    height: 32px;
  }
`;

const DropdownOption = styled(FlexBox)`
  padding: 0.3rem;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  background-color: ${ACCENT_0};
`;

const Map = ({
  pageNum,
  handlePrevPage,
  slideDirection,
  storeData,
  handleNextPage,
  commonAnalyticsPayload,
}) => {
  const [address, setAddress] = useState("");
  const [formattedAddress, setFormattedAddress] = useState({
    address1: "",
    address2: "",
    landmark: "",
    city: "",
    state: "",
    lat: "",
    lng: "",
    postalCode: "",
  });
  const [coordinates, setCoordinates] = useState(() => {
    return {
      lat: storeData?.coordinates ? storeData?.coordinates[0] : null,
      lng: storeData?.coordinates ? storeData?.coordinates[1] : null,
    };
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!storeData?.address) return;
    const updateAddressData = () => {
      const { address } = storeData;
      setFormattedAddress(prevData => ({
        ...prevData,
        ...address,
        ...coordinates,
      }));
    };
    updateAddressData();
  }, [storeData]);

  const containerRef = useRef(null);
  const isDesktop = useIsDesktop();

  const handleSelect = useCallback(async value => {
    try {
      setLoading(true);
      const results = await geocodeByAddress(value);
      const latLng = await getLatLng(results[0]);
      setAddress(value);
      setCoordinates(latLng);
      const formattedAddress = formatAddress(results[0]);
      setFormattedAddress(formattedAddress);
    } catch (error) {
      Bugsnag.notify(error);
      handleGeocodingError();
    } finally {
      setLoading(false);
    }
  }, []);

  //TODO: to be checked - DS
  const handleDetectClick = useCallback(() => {
    trackEvent("salon_location_detect_cta_click", {
      ...commonAnalyticsPayload,
      have_coordinates: !!coordinates?.lat && !!coordinates?.lng,
    });

    setLoading(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async function (position) {
          const { latitude, longitude } = position.coords;
          setCoordinates({ lat: latitude, lng: longitude });
          try {
            const results = await geocodeByAddress(`${latitude}, ${longitude}`);
            const formattedAddress = formatAddress(results[0]);
            setAddress(results[0].formatted_address);
            setFormattedAddress(formattedAddress);
          } catch (error) {
            handleGeocodingError();
            Bugsnag.notify(error);
          } finally {
            setLoading(false);
          }
        },
        function (error) {
          handleGeolocationError();
        }
      );
    } else {
      handleGeolocationError();
    }
  }, []);

  const formatAddress = addressObject => {
    const addressArray = addressObject.address_components;
    const formattedAddress = {
      address1: addressArray[1]?.long_name || "",
      address2: "",
      landmark: "",
      city: addressArray[2]?.long_name || "",
      state: addressArray[3]?.long_name || "",
      lat: coordinates.lat || "",
      lng: coordinates.lng || "",
      postalCode: addressArray[addressArray.length - 1]?.long_name || "",
    };
    return formattedAddress;
  };

  const handleGeocodingError = useCallback(() => {
    toast.error("Error fetching location");
    setLoading(false);
  }, []);

  const handleGeolocationError = useCallback(() => {
    toast.error("Geolocation is not supported by this browser.");
    setLoading(false);
  }, []);

  const disableNext = !(coordinates?.lat && coordinates?.lng);

  return (
    <>
      <OnboardingLayout
        slideDirection={slideDirection}
        title="Turn on your Location"
      >
        <LoadScript
          googleMapsApiKey={MAP_API_KEY}
          libraries={["places"]}
          loadingElement={<Loader fitContent />}
        >
          <Wrapper column width="100%" rowGap="1rem">
            <SearchBoxContainer>
              <SlMagnifier color={SECONDARY_200} />
              <PlacesAutocomplete
                value={address}
                onChange={setAddress}
                onSelect={handleSelect}
              >
                {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                  <FlexBox width="100%" position="relative">
                    <SearchInput
                      {...getInputProps({ placeholder: "Type address" })}
                    />
                    {loading && <Spinner width="1.5rem" height="1.5rem" />}
                    <DropdownContainer ref={containerRef}>
                      <Dropdown className="header-actions">
                        {suggestions.map(suggestion => (
                          <DropdownOption
                            key={suggestion?.placeId}
                            {...getSuggestionItemProps(suggestion)}
                          >
                            <Body2>{suggestion.description}</Body2>
                          </DropdownOption>
                        ))}
                      </Dropdown>
                    </DropdownContainer>
                  </FlexBox>
                )}
              </PlacesAutocomplete>
              {!isDesktop && (
                <>
                  <LineSeparator />
                  <DetectButton onClick={handleDetectClick}>
                    <DetectIcon />
                    <Span>Detect</Span>
                  </DetectButton>
                </>
              )}
            </SearchBoxContainer>
            <InsideMap>
              <GoogleMap
                mapContainerStyle={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "0.75rem",
                }}
                center={{
                  lat: coordinates?.lat || 0,
                  lng: coordinates?.lng || 0,
                }}
                zoom={15}
              >
                <Marker
                  position={{
                    lat: coordinates?.lat || 0,
                    lng: coordinates?.lng || 0,
                  }}
                  draggable={true}
                  onDragEnd={e => {
                    const newLat = e.latLng.lat();
                    const newLng = e.latLng.lng();
                    setCoordinates({ lat: newLat, lng: newLng });
                    // Fetch the new address based on the new coordinates
                    // and update the state
                    const fetchAddress = async () => {
                      try {
                        const results = await geocodeByAddress(
                          `${newLat}, ${newLng}`
                        );
                        const formattedAddress = formatAddress(results[0]);
                        setAddress(results[0].formatted_address);
                        setFormattedAddress(formattedAddress);
                      } catch (error) {
                        handleGeocodingError();
                        Bugsnag.notify(error);
                      }
                    };
                    fetchAddress();
                  }}
                />
              </GoogleMap>
            </InsideMap>
          </Wrapper>
        </LoadScript>
      </OnboardingLayout>
      <Footer
        handleNext={() =>
          handleNextPage({
            lat: coordinates?.lat,
            lng: coordinates?.lng,
            address: formattedAddress,
          })
        }
        handleBack={handlePrevPage}
        pageNum={pageNum}
        disableNext={disableNext}
        nextCtaLabel="Next"
      />
    </>
  );
};

export default Map;
