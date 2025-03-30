import React, { useState, useCallback } from "react";
import styled from "styled-components";
import Bugsnag from "@bugsnag/js";

import FlexBox from "@common/UI/FlexBox";
import { Display, Body2 } from "@common/UI/Headings";
import { device } from "@common/UI/Responsive";
import Input from "@common/UI/InputBox";
import { Button } from "@common/UI/Buttons";
import { URL } from "@constants/urls";
import { client } from "@axiosClient";

const Wrapper = styled(FlexBox)`
  gap: 2.5rem;
  width: 100%;
  padding: 0 1rem;
  margin: auto;

  @media ${device.laptop} {
    width: 86.67%;
    max-width: 75rem;
  }
`;

const Header = styled(FlexBox)`
  align-items: center;
  @media ${device.laptop} {
    align-items: start;
  }

  ${Body2} {
    text-align: center;
    @media ${device.laptop} {
      text-align: start;
    }
  }
`;

const LeftSection = styled(FlexBox)`
  flex-direction: column;
  width: 100%;
  gap: 1.5rem;
  @media ${device.laptop} {
    width: 40%;
  }
`;

const RightSection = styled(FlexBox)`
  display: none;
  @media ${device.laptop} {
    display: flex;
    width: 60%;
  }
`;

const Image = styled(FlexBox)`
  width: 46.1875rem;
  height: 48.25rem;
`;

const Btn = styled(Button)`
  width: 100%;
  @media ${device.laptop} {
    width: fit-content;
  }
`;

const FormField = ({ label, placeholder, id, value, onChange, error }) => (
  <FlexBox column>
    <Body2 color="#533A71"> {label}</Body2>
    <Input
      placeholder={placeholder}
      id={id}
      value={value}
      onChange={onChange}
      aria-label={label}
      error={error}
    />
  </FlexBox>
);

const Help = ({ bookDemoRef }) => {
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    phoneNumber: "",
    message: "SCHEDULE A DEMO",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState({});

  const handleInput = useCallback((e, field) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  }, []);

  const validateForm = () => {
    const errors = {};
    return errors;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      await client.post(URL.contactUs, formData);
      toast.success("Message sent successfully.");
      setFormData({
        name: "",
        businessName: "",
        email: "",
        phoneNumber: "",
        message: "",
      });
      setError({});
    } catch (err) {
      Bugsnag.notify(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Wrapper ref={bookDemoRef}>
      <LeftSection>
        <Header column rowGap="0.75rem">
          <Display bold>We’re Here to Help</Display>
          <Body2>
            Reach out for a personalized demo, more information, or just to chat
            with our team. We’re here to help you every step of the way!
          </Body2>
        </Header>
        <FlexBox column rowGap="0.5rem">
          <FormField
            label="Merchant Name"
            placeholder="Enter your Name"
            id="name"
            value={formData.name}
            onChange={e => handleInput(e, "name")}
          />
          <FormField
            label="Business Name"
            placeholder="Enter Business Name"
            id="businessName"
            value={formData.businessName}
            onChange={e => handleInput(e, "businessName")}
            error={error.businessName}
          />
          <FormField
            label="Contact Number"
            placeholder="Enter Contact Number"
            id="phoneNumber"
            value={formData.phoneNumber}
            onChange={e => handleInput(e, "phoneNumber")}
          />
          <FormField
            label="Email"
            placeholder="Email"
            id="email"
            value={formData.email}
            onChange={e => handleInput(e, "email")}
          />
          <Btn onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Schedule a meet"}
          </Btn>
        </FlexBox>
      </LeftSection>
      <RightSection>
        <Image>
          <img src="/assets/landingPage/Dashboard.webp" alt="Dashboard" />
        </Image>
      </RightSection>
    </Wrapper>
  );
};

export default Help;
