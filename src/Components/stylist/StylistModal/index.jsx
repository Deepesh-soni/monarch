import React, { useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import styled from "styled-components";
import { toast } from "react-toastify";
import Bugsnag from "@bugsnag/js";
import { useSelector } from "react-redux";
import { client } from "@axiosClient";

import { URL } from "@constants/urls";
import FlexBox from "@common/UI/FlexBox";
import { SECONDARY_200 } from "@common/UI/colors";
import CrossIcon from "@common/UI/CrossIcon";
import { Body1 } from "@common/UI/Headings";
import { Case, Default, Switch } from "@common/ConditionalRendering";
import Modal from "@common/UI/Modal";
import EditModal from "./EditModal";
import OtpVerify from "./OtpVerify";
import RegistrationCompleted from "./RegistrationCompleted";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  padding: 1.5rem;
  border-radius: 1rem;
`;

const BackIcon = styled.div`
  top: 1rem;
  left: 1rem;
  cursor: pointer;
`;

const Heading = styled(FlexBox)`
  justify-content: space-between;
  padding: 1rem;
  align-items: center;
  border-bottom: 1px solid ${SECONDARY_200};
`;

const StylistModal = ({
  openModal,
  closeModal,
  options,
  data,
  refreshList,
  isUpdate = false,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const storeId = useSelector(state => state.auth.storeId);
  const ownerId = useSelector(state => state.auth.user.userId);

  const [formData, setFormData] = useState({
    avatar: data?.avatar || "",
    name: data?.name || "",
    phoneNumber: data?.phoneNumber || "",
    joiningDate: data?.joiningDate,
    userType: data?.userType || "",
    expertise: data?.expertise || [],
  });

  const handleBackClick = () => {
    if (currentStep > 1) {
      setCurrentStep(prevStep => prevStep - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const id = data?._id;
      const url = isUpdate
        ? `${URL.updateStylist}/${storeId}/${id}`
        : URL.createStylists;
      await client.post(url, { ...formData, ownerId, storeId });
      toast.success(
        isUpdate
          ? "Stylist data updated successfully"
          : "Stylist added successfully"
      );
      setCurrentStep(prev => prev + 1);
    } catch (error) {
      toast.error(
        isUpdate ? "Failed to update stylist" : "Failed to add stylist"
      );
      Bugsnag.notify(error);
    } finally {
      refreshList();
      setLoading(false);
    }
  };

  return (
    <Modal
      togglePopup={openModal}
      S
      height="fit-content"
      overflow="none"
      maxHeight="fit-content"
    >
      <Heading>
        <div>
          {currentStep !== 1 && (
            <BackIcon onClick={handleBackClick}>
              <FiChevronLeft size={24} />
            </BackIcon>
          )}
        </div>
        <Body1 bold>
          {currentStep === 1
            ? isUpdate
              ? "Update Details"
              : "Add Details"
            : null}
          {currentStep === 2 && "Verify Otp"}
          {currentStep === 3 && "Registration Completed"}
        </Body1>
        <CrossIcon onClick={closeModal} />
      </Heading>
      <Wrapper>
        <Switch>
          <Case condition={currentStep === 2}>
            <OtpVerify
              loading={loading}
              phoneNumber={formData.phoneNumber}
              handleSubmit={handleSubmit}
              isUpdate={isUpdate}
            />
          </Case>
          <Case condition={currentStep === 3}>
            <RegistrationCompleted closeModal={closeModal} />
          </Case>
          <Default>
            <EditModal
              options={options}
              setCurrentStep={setCurrentStep}
              formData={formData}
              setFormData={setFormData}
              isUpdate={isUpdate}
            />
          </Default>
        </Switch>
      </Wrapper>
    </Modal>
  );
};

export default StylistModal;
