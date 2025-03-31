import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
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

  margin: auto;
  gap: 2.5rem;
  width: 86.67%;
  max-width: 75rem;
`;

const LogoContainer = styled(Link)`
  text-decoration: none;
  cursor: pointer;
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

const NavBar = () => {
  const router = useRouter();
  return (
    <Navbar>
      <LogoContainer href="/">
        <img src="/assets/logo.svg" alt="Logo" width={120} height={40} />
      </LogoContainer>
      <FlexBox columnGap="20px">
        <NavLink href="/news">News</NavLink>
        <NavLink href="/screens">Screens</NavLink>
        <NavLink href="/watch-list">Watchlist</NavLink>
      </FlexBox>
      <FlexBox columnGap="10px">
        <Button onClick={() => router.push("/auth/login")}>Log in</Button>
        <Button primary onClick={() => router.push("/auth/signup")}>
          Sign up
        </Button>
      </FlexBox>
    </Navbar>
  );
};

export default NavBar;
