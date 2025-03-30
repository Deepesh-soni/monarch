import React, { useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Bugsnag from "@bugsnag/js";
import { client } from "@axiosClient";
import dayjs from "dayjs";

import FlexBox from "@common/UI/FlexBox";
import { SECONDARY_200 } from "@common/UI/colors";
import { Body1 } from "@common/UI/Headings";
import { Case, Default, Switch } from "@common/ConditionalRendering";
import Modal from "@common/UI/Modal";
import { URL } from "@constants/urls";
import CrossIcon from "@common/UI/CrossIcon";
import Verification from "./Verification";
import Congratulations from "./Congratulations";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  padding: 1.5rem;
  border-radius: 1rem;
`;

const BackIcon = styled.div`
  top: 1rem;
  left: 1rem;
  cursor: pointer;
`;

const Heading = styled(FlexBox)`
  justify-content: space-between;
  padding: 1rem;
  align-items: center;
  border-bottom: 1px solid ${SECONDARY_200};
`;

const CustomConfirmModal = ({ setModalOpen, formData, setFormData }) => {
  const [currentStep, setCurrentStep] = useState(1);
  // const [couponData, setCouponData] = useState({});
  const [otp, setOtp] = useState(null);
  const [error, setError] = useState("");

  const storeId = useSelector(state => state.auth.storeId);

  const handleBackClick = () => {
    if (currentStep > 1) {
      setCurrentStep(prevStep => prevStep - 1);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const couponString =
    formData.couponOptions === 1
      ? `${formData.discountAmount} off on cart total`
      : formData.couponOptions === 2
      ? `${formData.discountAmount} off on each product`
      : formData.couponOptions === 3
      ? `${formData.discountAmount} off on cart total`
      : formData.couponOptions === 4
      ? `${formData.discountAmount} off on each service selected`
      : "";

  const discountType =
    formData.couponOptions === 1 || formData.couponOptions === 2 ? 1 : 2;

  const canUsePerUser =
    formData?.noOfTimeCanUsePerUser === "custom"
      ? formData?.noOfTimeCanUsePerUserValue
      : formData?.noOfTimeCanUsePerUser;

  const createCustomCoupons = async () => {
    try {
      const response = await client.post(URL.createCoupon, {
        otp,
        couponCode: formData?.couponCode,
        couponCategoryId: 2,
        storeId,
        startedFrom: dayjs(formData?.startDate).format("YYYY-MM-DD"),
        expiredAt: dayjs(formData?.endDate).format("YYYY-MM-DD"),
        discountType,
        couponString,
        minAmount: formData?.minPurchase,
        // maxAmount: formData?.maxPurchase,
        maxAmount: "5000",
        discountAmount: formData?.discountAmount,
        serviceIds: formData?.serviceIds,
        noOfTimeCanUsePerUser: canUsePerUser,
        gender: formData?.gender,
        customerGroup: formData?.customerGroups,
        lastVisitDays: formData?.lastVisitDays,
        forAgeGroup: formData?.ageGroups,
        tag: formData?.pamprazziTags,
        couponBudget: formData?.couponBudget,
        // "serviceCategoryId": [1]
      });
      if (response?.data?.success) setCurrentStep(3);
      setCurrentStep(2);
      //         getCouponsData();
      // //     fetchFlatCoupons();
      // //     fetchDiscountCoupons();
    } catch (error) {
      setError(error?.response?.data?.message);
      Bugsnag.notify(error);
    }
  };

  // const handleCouponChange = item => {
  //   setCouponData({
  //     ...couponData,
  //     ...item,
  //   });
  // };

  return (
    <Modal M3 height="fit-content" togglePopup={() => setModalOpen(false)}>
      <Heading>
        <div>
          {currentStep !== 1 && currentStep !== 3 && (
            <BackIcon onClick={handleBackClick}>
              <FiChevronLeft size={24} />
            </BackIcon>
          )}
        </div>
        <Body1 bold>
          {currentStep === 1 && "OTP verification"}
          {currentStep === 2 && "Completed"}
          {currentStep === 3 && "Completed"}
        </Body1>
        <CrossIcon onClick={closeModal} />
      </Heading>
      <Wrapper>
        <Switch>
          <Case condition={currentStep === 2}>
            <Congratulations
              couponData={formData}
              setModalOpen={setModalOpen}
              couponString={couponString}
            />
          </Case>
          <Default>
            <Verification
              setCurrentStep={setCurrentStep}
              formData={formData}
              couponString={couponString}
              otp={otp}
              setOtp={setOtp}
              createCustomCoupons={createCustomCoupons}
              error={error}
              setFormData={setFormData}
            />
          </Default>
        </Switch>
      </Wrapper>
    </Modal>
  );
};

export default CustomConfirmModal;
