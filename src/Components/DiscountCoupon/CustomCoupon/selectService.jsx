import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { GiSettingsKnobs } from "react-icons/gi";
import { useSelector } from "react-redux";
import { URL } from "@constants/urls";
import { client } from "@axiosClient";

import FlexBox from "@common/UI/FlexBox";
import Modal from "@common/UI/Modal";
import { SECONDARY_200, SECONDARY_901, PRIMARY_900 } from "@common/UI/colors";
import { Body1, Support } from "@common/UI/Headings";
import CrossIcon from "@common/UI/CrossIcon";
import CheckBox from "@common/UI/CheckBox";
import { Button } from "@common/UI/Buttons";
import toast from "react-toastify";
import Bugsnag from "@bugsnag/js";

const Wrapper = styled(FlexBox)`
  position:relative;
  flex-direction: column;
  padding: 1.5rem;
  border-radius: 1rem;
  gap: 1rem;
  overflow-y: auto;
  height: 100%;
`;

const Clear = styled(FlexBox)`
  color: ${PRIMARY_900};
  display: flex;
  padding: 0.3125rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  cursor: pointer;
  border: 1px solid ${PRIMARY_900};
  border-radius: 0.75rem;
`;

const Heading = styled(FlexBox)`
  justify-content: space-between;
  padding: 1rem;
  align-items: center;
  border-bottom: 1px solid ${SECONDARY_200};
`;

const SearchBox = styled(FlexBox)`
  width: 100%;
  padding: 0.25rem 0.75rem;
  align-items: center;
  gap: 0.625rem;
  flex-shrink: 0;
  border-radius: 0.3125rem;
  border: 1px solid #533a71;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  padding: 0.5rem;
  font-size: 1rem;
`;

const OptionsWrapper = styled(FlexBox)`
  flex-direction: column;
  row-gap: 0.25rem;
  overflow-y: auto;
  max-height: 300px;
`;

const Options = styled(FlexBox)`
  align-items: center;
  column-gap: 0.75rem;
  border-bottom: 1px solid ${SECONDARY_901};
`;

const FixedButtonWrapper = styled(FlexBox)`
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  z-index: 10;
  bottom:0;
`;


const SelectService = ({ setServiceModal, onServiceSelect, existingSelectedService = [], runService }) => {
  const [salonServices, setSalonServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState(existingSelectedService);
  const [selectAll, setSelectAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const closeModal = () => {
    setServiceModal(false);
  };

  const storeId = useSelector((state) => state.auth.storeId);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await client.get(runService ? `${URL.getAllCategory}` : `${URL.getAllService}/${storeId}`);
        const services = response?.data?.data || response?.data || [];
        setSalonServices(services);
        setFilteredServices(services);
      } catch (error) {
        toast.error("Failed to load data");
        Bugsnag.notify(error);
      }
    };

    fetchServices();
  }, [storeId, runService]);

  useEffect(() => {
    const filtered = salonServices.filter((service) =>
      (runService ? service.title : service.serviceName).toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredServices(filtered);
  }, [searchTerm, salonServices, runService]);

  const handleClearClick = () => {
    setSelectedServices([]);
    setSelectAll(false);
    setSearchTerm("");
    setFilteredServices(salonServices);
  };

  const handleServiceChange = (id, name) => {
    const serviceObj = { storeId, ...(runService ? { categoryId: id, title: name } : { serviceId: id, serviceName: name }) };

    if (selectedServices.find((service) => (runService ? service.categoryId : service.serviceId) === id)) {
      debugger;
      setSelectedServices(selectedServices.filter((service) => (runService ? service.categoryId : service.serviceId) !== id));
    } else {
      setSelectedServices([...selectedServices, serviceObj]);
    }
  };

  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedServices([]);
    } else {
      setSelectedServices(filteredServices.map((service) => ({
        storeId,
        ...(runService ? { categoryId: service._id, title: service.title } : { serviceId: service._id, serviceName: service.serviceName }),
      })));
    }
    setSelectAll(!selectAll);
  };

  useEffect(() => {
    if (selectedServices.length === filteredServices.length && filteredServices.length > 0) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedServices, filteredServices]);

  const confirmSelection = () => {
    onServiceSelect(selectedServices);
    closeModal();
  };

  return (
    <Modal
      XS
      height="fit-content"
      togglePopup={() => setServiceModal(false)}
      onClose={closeModal}
    >
      <Heading>
        <Clear onClick={handleClearClick}>Clear</Clear>
        <FlexBox align="center" columnGap="0.5rem">
          <GiSettingsKnobs size={16} />
          <Body1 bold>Select Services</Body1>
        </FlexBox>
        <CrossIcon onClick={closeModal} />
      </Heading>
      <Wrapper>
        <SearchBox>
          <img
            src="/assets/Coupons/Custom/search-refraction.svg"
            alt="search"
            width={24}
            height={24}
          />
          <Input
            type="text"
            placeholder="Search service"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBox>
        <OptionsWrapper>
          <Options>
            <CheckBox check={selectAll} onClick={handleSelectAllChange} />
            <Support>Select All</Support>
          </Options>
          {filteredServices.map((service) => (
            <Options key={service._id}>
              <CheckBox
                check={selectedServices.some((s) => (runService ? s.categoryId : s.serviceId) === service._id)}
                onClick={() => handleServiceChange(service._id, runService ? service.title : service.serviceName)}
              />
              <Support>{runService ? service.title : service.serviceName}</Support>
            </Options>
          ))}
        </OptionsWrapper>
        <FixedButtonWrapper>
          <Button width="100%" onClick={confirmSelection}>Continue</Button>
        </FixedButtonWrapper>
      </Wrapper>
    </Modal>
  );
};

export default SelectService;
