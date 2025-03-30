import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { FiX, FiChevronDown, FiChevronUp } from "react-icons/fi";
import Link from "next/link";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { Body2, Support, Caption } from "@common/UI/Headings";
import {
  ACCENT_0,
  ACCENT_400,
  PRIMARY_700,
  PRIMARY_800,
  ACCENT_200,
  ACCENT_300,
  ACCENT_600,
} from "@common/UI/colors";
import { device } from "@common/UI/Responsive";
import FlexBox from "@common/UI/FlexBox";
import useIsDesktop from "@hooks/useIsDesktop";
import { staffSidebarMeta, ownerSidebarMeta } from "@metadata/sidebar";
import { logout } from "@redux/slices/auth";
import { PUBLISHED } from "../../constants";
import { trackEvent } from "@utils/helper";
import ConfirmModal from "@common/UI/ConfirmModal";
// import { ShareModal } from "@components/Share/ShareModal";

const SidebarWrapper = styled.div`
  width: 80%;
  max-width: 80%;
  height: 100vh;
  height: 100dvh; // dvh for safe area for full screen height in mobile browsers
  display: grid;
  overflow: hidden;
  grid-template-columns: 0fr;
  transition: max-width 300ms ease-in-out;
  position: fixed;
  z-index: 21;
  grid-template-columns: 1fr;
  top: 0;
  bottom: 0;
  overflow-y: auto;

  ${({ expanded }) =>
    !expanded &&
    css`
      max-width: 0;
    `}

  @media ${device.laptop} {
    width: 16.4%;
    min-width: 14.75rem;
    max-width: 100%;
    grid-template-columns: 1fr;
    position: sticky;
  }
`;

// const commonIconProps = {
//   size: "1.5rem",
//   cursor: "pointer",
//   color: ACCENT_800,
// };

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

const SalonCard = styled(FlexBox)`
  width: 90%;
  padding: 0.5rem 1rem;
  align-items: center;
  gap: 1rem;
  background-color: ${ACCENT_0};
  border-radius: 0.75rem;
  margin: auto;
`;

const StoreImg = styled.div`
  width: 100%;
  max-width: 2.5rem;
  aspect-ratio: 1;
  border-radius: 5rem;
  overflow: hidden;
`;

const PamprazziLogo = styled(FlexBox)`
  padding: 1.5rem 1.5rem 0;
  justify-content: space-between;
`;

const SideBarOptions = styled(FlexBox)`
  width: 100%;
  cursor: pointer;
  padding: 0.5rem 1rem;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.2s ease;

  svg {
    color: ${ACCENT_300};
  }

  ${Body2} {
    color: ${ACCENT_300};
  }

  ${({ active }) =>
    active &&
    css`
      background-color: ${PRIMARY_700};

      svg {
        color: ${ACCENT_0};
      }

      ${Body2} {
        color: ${ACCENT_0};
      }
    `}

  &:hover {
    background-color: ${PRIMARY_700};
    transform: scale(1.01);

    svg {
      color: ${ACCENT_0};
    }

    ${Body2} {
      color: ${ACCENT_0};
    }
  }
`;

const Upcoming = styled(Caption)`
  font-size: 0.5625rem;
  position: absolute;
  top: 2px;
  left: 8px;
`;

const SubMenuWrapper = styled(FlexBox)`
  border-left: 1px solid ${ACCENT_400};
  margin-inline: 1rem;
  display: ${({ active }) => (active ? "flex" : "none")};
  margin-block: 0.25rem;
`;

const SubMenuLink = styled(Link)`
  width: 100%;
  padding: 0.25rem 2rem;
  position: relative;
  text-decoration: none;

  ::before {
    content: "";
    position: absolute;
    bottom: 0.75rem;
    left: 13px;
    width: 0.5rem;
    aspect-ratio: 1;
    -moz-border-radius: 1rem;
    -webkit-border-radius: 1rem;
    border-radius: 1rem;
    background-color: ${ACCENT_400};
  }
  ::after {
    content: "";
    position: absolute;
    bottom: 1rem;
    left: 0;
    width: 1rem;
    height: 1px;
    -moz-border-radius: 1rem;
    -webkit-border-radius: 1rem;
    border-radius: 1rem;
    background-color: ${ACCENT_400};
  }

  ${Support} {
    color: ${ACCENT_300};
  }

  ${({ active }) =>
    active &&
    css`
      ${Support} {
        color: ${ACCENT_200};
        font-weight: 600;
      }
    `}
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
  const [activeOptions, setActiveOptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isDesktop = useIsDesktop();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const user = useSelector(state => state.auth.user);
  const storeId = useSelector(state => state.auth.storeId);
  const storeDetails = useSelector(state => state.activeStore.storeDetails);

  const handleOptionClick = id => {
    const set = new Set([...activeOptions]);
    set.has(id) ? set.delete(id) : set.add(id);

    setActiveOptions([...set]);
  };

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

  const renderIcon = (id, slug, badge) => {
    if (badge) {
      switch (badge) {
        case "upcoming":
          return (
            <FlexBox position="relative">
              <img
                src="/assets/DashboardIcons/upcoming-bg.svg"
                width="64px"
                height="auto"
              />
              <Upcoming color={ACCENT_0}>UPCOMING</Upcoming>
            </FlexBox>
          );
      }
    } else {
      return activeOptions?.includes(id) || pathSegments?.[0] === slug ? (
        <FiChevronUp />
      ) : (
        <FiChevronDown />
      );
    }
  };

  const pathSegments = pathname.split("/").filter(segment => segment !== "");
  // render all sidebar options for owner and co-owner
  const sidebarMeta =
    user.userType !== 1 && user.userType !== 2
      ? staffSidebarMeta
      : ownerSidebarMeta;
  const thumbnail = storeDetails?.storeImages?.filter(
    image => image.isThumbnail
  )?.[0]?.imageUrl;

  return (
    <SidebarWrapper expanded={showSidebar}>
      <SidebarContainer>
        <FlexBox column rowGap="1.5rem">
          <PamprazziLogo>
            <Link href="/dashboard/general">
              <Logo
                src="/assets/pamprazzi-logo-white.svg"
                alt="logo"
                draggable="false"
              />
            </Link>
            {!isDesktop && (
              <FiX
                size={20}
                color={ACCENT_0}
                onClick={toggleSidebar}
                cursor="pointer"
              />
            )}
          </PamprazziLogo>
          <SalonCard>
            <StoreImg>
              <img src={thumbnail} height="100%" width="100%" />
            </StoreImg>
            <FlexBox column rowGap="0.25rem">
              <Body2 bold>{storeDetails?.storeName}</Body2>
              <Support color={ACCENT_600}>
                {storeDetails?.store_status === PUBLISHED
                  ? "Published"
                  : "Not Published"}
              </Support>
            </FlexBox>
          </SalonCard>
          <FlexBox column>
            {sidebarMeta?.map(
              ({ url, label, image, slug, subMenu, id, badge }) => (
                <>
                  <SideBarOptions
                    key={slug}
                    onClick={() => {
                      if (!badge) {
                        handleOptionClick(id);
                      }
                      trackEvent("db_left_nav_click", {
                        current_page: pathSegments?.[0],
                        source: null,
                        store_id: storeId,
                        selected_menu_item: slug,
                        badge,
                      });
                    }}
                    active={
                      activeOptions?.includes(id) || pathSegments?.[0] === slug
                    }
                  >
                    <FlexBox align="center" columnGap="0.85rem">
                      <img src={image} alt="label" width="18" height="18" />
                      <Body2 bold>{label}</Body2>
                    </FlexBox>
                    {renderIcon(id, slug, badge)}
                  </SideBarOptions>
                  {subMenu && (
                    <SubMenuWrapper
                      column
                      active={
                        activeOptions?.includes(id) ||
                        pathSegments?.[0] === slug
                      }
                    >
                      {subMenu?.map(({ url, label, slug }) => (
                        <SubMenuLink
                          key={slug}
                          href={url}
                          active={
                            `${pathSegments?.[0]}-${pathSegments?.[1]}` === slug
                          }
                          onClick={() =>
                            trackEvent("db_left_nav_click", {
                              current_page: pathSegments?.[0],
                              source: null,
                              store_id: storeId,
                              selected_sub_menu_item: slug,
                            })
                          }
                        >
                          <Support color={ACCENT_0}>{label}</Support>
                        </SubMenuLink>
                      ))}
                    </SubMenuWrapper>
                  )}
                </>
              )
            )}
          </FlexBox>
        </FlexBox>
        <BottomIcon>
          {/* <FiHelpCircle {...commonIconProps} color={ACCENT_0} /> */}
          {/* <ShareModal /> */}
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
