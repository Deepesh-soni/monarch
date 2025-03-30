import React, { useState, useEffect } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { URL } from "@constants/urls";
import Bugsnag from "@bugsnag/js";
import { useSelector } from "react-redux";
import { client } from "@axiosClient";
import { toast } from "react-toastify";
import {
  useQueryParam,
  BooleanParam,
  useQueryParams,
  StringParam,
} from "use-query-params";
import dynamic from "next/dynamic";

import { device } from "@common/UI/Responsive";
import FlexBox from "@common/UI/FlexBox";
import { Body1 } from "@common/UI/Headings";
import SingleAppointment from "./SingleAppointment";
import { FilterChips } from "./FilterChips";
import { DateSelector } from "./DateSelector";
import NullState from "./NullStates";
import CalendarModal from "./CalendarModal";
import BookingFilter from "./BookingFilter";
import Loader from "@common/Loader";

const PreviewInvoice = dynamic(() => import("../Invoice/PreviewInvoice"));

dayjs.extend(advancedFormat);

const DATE_SELECTOR_OPTIONS = [
  "All",
  "Today",
  "Yesterday",
  "Tomorrow",
  "Pick a Date",
];

const INITIAL_STATE = { appointment: "", stylist: "", stylistName: "" };

const Wrapper = styled(FlexBox)`
  height: 100%;
  min-height: 37vh;
  width: 100%;
  flex-direction: column;
  row-gap: 0.5rem;
`;

const ListingWrapper = styled(FlexBox)`
  height: 100%;
  width: 100%;
  flex-direction: column;
  row-gap: 0.5rem;
  max-height: 77vh;
  overflow: auto;
  padding-bottom: 0.5rem;

  @media ${device.laptop} {
    max-height: 65vh;
  }
`;

const BookingListing = () => {
  const [filterModal, setFilterModal] = useState(false);
  const [currentDate, setCurrentDate] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [filters, setFilters] = useState(INITIAL_STATE);
  const [selectedDate, setSelectedDate] = useState(DATE_SELECTOR_OPTIONS[0]);
  const [loading, setLoading] = useState(false);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);

  const storeId = useSelector(state => state.auth.storeId);
  const [bookingData, setBookingData] = useState(null);
  const [reload, setReload] = useQueryParam("reload", BooleanParam);
  const [queryParams, setQueryParams] = useQueryParams({
    show_invoice: BooleanParam,
    id: StringParam,
  });

  const getAllAppointments = async (stylist, appointment, date) => {
    setLoading(true);
    try {
      const formattedDate = date ? dayjs(date).format("YYYY-MM-DD") : "";
      const response = await client.get(
        `${URL.getAppointment}/${storeId}?stylist=${stylist}&status=${appointment}&date=${formattedDate}`
      );
      setBookingData(response?.data?.data);
    } catch (error) {
      toast.error("Failed to load bookings");
      Bugsnag.notify(error);
    } finally {
      setLoading(false);
      setReload(false);
    }
  };

  const handleDateClick = (item, index) => {
    setSelectedDate(item);
    switch (index) {
      case 1:
        setCurrentDate(dayjs());
        break;
      case 2:
        setCurrentDate(dayjs().subtract(1, "day"));
        break;
      case 3:
        setCurrentDate(dayjs().add(1, "day"));
        break;
      case 4:
        setModalOpen(true);
        break;
      default:
        setCurrentDate(null);
        setSelectedDate("All");
    }
  };

  useEffect(() => {
    if (!storeId) return;
    const { stylist = "", appointment = "" } = filters;
    getAllAppointments(stylist, appointment, currentDate);
  }, [storeId, filters, currentDate, reload]);

  const closeModal = () => setModalOpen(false);
  const openFilterModal = () => setFilterModal(true);
  const closeFilterModal = () => setFilterModal(false);

  const removeFilter = fieldName =>
    setFilters(prev => ({ ...prev, [fieldName]: "" }));

  const toggleInvoiceModal = () =>
    setQueryParams({ show_invoice: undefined }, "replaceIn");

  const handleMenuToggle = index =>
    setOpenMenuIndex(openMenuIndex === index ? null : index);

  return (
    <>
      {isModalOpen && (
        <CalendarModal
          closeModal={closeModal}
          setCurrentDate={setCurrentDate}
        />
      )}

      {filterModal && (
        <BookingFilter
          closeModal={closeFilterModal}
          filters={filters}
          setFilters={setFilters}
          initialState={INITIAL_STATE}
        />
      )}

      {queryParams?.show_invoice && (
        <PreviewInvoice
          data={bookingData?.find(({ _id }) => _id === queryParams?.id)}
          toggleModal={toggleInvoiceModal}
        />
      )}

      <Wrapper>
        <DateSelector
          selectedDate={selectedDate}
          handleDateClick={handleDateClick}
        />

        <FlexBox
          align="center"
          justify="space-between"
          padding="0.25rem 0.5rem"
          width="100%"
        >
          <Body1 bold>
            {currentDate
              ? dayjs(currentDate).format("Do MMMM YYYY")
              : "All Appointments"}
          </Body1>
          <FilterChips
            filters={filters}
            removeFilter={removeFilter}
            openFilterModal={openFilterModal}
          />
        </FlexBox>

        {loading ? (
          <Loader fitContent />
        ) : bookingData?.length ? (
          <ListingWrapper>
            {bookingData.map((singleData, index) => (
              <SingleAppointment
                key={singleData?._id}
                data={singleData}
                getAllAppointments={getAllAppointments}
                isMenuOpen={openMenuIndex === index}
                onMenuToggle={() => handleMenuToggle(index)}
                showDate={!currentDate}
              />
            ))}
          </ListingWrapper>
        ) : (
          <NullState
            content="No bookings today. Take this time to pamper yourself."
            imgUrl="/assets/Booking/no-task.webp"
          />
        )}
      </Wrapper>
    </>
  );
};

export default BookingListing;
