import React from "react";
import styled from "styled-components";

import FlexBox from "@common/UI/FlexBox";
import { Body1, H2 } from "@common/UI/Headings";
import { boxShadowDs1 } from "@common/UI/styles";
import { ACCENT_0, PRIMARY_800 } from "@common/UI/colors";
import { device } from "@common/UI/Responsive";
import { Button } from "@common/UI/Buttons";

const CardContainer = styled(FlexBox)`
  width: 100%;
  min-width: 25%;
  justify-content: center;
  align-items: center;
  padding: 1rem; 
  background-color: ${PRIMARY_800};
  border-radius: 0.75rem;
  ${boxShadowDs1};
  cursor: ${({ onClick }) => (onClick ? "pointer" : "default")};

  @media ${device.laptop} {
    flex-direction: row;
    justify-content: space-between;
    padding: 1.5rem; 
  }
`;

const DetailsBox = styled(FlexBox)`
  width: 100%;
  justify-content: center;
  column-gap: 0.5rem;
  flex-direction: column;
  align-items: center;

  @media ${device.laptop} {
    align-items: flex-start;
    column-gap: 1rem;
  }
`;

const Icon = styled.div`
  display: none;
  opacity: 0.2;

  @media ${device.laptop} {
    display: flex;
  }
`;

const ImageBox = styled(FlexBox)`
  flex-direction: row;

  img {
    height: 60px; 
    width: 60px;  

    @media ${device.laptop} {
      height: 90px; 
      width: 90px;  
    }
  }
`;

const CustomH2 = styled(H2)`
  font-size: 1rem; 

  @media ${device.laptop} {
    font-size: 1rem; 
  }
`;

const CustomBody1 = styled(Body1)`
  font-size: 0.7rem; 

  @media ${device.laptop} {
    font-size: 1rem; 
  }
`;

const CardWithSubtitle = ({
  id,
  title,
  subtitle,
  icon: IconComponent,
  onClick,
  image,
}) => (
  <CardContainer onClick={onClick}>
    <DetailsBox>
      <CustomH2 bold color={ACCENT_0}>
        {title}
      </CustomH2>
      <CustomBody1 color={ACCENT_0}>{subtitle}</CustomBody1>
    </DetailsBox>
    <Icon>{IconComponent && <IconComponent size={90} color={ACCENT_0} />}</Icon>
    <ImageBox>{image && <img src={image} alt={title} />}</ImageBox>
  </CardContainer>
);

export default CardWithSubtitle;
