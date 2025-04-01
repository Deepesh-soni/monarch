import { useState } from "react";
import styled from "styled-components";
import { SlArrowRight } from "react-icons/sl";
import FlexBox from "@common/UI/FlexBox";
import { Body1, Support, H1 } from "@common/UI/Headings";
import { device } from "@common/UI/Responsive";
import { IoMdSearch } from "react-icons/io";
import { H5 } from "../Components/common/Typography";
import { Medium } from "../Components/common/Paragraph";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  padding: 0 1rem;
  align-items: center;
  gap: 0.5rem;

  @media ${device.laptop} {
    width: 86.67%;
    max-width: 75rem;
    margin: auto;
    gap: 2.5rem;
  }
`;

const Section = styled(FlexBox)`
  width: 100%;
  column-gap: 1.25rem;
  flex-direction: column;

  @media ${device.laptop} {
    flex-direction: row;
    width: 100%;
  }
`;

const LeftSection = styled(FlexBox)`
  width: 100%;
  flex-direction: column;
  gap: 1.25rem;
  min-height: 100%;

  @media ${device.laptop} {
    width: 60%;
  }
`;

const RightSection = styled(FlexBox)`
  width: 40%;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #ebf0f4;
  box-shadow: 0px 3px 3px 0px #00000040;
  padding: 1rem;
  border-radius: 0.4rem;
  min-height: 100%;
`;

const Container = styled(FlexBox)`
  background: #ffffff;
  border: 1px solid #ebf0f4;
  box-shadow: 0px 3px 3px 0px #00000040;
  padding: 1rem;
  border-radius: 0.4rem;
`;

const CardGridContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(1, 1fr);
  gap: 1rem;
  @media ${device.laptop} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Card = styled(FlexBox)`
  padding: 0.5rem;
  border: 1px solid #ebf0f4;
  background: #ffffff;
  border-radius: 12px;
  column-gap: 5px;
`;

const Icon = styled(FlexBox)`
  width: 45px;
  height: 45px;
  border-radius: 12px;
  background: #142c8e1a;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 0.9rem;
  color: #687792;
  margin-bottom: 1rem;
`;

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SearchIcon = styled(IoMdSearch)`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #687792;
  font-size: 1.2rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 0.5rem 0.5rem 2.5rem; /* Extra padding on the left for the icon */
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  margin-bottom: 1rem;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 300px;
  overflow-y: auto;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  border-bottom: 1px solid #ebf0f4;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #f5f7fa;
  }
`;

const HeadingContainer = styled(FlexBox)`
  align-items: center;
  justify-content: space-between;
  column-gap: 0.5rem;
  width: 100%;
`;

const Button = styled.button`
  border-radius: 8px;
  cursor: pointer;
  border: ${({ primary }) => (primary ? "none" : "2px solid #0033a0")};
  background: #0033a0;
  color: white;
  &:hover {
    background: ${({ primary }) => (primary ? "#002080" : "#f0f0f0")};
  }
`;
const sectors = [
  "Aerospace & Defence",
  "Air Transport Service",
  "Agro Chemicals",
  "Alcohol Beverages",
  "Automobile",
  "Auto Ancillaries",
  "Banks",
  "Bearings",
  "Cables",
];

const Screen = () => {
  const [search, setSearch] = useState("");
  const filteredSectors = sectors.filter(sector =>
    sector.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Wrapper>
      <FlexBox width="100%" height="100%" column rowGap="1.5rem">
        <HeadingContainer>
          <FlexBox column>
            <H5 bold>Stock Screens</H5>
            <Medium color="#687792">
              Create your own custom screening criteria
            </Medium>
          </FlexBox>
          <Button>New Screens</Button>
          {/* <FlexBox
            align="center"
            padding="0.5rem"
            columnGap="0.5rem"
            borderRadius="0.4rem"
            backgroundColor="#142C8E"
          >
            <IoMdAdd color="#FFFFFF" />
            <Support color="#FFFFFF">New Screen</Support>
          </FlexBox> */}
        </HeadingContainer>
        <Section>
          <LeftSection>
            <Container column>
              <Medium bold>Your Custom Screens</Medium>
              <Support>Screens created by you</Support>
              <CardGridContainer>
                {[...Array(4)].map((_, index) => (
                  <Card key={index}>
                    <Icon>
                      <H1 bold>G</H1>
                    </Icon>
                    <FlexBox column columnGap="0.5px">
                      <FlexBox align="center" columnGap="0.75rem">
                        <Body1>Growth Stocks</Body1>
                        <SlArrowRight size={12} />
                      </FlexBox>
                      <Support color="#687792">
                        High growth companies with strong momentum
                      </Support>
                    </FlexBox>
                  </Card>
                ))}
              </CardGridContainer>
            </Container>
            <Container column>
              <Body1 bold>Popular Stock Screens</Body1>
              <Support color="#687792">
                Screens that are mostly used by investors
              </Support>
              <CardGridContainer>
                {[...Array(13)].map((_, index) => (
                  <Card key={index}>
                    <Icon>
                      <H1 bold>G</H1>
                    </Icon>
                    <FlexBox column columnGap="0.5px">
                      <FlexBox align="center" columnGap="0.75rem">
                        <Body1>Growth Stocks</Body1>
                        <SlArrowRight size={12} />
                      </FlexBox>
                      <Support color="#687792">
                        High growth companies with strong momentum
                      </Support>
                    </FlexBox>
                  </Card>
                ))}
              </CardGridContainer>
            </Container>
          </LeftSection>
          <RightSection>
            <Title>Browse Sectors</Title>
            <Subtitle>Explore stocks by industry sectors</Subtitle>
            <SearchContainer>
              <SearchIcon />
              <SearchInput
                type="text"
                placeholder="Search sectors..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </SearchContainer>

            <List>
              {filteredSectors.map((sector, index) => (
                <ListItem key={index}>
                  {sector} <SlArrowRight />
                </ListItem>
              ))}
            </List>
          </RightSection>
        </Section>
      </FlexBox>
    </Wrapper>
  );
};

export default Screen;
