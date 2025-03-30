import React, { useState } from "react";
import styled from "styled-components";

import FlexBox from "@common/UI/FlexBox";
import { Body2, H3 } from "@common/UI/Headings";
import { SECONDARY_200, SECONDARY_400, SECONDARY_100 } from "@common/UI/colors";
import { device } from "@common/UI/Responsive";
import { OnboardingLayout } from "./OnboardingLayout";
import Footer from "./Footer";
import { trackEvent } from "@utils/helper";

const Wrapper = styled(FlexBox)`
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  @media ${device.laptop} {
    gap: 1.5rem;
  }
`;

const Container = styled(FlexBox)`
  width: 100%;
  column-gap: 1rem;
  row-gap: 1rem;
  align-items: center;
  border-radius: 0.75rem;
  border: 1px solid ${SECONDARY_200};
  justify-content: space-between;
  max-width: 40rem;
  padding: 1rem;
`;

const IconButton = styled(FlexBox)`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 1px solid
    ${props => (props.count === 0 ? SECONDARY_100 : SECONDARY_400)};
  align-items: center;
  justify-content: center;
  cursor: ${props => (props.count === 0 ? "not-allowed" : "pointer")};
  font-size: 1.5rem;
`;

const Input = styled.input`
  border: none;
  width: ${({ digits }) => `${digits * 10}px`};
  min-width: 1rem;
`;

const amenitiesData = {
  stylistCount: {
    title: "Stylists",
    subtitle: "How many stylists do you have?",
  },
  seatCount: {
    title: "Chairs",
    subtitle: "How many seats do you have for clients?",
  },
  dailyCustomers: {
    title: "Daily Customers",
    subtitle: "Share how many customers visit you per day.",
  },
};

const Amenities = ({
  pageNum,
  handleNextPage,
  handlePrevPage,
  slideDirection,
  storeData,
  commonAnalyticsPayload,
}) => {
  const [counts, setCounts] = useState({
    stylistCount: storeData?.staffCount || 0,
    seatCount: storeData?.totalSeat || 0,
    dailyCustomers: storeData?.avgFootFall || 0,
  });

  const increaseCount = key => {
    trackEvent("salon_initial_stats_cta_click", {
      ...commonAnalyticsPayload,
      cta_type: "inc",
      field_label: key,
    });

    setCounts(prevCounts => ({
      ...prevCounts,
      [key]: prevCounts[key] + 1,
    }));
  };

  const decreaseCount = key => {
    trackEvent("salon_initial_stats_cta_click", {
      ...commonAnalyticsPayload,
      cta_type: "desc",
      field_label: key,
    });

    if (counts[key] > 0) {
      setCounts(prevCounts => ({
        ...prevCounts,
        [key]: prevCounts[key] - 1,
      }));
    }
  };

  const disableNext = !counts.seatCount || !counts.dailyCustomers;

  return (
    <>
      <OnboardingLayout
        slideDirection={slideDirection}
        title="Tell us more about your Salon"
      >
        <Wrapper>
          {Object.entries(counts).map(([key, value], index) => (
            <Container key={index}>
              <FlexBox column rowGap="0.25rem">
                <H3 bold>{amenitiesData[key].title}</H3>
                <Body2>{amenitiesData[key].subtitle}</Body2>
              </FlexBox>
              <FlexBox justify="center" align="center" columnGap="1rem">
                <IconButton count={value} onClick={() => decreaseCount(key)}>
                  -
                </IconButton>
                <Input
                  type="number"
                  value={value}
                  digits={value?.toString()?.length}
                  onChange={e =>
                    setCounts(prevCounts => ({
                      ...prevCounts,
                      [key]: parseInt(e?.target?.value),
                    }))
                  }
                />
                <IconButton onClick={() => increaseCount(key)}>+</IconButton>
              </FlexBox>
            </Container>
          ))}
        </Wrapper>
      </OnboardingLayout>
      <Footer
        handleNext={() =>
          handleNextPage({
            staffCount: counts.stylistCount,
            avgFootFall: counts.dailyCustomers,
            totalSeat: counts.seatCount,
          })
        }
        handleBack={handlePrevPage}
        pageNum={pageNum}
        nextCtaLabel="Next"
        disableNext={disableNext}
      />
    </>
  );
};

export default Amenities;
