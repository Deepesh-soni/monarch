import styled from "styled-components";
import Link from "next/link";
import FlexBox from "@common/UI/FlexBox";
import { Body1, Support } from "@common/UI/Headings";
import { device } from "@common/UI/Responsive";
import { IoMdAdd } from "react-icons/io";
import { FaArrowsRotate } from "react-icons/fa6";
import { CiExport } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import { FaArrowRightArrowLeft } from "react-icons/fa6";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  padding: 0 1rem;
  align-items: center;
  gap: 0.5rem;

  @media ${device.laptop} {
    justify-content: space-between;
    margin: auto;
    gap: 2.5rem;
    width: 86.67%;
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
`;

const ActionButton = styled(FlexBox)`
  border: 1.5px solid #142c8e;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  gap: 0.5rem;
  border-radius: 0.8rem;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 350px;
  padding: 10px 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const SearchIcon = styled(FaSearch)`
  color: #888;
  margin-right: 10px;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  color: #333;
  background: transparent;
  &::placeholder {
    color: #aaa;
  }
`;

const Icon = styled(FlexBox)`
  width: 36px;
  height: 36px;
  gap: 10px;
  border-radius: 8px;
  border-width: 1.5px;
  padding: 8px;
  border: 1.5px solid #142c8e;
`;
const Container = styled.div`
  background: #f8f9fc;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
`;

const Subtitle = styled.p`
  font-size: 12px;
  color: gray;
  margin-bottom: 15px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  font-size: 14px;
  color: gray;
  padding-bottom: 10px;
`;

const Td = styled.td`
  padding: 10px 0;
  font-size: 14px;
`;

const Difference = styled.span`
  color: #eb6f93;
  font-weight: 600;
`;
const Index = () => {
  return (
    <Wrapper>
      <FlexBox width="100%" height="100%" backgroundColor="#142C8E0D" column>
        <FlexBox align="center" justify="space-between">
          <FlexBox column columnGap="8px">
            <Body1 bold>Stock Comparision</Body1>
            <Support color="#687792">
              Compare key metrics between two stocks
            </Support>
          </FlexBox>
          <FlexBox columnGap="24px">
            <ActionButton align="center" columnGap="0.25rem">
              <FaArrowsRotate />
              <Body1>Reset</Body1>
            </ActionButton>
            <ActionButton align="center" columnGap="0.25rem">
              <CiExport />
              <Body1>Export</Body1>
            </ActionButton>
          </FlexBox>
        </FlexBox>
        <FlexBox width="100%" justify="space-between">
          <Body1 bold>Stock 1</Body1>
          <Body1 bold>Stock 2</Body1>
        </FlexBox>
        <FlexBox align="center" justify="space-between">
          <SearchContainer>
            <SearchIcon />
            <SearchInput type="text" placeholder="Search for a stock" />
          </SearchContainer>
          <Icon>
            <FaArrowRightArrowLeft />
          </Icon>
          <SearchContainer>
            <SearchIcon />
            <SearchInput type="text" placeholder="Search for a stock" />
          </SearchContainer>
        </FlexBox>
        <Container>
          <Title>Market Metrics</Title>
          <Subtitle>Compare key market performance indicators</Subtitle>
          <Table>
            <thead>
              <tr>
                <Th>METRIC</Th>
                <Th>STOCK 1</Th>
                <Th>STOCK 2</Th>
                <Th>DIFFERENCE</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td>Market Cap</Td>
                <Td>₹ 15,43,567</Td>
                <Td>₹ 15,43,567</Td>
                <Td>
                  <Difference positive={false}>-20%</Difference>
                </Td>
              </tr>
              <tr>
                <Td>Current Price</Td>
                <Td>₹ 15,43,567</Td>
                <Td>₹ 15,43,567</Td>
                <Td>
                  <Difference positive={true}>+20%</Difference>
                </Td>
              </tr>
              <tr>
                <Td>52 Week High</Td>
                <Td>₹ 15,43,567</Td>
                <Td>₹ 15,43,567</Td>
                <Td>
                  <Difference positive={false}>-20%</Difference>
                </Td>
              </tr>
              <tr>
                <Td>52 Week Low</Td>
                <Td>₹ 15,43,567</Td>
                <Td>₹ 15,43,567</Td>
                <Td>
                  <Difference positive={true}>-15%</Difference>
                </Td>
              </tr>
            </tbody>
          </Table>
        </Container>
      </FlexBox>
    </Wrapper>
  );
};

export default Index;
