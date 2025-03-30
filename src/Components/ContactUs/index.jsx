import React from "react";
import styled from "styled-components";

import FlexBox from "@common/UI/FlexBox";
import { device } from "@common/UI/Responsive";
import { ACCENT_100 } from "@common/UI/colors";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInf";

const Container = styled(FlexBox)`
  width: 100%;
  padding: 0 1.25rem;
  @media ${device.laptop} {
    justify-content: center;
    padding: 0.0625rem 1.5625rem;
  }
`;

const StyledSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1.5rem;
  background-color: ${ACCENT_100};
  box-shadow: 0.0625rem 0.0625rem 0.5rem 0 rgba(0, 0, 0, 0.25);
  flex-wrap: wrap;
  padding: 0.0625rem 0.125rem;
  gap: 0rem;
  width: 100%;

  @media ${device.laptop} {
    gap: 5rem;
    width: 62rem;
  }
`;

const ContactUs = () => {
  return (
    <Container>
      <StyledSection>
        <ContactInfo />
        <ContactForm />
      </StyledSection>
    </Container>
  );
};

export default ContactUs;
