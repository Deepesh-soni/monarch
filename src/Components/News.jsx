import styled from "styled-components";
import { IoFilter } from "react-icons/io5";
import { CiClock2 } from "react-icons/ci";

import FlexBox from "@common/UI/FlexBox";
import { Body1, Support } from "@common/UI/Headings";
import { device } from "@common/UI/Responsive";
import { H6 } from "../Components/common/Typography";
import { Small, Medium } from "../Components/common/Paragraph";
import { Button } from "../Components/common/UI/Buttons";
import { IoFilterOutline } from "react-icons/io5";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  padding: 0 1rem;
  align-items: center;
  gap: 0.5rem;

  @media ${device.laptop} {
    flex-direction: column;
    justify-content: space-between;
    margin: auto;
    gap: 2.5rem;
    width: 86.67%;
    max-width: 75rem;
  }
`;

const Card = styled(FlexBox)`
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #ffffff;
  border: 1px solid #ebf0f4;
  box-shadow: 0px 3px 3px 0px #00000040;
  padding: 0.5rem;
  row-gap: 1rem;
  border-radius: 12px;
  @media ${device.laptop} {
    flex-direction: row;
    column-gap: 1rem;
  }
`;

const Hr = styled.hr`
  width: 100%;
  border: 1px solid #ebf0f4;
`;

const HoverSmall = styled(Small)`
  transition: all 0.3s ease;

  &:hover {
    color: #142c8e;
    text-decoration: underline;
  }
`;

const FilterButton = styled(FlexBox)`
  border: 1.5px solid #142c8e;
  align-items: center;
  padding: 0.5rem;
  column-gap: 0.5rem;
  border-radius: 1.5px;
  cursor: pointer;

  svg {
    color: #142c8e;
  }

  &:hover {
    background-color: #f5f5f5;
  }
`;

// const Image = styled.img`
//   width: 20px;
//   height: 20px;
//   @media ${device.laptop} {
//     width: 100%;
//     height: 100%;
//   }
// `;

const News = () => {
  return (
    <Wrapper>
      <FlexBox width="100%" height="100%" column columnGap="1rem" rowGap="1rem">
        <FlexBox
          align="center"
          justify="space-between"
          width="100%"
          padding="1rem 0"
        >
          <FlexBox columnGap="16px">
            <HoverSmall bold>Popular</HoverSmall>
            <HoverSmall bold>My news</HoverSmall>
          </FlexBox>
          <Button outline>Filter</Button>
        </FlexBox>

        <Card>
          <FlexBox>
            <img src="/imagesecond.svg" alt="Market Insights" />
          </FlexBox>
          <FlexBox column rowGap="15px" padding="1rem">
            <Support color="#142C8E">Market Insights</Support>
            <H6 bold>
              Market Analysis: Tech Stocks Rally Amid Strong Earnings Reports
            </H6>
            <Medium>
              Major technology companies exceeded quarterly expectations,
              driving a significant upturn in market performance. Analysts
              predict continued growth through Q4, citing innovation and market
              demand as key factors.
            </Medium>
            <Hr />
            <FlexBox width="100%" justify="space-between">
              <FlexBox columnGap="4px" align="center">
                <CiClock2 color="#687792" />
                <Small color="#687792">2 hours ago</Small>
              </FlexBox>
              <Small>Read More</Small>
            </FlexBox>
          </FlexBox>
        </Card>
        <Card>
          <FlexBox>
            <img src="/imagesecond.svg" alt="Market Insights" />
          </FlexBox>
          <FlexBox column rowGap="15px" padding="1rem">
            <Support color="#142C8E">Market Insights</Support>
            <H6 bold>
              Market Analysis: Tech Stocks Rally Amid Strong Earnings Reports
            </H6>
            <Medium>
              Major technology companies exceeded quarterly expectations,
              driving a significant upturn in market performance. Analysts
              predict continued growth through Q4, citing innovation and market
              demand as key factors.
            </Medium>
            <Hr />
            <FlexBox width="100%" justify="space-between">
              <FlexBox columnGap="4px" align="center">
                <CiClock2 color="#687792" />
                <Small color="#687792">2 hours ago</Small>
              </FlexBox>
              <Small>Read More</Small>
            </FlexBox>
          </FlexBox>
        </Card>
      </FlexBox>
    </Wrapper>
  );
};

export default News;
