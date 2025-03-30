import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FiChevronLeft } from "react-icons/fi";
import styled from "styled-components";
import { CiDiscount1 } from "react-icons/ci";
import { toast } from "react-toastify";

import { H3 as OriginalH3, H5, Body1 } from "@common/UI/Headings";
import {
  SECONDARY_901,
  SECONDARY_GREY,
  SECONDARY_0,
  ERROR,
} from "@common/UI/colors";
import FlexBox from "@common/UI/FlexBox";
import Modal from "@common/UI/Modal";
import { Button as OriginalButton } from "@common/UI/Buttons";
import { URL } from "@constants/urls";
import { client } from "@axiosClient";

const Heading = styled(FlexBox)`
  position: relative;
  justify-content: center;
  padding: 1rem;
  align-items: center;
  border-bottom: 1px solid ${SECONDARY_0};
  width: 100%;
`;

const BackIcon = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  cursor: pointer;
`;

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  row-gap: 1rem;
  padding: 1rem;
`;

const CardContainer = styled.div`
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid ${SECONDARY_901};
  filter: ${({ highlight }) => (highlight ? "grayscale(100%)" : "none")};
`;

const CouponAppliedIcon = styled(CiDiscount1)`
  margin-right: 0.5rem;
  font-size: 1.5rem;
`;

const H3 = styled(OriginalH3)`
  filter: ${({ highlight }) => (highlight ? "grayscale(100%)" : "none")};
`;

const Button = styled(OriginalButton)`
  cursor: ${({ highlight }) => (highlight ? "not-allowed" : "pointer")};
  pointer-events: ${({ highlight }) => (highlight ? "none" : "auto")};
`;

const ErrorMessage = styled(Body1)`
  color: ${ERROR};
  text-align: center;
  margin-bottom: 1rem;
  font-size: 10px;
`;

const Coupons = ({ setOpenCouponModal, setUpdatedDataToSend, data }) => {
  const [couponsData, setCouponsData] = useState([]);
  const storeId = useSelector(state => state.auth.storeId);
  const { servicesChoosen, couponErrorString, totalPayable } = data ?? {};

  const getAllCoupons = async () => {
    try {
      const response = await client.get(`${URL.getActiveCoupons}/${storeId}`);
      setCouponsData(response?.data?.data || []);
    } catch (error) {
      toast.error("Failed to load data");
    }
  };

  useEffect(() => {
    getAllCoupons();
  }, []);

  const handleApplyCoupon = (couponCode, couponId) => {
    setUpdatedDataToSend(prev => ({
      ...prev,
      couponCode,
      couponId,
      servicesChoosen,
      eventType: null,
    }));
    setOpenCouponModal(false);
  };

  const calculateDifference = minAmount => {
    return minAmount - totalPayable;
  };

  return (
    <Modal M1 overflow="hidden" height="95vh">
      <Wrapper>
        <Heading>
          <Body1 bold>Apply Coupons</Body1>
          <BackIcon onClick={() => setOpenCouponModal(prev => !prev)}>
            <FiChevronLeft size={20} />
          </BackIcon>
        </Heading>

        {couponsData.length === 0 ? (
          <Body1 bold textAlign="center">
            No coupons available
          </Body1>
        ) : (
          couponsData?.map((val, index) => {
            const minAmount = val.minAmount;
            const difference = calculateDifference(minAmount);
            return (
              <CardContainer key={index}>
                <FlexBox align="center" justify="space-between">
                  <FlexBox column rowGap="0.25rem">
                    <FlexBox row align="center">
                      <H3
                        bold
                        highlight={
                          couponErrorString ===
                          "Coupon amount is less than minimum amount"
                        }
                      >
                        {val.couponCode}
                      </H3>
                    </FlexBox>
                    <H5 color={SECONDARY_GREY}>{val.couponString}</H5>
                    {difference > 0 && (
                      <ErrorMessage>
                        Add items worth ₹{difference} more to unlock this coupon
                      </ErrorMessage>
                    )}
                  </FlexBox>
                  <Button
                    textCta
                    textDecoration="underline"
                    highlight={
                      couponErrorString ===
                      "Coupon amount is less than minimum amount"
                    }
                    onClick={() => handleApplyCoupon(val.couponCode, val._id)}
                  >
                    APPLY
                  </Button>
                </FlexBox>
              </CardContainer>
            );
          })
        )}
      </Wrapper>
    </Modal>
  );
};

export default Coupons;
