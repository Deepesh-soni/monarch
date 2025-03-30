import React, { useState, useEffect } from "react";
import { TfiClose } from "react-icons/tfi";
import isEqual from "lodash/isEqual";
import { toast } from "react-toastify";
import Bugsnag from "@bugsnag/js";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { H3, H6 } from "@common/UI/Headings";
import { Button } from "@common/UI/Buttons";
import FlexBox from "@common/UI/FlexBox";
import Modal from "@common/UI/Modal";
import TextArea from "@common/UI/TextArea";
import { client } from "@axiosClient";
import { URL } from "@constants/urls";
import AnimationInput from "@common/UI/AnimationInput";
import ReactSelect from "@common/UI/AnimationSelect";
import { trackEvent } from "@utils/helper";

const Wrapper = styled(FlexBox)`
  position: relative;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  row-gap: 8rem;
  padding: 1rem 2rem 1rem;
`;

const Close = styled(FlexBox)`
  position: absolute;
  top: 0px;
  right: 0px;
  padding: 0.8rem 0.8rem 0rem 0rem;
  cursor: pointer;
`;

const options = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Unisex", label: "Unisex" },
];

const ServiceModal = ({
  closeModal,
  openModal,
  data = null,
  categoryId,
  refreshList,
  isUpdate = false,
  textCta = "submit",
  activeCategory,
}) => {
  const [formData, setFormData] = useState({
    ...data,
    serviceName: data?.serviceName || "",
    description: data?.description || "",
    timeTaken: data?.timeTaken ? Math.ceil(data?.timeTaken / 60) : "",
    mrp: data?.mrp || "",
    servicePrice: data?.servicePrice || "",
    serviceGender: data?.serviceGender || "",
  });

  const initialFormData = {
    ...data,
    serviceName: data?.serviceName || "",
    description: data?.description || "",
    timeTaken: data?.timeTaken ? Math.ceil(data?.timeTaken / 60) : "",
    mrp: data?.mrp || "",
    servicePrice: data?.servicePrice || "",
    serviceGender: data?.serviceGender || "Male",
  };

  const { serviceName, description, timeTaken, mrp, serviceGender } = formData;

  const [errors, setErrors] = useState({});

  useEffect(() => {
    trackEvent("service_modal_load", {
      current_page: "services",
      selected_category: activeCategory,
      cta_label: textCta,
      is_update: isUpdate,
    });
  }, []);
  const storeId = useSelector(state => state.auth.storeId);

  const createService = async () => {
    try {
      await client.post(URL.createService, {
        storeId,
        mrp,
        servicePrice: mrp,
        serviceName,
        categoryId: categoryId || data?.categoryId,
        description,
        timeTaken: timeTaken * 60,
        serviceGender,
      });
      toast.success("Service created successfully!");
    } catch (error) {
      toast.error("Failed to create service.");
      Bugsnag.notify(error);
    } finally {
      refreshList();
    }
  };

  const updateServiceForm = async () => {
    try {
      await client.patch(`${URL.updateService}/${data?._id}`, {
        ...formData,
        categoryId: categoryId || data?.categoryId,
        timeTaken: formData.timeTaken * 60,
      });
      toast.success("Service updated!");
    } catch (error) {
      toast.error("Failed to update service.");
      Bugsnag.notify(error);
    } finally {
      refreshList();
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!serviceName.trim()) {
      newErrors.serviceName = "Name field cannot be empty";
    }
    if (!serviceGender.trim()) {
      newErrors.serviceGender = "Gender must be selected";
    }
    if (!mrp || isNaN(mrp) || mrp <= 0) {
      newErrors.mrp = "MRP field cannot be empty";
    }
    // if (!servicePrice || isNaN(servicePrice)) {
    //   newErrors.servicePrice = "Charges field cannot be empty";
    // }
    if (!timeTaken || isNaN(timeTaken) || timeTaken <= 0) {
      newErrors.timeTaken = "Time field cannot be empty";
    }
    return newErrors;
  };

  const dataChanged = !isEqual(initialFormData, formData);

  const handleSubmit = async () => {
    const newErrors = validateForm();

    trackEvent("service_modal_cta_click", {
      current_page: "services",
      item_type: "cta",
      selected_category: activeCategory,
      selected_option: textCta,
      is_update: isUpdate,
    });

    if (Object.keys(newErrors).length === 0 && dataChanged) {
      isUpdate ? updateServiceForm() : createService();
      closeModal();
    } else {
      setErrors(newErrors);
      toast.error("Failed to Update");
    }
  };

  const selectedValue = options?.filter(
    option => option?.value === serviceGender
  )?.[0];

  const handleInputChange = fieldName => {
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/\D/g, "");
    inputValue = inputValue.replace(/^0+/, "");
    setFormData({ ...formData, [fieldName]: inputValue });
  };

  const handleKeyDown = event => {
    if (event.key === "-" || event.key === "e") {
      event.preventDefault();
    }
  };

  return (
    <Modal
      togglePopup={openModal}
      M2
      mobileBorderRadius="1rem"
      borderRadius="1rem"
      maxHeight="95vh"
      mobileHeight="90vh"
      mobileWidth="90vw"
    >
      <Wrapper>
        <FlexBox column rowGap="1rem">
          <H3 textAlign="center" textTransform="capitalize" bold>
            {isUpdate ? "Update" : "Create"} service
          </H3>
          <Close onClick={closeModal}>
            <TfiClose size={20} />
          </Close>

          <AnimationInput
            required
            error={errors?.serviceName}
            label="Name"
            value={serviceName}
            onChange={e =>
              setFormData({ ...formData, serviceName: e.target.value })
            }
          />
          <TextArea
            label="Description"
            value={description}
            onChange={e =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <AnimationInput
            required
            error={errors?.timeTaken}
            label="Time Required (Min)"
            type="number"
            value={timeTaken}
            min="0"
            onChange={() => handleInputChange("timeTaken")}
            onKeyDown={handleKeyDown}
          />
          <AnimationInput
            required
            error={errors?.mrp}
            label="MRP (Rs)"
            type="number"
            value={mrp}
            min="0"
            onChange={() => handleInputChange("mrp")}
            onKeyDown={handleKeyDown}
          />
          {/* <AnimationInput
            required
            error={errors?.servicePrice}
            type="number"
            label="Charges (Rs)"
            value={servicePrice}
            onChange={e =>
              setFormData({ ...formData, servicePrice: e.target.value })
            }
          /> */}
          <ReactSelect
            isRequired
            className="basic-single"
            classNamePrefix="select"
            placeholder="Select gender"
            error={errors?.serviceGender}
            options={options}
            value={selectedValue}
            onChange={e => {
              setFormData({ ...formData, serviceGender: e.value });
            }}
          />
          {errors?.serviceGender && <H6 color={'red'}>{errors.serviceGender}</H6>}
        </FlexBox>
        <FlexBox justify="center">
          <Button onClick={handleSubmit} width="100%" disabled={!dataChanged}>
            {textCta}
          </Button>
        </FlexBox>
      </Wrapper>
    </Modal>
  );
};

export default ServiceModal;
