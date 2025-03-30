import React from "react";
import styled from "styled-components";

import { H4 } from "@common/UI/Headings";
import FlexBox from "@common/UI/FlexBox";
import { ACCENT_200 } from "@common/UI/colors";
import SectionContainer from "@common/SectionContainer";

const AllStarItem = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 2fr);
  row-gap: 1rem;
  column-gap: 2.5rem;
  align-items: flex-start;
  justify-content: space-between;
  flex: 1;
`;

const StyledImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 0.5rem;
`;

export const iconLookup = [
  {
    slug: "cleanliness",
    label: "Cleanliness",
    icon: "/assets/about/cleanliness.webp",
  },
  { slug: "service", label: "Service", icon: "/assets/about/scissors.webp" },
  {
    slug: "ambiance",
    label: "Ambience",
    icon: "/assets/about/seat.webp",
  },
  {
    slug: "communication",
    label: "Stylist",
    icon: "/assets/about/stylist.svg",
  },
];

const OtherRatings = ({ data }) => (
  <SectionContainer showHeader={false}>
    <AllStarItem>
      {iconLookup.map((item, index) => (
        <FlexBox key={index} column wrap="wrap" align="center">
          <FlexBox
            backgroundColor={ACCENT_200}
            width="2.5rem"
            height="2.5rem"
            borderRadius="0.5rem"
            padding="0.25rem"
          >
            <StyledImage src={item?.icon} alt={item?.label} />
          </FlexBox>
          <H4>{item?.label}</H4>
          <H4 bold>
            {typeof data?.parameters?.[item?.slug] === "number"
              ? data.parameters[item.slug].toFixed(1)
              : data?.parameters?.[item?.slug] ?? "-"}
          </H4>
        </FlexBox>
      ))}
    </AllStarItem>
  </SectionContainer>
);

export default OtherRatings;
