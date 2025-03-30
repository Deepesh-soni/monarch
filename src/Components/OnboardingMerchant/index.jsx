import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import {
  useQueryParam,
  withDefault,
  NumberParam,
  StringParam,
} from "use-query-params";
import Bugsnag from "@bugsnag/js";
import { useSelector } from "react-redux";

import { URL } from "@constants/urls";
import { client } from "@axiosClient";
import FlexBox from "@common/UI/FlexBox";
import { Button } from "@common/UI/Buttons";
import { ACCENT_0 } from "@common/UI/colors";
import Step3Intro from "./S1_GetStarted";
import Step1Intro from "./S1.1_Details";
import SalonAddress from "./S1.4_SalonAddress";
import StoreName from "./S1.2_StoreName";
import Map from "./S1.3_Map";
import TimeSlot from "./S1.6_TimeSlot";
import TypesOfSalon from "./S1.5_TypesofSalon";
import SelectDiscount from "./S3.2_SelectDiscount";
import Step2Intro from "./S2_SecondSection";
import Service from "./S2.1_Service";
import GetStartedStep3 from "./S3_GetStartedStep3";
import BookingRequest from "./S3.1_BookingRequest";
import Amenities from "./S2.2_Amenities";
import AmenitiesService from "./S2.4_AmenitiesService";
import ReviewPages from "./S3.4_ReviewPages";
import GovernmentIdFile from "./S3.3_GovernmentId";
import ImagePicker from "./S2.3_ImageFlow";
import { trackEvent } from "@utils/helper";

const Wrapper = styled(FlexBox)`
  height: 100vh;
  height: 100dvh; // dvh for safe area for full screen height in mobile browsers
  width: 100vw;
  flex-direction: column;
`;

const Navbar = styled(FlexBox)`
  justify-content: space-between;
  padding: 1rem 1.5rem;
  position: sticky;
  top: 0;
  align-items: flex-end;
  background-color: ${ACCENT_0};
  z-index: 2;
`;

const LogoContainer = styled.div`
  min-width: 7.5rem;
  max-width: 7.5rem;
  width: 7.5rem;
`;

const Logo = styled.img`
  width: 100%;
  cursor: pointer;
`;

const StepContainer = styled(FlexBox)`
  height: 100%;
  flex-direction: column;
`;

const stepComponents = [
  Step3Intro,
  Step1Intro,
  StoreName,
  Map,
  SalonAddress,
  TypesOfSalon,
  TimeSlot,
  Step2Intro,
  Service,
  Amenities,
  ImagePicker,
  AmenitiesService,
  GetStartedStep3,
  BookingRequest,
  SelectDiscount,
  GovernmentIdFile,
  ReviewPages,
];

const stepName = [
  "Get Started",
  "Step-1 Intro",
  "Salon Name and Description",
  "Salon Location and Map",
  "Salon Address",
  "Salon Type",
  "Salon Timing",
  "Step-2 Intro",
  "Salon Service",
  "Salon Statistics",
  "Salon Image",
  "Salon Amenities",
  "Step-3 Intro",
  "Salon Last Min Booking",
  "Salon Coupons",
  "Salon Government Id",
  "Salon ReviewPages",
];

const OnboardingMerchant = () => {
  const [pageNum, setPageNum] = useQueryParam(
    "current",
    withDefault(NumberParam, 1)
  );
  const [storeId, setStoreId] = useQueryParam("id", StringParam);
  const [slideDirection, setSlideDirection] = useState("left");
  const [storeData, setStoreData] = useState(null);

  const router = useRouter();
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    if (!user) router.replace("/");
  }, [user]);

  useEffect(() => {
    trackEvent("onboarding_page_load", {
      page: "onboarding",
      source: source || "my-stores",
      current_page: pageNum,
      step_name: stepName[pageNum - 1],
      store_status: storeData?.store_status,
    });
  }, []);

  useEffect(() => {
    if (!storeId) return;
    getStoreDetails();
  }, [storeId]);

  useEffect(() => {
    const handleBeforeUnload = e => {
      e.preventDefault();
      const message =
        "Are you sure you want to leave? Provided data will be lost.";
      e.returnValue = message;
      return message;
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const commonAnalyticsPayload = {
    page: "onboarding",
    source: source || "my-stores",
    current_page: pageNum,
    step_name: stepName[pageNum - 1],
    store_status: storeData?.store_status,
  };

  const createNewStore = async () => {
    if (storeId) return;
    try {
      const response = await client.post(URL.createNewStore);
      const { _id: createdStoreId } = response?.data;

      setStoreId(createdStoreId, "replaceIn");
      setStoreData(response?.data);
    } catch (error) {
      toast.error("Error creating store");
      Bugsnag.notify(error);
    }
  };

  const updateStoreData = async payload => {
    if (!payload || !storeId) return;
    setStoreData(prev => ({ ...prev, ...payload }));

    try {
      await client.patch(URL.updateStore, { ...payload, storeId });
    } catch (error) {
      toast.error("Failed to add data");
      Bugsnag.notify(error);
    }
  };

  const getStoreDetails = async () => {
    if (!storeId) return;
    try {
      const res = await client.get(`${URL.getStoreDetails}?storeId=${storeId}`);
      setStoreData(res?.data?.data);
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
      Bugsnag.notify(error);
    }
  };

  const handleNextPage = payload => {
    trackEvent("onboarding_next_cta_click", commonAnalyticsPayload);
    setSlideDirection("left");
    if (pageNum === 1) {
      createNewStore();
    } else {
      if (!storeId) return;
      updateStoreData(payload);
    }
    setPageNum(pageNum + 1, "replaceIn");
  };

  const handlePrevPage = () => {
    trackEvent("onboarding_prev_cta_click", commonAnalyticsPayload);
    setSlideDirection("right");
    setPageNum(pageNum - 1, "replaceIn");
  };
  const [source] = useQueryParam("source", StringParam);

  return (
    <Wrapper>
      <Navbar>
        <LogoContainer>
          <Logo src="/assets/pamprazzi-logo-black.webp" alt="pamprazzi Logo" />
        </LogoContainer>
        <Button
          outline
          onClick={() => {
            trackEvent("onboarding_exit_cta_click", commonAnalyticsPayload);
            router.push("/my-stores");
          }}
        >
          Exit
        </Button>
      </Navbar>
      <StepContainer>
        {React.createElement(stepComponents[pageNum - 1], {
          pageNum,
          handleNextPage,
          handlePrevPage,
          storeData,
          setStoreData,
          slideDirection,
          storeId,
          commonAnalyticsPayload,
        })}
      </StepContainer>
    </Wrapper>
  );
};

export default OnboardingMerchant;
