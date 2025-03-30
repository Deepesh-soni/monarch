import React, { useRef, useState } from "react";
import styled from "styled-components";

import FlexBox from "@common/UI/FlexBox";
import Footer from "@common/Footer";
import FooterSection from "./FooterSection";
import Experience from "./Experience";
// import Premium from "./Premium";
import PageSpectrum from "./PageSpectrum";
import Effect from "./Effect";
import Features from "./Features";
import Help from "./Help";
import Login from "@components/Login";
import { Navbar } from "./Navbar";
import { MobileAndCoinSection } from "./MobileAndCoinSection";
// import PartnershipBanner from "./PartnershipBanner";
import SalonRegister from "./SalonRegister";
import SalonRegisterMobile from "./SalonRegisterMobile";
import { device } from "@common/UI/Responsive";
import { trackEvent } from "@utils/helper";

const Wrapper = styled(FlexBox)`
  row-gap: 2rem;

  @media ${device.laptop} {
    row-gap: 2.5rem;
  }
`;

const HideMobile = styled.div`
  display: none;
  @media ${device.laptop} {
    display: flex;
    padding: 2rem 0;
  }
`;

const HideDesktop = styled.div`
  display: flex;
  @media ${device.laptop} {
    display: none;
  }
`;

const MerchantPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const bookDemoRef = useRef();

  const handleLoginClick = () => setOpenModal(true);

  const scrollToBookDemo = () => {
    trackEvent("book_demo_cta_click", {
      cta_label: "Book a Free Demo",
      current_page: "merchant-lp",
    });
    bookDemoRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Wrapper column>
        {openModal && <Login setModalOpen={setOpenModal} />}
        <Navbar
          onLoginClick={handleLoginClick}
          scrollToBookDemo={scrollToBookDemo}
        />
        <MobileAndCoinSection />
        {/* <PartnershipBanner /> */}
        <HideMobile>
          <SalonRegister />
        </HideMobile>
        <HideDesktop>
          <SalonRegisterMobile />
        </HideDesktop>
        <PageSpectrum />
        <Effect />
        <Features />
        <Help bookDemoRef={bookDemoRef} />
        <Experience />
        <FooterSection />
      </Wrapper>
      {/* <Premium /> */}
      <Footer />
    </>
  );
};

export default MerchantPage;
