import React from "react";
import styled from "styled-components";

import FlexBox from "@common/UI/FlexBox";
import { PRIMARY_800 } from "@common/UI/colors";
import { device } from "@common/UI/Responsive";
import Footer from "@common/Footer";

const NavContainer = styled(FlexBox)`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 100;
  padding-block: 0.25rem;
  width: 100%;
  align-items: center;
  justify-content: center;

  background-color: ${PRIMARY_800};

  @media ${device.laptop} {
    padding: 0.5rem;
  }
`;

const NavMain = styled(FlexBox)`
  max-width: 75rem;
  width: 86.67%;

  @media only screen and (max-width: 48rem) {
    position: unset;
  }
`;

const LogoContainer = styled.div`
  min-width: 7.5rem;
  max-width: 7.5rem;
  width: 7.5rem;

  @media only screen and (max-width: 48rem) {
    min-width: 5rem;
    max-width: 5rem;
    width: 5rem;
  }
`;

const Logo = styled.img`
  width: 100%;
  cursor: pointer;
`;

const ChildrenWrapper = styled.div`
  @media ${device.laptop} {
    margin: 3rem auto;
  }
`;

const NavBar = () => (
  <NavContainer>
    <NavMain justify="space-between" align="center">
      <LogoContainer>
        <Logo
          isStatic
          height={36}
          draggable={false}
          src="/assets/pamprazzi-logo-white.svg"
          alt="pamprazzi Logo"
        />
      </LogoContainer>
    </NavMain>
  </NavContainer>
);

const HomePageLayout = ({ children }) => (
  <>
    <NavBar />
    <ChildrenWrapper>{children}</ChildrenWrapper>
    <Footer />
  </>
);

export default HomePageLayout;
