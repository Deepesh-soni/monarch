import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import FlexBox from "@common/UI/FlexBox";
import { Body2, Body1, Support } from "@common/UI/Headings";
import { SECONDARY_500, PRIMARY_900 } from "@common/UI/colors";
import { Button } from "@common/UI/Buttons";
import { boxShadowDs2 } from "@common/UI/styles";
import ActionButtons from "./ActionButtons";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  height: calc(100% - 3.5625rem - 1rem);
  overflow-y: scroll;
  justify-content: space-between;
  transition: transform 0.25s ease-in-out;
`;

const DetailsContainer = styled(FlexBox)`
  flex-direction: column;
  padding: 1rem;
  row-gap: 1rem;
`;

const Dot = styled(FlexBox)`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: ${SECONDARY_500};
`;

const Body = styled(Body2)`
  color: ${SECONDARY_500};
  text-transform: capitalize;
`;

const SingleService = styled(FlexBox)`
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const MoreServiceContainer = styled(FlexBox)`
  flex-direction: column;
  row-gap: 0.75rem;
  padding: 1rem;
`;

const ScrollableBox = styled(FlexBox)`
  flex-direction: column;
  max-height: 90%;
  overflow: auto;
`;

const ButtonContainer = styled(FlexBox)`
  padding: 0 1rem;
  width: 100%;
  ${boxShadowDs2}
`;

const AddButton = styled(FlexBox)`
  padding: 0.25rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.313rem;
  border: 2px solid ${PRIMARY_900};
  cursor: pointer;
`;

const BookingDetails = ({ data, setCurrentStep, setUpdatedDataToSend }) => {
  const { name, bookingTime, stylistId, servicesChoosen = [] } = data ?? {}; // Default to an empty array if undefined

  const storeServiceList = useSelector(
    state => state?.activeStore?.transformedStoreServices || []
  );
  const storeStylists = useSelector(
    state => state?.activeStore?.storeStylist || []
  );

  const storeStylistList = storeStylists.map(stylist => ({
    value: stylist?._id,
    label: stylist?.name,
  }));

  const selectedStylist = storeStylistList.find(
    stylist => stylist?.value === stylistId
  );

  const remainingAvailableServices = storeServiceList.filter(
    item => !servicesChoosen.some(service => service?.serviceId === item?._id)
  );

  const [presentServices, setPresentServices] = useState(servicesChoosen); // Initialize with servicesChoosen
  useEffect(() => {
    setPresentServices(servicesChoosen);
  }, [servicesChoosen]);

  const addServices = service => {
    const { _id, ...rest } = service ?? {};
    const newService = { ...rest, serviceId: _id, serviceEndTime: null };
    setPresentServices(prevServices => {
      const newServices = [...(prevServices || []), newService];
      setUpdatedDataToSend(prev => ({
        eventType: null,
        servicesChoosen: newServices,
        endServiceId: null,
        startServiceId: null,
      }));
      return newServices;
    });
  };

  const removeService = id => {
    setPresentServices(prevServices => {
      const updatedServices = (prevServices || []).filter(
        prevService => prevService?.serviceId !== id
      );
      setUpdatedDataToSend(prev => ({
        ...prev,
        servicesChoosen: updatedServices,
      }));
      return updatedServices;
    });
  };

  const nextStepHandle = () => {
    setUpdatedDataToSend(prev => ({
      ...prev,
      eventType: "end",
    }));
    setCurrentStep(2);
  };

  const disableCta = !presentServices?.every(
    service => !!service?.serviceEndTime
  );

  return (
    <Wrapper>
      <ScrollableBox>
        <DetailsContainer>
          <FlexBox column rowGap="0.5rem">
            <Body2 textTransform="capitalize">
              <span style={{ fontWeight: "600" }}> {name}</span> #12345
            </Body2>
            <FlexBox columnGap="0.5rem" align="center">
              <Body>{bookingTime}</Body>
              <Dot />
              <Body>{selectedStylist?.label}</Body>
            </FlexBox>
          </FlexBox>
          <FlexBox column rowGap="1rem">
            {presentServices?.map((service, index) => (
              <SingleService key={service?.serviceId}>
                <FlexBox column>
                  <Support color={SECONDARY_500}>
                    Service {" #"}
                    <span>{index + 1}</span>
                  </Support>
                  <Body2 textTransform="capitalize">
                    {service?.serviceName}
                  </Body2>
                </FlexBox>

                <ActionButtons
                  setUpdatedDataToSend={setUpdatedDataToSend}
                  removeService={removeService}
                  service={service}
                />
              </SingleService>
            ))}
          </FlexBox>
        </DetailsContainer>
        <MoreServiceContainer>
          {remainingAvailableServices?.length >= 1 && (
            <Body1 bold>Add Services</Body1>
          )}
          {remainingAvailableServices.map(service => (
            <FlexBox justify="space-between" align="center" key={service?._id}>
              <Body2 textTransform="capitalize">{service?.serviceName}</Body2>
              <AddButton  onClick={() => addServices(service)}>
                    <img
                      src="/assets/images/add.webp"
                      alt="add item"
                      width={8}
                      height={8}
                    />
                  </AddButton>
            </FlexBox>
          ))}
        </MoreServiceContainer>
      </ScrollableBox>

      <ButtonContainer>
        <Button
          width="100%"
          disabled={disableCta}
          onClick={() => nextStepHandle(data)}
        >
          End Booking
        </Button>
      </ButtonContainer>
    </Wrapper>
  );
};

export default BookingDetails;
