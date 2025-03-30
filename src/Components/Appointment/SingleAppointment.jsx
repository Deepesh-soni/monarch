import React, { useEffect, useRef, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { BooleanParam, useQueryParams } from "use-query-params";
import dynamic from "next/dynamic";

import useOutsideAlert from "@hooks/useOutsideAlert";
import FlexBox from "@common/UI/FlexBox";
import { Body2, Support } from "@common/UI/Headings";
import { device } from "@common/UI/Responsive";
import {
  PRIMARY_900,
  SECONDARY_500,
  SECONDARY_0,
  ERROR,
} from "@common/UI/colors";
import Completed from "./ManageBookingModal/Completed";
import { Button } from "@common/UI/Buttons";
import CalendarModal from "./CalendarModal";
import ConfirmModal from "@common/UI/ConfirmModal";
import { formatDateTime } from "@constants";

dayjs.extend(customParseFormat);

const CancelModal = dynamic(() => import("./LineItems/CancelModal"));

const Menu = dynamic(() => import("./LineItems/Menus"));

const Invoice = dynamic(() => import("../Invoice"));

const ViewBookingDetails = dynamic(() =>
  import("./LineItems/ViewBookingDetails")
);

const Container = styled(FlexBox)`
  position: relative;
  width: 100%;
  padding: 0.5rem;
  justify-content: space-between;
  border-radius: 0.75rem;
  border: 1px solid ${SECONDARY_0};
  align-items: center;

  @media ${device.laptop} {
    padding: 0.5rem 1rem;
  }
`;

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  column-gap: 1rem;
  align-items: flex-start;
  width: fit-content;
`;

const SingleRow = styled(FlexBox)`
  flex-direction: ${({ hasCol }) => (hasCol ? "column" : "row")};
  column-gap: 1rem;
  row-gap: 0.5rem;

  @media ${device.laptop} {
    align-items: center;
    flex-direction: row;
  }
`;

const MenuIcon = styled(FlexBox)`
  height: 1.5rem;
  width: 1.5rem;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ShowMoreText = styled(Body2)`
  color: ${PRIMARY_900};
  cursor: pointer;
  font-size: 0.8rem;
`;

const Chip = styled(Support)`
  background-color: ${({ backgroundColor }) =>
    backgroundColor || "transparent"};
  border: ${({ border }) => border || "none"};
  border-radius: 5rem;
  text-transform: capitalize;
  padding: 0 0.75rem;
  font-weight: 500;
`;

const ServiceName = styled(Body2)`
  color: ${SECONDARY_500};
  text-transform: capitalize;
  max-width: 4rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SingleAppointment = ({ data, isMenuOpen, onMenuToggle, showDate }) => {
  const {
    status,
    name,
    bookingTime,
    bookingId,
    stylistId,
    servicesChoosen,
    bookingDate,
  } = data ?? {};

  const [openModalCompleted, setOpenModalCompleted] = useState(false);
  const [calendarModalOpen, setCalendarModalOpen] = useState(false);
  const [reasonModalOpen, setReasonModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [viewBookingDetailsModalOpen, setViewBookingDetailsModalOpen] =
    useState(false);
  const [actionMode, setActionMode] = useState("");
  const [expanded, setExpanded] = useState(false);

  const menuRef = useRef(null);

  const storeStylists = useSelector(state => state.activeStore.storeStylist);
  const storeServiceList = useSelector(
    state => state.activeStore.transformedStoreServices
  );

  const [, setQueryParams] = useQueryParams({
    show_manage_booking_modal: BooleanParam,
  });

  const id = data?._id;

  const openModalNew = () => {
    setQueryParams({ show_manage_booking_modal: 1, id }, "replaceIn");
  };

  const storeStylistList = storeStylists.map(stylist => {
    return { value: stylist?._id, label: stylist?.name };
  });

  const currentTime = dayjs();
  const bookingDateTime = dayjs(bookingTime, "h.mma");
  const AppointmentBookingDate = dayjs(bookingDate, "YYYY-MM-DDTHH:mm:ss.SSSZ");
  const isSameDate = currentTime.isSame(AppointmentBookingDate, "day");
  let isWithinTimeRange = false;

  if (isSameDate) {
    const timeDifferenceInMinutes = bookingDateTime.diff(currentTime, "minute");
    isWithinTimeRange =
      timeDifferenceInMinutes >= -120 && timeDifferenceInMinutes <= 15;
  }

  const statusColorAndText = status => {
    let color, appointmentStatus, border, backgroundColor;

    switch (status) {
      case 2:
        color = ERROR;
        border = "1px solid #E94444";
        backgroundColor = "rgba(233, 68, 68, 0.30)";
        appointmentStatus = "Upcoming";
        break;
      case 4:
        border = "1px solid #FFC107";
        backgroundColor = "rgba(255, 193, 7, 0.2)";
        color = "#BF7D1C";
        appointmentStatus = "In Progress";
        break;
      case 5:
        border = "1px solid #5B5454";
        backgroundColor = "rgba(190, 190, 190, 0.30)";
        color = "#5B5454";
        appointmentStatus = "Pending Payment";
        break;
      case 6:
        color = "#008000";
        appointmentStatus = "Completed";
        border = "1px solid #008000";
        backgroundColor = " rgba(0, 255, 0, 0.30)";
        break;
      case 7:
        backgroundColor = "rgba(233, 68, 68, 0.30)";
        border = "1px solid ERROR";
        color = ERROR;
        appointmentStatus = "Abandoned";
        break;
      case 8:
        color = "#007";
        border = "1px solid #007";
        backgroundColor = "rgba(0, 123, 255, 0.30)";
        appointmentStatus = "Reschedule";
        break;
      case 9:
        border = "1px solid #E94444";
        backgroundColor = "rgba(233, 68, 68, 0.30)";
        color = "#E94444";
        appointmentStatus = "Cancelled";
        break;
      case 10:
        border = "1px solid #E94444";
        backgroundColor = "rgba(233, 68, 68, 0.30)";
        color = "#E94444";
        appointmentStatus = "Rejected";
        break;
      default:
        color = "#625A5A";
        border = "1px solid #808080";
        backgroundColor = "rgba(128, 128, 128, 0.30)";
        appointmentStatus = "";
        break;
    }

    return { color, appointmentStatus, border, backgroundColor };
  };

  const { color, appointmentStatus, border, backgroundColor } =
    statusColorAndText(status);

  const selectedStylist = storeStylistList.find(
    stylist => stylist?.value === stylistId
  );

  const selectedService = storeServiceList.filter(item =>
    servicesChoosen.some(service => service?.serviceId === item?._id)
  );

  const openCalendarModal = () => {
    setCalendarModalOpen(true);
    onMenuToggle();
  };

  const closeCalendarModal = () => {
    setCalendarModalOpen(false);
    setConfirmModalOpen(true);
  };

  const oncloseCalendarModal = () => {
    setCalendarModalOpen(prev => !prev);
  };
  const closeConfirmModal = () => {
    setConfirmModalOpen(false);
    setReasonModalOpen(true);
  };

  const closeModal = () => {
    setConfirmModalOpen(prev => !prev);
  };

  const closeReasonModal = () => {
    setReasonModalOpen(false);
  };

  const handleCancel = () => {
    setActionMode("cancel");
    setConfirmModalOpen(true);
    onMenuToggle();
  };

  const handleReschedule = () => {
    setActionMode("reschedule");
    openCalendarModal();
  };

  const handleMenuClick = () => {};

  useOutsideAlert(menuRef, () => {
    if (isMenuOpen) handleMenuClick();
  });

  const handleDateSelect = date => {
    setSelectedDate(date);
    closeCalendarModal();
  };

  const handleTimeSelect = time => {
    setSelectedTime(time);
  };

  const handleView = () => {
    setViewBookingDetailsModalOpen(true);
  };

  const handleBookingDetails = () => {
    setViewBookingDetailsModalOpen(true);
  };

  const closeViewBookingDetailsModal = () => {
    setViewBookingDetailsModalOpen(false);
  };

  const handleClickOutside = event => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      onMenuToggle();
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  // TODO: create a map/meta data for this
  const shouldShowButton =
    (status === 2 && isWithinTimeRange) ||
    status === 4 ||
    (status === 8 && isWithinTimeRange);

  const shouldShowMenu = status !== 4 && !shouldShowButton;
  const isCompleted = status == 6;

  const displayedServices = expanded
    ? selectedService
    : selectedService.slice(0, 2);

  return (
    <>
      {/* TODO: this modal is not in use */}
      {openModalCompleted && (
        <Completed setOpenModalCompleted={setOpenModalCompleted} />
      )}

      <Container ref={menuRef} onClick={handleMenuClick}>
        <Wrapper>
          <SingleRow hasCol>
            <FlexBox columnGap="1rem">
              <Body2 bold textTransform="capitalize">
                {name}
              </Body2>
              {showDate && (
                <Body2 color={SECONDARY_500}>
                  {dayjs(bookingDate).format("DD MMM YYYY")}
                </Body2>
              )}
              <FlexBox align="center" columnGap="0.25rem">
                <img
                  src="/assets/Booking/clockIcon.webp"
                  alt="booking time"
                  width={18}
                  height={18}
                />
                <Body2 color={SECONDARY_500}>{bookingTime}</Body2>
              </FlexBox>
            </FlexBox>
            <FlexBox columnGap="0.5rem">
              <Chip
                border={border}
                backgroundColor={backgroundColor}
                color={color}
              >
                {appointmentStatus}
              </Chip>
              <Chip
                color="#008080"
                border="1px solid #008080"
                backgroundColor="rgba(0, 128, 128, 0.30)"
              >
                {selectedStylist?.label}
              </Chip>
            </FlexBox>
          </SingleRow>
          <SingleRow align="center">
            <Body2>#{bookingId}</Body2>
            <FlexBox padding="0.25rem 0" columnGap="0.25rem" align="center">
              {(expanded
                ? displayedServices
                : displayedServices?.slice(0, 1)
              ).map(service => (
                <ServiceName key={service?._id}>
                  {service?.serviceName}
                </ServiceName>
              ))}
              {selectedService.length > 1 && (
                <ShowMoreText onClick={() => setExpanded(!expanded)}>
                  {expanded ? "Less" : `+${selectedService.length - 1} more`}
                </ShowMoreText>
              )}
            </FlexBox>
          </SingleRow>
        </Wrapper>

        <FlexBox columnGap="0.5rem">
          {isCompleted && <Invoice data={data} />}
          {shouldShowMenu && (
            <>
              <MenuIcon onClick={onMenuToggle}>
                <SlOptionsVertical />
              </MenuIcon>
              {isMenuOpen && (
                <Menu
                  bookingStatus={appointmentStatus}
                  onReschedule={handleReschedule}
                  onView={handleView}
                  onCancel={handleCancel}
                  onBookingDetails={handleBookingDetails}
                  onClose={onMenuToggle}
                  innerRef={menuRef}
                />
              )}
            </>
          )}
        </FlexBox>

        {shouldShowButton && (
          <FlexBox>
            <Button
              primary
              borderRadius="2rem"
              width="fit-content"
              onClick={openModalNew}
            >
              {status === 2 ? "Start" : "Continue"}
            </Button>
          </FlexBox>
        )}
      </Container>

      {calendarModalOpen && (
        <CalendarModal
          toggleModal={closeCalendarModal}
          closeModal={oncloseCalendarModal}
          setCurrentDate={handleDateSelect}
          setCurrentTime={handleTimeSelect}
          actionMode={actionMode}
        />
      )}
      {confirmModalOpen && (
        <ConfirmModal
          toggleModal={closeModal}
          onCancel={closeModal}
          onConfirm={closeConfirmModal}
          title={
            actionMode === "reschedule"
              ? "Reschedule Booking"
              : "Cancel Booking"
          }
          confirmationText={
            actionMode === "reschedule"
              ? `You are about to reschedule this booking to ${formatDateTime(
                  selectedDate,
                  selectedTime
                )}. Are you sure?`
              : "You are about to cancel this booking. Are you sure?"
          }
          cancelButtonText="No"
          confirmButtonText="Yes"
        />
      )}
      {reasonModalOpen && (
        <CancelModal
          id={id}
          mode={actionMode}
          bookingTime={selectedTime}
          bookingDate={selectedDate}
          setCancelUI={setReasonModalOpen}
          onConfirmAction={closeReasonModal}
        />
      )}
      {viewBookingDetailsModalOpen && (
        <ViewBookingDetails
          data={data}
          closeModal={closeViewBookingDetailsModal}
        />
      )}
    </>
  );
};

export default SingleAppointment;
