import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { device } from "@common/UI/Responsive";
import FlexBox from "@common/UI/FlexBox";
import { ACCENT_100 } from "@common/UI/colors";
import { toggleSidebarReducer } from "@redux/slices/sidebarSlice";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import Loader from "@common/Loader";

const Wrapper = styled(FlexBox)`
  width: 100vw;
  box-sizing: border-box;
`;

const Content = styled(FlexBox)`
  flex: 1;
  height: 100%;
  min-height: 100vh;
  min-height: 100dvh; // dvh for safe area for full screen height in mobile browsers
  flex-direction: column;
  transition: max-width 300ms ease-in-out;

  @media ${device.laptop} {
    max-width: calc(100vw - max(14.75rem, 16.4%));
    ${({ sidebarCollapsed }) =>
      sidebarCollapsed &&
      css`
        max-width: 100vw;
      `}
  }
`;

const ContentWrapper = styled(FlexBox)`
  flex: 1;
  overflow: auto;
  margin-bottom: 5rem;
  padding: 1rem;
  background: ${ACCENT_100};

  @media ${device.laptop} {
    margin-bottom: 0;
    padding: 1.5rem;
  }
`;

const DashboardLayout = ({ children, showCrossIcon, showBackIcon }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const showSidebar = useSelector(state => state.sidebar.isOpen);

  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    if (!user) router.replace("/");
  }, [user]);

  const toggleSidebar = () => {
    dispatch(toggleSidebarReducer());
  };

  const handleCrossIconClick = () => router.push("/");

  if (!user) return <Loader />;

  return (
    <Wrapper>
      <Sidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
      <Content sidebarCollapsed={!showSidebar}>
        <Header
          toggleSidebar={toggleSidebar}
          handleCrossIconClick={handleCrossIconClick}
          showCrossIcon={showCrossIcon}
          showBackIcon={showBackIcon}
        />
        <ContentWrapper>{children}</ContentWrapper>
      </Content>
    </Wrapper>
  );
};

export default DashboardLayout;
