import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { client } from "@axiosClient";
import { URL } from "@constants/urls";
import { toast } from "react-toastify";
import Bugsnag from "@bugsnag/js";

import FlexBox from "@common/UI/FlexBox";
import { H3, H5 } from "@common/UI/Headings";
import { SECONDARY_200 } from "@common/UI/colors";
import CheckBox from "@common/UI/CheckBox";
import Loader from "@common/Loader";
import { Case, Default, Switch } from "@common/ConditionalRendering";
import Footer from "./Footer";
import { OnboardingLayout } from "./OnboardingLayout";
import { trackEvent } from "@utils/helper";

const ListContainer = styled(FlexBox)`
  flex-direction: column;
  padding-bottom: 5rem;
  width: 100%;
  gap: 1rem;
`;

const ListItem = styled(FlexBox)`
  border: 1px solid ${SECONDARY_200};
  padding: 1.5rem;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  border-radius: 0.75rem;
`;

const Coupon = styled(FlexBox)`
  flex-direction: column;
  gap: 0.5rem;
`;

const DiscountCode = styled(FlexBox)`
  align-items: center;
  background-color: #eeeeee;
  padding: 0.25rem 0.5rem;
`;

const SelectDiscount = ({
  pageNum,
  handleNextPage,
  handlePrevPage,
  slideDirection,
  storeData,
  commonAnalyticsPayload,
}) => {
  const [coupons, setCoupons] = useState([]);
  const [selectedCouponIds, setSelectedCouponIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!storeData?.storeCoupons?.length) return;
    setSelectedCouponIds(storeData?.storeCoupons);
  }, [storeData]);

  const handleNext = () => {
    handleNextPage({ storeCoupons: selectedCouponIds });
  };

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await client.get(`${URL.getAllCoupons}`);
        setCoupons(res?.data?.data);
      } catch (error) {
        toast.error(error.message);
        Bugsnag.notify(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  const toggleCoupon = (id, discountType, storeCoupons) => {
    const set = new Set([...selectedCouponIds]);

    trackEvent("salon_coupon_checkbox_click", {
      ...commonAnalyticsPayload,
      coupon_name: id,
      coupon_code: storeCoupons?.discountType,
      checkbox_value: set.has(id),
    });

    set.has(id) ? set.delete(id) : set.add(id);
    setSelectedCouponIds([...set]);
  };

  return (
    <>
      <OnboardingLayout
        slideDirection={slideDirection}
        title="Select Discounts"
        subTitle="Add your exclusive offers to attract more clients and boost your salon's appeal! You can manage this coupons on your dashboard!"
      >
        <Switch>
          <Case condition={loading}>
            {/* added fixed height to make it in center */}
            <FlexBox align="center" justify="center" height="28rem">
              <Loader fitContent />
            </FlexBox>
          </Case>
          <Default>
            <ListContainer>
              {coupons.map(coupon => (
                <ListItem key={coupon._id}>
                  <Coupon column>
                    <FlexBox row columnGap="0.50rem">
                      <H3>{coupon.couponString}</H3>
                      <DiscountCode>
                        <H5>{coupon.couponCode}</H5>
                      </DiscountCode>
                    </FlexBox>
                    <H5>
                      {coupon?.discountType === 2
                        ? `Provide your customers with a ${coupon?.discountAmount}%
                      discount on their total bill for every booking exceeding
                      ₹${coupon?.minAmount}, with discount capped at ₹
                      ${coupon?.maxAmount}`
                        : `Provide your customers with a Flat Rs. ${coupon?.discountAmount}
                      discount on their total bill for every booking exceeding
                      ₹${coupon?.minAmount}`}
                    </H5>
                  </Coupon>
                  <CheckBox
                    check={selectedCouponIds?.includes(coupon._id)}
                    onClick={() => toggleCoupon(coupon._id)}
                  />
                </ListItem>
              ))}
            </ListContainer>
          </Default>
        </Switch>
      </OnboardingLayout>
      <Footer
        handleNext={handleNext}
        handleBack={handlePrevPage}
        pageNum={pageNum}
        nextCtaLabel="Next"
      />
    </>
  );
};

export default SelectDiscount;
