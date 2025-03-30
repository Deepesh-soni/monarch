import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { client } from "@axiosClient";
import { toast } from "react-toastify";
import { isEqual } from "lodash";
import Bugsnag from "@bugsnag/js";
import dayjs from "dayjs";

import FlexBox from "@common/UI/FlexBox";
import { Button } from "@common/UI/Buttons";
import { URL } from "@constants/urls";
import AnimationInput from "@common/UI/AnimationInput";
import AnimationSelect from "@common/UI/AnimationSelect";
import DateInput from "@common/UI/DateInput";
import UploadImage from "../UploadImage";
import MultiSelect from "../MultiSelect";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  row-gap: 1rem;
`;

const roleOptions = [
  { value: 2, label: "Co-Owner" },
  { value: 3, label: "Stylist" },
  { value: 4, label: "Receptionist" },
];

const EditModal = ({
  data,
  isUpdate = false,
  options,
  setCurrentStep,
  formData,
  setFormData,
}) => {
  const storeId = useSelector(state => state.auth.storeId);
  const user = useSelector(state => state.auth.user);

  const initialFormData = {
    avatar: data?.avatar,
    name: data?.name,
    phoneNumber: data?.phoneNumber,
    joiningDate: data?.joiningDate,
    expertise: data?.expertise,
    userType: data?.userType,
  };

  const handleSendOtp = async () => {
    if (!user?.phoneNumber || user?.phoneNumber.length !== 10) {
      return toast.error("Failed to send OTP.");
    }

    try {
      const res = await client.post(
        URL?.sendOtp,
        { phoneNumber: formData.phoneNumber },
        { authorization: false }
      );
      setCurrentStep(prev => prev + 1);
      if (res?.data?.success) {
        // setOtpSent(true);
      }
    } catch (error) {
      toast.error("Failed to send OTP. Please try again.");
      Bugsnag.notify(error);
    }
  };

  const handleInput = (value, fieldName) => {
    let newValue = value;

    if (fieldName === "phoneNumber") {
      // Allow only numeric values
      newValue = value.replace(/\D/g, "");
    }

    if (fieldName === "name") {
      newValue = value.replace(/[^a-zA-Z\s]/g, "");
    }

    setFormData(prevData => ({
      ...prevData,
      [fieldName]: newValue,
    }));
  };

  const validateField = (fieldName, value) => {
    let isValid = true;

    switch (fieldName) {
      case "name":
        if (!value.trim()) {
          isValid = false;
        }
        break;

      case "joiningDate":
        if (!value) {
          isValid = false;
        }
        break;

      // Hiding expertise for owners and receptionist
      // case "expertise":
      //   if (value.length === 0) {
      //     isValid = false;
      //   }
      //   break;

      case "phoneNumber":
        if (!value || !/^[0-9]{10}$/.test(value)) {
          isValid = false;
        }
        break;

      default:
        break;
    }

    return isValid;
  };

  const isModified = !isEqual(formData, initialFormData);
  const isFormValid = Object.keys(formData).every(field => {
    return validateField(field, formData[field]);
  });
  const today = new Date().toISOString().split("T")[0];

  const selectedRole = roleOptions?.filter(
    item => item?.value === formData?.userType
  )?.[0];

  const joiningDate = formData?.joiningDate
    ? dayjs(formData?.joiningDate).format("YYYY-MM-DD")
    : "";

  return (
    <Wrapper>
      <FlexBox justify="center">
        <UploadImage
          formData={formData}
          setFormData={setFormData}
          storeId={storeId}
        />
      </FlexBox>
      <FlexBox column rowGap="1rem">
        <AnimationInput
          required
          type="text"
          value={formData.name}
          label="Full Name"
          onChange={e => handleInput(e.target.value, "name")}
        />
        <AnimationInput
          required
          type="tel"
          inputMode="numeric"
          disabled={isUpdate}
          value={formData.phoneNumber}
          label="Phone Number"
          onChange={e =>
            handleInput(e.target.value?.slice(0, 10), "phoneNumber")
          }
        />
        <AnimationSelect
          isRequired
          className="basic-single"
          placeholder="Role"
          options={roleOptions}
          value={selectedRole}
          onChange={option => {
            handleInput(option.value, "userType");
          }}
          field="userType"
        />
        <DateInput
          required
          label="Date of Joining"
          value={joiningDate}
          onChange={e => handleInput(e.target.value, "joiningDate")}
          max={today}
        />
        {/* only show expertise for user type stylist */}
        {formData?.userType === 3 && (
          <MultiSelect
            options={options}
            setFormData={setFormData}
            formData={formData}
          />
        )}
        <Button
          required
          primary
          width="100%"
          onClick={handleSendOtp}
          disabled={!isFormValid || !isModified}
        >
          Proceed
        </Button>
      </FlexBox>
    </Wrapper>
  );
};

export default EditModal;
