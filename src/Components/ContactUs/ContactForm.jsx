import React, { useState } from "react";
import styled from "styled-components";
import { URL } from "@constants/urls";
import { client } from "@axiosClient";
import Bugsnag from "@bugsnag/js";

import FlexBox from "@common/UI/FlexBox";
import { toast } from "react-toastify";
import { Body1 } from "@common/UI/Headings";
import { PRIMARY_900 } from "@common/UI/colors";
import Input from "@common/UI/InputBox";
import { Button } from "@common/UI/Buttons";
import TextArea2 from "@common/UI/TextArea2";

const FormContainer = styled(FlexBox)`
  min-width: 15rem;
  min-height: 31.875rem;
  width: 28rem;
  padding: 1.875rem 1.25rem;
  max-width: 100%;
`;

const Form = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const FormField = styled(FlexBox)`
  flex-direction: column;
  margin-bottom: 0.75rem;
`;

const Label = styled(Body1)`
  color: ${PRIMARY_900};
  font-size: 1rem;
  margin-bottom: 0.75rem;
`;

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });
  const [error, setError] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInput = (e, field) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name) errors.name = "Name is required";
    if (!formData.businessName)
      errors.businessName = "Business Name is required";
    if (!formData.email || !emailRegex.test(formData.email))
      errors.email = "Valid email is required";
    if (formData.phoneNumber && formData.phoneNumber.length !== 10)
      errors.phoneNumber = "Enter a valid 10-digit phone number";
    if (!formData.message) errors.message = "Message is required";

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
      toast.error("Failed to deliver message. Please try again.");
      Bugsnag.notify(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <FormField>
          <Label htmlFor="name">Name</Label>
          <Input
            height="1.2rem"
            type="text"
            id="name"
            placeholder="Enter your Name"
            value={formData.name}
            onChange={e => handleInput(e, "name")}
            error={error.name}
          />
        </FormField>

        <FormField>
          <Label htmlFor="businessName">Business Name</Label>
          <Input
            height="1.2rem"
            type="text"
            id="businessName"
            placeholder="Enter your Business Name"
            value={formData.businessName}
            onChange={e => handleInput(e, "businessName")}
            error={error.businessName}
          />
        </FormField>
        <FormField>
          <Label htmlFor="email">Email</Label>
          <Input
            height="1.2rem"
            type="email"
            id="email"
            placeholder="Enter your Email"
            value={formData.email}
            onChange={e => handleInput(e, "email")}
            error={error.email}
          />
        </FormField>
        <FormField>
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            height="1.2rem"
            type="tel"
            id="phoneNumber"
            placeholder="Enter your Phone Number"
            value={formData.phoneNumber}
            onChange={e => handleInput(e, "phoneNumber")}
            error={error.phoneNumber}
          />
        </FormField>
        <FormField>
          <Label htmlFor="message">Your Message</Label>
          <TextArea2
            id="message"
            rows="3"
            value={formData.message}
            onChange={e => handleInput(e, "message")}
            error={error.message}
          />
        </FormField>
        <Button width="100%" disabled={isSubmitting}>
          {" "}
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ContactForm;
