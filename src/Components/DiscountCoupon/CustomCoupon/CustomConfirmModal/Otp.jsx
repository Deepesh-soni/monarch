import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import Bugsnag from "@bugsnag/js";
import { client } from "@axiosClient";

import FlexBox from "@common/UI/FlexBox";
import { Body1, H1, Body2 } from "@common/UI/Headings";
import { PRIMARY_800 } from "@common/UI/colors";
import OtpInput from "@components/Login/OtpInput";
import { URL } from "@constants/urls";

const Otp = ({ phoneNumber, setOtp, otp, errorMessage }) => {
  const [canResendOTP, setCanResendOTP] = useState(false);
  const [timer, setTimer] = useState(60);

  const handleResendOTP = useCallback(async () => {
    try {
      const res = await client.post(
        URL?.sendOtp,
        { phoneNumber },
        { authorization: false }
      );
      if (res?.data?.success && res?.data?.isUserExists) {
        setTimer(60);
        setCanResendOTP(false);
      }
    } catch (error) {
      toast.error("Try after sometime");
      Bugsnag.notify(error);
    }
  }, [phoneNumber]);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);
    } else {
      setCanResendOTP(true);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const renderResendButton = () => {
    return !canResendOTP ? (
      <Body2>Expires in {timer} seconds</Body2>
    ) : (
      <Body1
        color={PRIMARY_800}
        textDecoration="underline"
        cursor="pointer"
        onClick={handleResendOTP}
      >
        Resend OTP
      </Body1>
    );
  };

  return (
    <FlexBox column rowGap="0.25rem">
      <H1>Verify the coupon details.</H1>
      <OtpInput onOtpSubmit={setOtp} otp={otp} errorMessage={errorMessage} />
      <FlexBox>{renderResendButton()}</FlexBox>
    </FlexBox>
  );
};

export default Otp;
