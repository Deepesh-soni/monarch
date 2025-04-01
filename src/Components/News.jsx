import styled from "styled-components";
import { IoFilter } from "react-icons/io5";
import { CiClock2 } from "react-icons/ci";

import FlexBox from "@common/UI/FlexBox";
import { Body1, Support } from "@common/UI/Headings";
import { device } from "@common/UI/Responsive";

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
  width: 100%;
  height: 100%;
  background: #ffffff;
  border: 1px solid #ebf0f4;
  box-shadow: 0px 3px 3px 0px #00000040;
  padding: 0.5rem;
  column-gap: 1rem;
`;

const Hr = styled.hr`
  width: 100%;
  border: 1px solid #ebf0f4;
`;

const News = () => {
  return (
    <Wrapper>
      <FlexBox width="100%" height="100%" column columnGap="1rem">
        <FlexBox align="center" justify="space-between">
          <FlexBox columnGap="16px">
            <Support>Popular</Support>
            <Support>My news</Support>
          </FlexBox>
          <FlexBox
            border="1.5px solid #142C8E"
            align="center"
            padding="0.5rem"
            columnGap="0.5rem"
            borderRadius="1.5px"
          >
            <IoFilter color="#142C8E" />
            <Support color="#142C8E">Filter</Support>
          </FlexBox>
        </FlexBox>
        <Card>
          <FlexBox>
            <img src="/imagesecond.svg"></img>
          </FlexBox>
          <FlexBox column rowGap="15px" padding="1rem">
            <Support>Market Insights</Support>
            <Body1>
              Market Analysis: Tech Stocks Rally Amid Strong Earnings Reports
            </Body1>
            <Body1>
              Major technology companies exceeded quarterly expectations,
              driving a significant upturn in market performance. Analysts
              predict continued growth through Q4, citing innovation and market
              demand as key factors.
            </Body1>
            <Hr />
            <FlexBox width="100%" justify="space-between">
              <FlexBox columnGap="4px" align="center">
                <CiClock2 />
                <Support>2hours ago</Support>
              </FlexBox>
              <Support>Read More</Support>
            </FlexBox>
          </FlexBox>
        </Card>
      </FlexBox>
    </Wrapper>
  );
};

export default News;
