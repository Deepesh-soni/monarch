import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IoLogoWhatsapp } from "react-icons/io";
import { BiLogoGmail, BiLink } from "react-icons/bi";
import { AiFillMessage } from "react-icons/ai";
import { useSelector } from "react-redux";

import FlexBox from "@common/UI/FlexBox";
import { SECONDARY_100 } from "@common/UI/colors";
import { SALON_URL } from "@constants/urls";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;
`;

const Container = styled(FlexBox)`
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
`;

const CopyLink = styled(FlexBox)`
  border-radius: 0.5rem;
  padding: 0.5rem;
  border: 1px solid ${SECONDARY_100};
  justify-content: center;
  cursor: pointer;
`;

const Copiedmsg = styled(FlexBox)`
  background-color: black;
  border-radius: 0.5rem;
  padding: 0.25rem 0.5rem;
  color: white;
  width: fit-content;
  position: absolute;
  bottom: 0.25rem;
  align-self: center;
  opacity: 0.7;
`;

const ShareComponent = ({
  couponCode,
  couponString,
  emailSubject = "Check Out This Amazing Salon I Found!",
}) => {
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const storeDetails = useSelector(state => state?.activeStore?.storeDetails);

  useEffect(() => {
    const handleWindowResize = () => {
      const mobileWidthThreshold = 1024;
      setIsMobile(window.innerWidth < mobileWidthThreshold);
    };

    window.addEventListener("resize", handleWindowResize);
    handleWindowResize();

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const textToShare = `Enjoy ${couponString} off your next visit with code ${couponCode} at ${storeDetails?.storeName}.\nExplore our services and book your appointment today:
  \n👉 Visit ${SALON_URL}/salon/${storeDetails?.storeSlug}
  \nWe can't wait to pamper you!
 ${storeDetails?.storeName}.
`;

  const copyLinkToClipboard = () => {
    const dummyElement = document.createElement("textarea");
    dummyElement.value = textToShare;
    document.body.appendChild(dummyElement);
    dummyElement.select();
    document.execCommand("copy");
    document.body.removeChild(dummyElement);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const shareOnWhatsApp = () => {
    const url = encodeURIComponent(textToShare);
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      window.location.href = `whatsapp://send?text=${url}`;
    } else {
      window.open(`https://web.whatsapp.com/send?text=${url}`);
    }
  };

  const shareViaMessage = () => {
    const phoneNumber = "1234567890";
    const message = encodeURIComponent(textToShare);
    window.location.href = `sms:${phoneNumber}?body=${message}`;
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(emailSubject);
    const body = encodeURIComponent(textToShare);

    const mailtoLink = `mailto:?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
  };

  const data = [
    {
      id: 1,
      title: "Copy Link",
      icon: BiLink,
      color: "DodgerBlue",
      onClick: copyLinkToClipboard,
    },
    {
      id: 2,
      title: "Whatsapp",
      icon: IoLogoWhatsapp,
      color: "green",
      onClick: shareOnWhatsApp,
    },
    {
      id: 3,
      title: "Message",
      icon: AiFillMessage,
      color: "gold",
      onClick: shareViaMessage,
    },
    {
      id: 4,
      title: "Email",
      icon: BiLogoGmail,
      color: "red",
      onClick: shareViaEmail,
    },
  ];

  return (
    <Wrapper>
      <Container>
        {data.map(item => {
          return (
            <CopyLink key={item.id} onClick={item.onClick}>
              <item.icon size="2.5rem" fill={item.color} />
            </CopyLink>
          );
        })}
      </Container>
      {copied && <Copiedmsg>Copied!</Copiedmsg>}
    </Wrapper>
  );
};

export default ShareComponent;
