import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import Session from "supertokens-auth-react/recipe/session";

import FlexBox from "@common/UI/FlexBox";
import SearchableDropdown from "./UI/Search/SearchDropdownCmp";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = styled.nav`
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  background: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  gap: 1rem;

  @media (min-width: 769px) {
    width: 86.67%;
    margin: 2rem auto;
    max-width: 75rem;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  @media (max-width: 768px) {
    width: 100vw;
  }
`;

const MobileMenuToggle = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: ${({ open }) => (open ? "flex" : "none")};
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
    width: 100%;
  }
`;

const FlexLinks = styled(FlexBox)`
  column-gap: 20px;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const SearchDesktop = styled.div`
  display: none;

  @media (min-width: 769px) {
    display: block;
    max-width: 600px;
    margin: 0 40px;
    width: 100%;
  }
`;

const SearchMobile = styled.div`
  display: block;
  width: 100%;

  @media (min-width: 769px) {
    margin: 1rem 0;
    display: none;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-size: 16px;
  font-weight: ${({ active }) => (active ? "600" : "400")};

  &:hover {
    color: #0073e6;
  }

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  border: ${({ primary }) => (primary ? "none" : "2px solid #0033a0")};
  background: ${({ primary }) => (primary ? "#0033a0" : "white")};
  color: ${({ primary }) => (primary ? "white" : "#0033a0")};
  white-space: nowrap;

  &:hover {
    background: ${({ primary }) => (primary ? "#002080" : "#f0f0f0")};
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  @media (min-width: 769px) {
    display: none;
  }
`;

const DesktopRow = styled.div`
  display: none;

  @media (min-width: 769px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 2rem;
  }
`;

// Dropdown Styles
const UserMenu = styled.div`
  position: relative;
`;

const UserToggle = styled(Button)`
  position: relative;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 110%;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 999;
  min-width: 180px;
  display: flex;
  flex-direction: column;
`;

const DropdownItem = styled.button`
  background: none;
  border: none;
  padding: 12px 16px;
  text-align: left;
  cursor: pointer;
  font-size: 14px;
  color: #333;

  &:hover {
    background: #f5f5f5;
  }
`;

const NavBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { doesSessionExist } = useSessionContext();
  const dropdownRef = useRef();

  const handleLogout = async () => {
    await Session.signOut();
    router.push("/auth");
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Navbar>
      <TopRow>
        <LogoContainer href="/" passHref>
          <img src="/assets/Logo.svg" alt="Logo" width={120} height={40} />
        </LogoContainer>

        <MobileMenuToggle onClick={() => setMobileNavOpen(prev => !prev)}>
          {mobileNavOpen ? <HiX /> : <HiMenu />}
        </MobileMenuToggle>
      </TopRow>

      <SearchMobile>
        {!pathname?.endsWith("/") && (
          <SearchableDropdown
            width="100%"
            onChange={item => router.push(`/stocks/${item.fqn}`)}
          />
        )}
      </SearchMobile>

      <DesktopRow>
        <LogoContainer href="/" passHref>
          <img src="/assets/Logo.svg" alt="Logo" width={120} height={40} />
        </LogoContainer>

        <SearchDesktop>
          {!pathname?.endsWith("/") && (
            <SearchableDropdown
              width="100%"
              onChange={item => router.push(`/stocks/${item.fqn}`)}
            />
          )}
        </SearchDesktop>

        <FlexLinks>
          {[
            { path: "/news", label: "News" },
            { path: "/screener", label: "Screens" },
            { path: "/watch-list", label: "Watchlist" },
          ].map(({ path, label }) => (
            <NavLink key={path} href={path} active={pathname?.includes(path)}>
              {label}
            </NavLink>
          ))}

          {doesSessionExist ? (
            <UserMenu ref={dropdownRef}>
              <UserToggle onClick={() => setUserMenuOpen(prev => !prev)}>
                Account
              </UserToggle>
              {userMenuOpen && (
                <Dropdown>
                  <DropdownItem onClick={() => router.push("/auth/changepassword")}>
                    Change Password
                  </DropdownItem>
                  <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                </Dropdown>
              )}
            </UserMenu>
          ) : (
            <Button primary onClick={() => router.push("/auth")}>
              Login / Register
            </Button>
          )}
        </FlexLinks>
      </DesktopRow>

      <MobileMenu open={mobileNavOpen}>
        {[
          { path: "/news", label: "News" },
          { path: "/screener", label: "Screens" },
          { path: "/watch-list", label: "Watchlist" },
        ].map(({ path, label }) => (
          <NavLink
            key={path}
            href={path}
            onClick={() => setMobileNavOpen(false)}
            active={pathname?.includes(path)}
          >
            {label}
          </NavLink>
        ))}

        {doesSessionExist ? (
          <>
            <Button
              onClick={() => {
                setMobileNavOpen(false);
                router.push("/auth/changepassword");
              }}
            >
              Change Password
            </Button>
            <Button
              onClick={() => {
                setMobileNavOpen(false);
                handleLogout();
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <Button
            primary
            onClick={() => {
              setMobileNavOpen(false);
              router.push("/auth");
            }}
          >
            Login / Register
          </Button>
        )}
      </MobileMenu>
    </Navbar>
  );
};

export default NavBar;
