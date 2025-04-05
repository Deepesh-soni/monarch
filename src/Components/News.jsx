import React, { useState } from "react";
import styled from "styled-components";
import { CiClock2 } from "react-icons/ci";

import FlexBox from "@common/UI/FlexBox";
import { Support } from "@common/UI/Headings";
import Input from "@common/UI/InputBox";
import { device } from "@common/UI/Responsive";
import { H6 } from "../Components/common/Typography";
import { Small, Medium } from "../Components/common/Paragraph";
import { Button } from "../Components/common/UI/Buttons";
import { IoFilterOutline } from "react-icons/io5";
import CheckBox from "../Components/common/UI/CheckBox";

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
  padding: 0.75rem;
  row-gap: 1rem;
  border-radius: 12px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 6px;
  }

  @media ${device.laptop} {
    flex-direction: row;
    column-gap: 1rem;

    img {
      width: 352px;
      height: 236px;
      border-radius: 6px;
    }
  }
`;

const Hr = styled.hr`
  width: 100%;
  border: 1px solid #ebf0f4;
`;

const HoverSmall = styled(Medium)`
  transition: all 0.3s ease;

  &:hover {
    color: #142c8e;
    text-decoration: underline;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 0.75rem;
  border-radius: 10px;
  min-width: fit-content;
  text-align: center;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 15px;
  border: none;
  background: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #142c8e;
`;

const ButtonDay = styled(FlexBox)`
  width: 213px;
  height: 54px;
  border-radius: 13.55px;
  padding-right: 5.65px;
  padding-left: 5.65px;
  border-width: 1.13px;
  border: 1.13px solid #ecedf0;
  align-items: center;
  justify-content: center;
`;

const FilterSection = ({ title, children, resettable }) => (
  <>
    <FlexBox justify="space-between">
      <Medium bold>{title}</Medium>
      {resettable && <Medium>Reset</Medium>}
    </FlexBox>
    {children}
    <Hr />
  </>
);

const DateInput = ({ label }) => (
  <FlexBox column width="100%">
    <Small bold color="#687792">
      {label}
    </Small>
    <Input type="date" />
  </FlexBox>
);

const DateQuickOptions = () => (
  <FlexBox columnGap="11px" justify="space-between">
    {["Today", "This Week", "Month"].map(option => (
      <ButtonDay key={option}>
        <Small>{option}</Small>
      </ButtonDay>
    ))}
  </FlexBox>
);

const CheckboxGroup = ({ options }) => (
  <FlexBox justify="space-between" wrap>
    {options.map(option => (
      <FlexBox key={option} align="center" columnGap="2px">
        <CheckBox />
        <Medium color="#687792">{option}</Medium>
      </FlexBox>
    ))}
  </FlexBox>
);
const News = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Wrapper>
        <FlexBox
          width="100%"
          height="100%"
          column
          columnGap="1rem"
          rowGap="1rem"
        >
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
            <FlexBox
              border="1.5px solid #142C8E"
              align="center"
              padding="0.5rem 1rem"
              columnGap="0.75rem"
              borderRadius="0.4rem"
              cursor="pointer"
              onClick={() => setIsModalOpen(true)}
            >
              <IoFilterOutline color="#142C8E" size={20} />
              <Small color="#142C8E">Filter</Small>
            </FlexBox>
          </FlexBox>

          <Card>
            <FlexBox>
              <img
                src="/imagesecond.svg"
                alt="Market Insights"
                style={{ objectFit: "cover" }}
              />
            </FlexBox>
            <FlexBox column rowGap="15px" padding="1rem">
              <Support color="#142C8E">Market Insights</Support>
              <H6 bold>
                Market Analysis: Tech Stocks Rally Amid Strong Earnings Reports
              </H6>
              <Medium>
                Major technology companies exceeded quarterly expectations,
                driving a significant upturn in market performance. Analysts
                predict continued growth through Q4, citing innovation and
                market demand as key factors.
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
            <img src="/imagesecond.svg" alt="Market Insights" />

            <FlexBox column rowGap="15px" padding="1rem">
              <Support color="#142C8E">Market Insights</Support>
              <H6 bold>
                Market Analysis: Tech Stocks Rally Amid Strong Earnings Reports
              </H6>
              <Medium>
                Major technology companies exceeded quarterly expectations,
                driving a significant upturn in market performance. Analysts
                predict continued growth through Q4, citing innovation and
                market demand as key factors.
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
      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <CloseButton onClick={() => setIsModalOpen(false)}>
              &times;
            </CloseButton>
            <FlexBox column rowGap="27px">
              <Small>Filter by:</Small>
              <FilterSection title="Date Range" resettable>
                <FlexBox columnGap="18px">
                  <DateInput label="From" />
                  <DateInput label="To" />
                </FlexBox>
                <DateQuickOptions />
              </FilterSection>
              <FilterSection title="News Type">
                <CheckboxGroup
                  options={[
                    "Expert Analysis",
                    "Market Trends",
                    "Breaking News",
                    "Opinions",
                  ]}
                />
              </FilterSection>
              <FilterSection title="Source">
                <CheckboxGroup
                  options={["BBC", "CNN", "Reuters", "Bloomberg"]}
                />
              </FilterSection>
              <FlexBox columnGap="18px">
                <Button
                  outline
                  width="100%"
                  onClick={() => setIsModalOpen(false)}
                >
                  Reset
                </Button>
                <Button width="100%" onClick={() => setIsModalOpen(false)}>
                  Apply Filter
                </Button>
              </FlexBox>
            </FlexBox>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default News;
