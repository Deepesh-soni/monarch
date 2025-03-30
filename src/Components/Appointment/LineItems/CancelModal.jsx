import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { URL } from "@constants/urls";
import Bugsnag from "@bugsnag/js";
import { client } from "@axiosClient";
import { useQueryParam, BooleanParam } from "use-query-params";
import styled from "styled-components";

import Modal from "@common/UI/Modal";
import FlexBox from "@common/UI/FlexBox";
import { toast } from "react-toastify";
import { Body1 } from "@common/UI/Headings";
import { Button } from "@common/UI/Buttons";
import { SECONDARY_901, ACCENT_200, ACCENT_400 } from "@common/UI/colors";
import ReactSelect from "@common/UI/AnimationSelect";
import AnimationInput from "@common/UI/AnimationInput";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
`;

const Container = styled(FlexBox)`
  padding: 1rem;
  border-top: 1px solid ${SECONDARY_901};
  row-gap: 1.5rem;
`;

const Header = styled(FlexBox)`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${ACCENT_400};
  padding: 0.75rem 1rem;
`;

const CloseButton = styled(FlexBox)`
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  background-color: ${ACCENT_200};
`;

const ButtonWrapper = styled(FlexBox)`
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 100%;
`;

const options = [
  { value: "Personal Reason", label: "Personal Reason" },
  { value: "Health Issue", label: "Health Issue" },
  { value: "Scheduling Conflict", label: "Scheduling Conflict" },
  { value: "Other", label: "Other" },
];

const CancelModal = ({
  id,
  mode,
  bookingTime,
  bookingDate,
  setCancelUI,
  onConfirmAction,
}) => {
  const [reason, setReason] = useState("");
  const [reasonDescription, setReasonDescription] = useState("");
  const [, setReload] = useQueryParam("reload", BooleanParam);

  const formatBookingDate = date => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatTimeToAMPM = time => {
    const [hours, minutes] = time.split(":").map(Number);
    const amPm = hours >= 12 ? "PM" : "AM";
    const adjustedHours = hours % 12 || 12; 
    return `${adjustedHours}:${String(minutes).padStart(2, "0")} ${amPm}`;
  };

  const handleConfirmAction = async () => {
    try {
      const formattedBookingDate = formatBookingDate(bookingDate);
      const formatTime = formatTimeToAMPM(bookingTime);
      console.log("time", formatTime);

      if (mode === "reschedule") {
        await client.post(`${URL.appointmentReschedule}/${id}`, {
          bookingTime: formatTime,
          bookingDate: formattedBookingDate,
          reason,
          description: reasonDescription,
        });
        toast.success("Appointment rescheduled successfully");
      } else if (mode === "cancel") {
        await client.post(`${URL.cancelBooking}/${id}`, {
          cancel: 1,
          reason,
          description: reasonDescription,
        });
        toast.success("Booking Cancelled");
      }
      setCancelUI(false);
      onConfirmAction();
    } catch (error) {
      toast.error(`Failed to ${mode}, please try again`);
      Bugsnag.notify(error);
    } finally {
      setReload(true);
    }
  };

  const handleClose = () => {
    console.log("Close button clicked");
    setCancelUI(false);
  };

  return (
    <Modal
      XS
      togglePopup={() => setCancelUI(false)}
      height="65%"
      mobileHeight="fit-content"
      mobileWidth="90%"
      mobileBorderRadius="0.5rem"
      borderRadius="1rem"
    >
      <Wrapper>
        <Header>
          <div />
          <Body1 bold>
            {mode === "cancel"
              ? "Reason for Canceling"
              : "Reason for Rescheduling"}
          </Body1>
          <CloseButton onClick={handleClose}>
            <FiX strokeWidth={1} size={20} />
          </CloseButton>
        </Header>
        <Container column>
          <Body1 textAlign="center">
            Please select the reason for your {mode} of the appointment.
          </Body1>
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <Body1>Scheduled Time: {formatTimeToAMPM(bookingTime)}</Body1>
          </div>
          <ReactSelect
            className="basic-single"
            placeholder={
              mode === "cancel"
                ? " Select your Reason for Canceling"
                : "Select your Reason for Rescheduling"
            }
            options={options}
            onChange={e => {
              setReasonDescription(e.value);
            }}
          />
          <AnimationInput
            required
            label={`Please describe the reason for ${
              mode === "cancel" ? "canceling" : "rescheduling"
            } your booking.`}
            onChange={e => setReason(e.target.value)}
          />
          <ButtonWrapper>
            <Button
              outline
              width="100%"
              secondary
              onClick={() => setCancelUI(false)}
            >
              Cancel
            </Button>
            <Button width="100%" onClick={handleConfirmAction}>
              Submit
            </Button>
          </ButtonWrapper>
        </Container>
      </Wrapper>
    </Modal>
  );
};

export default CancelModal;
