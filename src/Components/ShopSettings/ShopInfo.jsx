import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import isEqual from "lodash/isEqual";
import { toast } from "react-toastify";
import styled from "styled-components";
import Bugsnag from "@bugsnag/js";

import { client } from "@axiosClient";
import { URL } from "@constants/urls";
import FlexBox from "@common/UI/FlexBox";
import SectionContainer from "@common/SectionContainer";
import { Button } from "@common/UI/Buttons";
import TextArea from "@common/UI/TextArea";
import { device } from "@common/UI/Responsive";
import { Body1, Support } from "@common/UI/Headings";
import { ACCENT_0, ERROR } from "@common/UI/colors";
import CheckBox from "@common/UI/CheckBox";
import { boxShadowDs2 } from "@common/UI/styles";
import AnimationInput from "@common/UI/AnimationInput";

const Wrapper = styled(FlexBox)`
  width: 100%;
  gap: 1.5rem;
  flex-direction: column;
  border-radius: 0.5rem;
  position: relative;
  @media (max-width: 768px) {
    width: 25rem;
  }
`;

const DetailsAndAddressBox = styled(FlexBox)`
  gap: 1rem;
  flex-direction: column;
  @media ${device.laptop} {
    flex-direction: row;
  }
`;

const Box = styled(FlexBox)`
  flex: 1;
  gap: 1rem;
  flex-wrap: wrap;

  @media ${device.laptop} {
    flex-direction: ${props => (props?.column ? "column" : "row")};
  }
`;

const ButtonContainer = styled(FlexBox)`
  position: fixed;
  bottom: 0;
  right: 0.1rem;
  padding: 1rem 1.5rem;
  width: 100%;
  background-color: ${ACCENT_0};
  justify-content: flex-end;
  ${boxShadowDs2}
`;

const SingleFacilityBox = styled(FlexBox)`
  width: fit-content;
  align-items: center;
  justify-content: space-between;
  gap: 0.25rem;
`;

const TextContainer = styled(FlexBox)`
  flex-direction: column;
  row-gap: 0.1rem;
  border: 1px solid black;
`;
//TODO: for future purpose , do not delete any commented code------------>
// const Container = styled(FlexBox)`
//   width: 100%;
//   justify-content: space-between;
//   row-gap: 1rem;
//   align-items: center;
//   flex-wrap: wrap;
//   padding: 1.5rem;
//   border-radius: 0.75rem;
//   border: 1px solid ${SECONDARY_200};
// `;

// const IconBox = styled(FlexBox)`
//   width: 2rem;
//   height: 2rem;
//   border-radius: 50%;
//   border: 1px solid
//     ${props => (props.count === 0 ? SECONDARY_0 : SECONDARY_200)};
//   align-items: center;
//   justify-content: center;
//   cursor: ${props => (props.count === 0 ? "not-allowed" : "pointer")};
//   font-size: 1.5rem;
// `;

const ShopInfo = () => {
  const [formData, setFormData] = useState({
    storeName: "",
    storeDescription: "",
    storeContactPhoneNumber: "",
    address1: "",
    address2: "",
    city: "",
    postalCode: "",
    storeAmenities: [],
    storeSocials: {},
    // staffCount: 0,
    // totalSeat: 0,
    // customerAtOnce: 0,
  });

  const [initialFormData, setInitialFormData] = useState({});
  const [facility, setFacility] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generatedError, setGeneratedError] = useState(null);

  const storeId = useSelector(state => state.auth.storeId);

  const fetchStoreData = async () => {
    try {
      const response = await client.get(
        `${URL.getStoreDetails}?storeId=${storeId}`
      );
      const {
        storeName,
        storeDescription,
        storeContactPhoneNumber,
        address,
        storeSocials,
        storeAmenities,
        // staffCount,
        // totalSeat,
        // customerAtOnce,
      } = response.data.data;

      setFormData(prevData => ({
        ...prevData,
        storeName,
        storeDescription,
        storeContactPhoneNumber,
        address1: address?.address1,
        address2: address?.address2,
        city: address?.city,
        postalCode: address?.postalCode,
        storeSocials,
        storeAmenities,
        // staffCount,
        // totalSeat,
        // customerAtOnce,
      }));
      setInitialFormData(prevData => ({
        ...prevData,
        storeName,
        storeDescription,
        storeContactPhoneNumber,
        address1: address?.address1,
        address2: address?.address2,
        city: address?.city,
        postalCode: address?.postalCode,
        storeSocials,
        storeAmenities,
        // staffCount,
        // totalSeat,
        // customerAtOnce,
      }));
    } catch (error) {
      console.error("Error fetching store data:", error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchStoreData();
  }, [storeId]);

  useEffect(() => {
    const facilityData = async () => {
      try {
        const res = await client.get(URL.getAllAmenities);
        setFacility(res.data.data);
      } catch (error) {
        toast.error(error.message);
        Bugsnag.notify(error);
      }
    };
    facilityData();
  }, []);

  const handleInput = (e, fieldName) => {
    const { value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleStoreSocial = (e, fieldName) => {
    const { value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      storeSocials: {
        ...prevData?.storeSocials,
        [fieldName]: value,
      },
    }));
  };

  const handleCheckBoxClick = amenityName => {
    const selectedAmenities = new Set(formData?.storeAmenities);

    selectedAmenities.has(amenityName)
      ? selectedAmenities.delete(amenityName)
      : selectedAmenities.add(amenityName);

    setFormData(prevData => ({
      ...prevData,
      storeAmenities: Array.from(selectedAmenities),
    }));
  };

  // const increaseStaffCount = () => {
  //   setFormData(prevData => ({
  //     ...prevData,
  //     staffCount: prevData.staffCount + 1,
  //   }));
  // };

  // const decreaseStaffCount = () => {
  //   if (formData.staffCount > 0) {
  //     setFormData(prevData => ({
  //       ...prevData,
  //       staffCount: prevData.staffCount - 1,
  //     }));
  //   }
  // };

  // const increaseChairCount = () => {
  //   setFormData(prevData => ({
  //     ...prevData,
  //     totalSeat: prevData.totalSeat + 1,
  //   }));
  // };

  // const decreaseChairCount = () => {
  //   if (formData.totalSeat > 0) {
  //     setFormData(prevData => ({
  //       ...prevData,
  //       totalSeat: prevData.totalSeat - 1,
  //     }));
  //   }
  // };

  // const increaseCao = () => {
  //   setFormData(prevData => ({
  //     ...prevData,
  //     customerAtOnce: prevData.customerAtOnce + 1,
  //   }));
  // };

  // const decreaseCao = () => {
  //   if (formData.customerAtOnce > 0) {
  //     setFormData(prevData => ({
  //       ...prevData,
  //       customerAtOnce: prevData.customerAtOnce - 1,
  //     }));
  //   }
  // };

  const updateStoreData = async () => {
    setLoading(true);
    try {
      const res = await client.patch(URL.updateStore, { ...formData, storeId });
      toast.success("Shop updated!");
      const {
        storeName,
        storeDescription,
        storeContactPhoneNumber,
        address,
        storeSocials,
        storeAmenities,
      } = res.data.data;

      setFormData(prevData => ({
        ...prevData,
        storeName,
        storeDescription,
        storeContactPhoneNumber,
        address1: address?.address1,
        address2: address?.address2,
        city: address?.city,
        postalCode: address?.postalCode,
        storeSocials,
        storeAmenities,
      }));
      setInitialFormData(prevData => ({
        ...prevData,
        storeName,
        storeDescription,
        storeContactPhoneNumber,
        address1: address?.address1,
        address2: address?.address2,
        city: address?.city,
        postalCode: address?.postalCode,
        storeSocials,
        storeAmenities,
      }));
    } catch (error) {
      toast.error("Failed to update!");
      Bugsnag.notify(error);
    } finally {
      setLoading(false);
    }
  };

  const dataChanged = !isEqual(initialFormData, formData);

  const handleSubmit = () => {
    const newError = {};

    if (formData?.storeContactPhoneNumber?.length !== 10) {
      newError.storeContactPhoneNumber = "Please Enter a valid number";
      toast.error("please enter a valid number");
    }

    if (formData?.storeDescription?.length > 1000) {
      newError.storeDescription = "Enter upto 1000 characters only";
      toast.error("please enter upto 1000 characters only");
    }

    setGeneratedError(newError);
    const hasErrors = Object.values(newError).some(errorMsg => errorMsg !== "");

    if (!hasErrors && dataChanged) {
      updateStoreData();
    }
  };

  if (!storeId || !initialFormData) return null;

  return (
    <Wrapper column>
      <DetailsAndAddressBox>
        <SectionContainer title="Shop Details">
          <Box column>
            <AnimationInput
              required
              label="Name of your shop"
              value={formData.storeName}
              readOnly
              cursor="not-allowed"
              opacity="0.4"
            />
            <TextContainer>
              <TextArea
                label="Store Description"
                value={formData.storeDescription}
                rows={4}
                onChange={e => handleInput(e, "storeDescription")}
              />
              {generatedError?.storeDescription && (
                <Support color={ERROR}>
                  {generatedError?.storeDescription}
                </Support>
              )}
            </TextContainer>
            <AnimationInput
              required
              label="Shop Contact Number"
              type="number"
              value={formData?.storeContactPhoneNumber}
              onChange={e => handleInput(e, "storeContactPhoneNumber")}
              error={generatedError?.storeContactPhoneNumber}
            />
          </Box>
        </SectionContainer>

        <SectionContainer title="Shop Address">
          <Box column cursor="not-allowed">
            <AnimationInput
              label="Address Line 1"
              required
              value={formData?.address1}
              readOnly
              cursor="not-allowed"
            />
            <AnimationInput
              required
              label="Address Line 2"
              value={formData?.address2}
              readOnly
              cursor="not-allowed"
            />
            <AnimationInput
              required
              label="City"
              value={formData?.city}
              readOnly
              cursor="not-allowed"
            />
            <AnimationInput
              required
              label="Postal Code"
              value={formData?.postalCode}
              type="number"
              readOnly
            />
          </Box>
        </SectionContainer>
      </DetailsAndAddressBox>

      <SectionContainer title="Amenities">
        <Box row>
          {facility.map(amenity => (
            <SingleFacilityBox key={amenity._id}>
              <Body1>{amenity.name}</Body1>
              <CheckBox
                check={formData?.storeAmenities?.includes(amenity?.name)}
                onClick={() => handleCheckBoxClick(amenity?.name)}
                disabled={false}
              />
            </SingleFacilityBox>
          ))}
        </Box>
      </SectionContainer>

      {/* <SectionContainer title="Store Capacity">
            <Box row>
              <Container>
                <FlexBox column rowGap="0.75rem">
                  <Body1 bold>Staff Members</Body1>
                  <Body1>
                    Lorem ipsum dolor sit amet consectetur. Sit ut porta
                    facilisi.
                  </Body1>
                </FlexBox>
                <FlexBox justify="center" align="center" columnGap="1.5rem">
                  <IconBox
                    count={formData.staffCount}
                    onClick={decreaseStaffCount}
                  >
                    -
                  </IconBox>
                  <Body1>{formData.staffCount}</Body1>
                  <IconBox onClick={increaseStaffCount}>+</IconBox>
                </FlexBox>
              </Container>
              <Container>
                <FlexBox column rowGap="0.75rem">
                  <Body1 bold>Chairs</Body1>
                  <Body1>
                    Lorem ipsum dolor sit amet consectetur. Sit ut porta
                    facilisi.
                  </Body1>
                </FlexBox>
                <FlexBox justify="center" align="center" columnGap="1.5rem">
                  <IconBox
                    count={formData.totalSeat}
                    onClick={decreaseChairCount}
                  >
                    -
                  </IconBox>
                  <Body1>{formData.totalSeat}</Body1>
                  <IconBox onClick={increaseChairCount}>+</IconBox>
                </FlexBox>
              </Container>
              <Container>
                <FlexBox column rowGap="0.75rem">
                  <Body1 bold>Customer At Once</Body1>
                  <Body1>
                    Lorem ipsum dolor sit amet consectetur. Sit ut porta
                    facilisi.
                  </Body1>
                </FlexBox>
                <FlexBox justify="center" align="center" columnGap="1.5rem">
                  <IconBox
                    count={formData.customerAtOnce}
                    onClick={decreaseCao}
                  >
                    -
                  </IconBox>
                  <Body1>{formData.customerAtOnce}</Body1>
                  <IconBox onClick={increaseCao}>+</IconBox>
                </FlexBox>
              </Container>
            </Box>
          </SectionContainer> */}

      <SectionContainer title="Socials" margin="0 0 4rem">
        <Box>
          <AnimationInput
            label="Instagram Profile URL"
            value={formData?.storeSocials?.instagram}
            onChange={e => handleStoreSocial(e, "instagram")}
          />
          <AnimationInput
            label="Facebook Page URL"
            value={formData?.storeSocials?.facebook}
            onChange={e => handleStoreSocial(e, "facebook")}
          />
          <AnimationInput
            label="YouTube URL"
            value={formData?.storeSocials?.storeYouTubeLink}
            onChange={e => handleStoreSocial(e, "storeYouTubeLink")}
          />
          <AnimationInput
            label="Website URL"
            value={formData?.storeSocials?.storeWebsite}
            onChange={e => handleStoreSocial(e, "storeWebsite")}
          />
          <AnimationInput
            label="Pinterest URL"
            value={formData?.storeSocials?.pinInterest}
            onChange={e => handleStoreSocial(e, "pinInterest")}
          />
          <AnimationInput
            label="Shop Email"
            value={formData?.storeSocials?.storeContactEmail}
            onChange={e => handleStoreSocial(e, "storeContactEmail")}
          />
        </Box>
      </SectionContainer>

      <ButtonContainer>
        <Button onClick={handleSubmit} disabled={loading || !dataChanged}>
          {loading ? "Updating..." : "Update"}
        </Button>
      </ButtonContainer>
    </Wrapper>
  );
};

export default ShopInfo;
