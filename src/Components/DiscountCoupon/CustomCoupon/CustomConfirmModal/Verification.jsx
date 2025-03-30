import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import dayjs from "dayjs";

import { client } from "@axiosClient";
import FlexBox from "@common/UI/FlexBox";
import { Body1, H5, H2, H4 } from "@common/UI/Headings";
import { Button } from "@common/UI/Buttons";
import { SECONDARY_901, ACCENT_600 } from "@common/UI/colors";
import { URL } from "@constants/urls";
import Otp from "./Otp";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  row-gap: 1rem;
  border-radius: 1rem;
  height: 100%;
`;

const CouponDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  position: relative;
  padding-left: 1rem;

  &::before {
    content: "•";
    position: absolute;
    left: 0;
  }
`;

const Hr = styled.hr`
  border-top: 1px solid ${SECONDARY_901};
  width: 100%;
`;

const Verification = ({
  setCurrentStep,
  formData,
  couponString,
  otp,
  setOtp,
  createCustomCoupons,
  error,
  setFormData,
}) => {
  const [otpSent, setOtpSent] = useState(false);
  const user = useSelector(state => state.auth.user);

  const handleSendOtp = async () => {
    if (!user?.phoneNumber || user?.phoneNumber.length !== 10) {
      return toast.error("Invalid phone number. Failed to send OTP.");
    }

    try {
      const res = await client.post(
        URL?.sendOtp,
        { phoneNumber: user?.phoneNumber },
        { authorization: false }
      );
      if (res?.data?.success) {
        setOtpSent(true);
      }
    } catch (error) {
      toast.error("Failed to send OTP. Please try again.");
      Bugsnag.notify(error);
    }
  };

  const handleCreateCoupon = async () => {
    try {
      await createCustomCoupons();
      setCurrentStep(2);
      toast.success("Coupon created successfully!");
    } catch (error) {
      toast.error("Failed to create the coupon. Please try again.");
    }
  };

  return (
    <Wrapper>
      <CouponDetails>
        <FlexBox column>
          <H5 color={ACCENT_600}>Coupon type</H5>
          <Body1>
            {formData?.couponOptions === 1 || formData?.couponOptions === 2
              ? "Flat Rate"
              : "Percentage"}
          </Body1>
        </FlexBox>
        <FlexBox column>
          <H5 color={ACCENT_600}>Coupon Offer</H5>
          <Body1>{couponString}</Body1>
        </FlexBox>
        <FlexBox column>
          <H5 color={ACCENT_600}>Start Time</H5>
          <Body1>
            {dayjs(formData?.startDate).format("DD MMMM, YYYY HH:mm A")}
          </Body1>
        </FlexBox>
        <FlexBox column>
          <H5 color={ACCENT_600}>End Time</H5>
          <Body1>
            {dayjs(formData?.endDate).format("DD MMMM, YYYY HH:mm A")}
          </Body1>
        </FlexBox>
      </CouponDetails>

      <Hr />
      {!otpSent ? (
        <FlexBox column rowGap="0.5rem">
          <H2>Enter the code sent via SMS to your number</H2>
          <FlexBox column rowGap="0.25rem">
            <List>
              <ListItem>
                <H4>
                  Confirm the coupon details you entered before OTP verification
                </H4>
              </ListItem>
              <ListItem>
                <H4>Click Confirm to continue</H4>
              </ListItem>
            </List>
          </FlexBox>
          <H4 color="#4F4F4F">
            The OTP will be sent to your registered number.
          </H4>
        </FlexBox>
      ) : (
        <Otp
          phoneNumber={user?.phoneNumber}
          setOtp={setOtp}
          otp={otp}
          errorMessage={error}
        />
      )}

      <Button
        width="100%"
        backgroundColor={ACCENT_600}
        onClick={!otpSent ? handleSendOtp : handleCreateCoupon}
        disabled={otpSent && !otp}
      >
        {otpSent ? "Submit" : "Send OTP"}
      </Button>
    </Wrapper>
  );
};

export default Verification;
