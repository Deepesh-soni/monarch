import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import Modal from "@common/UI/Modal";
import FlexBox from "@common/UI/FlexBox";
import { SECONDARY_GREY, WHITE, SECONDARY_0 } from "@common/UI/colors";
import { Body1, Body2 } from "@common/UI/Headings";
import CrossIcon from "@common/UI/CrossIcon";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localeData from "dayjs/plugin/localeData";

dayjs.extend(customParseFormat);
dayjs.extend(localeData);

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  row-gap: 1rem;
  padding: 1rem 1rem 2rem;
`;

const HeadWithClose = styled(FlexBox)`
  width: 100%;
  position: relative;
  padding: 1.5rem 1rem 1rem;
  border-bottom: 1px solid ${SECONDARY_0};
  align-items: center;
  justify-content: space-between;
`;

const Dot = styled(FlexBox)`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: ${SECONDARY_GREY};
`;

const ServiceListBox = styled(FlexBox)`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  row-gap: 0.25rem;
  column-gap: 0.5rem;
  align-items: center;
`;

const ViewBookingDetails = ({ data, closeModal }) => {
  const {
    name,
    bookingTime,
    bookingDate,
    stylistId,
    servicesChoosen,
    bookingId,
  } = data ?? {};

  const storeStylists = useSelector(state => state.activeStore?.storeStylist);
  const storeServiceList = useSelector(
    state => state.activeStore?.transformedStoreServices
  );

  const storeStylistList = storeStylists.map(stylist => {
    return { value: stylist?._id, label: stylist?.name };
  });

  const selectedStylist = storeStylistList.find(
    stylist => stylist?.value === stylistId
  );

  const selectedService = storeServiceList.filter(item =>
    servicesChoosen.some(service => service?.serviceId === item?._id)
  );

  return (
    <Modal M1 height="fit-content" overflow="none" bgColor={WHITE}>
      <HeadWithClose>
        <div/>
        <FlexBox align="center">
          <Body1 bold textAlign="center">
            Booking Details
          </Body1>
        </FlexBox>
        <CrossIcon onClick={closeModal} />
      </HeadWithClose>
      <Wrapper>
        <FlexBox column rowGap="0.25rem">
          <FlexBox align="center" columnGap="0.5rem">
            <Body1 bold>{name}</Body1>
            <Body1>&#35;{bookingId}</Body1>
          </FlexBox>
          <ServiceListBox>
            {selectedService?.map((service, index) => (
              <>
                <Body2
                  key={service?._id}
                  color={SECONDARY_GREY}
                  textTransform="capitalize"
                >
                  {service?.serviceName}
                </Body2>
                {!(index === selectedService.length - 1) && <Dot />}
              </>
            ))}
          </ServiceListBox>
        </FlexBox>

        <FlexBox columnGap="1.5rem">
          <FlexBox column rowGap="0.25rem">
            <Body1>Time:</Body1>
            <Body1 color={SECONDARY_GREY}>
              {bookingTime}, {dayjs(bookingDate).format("DD MMMM YYYY")}
            </Body1>
          </FlexBox>
          <FlexBox column rowGap="0.25rem">
            <Body1>Stylist:</Body1>
            <Body1 color={SECONDARY_GREY}> {selectedStylist?.label}</Body1>
          </FlexBox>
        </FlexBox>
      </Wrapper>
    </Modal>
  );
};

export default ViewBookingDetails;
