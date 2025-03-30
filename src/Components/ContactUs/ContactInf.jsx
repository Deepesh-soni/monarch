import React from "react";
import styled from "styled-components";
import { FaLocationDot, FaClock, FaStore } from "react-icons/fa6";

import FlexBox from "@common/UI/FlexBox";
import { device } from "@common/UI/Responsive";
import { Body1, H3, H2 } from "@common/UI/Headings";
import { PRIMARY_900, SECONDARY_500, ACCENT_100 } from "@common/UI/colors";

const InfoContainer = styled(FlexBox)`
  border-radius: 1rem;
  background-color: ${ACCENT_100};
  display: flex;
  flex-direction: column;
  min-width: 15rem;
  min-height: 31.875rem;
  padding: 1.875rem 1.25rem;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
`;

const Logo = styled.img`
  aspect-ratio: 2.05;
  object-fit: contain;
  width: 10.25rem;
  max-width: 100%;
`;

const HeaderContent = styled(FlexBox)`
  margin-top: 1.25rem;
  flex-direction: column;
`;

const Title = styled(H2)`
  color: ${PRIMARY_900};
  font-size: 1.75rem;
  margin: 0.5rem 0;
`;

const InfoList = styled.ul`
  display: flex;
  margin-top: 1.25rem;
  width: 19.875rem;
  max-width: 100%;
  flex-direction: column;
  align-items: start;
  font-size: 1rem;
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.75rem;
`;

const ItemHeader = styled(FlexBox)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${PRIMARY_900};
`;

const ItemContent = styled(Body1)`
  margin-top: 0.5rem;
  color: ${SECONDARY_500};
  padding-left: 1.25rem;

  @media ${device.laptop} {
    padding-left: 2rem;
  }
`;

const contactData = [
  {
    icon: <FaLocationDot />,
    title: "Our Location",
    content: "Kolkata, West Bengal, India",
  },
  {
    icon: <FaClock />,
    title: "Opening Hours",
    content: "Mon-Fri: 6am-10pm\nSat-Sun: 8am-2pm",
  },
  {
    icon: <FaStore />,
    title: "Contact",
    content: `Phone: +91 85019-87307
                Email: <a href="mailto:support@pamprazzi.com">support@pamprazzi.com</a>`,
  },
];

const InfoItem = ({ icon, title, content }) => {
  return (
    <ListItem>
      <ItemHeader>
        {icon}
        <H3 color={PRIMARY_900}>{title}</H3>
      </ItemHeader>
      <ItemContent
        dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, "<br />") }}
      />
    </ListItem>
  );
};

const ContactInfo = () => {
  return (
    <InfoContainer>
      <Header>
        <Logo src="assets/contact-us.webp" alt="Company Logo" />
        <HeaderContent>
          <Title bold>We&apos;re Here to Help</Title>
          <Body1>
            Reach out for your queries, more information
            <br />
            We&apos;re here to help you every step of the way!
          </Body1>
        </HeaderContent>
      </Header>
      <InfoList>
        {contactData.map((item, index) => (
          <InfoItem key={index} {...item} />
        ))}
      </InfoList>
    </InfoContainer>
  );
};

export default ContactInfo;
