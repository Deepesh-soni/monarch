import React, { useState, useEffect } from "react";
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
import SelectTime from "./SelectTime";
import Verification from "./Verification";
import Congratulations from "./Congratulations";
import CrossIcon from "@common/UI/CrossIcon";

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

const CuratedCouponModal = ({
  setModalOpen,
  item,
  getCouponsData,
  fetchFlatCoupons,
  fetchDiscountCoupons,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [couponData, setCouponData] = useState({});
  const [otp, setOtp] = useState(null);
  const [error, setError] = useState("");

  const storeId = useSelector(state => state.auth.storeId);

  const {
    couponCategoryId,
    couponCode,
    readyMadeCouponId,
    _id,
    discountType,
    couponString,
    minAmount,
  } = item || {};

  const handleBackClick = () => {
    if (currentStep > 1) {
      setCurrentStep(prevStep => prevStep - 1);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const createCuratedCoupons = async () => {
    try {
      const response = await client.post(URL.createCoupon, {
        couponCode,
        couponCategoryId,
        storeId,
        startedFrom: dayjs(couponData?.startDate).format("YYYY-MM-DD"),
        expiredAt: dayjs(couponData?.endDate).format("YYYY-MM-DD"),
        isReadyMadeCoupon: true,
        readyMadeCouponId: readyMadeCouponId || _id,
        otp,
      });
      if (response?.data?.success) setCurrentStep(3);
      getCouponsData();
      fetchFlatCoupons();
      fetchDiscountCoupons();
    } catch (error) {
      setError(error?.response?.data?.message);
      Bugsnag.notify(error);
    }
  };

  const handleCouponChange = item => {
    setCouponData({
      ...couponData,
      ...item,
    });
  };

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
          {currentStep === 1 && "Select date and time"}
          {currentStep === 2 && "OTP verification"}
          {currentStep === 3 && "Completed"}
          {currentStep === 4 && "Completed"}
        </Body1>
        <CrossIcon onClick={closeModal} />
      </Heading>
      <Wrapper>
        <Switch>
          <Case condition={currentStep === 2}>
            <Verification
              setCurrentStep={setCurrentStep}
              couponData={couponData}
              discountType={discountType}
              couponString={couponString}
              otp={otp}
              setOtp={setOtp}
              createCuratedCoupons={createCuratedCoupons}
              error={error}
            />
          </Case>
          <Case condition={currentStep === 3}>
            <Congratulations
              couponData={couponData}
              setModalOpen={setModalOpen}
              couponCode={couponCode}
              couponString={couponString}
            />
          </Case>
          <Default>
            <SelectTime
              setCurrentStep={setCurrentStep}
              couponData={couponData}
              handleCouponChange={handleCouponChange}
              discountType={discountType}
              couponString={couponString}
              couponCode={couponCode}
              minAmount={minAmount}
            />
          </Default>
        </Switch>
      </Wrapper>
    </Modal>
  );
};

export default CuratedCouponModal;
