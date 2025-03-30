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
  ACCENT_600,
} from "@common/UI/colors";
import { boxShadowDs2 } from "@common/UI/styles";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  transition: transform 0.25s ease-in-out;
`;

const Hr = styled.hr`
  border: 1px ${({ borderStyle }) => borderStyle || "solid"} ${SECONDARY_901};
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
  border-radius: 0.5rem;
  width: 100%;
  padding: 1rem;
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
  justify-content: center;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  column-gap: 0.5rem;
  background-color: #e8fffb;
`;

const ButtonContainer = styled(FlexBox)`
  padding: 1rem 2rem;
  width: 100%;
  ${boxShadowDs2}
`;
const serviceData = [
  {
    id: 1,
    name: "Haircut",
    originalPrice: 350,
  },
  {
    id: 2,
    name: "Manicure",
    originalPrice: 600,
    discountedPrice: 450,
    coupon: "Upto ₹150 off on manicure",
  },
  {
    id: 3,
    name: "Pedicure",
    originalPrice: 600,
  },
];

const Bill = () => {
  let totalBill = 0;
  return (
    <Container>
      <ServiceContainer>
        {serviceData?.map((service, index) => {
          totalBill += service?.coupon
            ? service?.discountedPrice
            : service?.originalPrice;
          return (
            <InnerContainer key={index}>
              {service?.coupon ? (
                <>
                  <FlexBox column rowGap="0.5rem">
                    <H3>{service?.name}</H3>
                    <CouponAppliedContainer>
                      <Img src="/assets/coupon-applied.webp" />
                      <H5>{service?.coupon}</H5>
                    </CouponAppliedContainer>
                  </FlexBox>
                  <FlexBox columnGap="0.75rem">
                    <H4 textDecoration="line-through" color={PRIMARY_900}>
                      ₹{service?.originalPrice}
                    </H4>
                    <H4 color={PRIMARY_900}>₹{service?.discountedPrice}</H4>
                  </FlexBox>
                </>
              ) : (
                <>
                  <H3>{service?.name}</H3>
                  <H4 color={PRIMARY_900}>₹{service?.originalPrice}</H4>
                </>
              )}
            </InnerContainer>
          );
        })}
        <Hr borderStyle="dotted" />
        <InnerContainer>
          <H3 bold>Total Bill</H3>
          <H4 bold>₹{totalBill}</H4>
        </InnerContainer>
      </ServiceContainer>
    </Container>
  );
};

const PaymentMethod = () => {
  return (
    <FlexBox columnGap="1rem" align="center" justify="center">
      <H4 bold>Paid by Cash</H4>
    </FlexBox>
  );
};

const CustomerDetails = () => {
  return (
    <FlexBox column rowGap="0.5rem">
      <FlexBox column rowGap="0.25rem">
        <FlexBox align="center" columnGap="0.5rem">
          <H3 bold>Jyoti Keswani</H3>
          <H3>&#35;345672</H3>
        </FlexBox>
        <FlexBox align="center" columnGap="0.5rem">
          <H3 color={SECONDARY_GREY}>Haircut</H3>
          <DotIcon color={SECONDARY_GREY} />
          <H3 color={SECONDARY_GREY}>Menicure</H3>
          <DotIcon color={SECONDARY_GREY} />
          <H3 color={SECONDARY_GREY}>Pedicure</H3>
        </FlexBox>
      </FlexBox>

      <FlexBox columnGap="1.5rem">
        <FlexBox column rowGap="0.25rem">
          <H3>Time:</H3>
          <H3 color={SECONDARY_GREY}>10 AM, 29th March 2024</H3>
        </FlexBox>
        <FlexBox column rowGap="0.25rem">
          <H3>Stylist:</H3>
          <H3 color={SECONDARY_GREY}>Abhimanyu</H3>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

const Invoice = ({ setCurrStep }) => {
  return (
    <Wrapper>
      <FlexBox column rowGap="1rem" padding="1rem">
        <CustomerDetails />
        <Bill />
        <PaymentMethod />
      </FlexBox>
      <ButtonContainer>
        <Button
          primary
          width="100%"
          background="#808080"
          onClick={() => setCurrStep(3)}
        >
          Download Invoice
        </Button>
      </ButtonContainer>
    </Wrapper>
  );
};

export default Invoice;
