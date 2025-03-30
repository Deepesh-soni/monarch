import React, { useState } from "react";
import styled from "styled-components";
import FlexBox from "@common/UI/FlexBox";
import { Display, Body2, Body1 } from "@common/UI/Headings";
import { device } from "@common/UI/Responsive";
import Input from "@Components/common/UI/InputBox";
import Modal from "@common/UI/Modal";
import CrossIcon from "@common/UI/CrossIcon";
import { Button } from "@Components/common/UI/Buttons";
import Bugsnag from "@bugsnag/js";
import { toast } from "react-toastify";

const Wrapper = styled(FlexBox)`
  padding: 2rem;
  flex-direction: column;
`;

const Btn = styled(Button)`
  width: 100%;
  @media ${device.laptop} {
    width: fit-content;
  }
`;

const FormField = ({ label, placeholder }) => (
  <FlexBox column>
    <Body2 color="#533A71"> {label}</Body2>
    <Input placeholder={placeholder} />
  </FlexBox>
);

const ModalHelp = ({ closeModal }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    phoneNumber: "",
    message: "Schedule a demo",
  });
  const handleInput = (e, field) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };
  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);

    const validateForm = () => {
      const errors = {};
      return errors;
    };
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
      toast.error("Failed to deliver message. Please try again.");
      Bugsnag.notify(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Modal S onClose={closeModal} height="fit-content" borderRadius="1rem">
      <Wrapper>
        <FlexBox align="center" justify="center">
          <Body1 bold>Try to demo</Body1>
          <CrossIcon onClick={closeModal} />
        </FlexBox>
        <FlexBox column rowGap="0.75rem">
          <Display bold>We&apos;re Here to Help</Display>
          <Body2>
            Reach out for a personalized demo, more information, or just to chat
            with our team. We’re here to help you every step of the way!
          </Body2>
        </FlexBox>
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
          />
          <FormField
            label="Contact Number"
            placeholder="Enter Contact Number "
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
        </FlexBox>
        <Btn onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Schedule a meet"}
        </Btn>
      </Wrapper>
    </Modal>
  );
};

export default ModalHelp;
