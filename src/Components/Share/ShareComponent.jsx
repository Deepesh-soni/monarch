import React, { useState } from "react";
import styled from "styled-components";
import { IoLogoWhatsapp, IoIosClose } from "react-icons/io";
import { BiLogoGmail, BiLink } from "react-icons/bi";
import { AiFillMessage } from "react-icons/ai";

import FlexBox from "@common/UI/FlexBox";
import { Body2, H3 } from "@common/UI/Headings";
import { SECONDARY_100 } from "@common/UI/colors";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;
  padding: 1.5rem;
`;

const Container = styled(FlexBox)`
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;

const HeadBox = styled(FlexBox)`
  justify-content: space-between;
  align-items: center;
`;

const CopyLink = styled(FlexBox)`
  border-radius: 0.5rem;
  padding: 0.5rem;
  border: 1px solid ${SECONDARY_100};
  justify-content: center;
  cursor: pointer;
`;

const CopiedMsg = styled(FlexBox)`
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

const ShareComponent = ({ setOpenModal }) => {
  const [copied, setCopied] = useState(false);
  const url = encodeURIComponent("https://your-website.com/link-to-share");

  const copyLinkToClipboard = () => {
    const dummyElement = document.createElement("textarea");
    dummyElement.value = window.location.href;
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
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      window.location.href = `whatsapp://send?text=🌟Ready to elevate your salon experience?🌟%0A%0AUnlock a world of self care and grooming for you and your loved ones! Book your appointment now to indulge in some serious pampering. Redeem your invitation here:%0A%0A${url}%0A%0ADon't wait! Let's make every visit an unforgettable salon experience!💇‍♂️💅💖`;
    } else {
      window.open(
        `https://web.whatsapp.com/send?text=🌟Ready to elevate your salon experience?🌟%0A%0AUnlock a world of self care and grooming for you and your loved ones! Book your appointment now to indulge in some serious pampering. Redeem your invitation here:%0A%0A${url}%0A%0ADon't wait! Let's make every visit an unforgettable salon experience!💇‍♂️💅💖`
      );
    }
  };

  const shareViaMessage = () => {
    const phoneNumber = "1234567890";
    const message = encodeURIComponent(
      `🌟Ready to elevate your salon experience?🌟%0A%0AUnlock a world of self care and grooming for you and your loved ones! Book your appointment now to indulge in some serious pampering. Redeem your invitation here:%0A%0A${url}%0A%0ADon't wait! Let's make every visit an unforgettable salon experience!💇‍♂️💅💖`
    );
    window.location.href = `sms:${phoneNumber}?body=${message}`;
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent("Join Pamprazzi");
    const body = encodeURIComponent(
      `🌟Ready to elevate your salon experience?🌟%0A%0AUnlock a world of self care and grooming for you and your loved ones! Book your appointment now to indulge in some serious pampering. Redeem your invitation here:%0A%0A${url}%0A%0ADon't wait! Let's make every visit an unforgettable salon experience!💇‍♂️💅💖`
    );

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
      <HeadBox>
        <H3 bold>Share</H3>
        <IoIosClose
          size="1.5rem"
          style={{ cursor: "pointer" }}
          onClick={() => setOpenModal(false)}
        />
      </HeadBox>
      <Body2>Share this Saloon with your friend and family</Body2>
      <Container>
        {data.map(item => {
          return (
            <CopyLink key={item.id} onClick={item.onClick}>
              <item.icon size="2.5rem" fill={item.color} />
            </CopyLink>
          );
        })}
      </Container>
      {copied && <CopiedMsg>Copied!</CopiedMsg>}
    </Wrapper>
  );
};

export default ShareComponent;
