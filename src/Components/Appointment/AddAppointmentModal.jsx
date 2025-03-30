import { FiChevronLeft } from "react-icons/fi";
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Bugsnag from "@bugsnag/js";
import dayjs from "dayjs";
import { BooleanParam, useQueryParams } from "use-query-params";
import { client } from "@axiosClient";
import { toast } from "react-toastify";

import { URL } from "@constants/urls";
import { Case, Default, Switch } from "@common/ConditionalRendering";
import FlexBox from "@common/UI/FlexBox";
import { Body2, Body1 } from "@common/UI/Headings";
import { Button } from "@common/UI/Buttons";
import Modal from "@common/UI/Modal";
import AnimationInput from "@common/UI/AnimationInput";
import { SECONDARY_901, PRIMARY_800 } from "@common/UI/colors";
import SelectOption from "@common/SelectOption";
import MultiSelect from "./MultiSelect";
import CrossIcon from "@common/UI/CrossIcon";
import DateInput from "@common/UI/DateInput";
import ProgressBar from "./ProgressBar";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  height: calc(100% - 3.5625rem - 3.5625rem);
  overflow-y: scroll;
`;

const HeadWithClose = styled(FlexBox)`
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${SECONDARY_901};
  padding: 1rem;
`;

const Footer = styled(FlexBox)`
  border-top: 1px solid ${SECONDARY_901};
  padding: 1rem;
`;

const PaymentTotalBox = styled(FlexBox)`
  width: 100%;
  justify-content: space-between;
  padding: 1rem 0;
  border-top: 2px dashed ${SECONDARY_901};
`;

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

const generateTimeOptions = bookingDate => {
  const interval = 15;
  const times = [];
  const now = dayjs();
  const isToday = dayjs(bookingDate).isSame(now, "day");

  const startTime = isToday
    ? now.add(15 - (now.minute() % 15), "minute").startOf("minute")
    : dayjs().set("hour", 8).set("minute", 0).startOf("minute");
  const endTime = dayjs().endOf("day").hour(23).minute(45);

  let currentTime = startTime;

  while (currentTime.isBefore(endTime) || currentTime.isSame(endTime)) {
    const timeLabel = currentTime.format("h:mm A");
    const timeValue = currentTime.format("h:mma");

    times.push({
      value: timeValue,
      label: timeLabel,
    });

    currentTime = currentTime.add(interval, "minute");
  }

  return times;
};

const AddAppointmentModal = () => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [completionValue, setCompletionValue] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    gender: "",
    bookingDate: "",
    bookingTime: "",
    servicesChoosen: [],
    stylistId: "",
  });

  const storeId = useSelector(state => state.auth.storeId);
  const storeStylists = useSelector(state => state.activeStore.storeStylist);
  const storeServiceList = useSelector(
    state => state.activeStore.transformedStoreServices
  );

  const today = new Date().toISOString().split("T")[0];
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [, setQueryParams] = useQueryParams({
    show_add_appointment_modal: BooleanParam,
    reload: BooleanParam,
  });

  const stylists = storeStylists?.map(stylist => ({
    value: stylist?._id,
    label: stylist?.name,
  }));

  const validateField = useCallback((fieldName, value) => {
    const validators = {
      name: value => value.trim(),
      phoneNumber: value => /^[0-9]{10}$/.test(value),
      gender: value => !!value,
      bookingDate: value => !!value,
      bookingTime: value => !!value,
      servicesChoosen: value => value.length > 0,
      stylistId: () => true, // stylist id is optional
    };

    return validators[fieldName](value);
  }, []);

  const closeModal = () => {
    setQueryParams(
      { show_add_appointment_modal: false, reload: true },
      "replaceIn"
    );
  };

  const handleSubmit = async () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else {
      setLoading(true);
      try {
        await client.post(URL.createAppointment, { ...formData, storeId });
        toast.success("Appointment created successfully");
        closeModal();
      } catch (error) {
        toast.error("Failed to create Appointment");
        Bugsnag.notify(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const filterOptionsByValue = (options, valueToCheck) =>
    options.find(option => option?.value === valueToCheck);

  const servicesOptions = storeServiceList?.filter(service =>
    formData.servicesChoosen.some(item => item?.serviceId === service?._id)
  );

  const totalAmount = servicesOptions.reduce(
    (acc, curr) => acc + curr.servicePrice,
    0
  );

  useEffect(() => {
    const allFieldsValid = Object.keys(formData).every(field =>
      validateField(field, formData[field])
    );
    setIsFormValid(allFieldsValid);
  }, [formData, validateField]);

  const handlePhoneNoInput = event => {
    const inputValue = event.target.value
      .replace(/[^\d]|^[^3-9]/g, "")
      .slice(0, 10);
    setFormData(prev => ({ ...prev, phoneNumber: inputValue }));
  };

  const handleKeyDown = event => {
    if (event.key === "-" || event.key === "e") event.preventDefault();
  };

  useEffect(() => {
    setCompletionValue(currentStep / 2);
  }, [currentStep]);

  return (
    <Modal M2 overflow="none">
      <FlexBox column>
        <HeadWithClose>
          <div>
            {currentStep !== 1 && (
              <FlexBox
                cursor="pointer"
                onClick={() => setCurrentStep(prev => prev - 1)}
              >
                <FiChevronLeft size={20} />
              </FlexBox>
            )}
          </div>
          <Body1 bold textAlign="center">
            {currentStep === 1 ? "Add Booking " : "Payment to collect"}
          </Body1>
          <CrossIcon onClick={closeModal} />
        </HeadWithClose>
        <ProgressBar value={completionValue} />
      </FlexBox>
      <Wrapper>
        <Switch>
          <Case condition={currentStep === 1}>
            <FlexBox column rowGap="1rem">
              <AnimationInput
                type="text"
                label="Client Name"
                value={formData.name}
                onChange={e =>
                  setFormData(prev => ({ ...prev, name: e.target.value }))
                }
                required
              />
              <AnimationInput
                type="number"
                label="Phone Number"
                value={formData.phoneNumber}
                onChange={handlePhoneNoInput}
                onKeyDown={handleKeyDown}
                required
              />
              <SelectOption
                className="basic-single"
                placeholder="Gender"
                required
                options={genderOptions}
                formData={formData}
                setFormData={setFormData}
                field="gender"
                value={filterOptionsByValue(genderOptions, formData.gender)}
              />
              <DateInput
                label="Booking Date"
                onChange={e =>
                  setFormData(prev => ({
                    ...prev,
                    bookingDate: e.target.value,
                  }))
                }
                min={today}
                value={formData.bookingDate}
                required
              />
              <SelectOption
                className="basic-single"
                placeholder="Booking time"
                required
                options={generateTimeOptions(formData.bookingDate)}
                formData={formData}
                setFormData={setFormData}
                field="bookingTime"
                value={filterOptionsByValue(
                  generateTimeOptions(formData.bookingDate),
                  formData.bookingTime
                )}
              />
              <SelectOption
                className="basic-single"
                placeholder="Stylist"
                // required
                options={stylists}
                formData={formData}
                setFormData={setFormData}
                field="stylistId"
                value={filterOptionsByValue(stylists, formData.stylistId)}
              />
              <MultiSelect
                required
                options={storeServiceList}
                setFormData={setFormData}
                formData={formData}
              />
            </FlexBox>
          </Case>
          <Default>
            <FlexBox column rowGap="1rem">
              {servicesOptions.map(service => (
                <FlexBox
                  justify="space-between"
                  width="100%"
                  key={service?._id}
                >
                  <Body2 textTransform="capitalize">
                    {service?.serviceName}
                  </Body2>
                  <Body2 bold color={PRIMARY_800}>
                    ₹{service?.servicePrice}
                  </Body2>
                </FlexBox>
              ))}
              <PaymentTotalBox justify="space-between" width="100%">
                <Body1 bold>Total Bill</Body1>
                <Body1 bold>₹{totalAmount}</Body1>
              </PaymentTotalBox>
            </FlexBox>
          </Default>
        </Switch>
      </Wrapper>
      <Footer padding="1rem 1.5rem">
        <Button
          primary
          width="100%"
          disabled={!isFormValid || loading}
          onClick={handleSubmit}
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      </Footer>
    </Modal>
  );
};

export default AddAppointmentModal;
