import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import Link from "next/link";
import styled, { css } from "styled-components";
import { useDispatch } from "react-redux";

import { ACCENT_0, ACCENT_400, PRIMARY_800 } from "@common/UI/colors";
import { device } from "@common/UI/Responsive";
import FlexBox from "@common/UI/FlexBox";
import useIsDesktop from "@hooks/useIsDesktop";
import { logout } from "@redux/slices/auth";
import ConfirmModal from "@common/UI/ConfirmModal";

const SidebarWrapper = styled.div`
  height: 100vh;
  height: 100dvh; // dvh for safe area for full screen height in mobile browsers
  display: grid;
  overflow: hidden;
  grid-template-columns: 0fr;
  transition: all 300ms ease-in-out;
  position: fixed;
  z-index: 21;
  width: 80%;
  grid-template-columns: 1fr;
  top: 0;
  overflow-y: auto;

  ${({ expanded }) =>
    !expanded &&
    css`
      width: 0;
    `}

  @media ${device.laptop} {
    width: 16.4%;
    min-width: 14.75rem;
    grid-template-columns: 1fr;
    position: sticky;
  }
`;

const SidebarContainer = styled(FlexBox)`
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${PRIMARY_800};

  @media ${device.laptop} {
    row-gap: 2.5rem;
    background-color: ${PRIMARY_800};
  }
`;

const Logo = styled.img`
  width: 100%;
  max-width: 7rem;
`;

const PamprazziLogo = styled(FlexBox)`
  padding: 1.5rem 1.5rem 0;
  align-items: center;
  justify-content: space-between;
`;

const BottomIcon = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: sticky;
  padding: 1rem;
  gap: 1rem;
  bottom: 0;
  background-color: ${PRIMARY_800};
  border-top: 1px solid ${ACCENT_400};
`;

export const Sidebar = ({ showSidebar, toggleSidebar }) => {
  const isDesktop = useIsDesktop();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmLogout = () => {
    dispatch(logout());
    setIsModalOpen(false);
  };

  const handleCancelLogout = () => {
    setIsModalOpen(false);
  };

  return (
    <SidebarWrapper expanded={showSidebar}>
      <SidebarContainer>
        <FlexBox column rowGap="1.5rem">
          <PamprazziLogo>
            <Link href="/my-stores">
              <Logo
                src="/assets/pamprazzi-logo-white.svg"
                alt="logo"
                draggable="false"
              />
            </Link>
            {!isDesktop && <FiX color={ACCENT_0} onClick={toggleSidebar} />}
          </PamprazziLogo>
        </FlexBox>
        <BottomIcon>
          <FlexBox
            align="start"
            columnGap="1rem"
            cursor="pointer"
            onClick={handleLogoutClick}
          >
            <img src="/assets/DashboardIcons/Icons/logout.svg" />
          </FlexBox>
        </BottomIcon>
        {isModalOpen && (
          <ConfirmModal
            toggleModal={handleCancelLogout}
            onCancel={handleCancelLogout}
            title="Log Out"
            confirmationText="Are you sure you want to Log Out?"
            cancelButtonText="No"
            confirmButtonText="Yes"
            onConfirm={handleConfirmLogout}
          />
        )}
      </SidebarContainer>
    </SidebarWrapper>
  );
};
