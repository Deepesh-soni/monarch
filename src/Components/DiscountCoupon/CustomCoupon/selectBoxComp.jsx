import React, { useState } from "react";
import styled from "styled-components";
import { PiCaretDownThin } from "react-icons/pi";

import FlexBox from "@common/UI/FlexBox";
import { SECONDARY_200, PRIMARY_900 } from "@common/UI/colors";
import { Body2 } from "@common/UI/Headings";
import SelectService from "./selectService";

const SelectBox = styled(FlexBox)`
  padding: 0.375rem 0.75rem;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  border-radius: 0.3125rem;
  border: 1px solid var(--Brand-color, ${SECONDARY_200});
  background: #fff;
  max-width: 14rem;
`;

const AllchoiceBox = styled(FlexBox)`
  max-width: 13.8125rem;
  height: 10rem;
  overflow: scroll;
  width: 100%;
  padding: 0.25rem 0.75rem;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.3125rem;
  border: 1px solid #533a71;
`;

const SelectBoxComp = ({
  serviceDropDown,
  handleServiceDropChange,
  identifier,
  runService,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [serviceModal, setServiceModal] = useState(false);
  const [selectedServices, setSelectedServices] = useState({
    productName: [],
    serviceName: [],
    exemptService: [],
  });

  const handleServiceChange = serviceList => {
    setSelectedServices(prevState => ({
      ...prevState,
      [identifier]: serviceList,
    }));
    handleServiceDropChange(serviceList);
    setServiceModal(false);
  };

  const handleServiceModal = () => {
    setServiceModal(true);
  };

  const renderSelectedServices = () => {
    return (
      <FlexBox align="center" columnGap="1.5rem">
        <AllchoiceBox>
          <FlexBox column width="15rem">
            {selectedServices[identifier].map((service, index) => (
              <Body2 key={index} style={{ marginRight: "10px" }}>
                {runService ? service.title : service.serviceName}
              </Body2>
            ))}
          </FlexBox>
        </AllchoiceBox>
        <Body2
          color={PRIMARY_900}
          cursor="pointer"
          style={{ textDecoration: "underline" }}
          onClick={handleServiceModal}
        >
          Edit
        </Body2>
      </FlexBox>
    );
  };

  return (
    <>
      {serviceModal && (
        <SelectService
          setServiceModal={setServiceModal}
          onServiceSelect={handleServiceChange}
          existingSelectedService={selectedServices[identifier]}
          runService={runService}
        />
      )}
      <FlexBox column rowGap="1rem">
        <SelectBox>
          <Body2 color={SECONDARY_200}>
            Select{" "}
            {identifier === "productName" ? "Product Name" : "Service Names"}
          </Body2>
          <PiCaretDownThin size={22} onClick={handleServiceModal} />
        </SelectBox>

        {selectedServices[identifier].length > 0 && renderSelectedServices()}
      </FlexBox>
    </>
  );
};

export default SelectBoxComp;
