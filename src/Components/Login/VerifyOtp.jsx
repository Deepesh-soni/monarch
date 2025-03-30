import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SlPencil } from "react-icons/sl";
import { client } from "@axiosClient";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Bugsnag from "@bugsnag/js";

import FlexBox from "@common/UI/FlexBox";
import { Body1, Body2 } from "@common/UI/Headings";
import { device } from "@common/UI/Responsive";
import OtpInput from "./OtpInput";
import { Button } from "@common/UI/Buttons";
import { ERROR, PRIMARY_900 } from "@common/UI/colors";
import { trackEvent } from "@utils/helper";
import { URL } from "@constants/urls";
import { setUser } from "@redux/slices/auth";

const NumberEditIcon = styled(FlexBox)`
  flex-direction: column;
  display: inline;
  @media ${device.laptop} {
    flex-direction: row;
    align-items: center;
    display: flex;
    gap: 0.5rem;
  }
`;

const Container = styled(FlexBox)`
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  row-gap: 1rem;
`;

const VerifyOtp = ({
  maskPhoneNumber,
  phoneNumber,
  setCurrentStep,
  setModalOpen,
}) => {
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [timer, setTimer] = useState(60);
  const [canResendOTP, setCanResendOTP] = useState(false);
  const [validatingOtp, setValidatingOtp] = useState(false);

  const dispatch = useDispatch();

  const handleOtpSubmit = async () => {
    trackEvent("submit_otp_cta_click");
    if (!otp) return;
    try {
      setValidatingOtp(true);
      const res = await client.post(
        URL?.submitOtp,
        { otp, phoneNumber },
        { authorization: false }
      );
      if (res?.data?.success) {
        if (res?.data?.data?.found) {
          dispatch(setUser(res?.data?.data?.data));

          // set store id for non owner roles
          // on setting store Id it directly redirects to dashboard
          if (res?.data?.data?.data?.userType !== 1) {
            dispatch(setUser(res?.data?.data?.data));
          }

          setModalOpen(false);
        } else {
          setCurrentStep(3);
        }
      } else {
        console.log(res?.data?.message);
        setErrorMessage(res?.data?.message);
      }
    } catch (error) {
      toast.error("Wrong OTP");
      Bugsnag.notify(error);
    } finally {
      setValidatingOtp(false);
    }
  };

  const renderResendButton = () => {
    if (!canResendOTP) {
      return <Body2>Expires in {timer} seconds</Body2>;
    } else {
      return (
        <Body1
          color={PRIMARY_900}
          textDecoration="underline"
          cursor="pointer"
          onClick={handleResendOTP}
        >
          Resend OTP
        </Body1>
      );
    }
  };

  const handleResendOTP = async () => {
    trackEvent("resend_otp_cta_click");
    try {
      const res = await client.post(
        URL?.sendOtp,
        { phoneNumber },
        { authorization: false }
      );
      setErrorMessage("");
      if (res?.data?.success && res?.data?.isUserExists) {
        setTimer(60);
        setCanResendOTP(false);
      }
    } catch (error) {
      toast.error("Try after sometime");
      Bugsnag.notify(error);
    }
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
    <Container>
      <NumberEditIcon>
        <Body1 bold>
          Enter the code We&apos;ve sent via SMS to{" "}
          {maskPhoneNumber(phoneNumber)}
        </Body1>
        <SlPencil
          size="1rem"
          style={{ cursor: "pointer" }}
          onClick={() => setCurrentStep(1)}
        />
      </NumberEditIcon>
      <OtpInput
        length={4}
        onOtpSubmit={setOtp}
        otp={otp}
        errorMessage={errorMessage}
      />
      <Button
        width="100%"
        onClick={handleOtpSubmit}
        disabled={!otp || validatingOtp}
      >
        {validatingOtp ? "processing..." : "Continue"}
      </Button>
      <FlexBox>{renderResendButton()}</FlexBox>
    </Container>
  );
};

export default VerifyOtp;
