import React from "react";
import styled from "styled-components";
import Link from "next/link";

import FlexBox from "@common/UI/FlexBox";

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 20px;
  background: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  margin-top: 47px;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-size: 16px;
  &:hover {
    color: #0073e6;
  }
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  border: ${({ primary }) => (primary ? "none" : "2px solid #0033a0")};
  background: ${({ primary }) => (primary ? "#0033a0" : "white")};
  color: ${({ primary }) => (primary ? "white" : "#0033a0")};
  &:hover {
    background: ${({ primary }) => (primary ? "#002080" : "#f0f0f0")};
  }
`;

const NavBar = () => (
  <Navbar>
    <LogoContainer>
      <img src="/assets/logo.svg" alt="Logo" width={120} height={40} />
    </LogoContainer>
    <FlexBox columnGap="20px">
      <NavLink href="#">News</NavLink>
      <NavLink href="#">Screens</NavLink>
      <NavLink href="#">Watchlist</NavLink>
    </FlexBox>
    <FlexBox columnGap="10px">
      <Button>Log in</Button>
      <Button primary>Sign up</Button>
    </FlexBox>
  </Navbar>
);

export default NavBar;
