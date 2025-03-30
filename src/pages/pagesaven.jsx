import styled from "styled-components";
import Link from "next/link";
import FlexBox from "@common/UI/FlexBox";
import { Body1, Support } from "@common/UI/Headings";
import { device } from "@common/UI/Responsive";
import { IoMdAdd } from "react-icons/io";

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
  }
`;

const Section = styled(FlexBox)`
  width: 100%;
  column-gap: 0.25rem;
`;

const LeftSection = styled(FlexBox)`
  width: 60%;
  flex-direction: column;
  gap: 0.25rem;
`;

const Container = styled(FlexBox)`
  background: #ffffff;
  border: 1px solid #ebf0f4;
  box-shadow: 0px 3px 3px 0px #00000040;
  padding: 0.5rem;
  border-radius: 0.4rem;
`;
const RightSection = styled(FlexBox)`
  width: 40%;
  background: #ffffff;
  border: 1px solid #ebf0f4;
  box-shadow: 0px 3px 3px 0px #00000040;
  padding: 0.5rem;
  border-radius: 0.4rem;
`;
const Index = () => {
  return (
    <Wrapper>
      <FlexBox width="100%" height="100%" backgroundColor="#142C8E0D" column>
        <FlexBox align="center" justify="space-between">
          <FlexBox column>
            <Body1 bold>Stock Screens</Body1>
            <Support color="#687792">
              Create your own custom screening criteria
            </Support>
          </FlexBox>
          <FlexBox
            align="center"
            padding="0.5rem"
            columnGap="0.5rem"
            borderRadius="0.4rem"
            backgroundColor="#142C8E"
          >
            <IoMdAdd color="#FFFFFF" />
            <Support color="#FFFFFF">New Screen</Support>
          </FlexBox>
        </FlexBox>
        <Section>
          <LeftSection>
            <Container>
              <Body1>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
                ducimus tempora voluptatibus nihil fuga vitae consectetur ullam
                maxime minima totam! Beatae error eaque at, porro labore hic
                sequi. Nesciunt, mollitia?
              </Body1>
            </Container>
            <Container>
              <Body1>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
                ducimus tempora voluptatibus nihil fuga vitae consectetur ullam
                maxime minima totam! Beatae error eaque at, porro labore hic
                sequi. Nesciunt, mollitia?
              </Body1>
            </Container>
          </LeftSection>
          <RightSection>
            <Body1>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam
              nesciunt sapiente quos et aperiam accusantium architecto veritatis
              beatae neque mollitia harum maiores eum ex, quibusdam, amet dolore
              suscipit! Eligendi, necessitatibus?
            </Body1>
          </RightSection>
        </Section>
      </FlexBox>
    </Wrapper>
  );
};

export default Index;
