import React from "react";
import styled from "styled-components";

import FlexBox from "@common/UI/FlexBox";
import { Display, H3 } from "@common/UI/Headings";
import { boxShadowDs1 } from "@common/UI/styles";
import { ACCENT_0, PRIMARY_800 } from "@common/UI/colors";
import { device } from "@common/UI/Responsive";

const CardContainer = styled(FlexBox)`
  width: 100%;
  min-width: 30%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: ${PRIMARY_800};
  border-radius: 0.75rem;
  cursor: pointer;
  ${boxShadowDs1};

  @media ${device.laptop} {
    padding: 1.5rem;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const DetailsBox = styled(FlexBox)`
  gap: 0.5rem;
  flex-direction: column;

  @media ${device.laptop} {
    gap: 0;
    align-items: flex-start;
  }
`;

const Icon = styled.div`
  display: none;
  opacity: 0.2;

  @media ${device.laptop} {
    display: flex;
  }
`;

const CardWithCount = ({ title, count, icon: IconComponent, onClick }) => (
  <CardContainer onClick={onClick}>
    <DetailsBox>
      <H3 bold color={ACCENT_0}>
        {title}
      </H3>
      <Display bold color={ACCENT_0}>
        {count}
      </Display>
    </DetailsBox>
    {IconComponent && (
      <Icon>
        <IconComponent size={90} color={ACCENT_0} />
      </Icon>
    )}
  </CardContainer>
);

export default CardWithCount;
