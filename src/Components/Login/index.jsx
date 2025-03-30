import React, { useState, useEffect } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { TfiClose } from "react-icons/tfi";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import dynamic from "next/dynamic";
import Bugsnag from "@bugsnag/js";
import { client } from "@axiosClient";

import { setUser } from "@redux/slices/auth";
import CustomToastContainer from "@common/CustomToastContainer";
import FlexBox from "@common/UI/FlexBox";
import { Body1 } from "@common/UI/Headings";
import { device } from "@common/UI/Responsive";
import { SECONDARY_200 } from "@common/UI/colors";
import { URL } from "@constants/urls";
import { Case, Default, Switch } from "@common/ConditionalRendering";
import { trackEvent } from "@utils/helper";
import Loader from "@common/Loader";
import Modal from "@common/UI/Modal";
import PhoneNumber from "./PhoneNumber";

const VerifyOtp = dynamic(() => import("./VerifyOtp"), {
  loading: () => <Loader fitContent />,
});

const CreateUser = dynamic(() => import("./CreateUser"), {
  loading: () => <Loader fitContent />,
});

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  position: relative;
  top: 1.5rem;

  @media ${device.laptop} {
    top: 0;
  }
`;

const Cross = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
`;

const BackIcon = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  cursor: pointer;
`;

const Heading = styled(FlexBox)`
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  align-items: center;
  border-bottom: 1px solid ${SECONDARY_200};
  width: 100%;
`;

const Login = ({ setModalOpen }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [userInfo, setUserInfo] = useState({
    name: "",
    emailId: "",
    dob: "",
    gender: "",
    referedBy: "",
    marketingEmails: true, // Default to true
  });

  const dispatch = useDispatch();

  useEffect(() => {
    trackEvent("login_modal_load");
  }, []);

  const handlePhoneNumberChange = e => {
    const inputPhoneNumber = e.target.value;
    const phoneNumber = inputPhoneNumber.slice(0, 10);
    setPhoneNumber(phoneNumber);
  };

  const handleCreateUser = async () => {
    trackEvent("create_user_cta_click");
    try {
      const res = await client.post(
        URL?.createUser,
        { ...userInfo, phoneNumber, userType: 1 },
        { authorization: false }
      );
      if (res?.data?.success) {
        dispatch(setUser(res?.data?.data));
        setModalOpen(false);
      }
    } catch (error) {
      toast.error("Failed to create user.");
      Bugsnag.notify(error);
    }
  };

  const handleFormSubmit = async () => {
    trackEvent("submit_phone_number_cta_click");
    if (!phoneNumber || phoneNumber.length !== 10) return;
    try {
      const res = await client.post(
        URL?.sendOtp,
        { phoneNumber },
        { authorization: false }
      );
      if (res?.data?.success) {
        setCurrentStep(2);
      }
    } catch (error) {
      toast.error("Enter valid credentials");
      Bugsnag.notify(error);
    }
  };

  const maskPhoneNumber = phoneNumber => {
    const maskedNumber = phoneNumber.replace(
      /^(\d{6})(\d{4})$/,
      (_, hidden, visible) => "x".repeat(6) + visible
    );
    return maskedNumber;
  };

  return (
    <Modal S height="fit-content" togglePopup={() => setOpenModal(true)}>
      <Wrapper>
        <CustomToastContainer />
        <Heading>
          {currentStep === 2 && (
            <BackIcon onClick={() => setCurrentStep(1)}>
              <FiChevronLeft size={20} />
            </BackIcon>
          )}
          <Cross onClick={() => setModalOpen(false)}>
            <TfiClose size={15} />
          </Cross>
          <Body1 bold>
            {currentStep === 2 ? "Confirm your number" : "Login or Sign up"}
          </Body1>
        </Heading>
        <Switch>
          <Case condition={currentStep === 3}>
            <CreateUser
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              handleCreateUser={handleCreateUser}
            />
          </Case>
          <Case condition={currentStep === 2}>
            <VerifyOtp
              phoneNumber={phoneNumber}
              setCurrentStep={setCurrentStep}
              maskPhoneNumber={maskPhoneNumber}
              setModalOpen={setModalOpen}
            />
          </Case>
          <Default>
            <PhoneNumber
              phoneNumber={phoneNumber}
              handlePhoneNumberChange={handlePhoneNumberChange}
              handleFormSubmit={handleFormSubmit}
            />
          </Default>
        </Switch>
      </Wrapper>
    </Modal>
  );
};

export default Login;
