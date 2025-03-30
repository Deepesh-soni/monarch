import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { client } from "@axiosClient";
import Bugsnag from "@bugsnag/js";


import FlexBox from "@common/UI/FlexBox";
import { Body1, Body2 } from "@common/UI/Headings";
import { PRIMARY_800, ERROR } from "@common/UI/colors";
import OtpInput from "@components/Login/OtpInput";
import { Button } from "@common/UI/Buttons";
import { URL } from "@constants/urls";

const OtpVerify = ({
  phoneNumber,
  handleSubmit,
  loading,
  isUpdate = false,
}) => {
  const [otp, setOtp] = useState("");
  const [isOtpInvalid, setIsOtpInvalid] = useState(false);
  const [canResendOTP, setCanResendOTP] = useState(false);
  const [timer, setTimer] = useState(60);

  const ctaLabel = isUpdate
    ? loading
      ? "Updating..."
      : "Update"
    : loading
    ? "Processing..."
    : "Proceed";

  const handleResendOTP = async () => {
    try {
      const res = await client.post(
        URL?.sendOtp,
        { phoneNumber },
        { authorization: false }
      );
      setOtpInvalid(false);
      if (res?.data?.success && res?.data?.isUserExists) {
        setTimer(60);
        setCanResendOTP(false);
      }
    } catch (error) {
      toast.error("Try after sometime");
      Bugsnag.notify(error);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) return;
    try {
      const res = await client.post(
        URL?.verifyOtp,
        { phoneNumber, otp },
        { authorization: false }
      );
      if (res?.data?.success) {
        handleSubmit();
      } else {
        setIsOtpInvalid(true);
      }
    } catch (error) {
      toast.error("Failed to send OTP. Please try again.");
    }
  };

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

  const maskPhoneNumber = phoneNumber => {
    const maskedNumber = phoneNumber.replace(
      /^(\d{6})(\d{4})$/,
      (_, hidden, visible) => "x".repeat(6) + visible
    );
    return maskedNumber;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    if (timer === 0) {
      clearInterval(interval);
      setCanResendOTP(true);
    }

    return () => clearInterval(interval);
  }, [timer]);

  return (
    <FlexBox column rowGap="0.5rem">
      <Body1 bold>
        Enter the code sent via SMS to {maskPhoneNumber(phoneNumber)}
      </Body1>
      <OtpInput onOtpSubmit={setOtp} isInvalid={isOtpInvalid} />
      {isOtpInvalid && <Body1 color={ERROR}>Invalid OTP</Body1>}
      <Button width="100%" onClick={handleVerifyOtp} disabled={!otp || loading}>
        {ctaLabel}
      </Button>
      <FlexBox>{renderResendButton()}</FlexBox>
    </FlexBox>
  );
};

export default OtpVerify;
