import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Bugsnag from "@bugsnag/js";
import { useSelector } from "react-redux";

import { URL } from "@constants/urls";
import { client } from "@axiosClient";
import FlexBox from "@common/UI/FlexBox";
import { Body1 } from "@common/UI/Headings";
import ConfirmationCard from "../../Appointment/ConfirmationCard";
import { toast } from "react-toastify";
import { PRIMARY_900, SECONDARY_901 } from "@common/UI/colors";
import Modal from "@common/UI/Modal";
import CrossIcon from "@common/UI/CrossIcon";
import NullState from "../../Appointment/NullStates";

const Wrapper = styled(FlexBox)`
  width: 100%;
  padding: 1rem 0.5rem;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  row-gap: 0.5rem;
`;

const ConfirmationContainer = styled(FlexBox)`
  flex-direction: row;
  overflow: auto;
  padding: 1rem;
  column-gap: 0.5rem;
`;

const HeadWithClose = styled(FlexBox)`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${SECONDARY_901};
  padding: 1rem;
`;

const Cross = styled.div`
  cursor: pointer;
`;

const UpcomingBookings = () => {
  const [confirmationData, setConfirmationData] = useState();
  const [openModal, setOpenModal] = useState(false);
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
  }, []);

  const toggleModal = () => {
    setOpenModal(prev => !prev);
  };

  return (
    <>
      {openModal && (
        <Modal XS>
          <HeadWithClose>
            <div />
            <Body1 bold>Last minute bookings</Body1>
            <Cross>
              <CrossIcon onClick={toggleModal} />
            </Cross>
          </HeadWithClose>
          <ConfirmationContainer>
            {confirmationData?.map(item => (
              <ConfirmationCard key={item?._id} data={item} />
            ))}
          </ConfirmationContainer>
        </Modal>
      )}
      <Wrapper>
        {confirmationData?.length >= 1 ? (
          <>
            <ConfirmationCard data={confirmationData[0]} />
            <Body1
              color={PRIMARY_900}
              onClick={toggleModal}
              bold
              cursor="pointer"
            >
              {" "}
              View all
            </Body1>
          </>
        ) : (
          <NullState
            content="You are all clear! No last min bookings found."
            imgUrl="/assets/Booking/noUpcomingBooking.webp"
          />
        )}
      </Wrapper>
    </>
  );
};

export default UpcomingBookings;
