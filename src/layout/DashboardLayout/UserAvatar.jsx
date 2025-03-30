import React, { useRef, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { usePathname } from "next/navigation";

import { Body2, Support } from "@common/UI/Headings";
import { ACCENT_0, ACCENT_200 } from "@common/UI/colors";
import Dropdown from "@common/UI/DropdownOld";
import FlexBox from "@common/UI/FlexBox";
import { boxShadowDs1 } from "@common/UI/styles";
import useOutsideAlert from "@hooks/useOutsideAlert";
import { logout } from "@redux/slices/auth";
import Avatar from "@common/UI/Avatar";
import { trackEvent } from "@utils/helper";
import ConfirmModal from "@common/UI/ConfirmModal";
import { roleLookUp } from "@metaData/lookUps";
import { Button } from "@common/UI/Buttons";

const DropdownContainer = styled(FlexBox)`
  background-color: ${ACCENT_0};
  position: absolute;
  right: 0;
  top: 2.5rem;
  width: 10rem;
  border-radius: 1rem;
  overflow: hidden;
  ${boxShadowDs1}
`;

const OwnerName = styled(Body2)`
  max-width: 6rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DropdownOption = styled(FlexBox)`
  padding: 0.3rem;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  transition: background-color 250ms ease-in-out;

  &:hover {
    background-color: ${ACCENT_200};
  }
`;

const profileOptions = [
  // { label: "Profile Settings", link: "/profile?source=top-nav" },
  { label: "My Stores", link: "/my-stores?source=top-nav" },
  { label: "Add a store", link: "/onboarding-merchant?source=top-nav" },
  { label: "Privacy", link: "/privacy-policy?source=top-nav" },
];

const ProfileDropdown = ({
  toggleDropdown = () => {},
  commonAnalyticsPayload,
}) => {
  useOutsideAlert(containerRef, toggleDropdown, "header-profile");

  const containerRef = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogoutClick = () => {
    trackEvent("db_profile_dropdown_click", {
      ...commonAnalyticsPayload,
      selected_option: "logout",
    });
    setIsModalOpen(true);
  };

  const handleConfirmLogout = () => {
    dispatch(logout());
    toggleDropdown();
    setIsModalOpen(false);
  };

  const handleCancelLogout = () => {
    setIsModalOpen(false);
  };

  return (
    <DropdownContainer ref={containerRef}>
      <Dropdown className="header-profile">
        {profileOptions.map(({ label, link }) => (
          <DropdownOption
            key={label}
            onClick={() => {
              trackEvent("db_profile_dropdown_click", {
                ...commonAnalyticsPayload,
                selected_option: label,
              });
              router.push(link);
            }}
          >
            <Body2>{label}</Body2>
          </DropdownOption>
        ))}
        <DropdownOption onClick={handleLogoutClick}>
          <Body2>Log Out</Body2>
          <FiLogOut />
        </DropdownOption>
      </Dropdown>
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
    </DropdownContainer>
  );
};

export const UserAvatar = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const user = useSelector(state => state.auth.user);
  const pathname = usePathname();

  const pathSegments = pathname.split("/").filter(segment => segment !== "");

  const commonAnalyticsPayload = {
    current_page: pathSegments?.[0],
    is_logged_in: !!user?.token,
  };

  const handleLoginClick = () => {
    setOpenModal(true);
    trackEvent("db_top_nav_click", {
      ...commonAnalyticsPayload,
      current_item: "login cta",
    });
  };
  const toggleProfileDropdown = () => {
    trackEvent("db_top_nav_click", {
      ...commonAnalyticsPayload,
      current_item: "avatar",
      is_dropdown_open: showProfileDropdown,
    });
    setShowProfileDropdown(prev => !prev);
  };

  return (
    <FlexBox position="relative" align="center" justify="center">
      {user?.token ? (
        <FlexBox
          align="center"
          columnGap="0.5rem"
          cursor="pointer"
          onClick={toggleProfileDropdown}
        >
          <Avatar name={user?.name} />
          <FlexBox column>
            <OwnerName>{user?.name}</OwnerName>
            <Support>{roleLookUp[user?.userType]}</Support>
          </FlexBox>
          {showProfileDropdown ? (
            <SlArrowUp size={12} />
          ) : (
            <SlArrowDown size={12} />
          )}
        </FlexBox>
      ) : (
        <Button onClick={handleLoginClick}>Login</Button>
      )}

      {showProfileDropdown && (
        <ProfileDropdown
          toggleDropdown={toggleProfileDropdown}
          commonAnalyticsPayload={commonAnalyticsPayload}
        />
      )}
    </FlexBox>
  );
};
