import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import styled, { css } from "styled-components";
import { CiDiscount1 } from "react-icons/ci";

import FlexBox from "@common/UI/FlexBox";
import { Button } from "@common/UI/Buttons";
import { H3, H4, H5, Body2 } from "@common/UI/Headings";
import {
  SECONDARY_901,
  SECONDARY_GREY,
  ACCENT_100,
  PRIMARY_900,
  PRIMARY_800,
  ACCENT_200,
} from "@common/UI/colors";
import { boxShadowDs2 } from "@common/UI/styles";
import Loader from "@common/Loader";

const Coupons = dynamic(() => import("../ManageBookingModal/Coupons"), {
  loading: () => <Loader fitContent />,
});

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  height: calc(100% - 3.5625rem - 1rem);
  overflow-y: scroll;
  justify-content: space-between;
  transition: transform 0.25s ease-in-out;
`;

const Hr = styled.hr`
  border-top: 1px solid ${SECONDARY_901};
  width: 100%;
`;

const DotIcon = styled.div`
  border-radius: 50%;
  background-color: ${SECONDARY_GREY};
  width: 0.25rem;
  height: 0.25rem;
`;

const Container = styled(FlexBox)`
  background-color: ${ACCENT_100};
  padding: 0.5rem;
  border-radius: 0.5rem;
  width: 100%;
`;

const ScrollableBox = styled(FlexBox)`
  flex-direction: column;
  max-height: 90%;
  overflow: auto;
`;

const InnerContainer = styled(FlexBox)`
  flex: 1;
  justify-content: space-between;
  align-items: center;
`;

const ServiceContainer = styled(FlexBox)`
  flex-direction: column;
  row-gap: 1rem;
  flex: 1;
`;

const Img = styled.img`
  width: 1rem;
  height: 1rem;
`;

const CouponAppliedContainer = styled(FlexBox)`
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 8px;
  column-gap: 0.5rem;
  background-color: #e8fffb;
`;

const ButtonContainer = styled(FlexBox)`
  padding: 0 1rem;
  width: 100%;
  ${boxShadowDs2}
`;

const Chip = styled(FlexBox)`
  padding: 0.25rem 1rem;
  width: fit-content;
  height: 100%;
  border-radius: 1.5rem;
  background-color: ${ACCENT_200};
  cursor: pointer;

  ${({ selected }) =>
    selected &&
    css`
      background-color: ${PRIMARY_800};
    `}
`;

const Body = styled(Body2)`
  ${({ selected }) =>
    selected &&
    css`
      color: white;
    `};
`;

const CouponDetails = styled(FlexBox)`
  flex-direction: column;
  row-gap: 0.25rem;
`;

const CouponAppliedIcon = styled(CiDiscount1)`
  margin-right: 0.5rem;
  font-size: 1.5rem;
`;

const paymentMode = ["Card", "Cash", "Other"];

const SelectCoupon = ({ setOpenCouponModal }) => {
  return (
    <Container>
      <InnerContainer onClick={() => setOpenCouponModal(true)}>
        <FlexBox columnGap="0.5rem">
          <CiDiscount1 size="1.5rem" />
          <H3 bold>Apply Coupon</H3>
        </FlexBox>
        <Button textCta>SELECT</Button>
      </InnerContainer>
    </Container>
  );
};

const AppliedCoupon = ({
  setCurrentStep,
  appliedCoupon,
  removeCoupon,
  data,
  setUpdatedDataToSend,
}) => {
  const handleRemoveCoupon = () => {
    setUpdatedDataToSend(prev => ({
      ...prev,
      ...data,
      couponCode: null,
      couponId: null,
      eventType: null,
      sourceOfDiscovery: null,
    }));
  };

  return (
    <CouponAppliedContainer>
      <FlexBox align="center">
        <CouponAppliedIcon />
        <CouponDetails>
          <H5 bold>{data?.couponCode}</H5>
          <H5 color="green">
            Coupon Savings ₹{data?.discountBreakUp?.couponDiscountAmount}
          </H5>
        </CouponDetails>
      </FlexBox>
      <H5 bold onClick={handleRemoveCoupon} cursor={"pointer"}>
        REMOVE
      </H5>
    </CouponAppliedContainer>
  );
};

const Bill = ({ data }) => {
  const {
    servicesChoosen,
    couponCode,
    totalPayable,
    totalMrp,
    couponApplied,
    discountBreakUp,
    totalCost,
  } = data ?? {};

  return (
    <Container>
      <ServiceContainer>
        {servicesChoosen?.map(service => (
          <InnerContainer key={service.serviceId}>
            <FlexBox column rowGap="0.5rem" width="70%">
              <H3>{service.serviceName}</H3>
              {couponCode && service.subTotal < service.servicePrice && (
                <CouponAppliedContainer>
                  <Img src="/assets/coupon-applied.webp" alt="Coupon Applied" />
                  <H5>{couponCode}</H5>
                </CouponAppliedContainer>
              )}
            </FlexBox>
            <FlexBox columnGap="0.75rem">
              {couponCode && service.subTotal < service.servicePrice ? (
                <>
                  <H4 textDecoration="line-through" color={PRIMARY_900}>
                    ₹{service.servicePrice}
                  </H4>
                  <H4 color={PRIMARY_900}>₹{service.subTotal}</H4>
                </>
              ) : (
                <H4 color={PRIMARY_900}>₹{service.servicePrice}</H4>
              )}
            </FlexBox>
          </InnerContainer>
        ))}

        <InnerContainer>
          <H3 bold>Total </H3>
          <H4 bold>₹{totalMrp}</H4>
        </InnerContainer>

        {couponApplied && (
          <InnerContainer>
            <H3> Coupon Discounts</H3>
            <H4>- ₹ {discountBreakUp?.couponDiscountAmount}</H4>
          </InnerContainer>
        )}
        <InnerContainer>
          <H3 bold>Total Payable</H3>
          <H4 bold>₹{totalPayable}</H4>
        </InnerContainer>
      </ServiceContainer>
    </Container>
  );
};

const PaymentMethod = ({ data, setUpdatedDataToSend }) => {
  const [selectedMode, setSelectedMode] = useState(data?.paymentMode || "");

  useEffect(() => {
    if (data?.paymentMode) {
      setSelectedMode(data.paymentMode);
    }
  }, [data?.paymentMode]);

  const handleClick = mode => {
    setSelectedMode(mode);
    setUpdatedDataToSend(prev => ({
      ...prev,
      paymentMode: mode,
    }));
  };

  return (
    <FlexBox columnGap="1rem" align="center">
      <H3>MOP:</H3>
      <FlexBox columnGap="0.5rem">
        {paymentMode.map((mode, index) => (
          <Chip
            key={index}
            selected={selectedMode === mode}
            onClick={() => handleClick(mode)}
          >
            <Body selected={selectedMode === mode}>{mode}</Body>
          </Chip>
        ))}
      </FlexBox>
    </FlexBox>
  );
};

const CustomerDetails = ({ data }) => {
  const { name, bookingTime, stylistId } = data ?? {};
  const storeStylists = useSelector(state => state?.activeStore?.storeStylist);
  const storeStylistList = storeStylists.map(stylist => {
    return { value: stylist?._id, label: stylist?.name };
  });
  const selectedStylist = storeStylistList.find(
    stylist => stylist?.value === stylistId
  );
  return (
    <FlexBox column rowGap="0.5rem">
      <FlexBox align="center" columnGap="0.5rem">
        <H4 bold>{name}</H4>
        <H4>&#35;345672</H4>
      </FlexBox>
      <FlexBox align="center" columnGap="0.5rem">
        <H4 color={SECONDARY_GREY}>{bookingTime}</H4>
        <DotIcon color={SECONDARY_GREY} />
        <H4 color={SECONDARY_GREY}>{selectedStylist?.label}</H4>
      </FlexBox>
    </FlexBox>
  );
};

const PaymentDetailsModal = ({
  setCurrentStep,
  data,
  setUpdatedDataToSend,
}) => {
  const [couponError, setCouponError] = useState("");
  const [openCouponModal, setOpenCouponModal] = useState(false);

  useEffect(() => {
    if (
      data?.couponErrorString === "Coupon amount is less than minimum amount"
    ) {
      setCouponError(data.couponErrorString);
      toast.error("Coupons not available add more services<");
    } else {
      setCouponError("");
    }
  }, [data]);
  return (
    <>
      {openCouponModal && (
        <Coupons
          setOpenCouponModal={setOpenCouponModal}
          setUpdatedDataToSend={setUpdatedDataToSend}
          data={data}
        />
      )}
      <Wrapper>
        <ScrollableBox column rowGap="1rem" padding="1rem">
          <CustomerDetails data={data} />
          <Hr />
          {data?.couponApplied ? (
            <AppliedCoupon
              setUpdatedDataToSend={setUpdatedDataToSend}
              data={data}
            />
          ) : (
            <SelectCoupon setOpenCouponModal={setOpenCouponModal} />
          )}

          <Bill data={data} />
          <PaymentMethod
            setUpdatedDataToSend={setUpdatedDataToSend}
            data={data}
          />
        </ScrollableBox>
        <ButtonContainer>
          <Button
            primary
            width="100%"
            onClick={() => {
              setCurrentStep(3);
              setUpdatedDataToSend({ eventType: "save" });
            }}
          >
            Save
          </Button>
        </ButtonContainer>
      </Wrapper>
    </>
  );
};

export default PaymentDetailsModal;
