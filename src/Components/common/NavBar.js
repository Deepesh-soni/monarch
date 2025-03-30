import { useState } from "react";
import styled, { css } from "styled-components";
import { BLACK, PRIMARY_800 } from "./UI/colors";
// import NavLinks from "@components/NavBar/NavLinks";
import FlexBox from "./UI/FlexBox";
import { device } from "./UI/Resposive";

const FallBack = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: ${BLACK};
  opacity: 0.4;
  z-index: 401;

  @media only screen and (max-width: 48rem) {
    display: ${props => (props.navState ? "block" : "none")};
  }
`;

const NavContainer = styled(FlexBox)`
  padding-block: 0.25rem;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: ${PRIMARY_800};

  @media ${device.laptop} {
    padding: 0.5rem 0;
  }

  ${({ navContainerStyles }) =>
    navContainerStyles &&
    css`
      ${navContainerStyles}
    `}
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

const NavBar = ({ navContainerStyles }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // useEffect(() => {
  //   if (isMenuOpen) {
  //     document.body.style.overflow = "hidden";
  //   }
  //   return () => (document.body.style.overflow = "auto");
  // }, [isMenuOpen]);

  return (
    <>
      <NavContainer
        align="center"
        justify="center"
        navContainerStyles={navContainerStyles}
      >
        <FallBack navState={isMenuOpen} onClick={closeMenu} />
        <NavMain justify="space-between" align="center" width="90%">
          <LogoContainer>
            <Logo
              isStatic
              height={36}
              draggable={false}
              src="/assets/pamprazzi-logo-white.svg"
              alt="pamprazzi Logo"
            />
          </LogoContainer>
          {/* <NavLinks navState={isMenuOpen} closeMenu={closeMenu} /> */}
        </NavMain>
      </NavContainer>
    </>
  );
};

export default NavBar;
