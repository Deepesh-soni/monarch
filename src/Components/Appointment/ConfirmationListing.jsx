import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { URL } from "@constants/urls";
import Bugsnag from "@bugsnag/js";
import { useSelector } from "react-redux";
import { client } from "@axiosClient";

import { device } from "@common/UI/Responsive";
import FlexBox from "@common/UI/FlexBox";
import ConfirmationCard from "./ConfirmationCard";
import NullState from "./NullStates";
import { toast } from "react-toastify";

const Wrapper = styled(FlexBox)`
  width: 100%;
  justify-content: center;
`;

const ConfirmationContainer = styled(FlexBox)`
  max-width: 98vw;
  width: 100%;
  height: 100%;
  overflow: auto;
  flex-direction: row;
  column-gap: 0.5rem;
  @media ${device.laptop} {
    max-height: 75vh;
    width: 100%;
    flex-direction: column;
    row-gap: 1rem;
  }
`;

const ConfirmationListing = ({ setShowMobile }) => {
  const [confirmationData, setConfirmationData] = useState();
  const storeId = useSelector(state => state.auth.storeId);

  const getAllPendingBookings = async () => {
    try {
      const response = await client.get(
        `${URL.getPendingAppointment}/${storeId}`
      );
      setConfirmationData(response?.data?.data);
    } catch (error) {
      toast.error("Failed to load data");
      Bugsnag.notify(error);
    }
  };

  useEffect(() => {
    getAllPendingBookings();
    setShowMobile(confirmationData?.length >= 1);
  }, []);

  return (
    <Wrapper>
      {confirmationData?.length >= 1 ? (
        <ConfirmationContainer>
          {confirmationData?.map(item => (
            <ConfirmationCard key={item?._id} data={item} />
          ))}
        </ConfirmationContainer>
      ) : (
        <NullState
          content="You are all clear! No last min bookings found."
          imgUrl="/assets/Booking/noUpcomingBooking.webp"
        />
      )}
    </Wrapper>
  );
};

export default ConfirmationListing;
