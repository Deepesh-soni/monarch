import React, { useRef } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Button } from "@common/UI/Buttons";

import FlexBox from "@common/UI/FlexBox";
import {
  WHITE,
  SECONDARY_0,
  SECONDARY_901,
  SECONDARY_GREY,
  PRIMARY_900,
} from "@common/UI/colors";
import { boxShadowDs2 } from "@common/UI/styles";
import Modal from "@common/UI/Modal";
import CrossIcon from "@common/UI/CrossIcon";
import { Body1, H5, Body2 } from "@common/UI/Headings";

const CustomerDetailsBox = styled(FlexBox)`
  flex-direction: column;
  row-gap: 1rem;
  padding: 1rem 1.5rem 2rem;
`;

const HeadWithClose = styled(FlexBox)`
  width: 100%;
  position: relative;
  padding: 1.5rem 1rem 1rem;
  border-bottom: 1px solid ${SECONDARY_0};
  align-items: center;
  justify-content: center;
`;

const Dot = styled(FlexBox)`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: ${SECONDARY_GREY};
`;

const ButtonContainer = styled(FlexBox)`
  padding: 1rem 2rem;
  width: 100%;
  ${boxShadowDs2}
`;

const PaymentTotalBox = styled(FlexBox)`
  width: 100%;
  justify-content: space-between;
  padding: 1rem 0;
  border-top: 2px dashed ${SECONDARY_901};
`;

const Img = styled.img`
  width: 1rem;
  height: 1rem;
`;

const CouponAppliedContainer = styled(FlexBox)`
  width: fit-content;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  column-gap: 0.5rem;
  background-color: #e8fffb;
`;

const Scroller = styled(FlexBox)`
  width: 100%;
  max-height: 35vh;
  overflow: auto;
  flex-direction: column;
  row-gap: 0.5rem;
`;

const InvoiceCompleted = ({ data, closeModal }) => {
  const {
    name,
    bookingTime,
    bookingDate,
    stylistId,
    servicesChoosen,
    bookingOrderNumber,
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

  const totalAmount = selectedService.reduce(
    (acc, curr) => acc + curr.servicePrice,
    0
  );

  const invoiceRef = useRef(null);

  const downloadInvoice = () => {
    const invoiceContent = invoiceRef.current.innerText;
    const blob = new Blob([invoiceContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Invoice_${bookingOrderNumber}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    closeModal();
  };

  return (
    <Modal M1 height="fit-content" overflow="none" bgColor={WHITE}>
      <HeadWithClose>
        <Body1 bold textAlign="center">
          Invoice
        </Body1>
        <CrossIcon onClick={closeModal} />
      </HeadWithClose>

      <div ref={invoiceRef}>
        <CustomerDetailsBox>
          <FlexBox column rowGap="0.25rem">
            <FlexBox align="center" columnGap="0.5rem">
              <Body1 bold>{name}</Body1>
              <Body1>&#35;{bookingOrderNumber}</Body1>
            </FlexBox>
            <FlexBox align="center" columnGap="0.5rem">
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
            </FlexBox>
          </FlexBox>

          <FlexBox columnGap="1.5rem">
            <FlexBox column rowGap="0.25rem">
              <Body1>Time:</Body1>
              <Body1 color={SECONDARY_GREY}>
                {bookingTime}, {bookingDate}
              </Body1>
            </FlexBox>
            <FlexBox column rowGap="0.25rem">
              <Body1>Stylist:</Body1>
              <Body1 color={SECONDARY_GREY}> {selectedStylist?.label}</Body1>
            </FlexBox>
          </FlexBox>
        </CustomerDetailsBox>

        <FlexBox column rowGap="1rem" padding="1rem 3rem 1.5rem">
          <Scroller>
            {selectedService?.map((service, index) => (
              <FlexBox key={index} justify="space-between" width="100%">
                <FlexBox column rowGap="0.5rem">
                  <Body1 textTransform="capitalize">
                    {service?.serviceName}
                  </Body1>
                  <CouponAppliedContainer>
                    <Img src="/assets/coupon-applied.webp" />
                    <H5>10% discount on haircut</H5>
                  </CouponAppliedContainer>
                </FlexBox>
                <FlexBox columnGap="0.75rem">
                  <Body2 textDecoration="line-through" color={PRIMARY_900}>
                    ₹{service?.servicePrice}
                  </Body2>
                  <Body2 color={PRIMARY_900}>₹{service?.servicePrice}</Body2>
                </FlexBox>
              </FlexBox>
            ))}
          </Scroller>
          <PaymentTotalBox justify="space-between" width="100%">
            <Body1 bold>Total Bill</Body1>
            <Body2 bold>₹{totalAmount}</Body2>
          </PaymentTotalBox>
          <Body2 bold textAlign="center">
            Paid by Cash
          </Body2>
        </FlexBox>
      </div>

      <ButtonContainer>
        <Button
          primary
          width="100%"
          background="#808080"
          onClick={downloadInvoice}
        >
          Download Invoice
        </Button>
      </ButtonContainer>
    </Modal>
  );
};

export default InvoiceCompleted;
