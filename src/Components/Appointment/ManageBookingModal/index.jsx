import React, { useState, useEffect } from "react";
import { FiChevronLeft } from "react-icons/fi";
import dynamic from "next/dynamic";
import {
  useQueryParams,
  StringParam,
  useQueryParam,
  BooleanParam,
} from "use-query-params";
import { client } from "@axiosClient";
import { toast } from "react-toastify";
import Bugsnag from "@bugsnag/js";
import styled from "styled-components";

import { URL } from "@constants/urls";
import Modal from "@common/UI/Modal";
import FlexBox from "@common/UI/FlexBox";
import { Case, Default, Switch } from "@common/ConditionalRendering";
import { Body1 } from "@common/UI/Headings";
import { SECONDARY_0 } from "@common/UI/colors";
import Loader from "@common/Loader";
import CrossIcon from "@common/UI/CrossIcon";
import BookingDetails from "./Step1ManageBooking/BookingDetails";
import ProgressBar from "../ProgressBar";

const PaymentDetailsModal = dynamic(() => import("./PaymentDetailsModal"), {
  loading: () => <Loader fitContent />,
});

const SurveyStep = dynamic(() => import("./Survey"), {
  loading: () => <Loader fitContent />,
});

const Heading = styled(FlexBox)`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid ${SECONDARY_0};
`;

const ManageBookingModal = ({ closeModal = () => {} }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({});
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [updatedDataToSend, setUpdatedDataToSend] = useState(null);

  const [queryParams] = useQueryParams({
    id: StringParam,
    show_invoice: BooleanParam,
  });
  const { id } = queryParams;
  const [, setReload] = useQueryParam("reload", BooleanParam);

  useEffect(() => {
    if (!id) return;

    const bookingDetailsData = async () => {
      try {
        const response = await client.get(`${URL.getSingleAppointment}/${id}`);
        setBookingData(response?.data?.data || {});
        setCurrentStep(response?.data?.data?.appointmentSteps);
      } catch (error) {
        toast.error("Failed to open this booking");
        Bugsnag.notify(error);
      }
    };
    bookingDetailsData();
  }, [id]);

  const manageBookingUpdate = async () => {
    if (!id) return;
    try {
      const response = await client.patch(URL.manageBooking, {
        appointmentId: id,
        ...updatedDataToSend,
      });
      setBookingData(response?.data?.data || {});
    } catch (error) {
      toast.error("Failed to proceed");
      Bugsnag.notify(error);
    } finally {
      setReload(true);
    }
  };

  useEffect(() => {
    if (!updatedDataToSend) return;
    manageBookingUpdate();
  }, [updatedDataToSend]);

  const completionValue = currentStep / 3;

  return (
    <Modal M1 overflow="hidden" height="95vh">
      <FlexBox column>
        <Heading>
          <div>
            {currentStep !== 1 && (
              <div onClick={() => setCurrentStep(prev => prev - 1)}>
                <FiChevronLeft size={20} />
              </div>
            )}
          </div>
          <Switch>
            <Case condition={currentStep === 1}>
              <Body1 bold>Appointment Details </Body1>
            </Case>
            <Case condition={currentStep === 2}>
              <Body1 bold>Payment Details</Body1>
            </Case>
            <Default>
              <Body1 bold>Last Step </Body1>
            </Default>
          </Switch>
          <CrossIcon onClick={closeModal} />
        </Heading>
        <ProgressBar value={completionValue} />
      </FlexBox>
      <Switch>
        <Case condition={currentStep === 1}>
          <BookingDetails
            setCurrentStep={setCurrentStep}
            data={bookingData}
            manageBookingUpdate={manageBookingUpdate}
            setUpdatedDataToSend={setUpdatedDataToSend}
          />
        </Case>
        <Case condition={currentStep === 2}>
          <PaymentDetailsModal
            setCurrentStep={setCurrentStep}
            data={bookingData}
            appliedCoupon={appliedCoupon}
            setUpdatedDataToSend={setUpdatedDataToSend}
          />
        </Case>
        <Default>
          <SurveyStep setUpdatedDataToSend={setUpdatedDataToSend} />
        </Default>
      </Switch>
    </Modal>
  );
};

export default ManageBookingModal;
