import React from "react";
import styled from "styled-components";
import { URL } from "@constants/urls";
import Bugsnag from "@bugsnag/js";
import { useSelector } from "react-redux";
import { client } from "@axiosClient";
import { toast } from "react-toastify";
import { useQueryParam, BooleanParam } from "use-query-params";

import { device } from "@common/UI/Responsive";
import FlexBox from "@common/UI/FlexBox";
import { Body2 } from "@common/UI/Headings";
import { SECONDARY_500, SECONDARY_0, ACCENT_901 } from "@common/UI/colors";
import { Button } from "@common/UI/Buttons";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  min-width: 18rem;
  width: 100%;
  height: 100%;
  border-radius: 0.75rem;
  background-color: ${ACCENT_901};
  padding: 0 0.25rem;

  @media ${device.laptop} {
    padding: 0 1rem;
  }
`;

const TitleBox = styled(FlexBox)`
  width: 100%;
  flex-direction: column;
  row-gap: 0.5rem;
  align-items: flex-start;
  padding: 1rem;
  border-bottom: 2px solid ${SECONDARY_0};
`;

const Container = styled(FlexBox)`
  width: 100%;
  padding: 1rem;
  flex-direction: column;
  row-gap: 0.5rem;
`;

const Dot = styled(FlexBox)`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: ${SECONDARY_500};
`;

const ConfirmationCard = ({ data }) => {
  const {
    _id,
    name,
    bookingTime,
    bookingDate,
    servicesChoosen,
    gender,
    stylistId,
  } = data ?? {};

  const [, setReload] = useQueryParam("reload", BooleanParam);

  const storeStylists = useSelector(state => state.activeStore.storeStylist);
  const storeServiceList = useSelector(
    state => state.activeStore.transformedStoreServices
  );

  const storeStylistList = storeStylists?.map(stylist => {
    return { value: stylist?._id, label: stylist?.name };
  });

  const selectedStylist = storeStylistList?.find(
    stylist => stylist?.value === stylistId
  );

  const selectedService = storeServiceList?.filter(item =>
    servicesChoosen?.some(service => service?.serviceId === item?._id)
  );

  const confirmAppointment = async (appointmentId, accepted) => {
    try {
      await client.patch(`${URL.confirmAppointment}`, {
        appointmentId,
        accepted,
      });
      accepted
        ? toast.success("Booking Accepted")
        : toast.success("Booking Rejected");
    } catch (error) {
      toast.error("Failed to confirm bookings");
      Bugsnag.notify(error);
    } finally {
      setReload(true);
    }
  };

  return (
    <Wrapper>
      <TitleBox>
        <Body2 bold textTransform="capitalize">
          {name}
          <span>({gender?.[0]})</span>
        </Body2>
        <FlexBox columnGap="0.5rem" align="center">
          <Body2 color={SECONDARY_500}>{bookingTime} </Body2>
          <Dot />
          <Body2 color={SECONDARY_500}>{bookingDate}</Body2>
        </FlexBox>
      </TitleBox>
      <Container>
        <FlexBox>
          <Body2 textTransform="capitalize">
            Stylist:{" "}
            <span style={{ color: SECONDARY_500 }}>
              {selectedStylist?.label}
            </span>
          </Body2>
        </FlexBox>
        <FlexBox columnGap="0.5rem">
          <Body2>
            Services:{" "}
            {selectedService?.map((service, index) => (
              <span key={index} style={{ color: SECONDARY_500 }}>
                {service?.serviceName}
                {!(index === servicesChoosen?.length - 1) && <span>, </span>}
              </span>
            ))}
          </Body2>
        </FlexBox>
      </Container>
      <FlexBox columnGap="0.5rem" padding="0 1rem 1rem">
        <Button
          outline
          oval
          width="100%"
          onClick={() => confirmAppointment(_id, 0)}
        >
          Reject
        </Button>
        <Button
          primary
          oval
          width="100%"
          onClick={() => confirmAppointment(_id, 1)}
        >
          Accept
        </Button>
      </FlexBox>
    </Wrapper>
  );
};

export default ConfirmationCard;
