import React, { useRef, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { useQueryParam, StringParam } from "use-query-params";

import { BsThreeDotsVertical } from "react-icons/bs";
import { Body2 } from "@common/UI/Headings";
import { ACCENT_0, ACCENT_200 } from "@common/UI/colors";
import Dropdown from "@common/UI/DropdownOld";
import FlexBox from "@common/UI/FlexBox";
import { boxShadowDs1 } from "@common/UI/styles";
import useOutsideAlert from "@hooks/useOutsideAlert";
import { logout } from "@redux/slices/auth";
import { trackEvent } from "@utils/helper";
import ConfirmModal from "@common/UI/ConfirmModal";

const DropdownContainer = styled(FlexBox)`
  background-color: ${ACCENT_0};
  position: absolute;
  right: -0.5rem;
  top: 2rem;
  width: 10rem;
  border-radius: 1rem;
  overflow: hidden;
  ${boxShadowDs1}
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
  { label: "Add a store", link: "/onboarding-merchant?source=top-nav" },
  { label: "Privacy", link: "/privacy-policy?source=top-nav" },
  { label: "Edit Profile", link: "/edit-profile" },
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
    trackEvent("profile_dropdown_option_click", {
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
              trackEvent("profile_dropdown_option_click", {
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
  const [source] = useQueryParam("source", StringParam);

  const commonAnalyticsPayload = {
    current_page: pathSegments?.[0],
    is_logged_in: !!user?.token,
    source: source || "my-stores",
    user_id: user?.id,
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(prev => {
      const newDropdownState = !prev;
      trackEvent("db_top_nav_click", {
        ...commonAnalyticsPayload,
        current_item: "kebab menu",
        source: source || "my-stores",
        is_dropdown_open: newDropdownState,
      });
      return newDropdownState;
    });
  };

  return (
    <FlexBox position="relative" align="center" justify="center">
      <FlexBox
        align="center"
        columnGap="0.5rem"
        cursor="pointer"
        onClick={toggleProfileDropdown}
      >
        <BsThreeDotsVertical size={20} />
      </FlexBox>
      {showProfileDropdown && (
        <ProfileDropdown
          toggleDropdown={toggleProfileDropdown}
          commonAnalyticsPayload={commonAnalyticsPayload}
        />
      )}
    </FlexBox>
  );
};
