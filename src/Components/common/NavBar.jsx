import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import Session from "supertokens-auth-react/recipe/session";

import FlexBox from "@common/UI/FlexBox";
import SearchableDropdown from "./UI/Search/SearchDropdownCmp";

const Navbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 86.67%;
  max-width: 75rem;
  padding: 10px 20px;
  background: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  margin: 2rem auto;
  gap: 2.5rem;
`;

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  cursor: pointer;
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

const SearchContainer = styled.div`
  flex: 1;
  max-width: 600px;
  margin: 0 40px;
`;

const NavBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { doesSessionExist } = useSessionContext();

  const handleLogout = async () => {
    await Session.signOut();
    router.push("/auth");
  };

  return (
    <Navbar>
      <LogoContainer href="/" passHref>
        <img src="/assets/logo.svg" alt="Logo" width={120} height={40} />
      </LogoContainer>

      <SearchContainer>
        <SearchableDropdown
          width="100%"
          onChange={item => router.push(`/stocks/${item.fqn}`)}
        />
      </SearchContainer>

      <FlexBox columnGap="20px" align="center">
        {[
          { path: "/news", label: "News" },
          { path: "/screens", label: "Screens" },
          { path: "/watch-list", label: "Watchlist" },
        ].map(({ path, label }) => (
          <NavLink key={path} href={path} active={pathname?.includes(path)}>
            {label}
          </NavLink>
        ))}

        {doesSessionExist ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : (
          <Button primary onClick={() => router.push("/auth")}>
            Login / Register
          </Button>
        )}
      </FlexBox>
    </Navbar>
  );
};

export default NavBar;
