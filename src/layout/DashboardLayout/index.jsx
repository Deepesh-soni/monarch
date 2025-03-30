import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import Bugsnag from "@bugsnag/js";
import { BooleanParam, useQueryParams, StringParam } from "use-query-params";
import dynamic from "next/dynamic";

import { device } from "@common/UI/Responsive";
import FlexBox from "@common/UI/FlexBox";
import { ACCENT_100 } from "@common/UI/colors";
import {
  setStoreDetails,
  setStoreStylistList,
  setStoreServicesList,
  transformStoreServicesList,
} from "@redux/slices/storeDetails";
import { URL } from "@constants/urls";
import { client } from "@axiosClient";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import Loader from "@common/Loader";

const AddAppointmentModal = dynamic(() =>
  import("@components/Appointment/AddAppointmentModal")
);

const ManageBookingModal = dynamic(() =>
  import("@components/Appointment/ManageBookingModal")
);

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
    /* ${({ sidebarCollapsed }) =>
      sidebarCollapsed &&
      css`
        max-width: 100vw;
      `} */
  }
`;

const ContentWrapper = styled(FlexBox)`
  flex: 1;
  overflow: auto;
  padding: 0.75rem;
  background: ${ACCENT_100};

  @media ${device.laptop} {
    padding: 1.5rem;
  }
`;

const DashboardLayout = ({ children, showCrossIcon }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [showSidebar, setShowSidebar] = useState(false);

  // const showSidebar = useSelector(state => state.sidebar.isOpen);
  const user = useSelector(state => state.auth.user);
  const storeId = useSelector(state => state.auth.storeId);

  const [queryParams, setQueryParams] = useQueryParams({
    show_add_appointment_modal: BooleanParam,
    show_manage_booking_modal: BooleanParam,
    id: StringParam,
  });

  const {
    show_add_appointment_modal: showAddAppointmentModal,
    show_manage_booking_modal: showManageBookingModal,
  } = queryParams;

  useEffect(() => {
    if (user && !storeId) router.replace("/my-stores");
    else if (!user) router.replace("/");
  }, [user]);

  const toggleSidebar = () => {
    // dispatch(toggleSidebarReducer());
    setShowSidebar(prev => !prev);
  };

  const getStoreDetails = async () => {
    if (!storeId) return;
    try {
      const res = await client.get(`${URL.getStoreDetails}?storeId=${storeId}`);
      dispatch(setStoreDetails(res?.data?.data));
    } catch (error) {
      Bugsnag.notify(error);
    }
  };

  const fetchStylist = async () => {
    try {
      const response = await client.get(`${URL.getStylists}/${storeId}`);
      dispatch(setStoreStylistList(response?.data?.data));
    } catch (error) {
      Bugsnag.notify(error);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await client.get(`${URL.getAllServices}/${storeId}`);
      dispatch(setStoreServicesList(response?.data?.data));
      dispatch(transformStoreServicesList());
    } catch (error) {
      Bugsnag.notify(error);
    }
  };

  //TODO: add custom memoization
  useEffect(() => {
    fetchStylist();
    fetchServices();
    getStoreDetails();
  }, [storeId]);

  const handleCrossIconClick = () => {
    router.push(
      `/dashboard/general?date=${dayjs(new Date()).format("YYYY-MM-DD")}`
    );
  };

  const closeManageBookingModals = () => {
    setQueryParams(
      { show_manage_booking_modal: undefined, id: undefined },
      "replaceIn"
    );
  };

  if (!user) {
    return <Loader />;
  }

  return (
    <>
      {showAddAppointmentModal && <AddAppointmentModal />}
      {showManageBookingModal && (
        <ManageBookingModal closeModal={closeManageBookingModals} />
      )}
      <Wrapper>
        <Sidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
        <Content sidebarCollapsed={!showSidebar}>
          <Header
            toggleSidebar={toggleSidebar}
            handleCrossIconClick={handleCrossIconClick}
            showCrossIcon={showCrossIcon}
          />
          <ContentWrapper>{children}</ContentWrapper>
        </Content>
      </Wrapper>
    </>
  );
};

export default DashboardLayout;
