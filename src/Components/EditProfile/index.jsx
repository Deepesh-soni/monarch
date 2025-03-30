import React, { useState, useEffect } from "react";
import isEqual from "lodash/isEqual";
import { toast } from "react-toastify";
import styled from "styled-components";
import Bugsnag from "@bugsnag/js";
import { client } from "@axiosClient";
import { useQueryParam, StringParam } from "use-query-params";

import { URL } from "@constants/urls";
import FlexBox from "@common/UI/FlexBox";
import SectionContainer from "@common/SectionContainer";
import { Button } from "@common/UI/Buttons";
import TextArea from "@common/UI/TextArea";
import { device } from "@common/UI/Responsive";
import { ACCENT_0, ACCENT_400 } from "@common/UI/colors";
import { boxShadowDs2 } from "@common/UI/styles";
import AnimationInput from "@common/UI/AnimationInput";
import { trackEvent } from "@utils/helper";
import UploadImage from "../EditProfile/UploadImage";
import { Support } from "@common/UI/Headings";

const Wrapper = styled(FlexBox)`
  width: 100%;
  gap: 1.5rem;
  flex-direction: column;
  border-radius: 0.5rem;
  position: relative;
`;

const ProfileWrapper = styled(FlexBox)`
  flex: 1;
  gap: 1rem;
  flex-direction: column;
  align-items: center;

  @media ${device.laptop} {
    gap: 5rem;
    flex-direction: row;
    align-items: center;
  }
`;

const Box = styled(FlexBox)`
  width: 100%;
  gap: 1rem;
  flex-wrap: wrap;

  @media ${device.laptop} {
    flex-direction: column;
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

const OwnerInfo = () => {
  const [formData, setFormData] = useState({
    name: "",
    emailId: "",
    phoneNumber: "",
    gender: "",
    designation: "",
    description: "",
    dob: "",
    profileUrl: "",
    storeSocials: {
      facebook: "",
      instagram: "",
      pinterest: "",
      snapchat: "",
      youtube: "",
      twitter: "",
    },
  });
  const [initialFormData, setInitialFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [generatedError, setGeneratedError] = useState(null);

  useEffect(() => {
    const fetchOwnerDetails = async () => {
      try {
        const response = await client.get(URL.ownerDetails);
        const { data } = response.data;

        setFormData(data);
        setInitialFormData(data);
      } catch (error) {
        Bugsnag.notify(error);
        toast.error(error.message);
      }
    };
    fetchOwnerDetails();
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

  const updateOwnerDetails = async () => {
    setLoading(true);
    try {
      const res = await client.patch(URL.ownerEditDetails, { ...formData });
      toast.success("Shop updated!");
      setFormData(res.data.data);
      setInitialFormData(res.data.data);
    } catch (error) {
      toast.error("Failed to update!");
      Bugsnag.notify(error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = () => {
    document.getElementById("fileInput").click();
  };

  const dataChanged = !isEqual(initialFormData, formData);

  const handleSubmit = () => {
    const newError = {};

    if (formData?.phoneNumber?.length !== 10) {
      newError.phoneNumber = "Please Enter a valid number";
    }

    if (formData?.description?.length > 1000) {
      newError.description = "Enter up to 1000 characters only";
    }
    if (formData?.emailId && !/\S+@\S+\.\S+/.test(formData.emailId)) {
      newError.emailId = "Enter a valid email";
    }

    setGeneratedError(newError);
    const hasErrors = Object.values(newError).some(errorMsg => errorMsg !== "");

    if (!hasErrors && dataChanged) {
      updateOwnerDetails();
    }
  };
  const [source] = useQueryParam("source", StringParam);
  const commonAnalyticsPayload = {
    page: "edit_profile",
    source: source || "my-stores",
  };

  return (
    <Wrapper column>
      <SectionContainer title="Owner Details">
        <ProfileWrapper>
          <UploadImage formData={formData} setFormData={setFormData} />
          <Box column>
            <AnimationInput
              required
              label="Full Name"
              value={formData?.name}
              onFocus={() => {
                trackEvent("profile_info_input_click", {
                  ...commonAnalyticsPayload,
                  field_name: "Full Name",
                });
              }}
              onChange={e => handleInput(e, "name")}
            />
            <TextArea
              label="Bio"
              resize="vertical"
              value={formData?.description}
              rows={4}
              onFocus={() => {
                trackEvent("profile_info_input_click", {
                  ...commonAnalyticsPayload,
                  field_name: "Description",
                });
              }}
              onChange={e => handleInput(e, "description")}
            />
            <FlexBox column rowGap="0.25rem">
              <AnimationInput
                required
                readOnly
                label="Phone Number"
                type="number"
                value={formData?.phoneNumber}
                onFocus={() => {
                  trackEvent("profile_info_input_click", {
                    ...commonAnalyticsPayload,
                    field_name: "Phone Number",
                  });
                }}
                onChange={e => handleInput(e, "phoneNumber")}
                error={generatedError?.phoneNumber}
              />
              <Support color={ACCENT_400}>
                * To update phone number, please send an email to
                support@pamprazzi.com
              </Support>
            </FlexBox>
            <AnimationInput
              required
              label="Email"
              type="text"
              value={formData?.emailId}
              onFocus={() => {
                trackEvent("profile_info_input_click", {
                  ...commonAnalyticsPayload,
                  field_name: "Email",
                });
              }}
              onChange={e => handleInput(e, "emailId")}
              error={generatedError?.emailId}
            />
          </Box>
        </ProfileWrapper>
      </SectionContainer>

      <SectionContainer title="Socials" margin="0 0 4rem">
        <Box>
          <AnimationInput
            label="Instagram Profile URL"
            value={formData?.storeSocials?.instagram}
            onFocus={() => {
              trackEvent("profile_social_input_click", {
                ...commonAnalyticsPayload,
                field_name: "Instagram Profile URL",
              });
            }}
            onChange={e => handleStoreSocial(e, "instagram")}
          />
          <AnimationInput
            label="Facebook Page URL"
            value={formData?.storeSocials?.facebook}
            onFocus={() => {
              trackEvent("profile_social_input_click", {
                ...commonAnalyticsPayload,
                field_name: "Facebook Page URL",
              });
            }}
            onChange={e => handleStoreSocial(e, "facebook")}
          />
          <AnimationInput
            label="YouTube URL"
            value={formData?.storeSocials?.youtube}
            onFocus={() => {
              trackEvent("profile_social_input_click", {
                ...commonAnalyticsPayload,
                field_name: "YouTube URL",
              });
            }}
            onChange={e => handleStoreSocial(e, "youtube")}
          />
          <AnimationInput
            label="Pinterest URL"
            value={formData?.storeSocials?.pinterest}
            onFocus={() => {
              trackEvent("profile_social_input_click", {
                ...commonAnalyticsPayload,
                field_name: "Pinterest URL",
              });
            }}
            onChange={e => handleStoreSocial(e, "pinterest")}
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

export default OwnerInfo;
