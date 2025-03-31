import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";
import { usePathname } from "next/navigation";

import FlexBox from "@common/UI/FlexBox";
import SearchableDropdown from "./UI/Search/SearchDropdownCmp";

const Navbar = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 20px;
  background: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  margin: 2rem auto;
  gap: 2.5rem;
  width: 86.67%;
  max-width: 75rem;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-size: 16px;
  font-weight: ${({ active }) => (active ? "600" : "400")};

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
  const pathname = usePathname();

  console.log("pathname", pathname);
  return (
    <Navbar>
      <LogoContainer href="/" passHref>
        <img
          src="/assets/logo.svg"
          alt="Logo"
          width={120}
          height={40}
          style={{ cursor: "pointer" }}
        />
      </LogoContainer>

      {/* Center: Search */}
      <div style={{ flex: 1, maxWidth: "600px", margin: "0 40px" }}>
        <SearchableDropdown
          width="100%"
          onChange={item => router.push(`/stocks/${item.fqn}`)}
        />
      </div>

      {/* Right Side */}
      <FlexBox columnGap="20px" align="center">
        <NavLink href="/news" active={pathname?.includes("news")}>
          News
        </NavLink>
        <NavLink href="/screens" active={pathname?.includes("screens")}>
          Screens
        </NavLink>
        <NavLink href="/watch-list" active={pathname?.includes("watch-list")}>
          Watchlist
        </NavLink>
        <Button onClick={() => router.push("/auth/login")}>Log in</Button>
        <Button primary onClick={() => router.push("/auth/signup")}>
          Sign up
        </Button>
      </FlexBox>
    </Navbar>
  );
};

export default NavBar;
