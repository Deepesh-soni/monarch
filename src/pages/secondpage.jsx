import styled from "styled-components";
// import Image from "next/image";
import Link from "next/link";
import FlexBox from "@common/UI/FlexBox";
import { H1, H3, H5, Display, Body1, Support } from "@common/UI/Headings";
import { device } from "@common/UI/Responsive";
import { PRIMARY_900 } from "@common/UI/colors";
import { FaSearch } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import { CiClock2 } from "react-icons/ci";

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

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 20px;
  background: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-size: 16px;
  &:hover {
    color: #0073e6;
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const LoginButton = styled.button`
  background: white;
  border: 2px solid #0033a0;
  color: #0033a0;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background: #f0f0f0;
  }
`;

const SignupButton = styled.button`
  background: #0033a0;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background: #002080;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const Card = styled(FlexBox)`
  width: 100%;
  height: 100%;
  background: #ffffff;
  border: 1px solid #ebf0f4;
  box-shadow: 0px 3px 3px 0px #00000040;
  padding: 0.5rem;
`;

const Hr = styled.hr`
  width: 100%;
  border: 1px solid #ebf0f4;
`;

const index = () => {
  return (
    <Wrapper>
      <Nav>
        <LogoContainer>
          <Image alt="Monarch Logo" width={120} height={40} />
        </LogoContainer>
        <NavLinks>
          <NavLink href="#">News</NavLink>
          <NavLink href="#">Screens</NavLink>
          <NavLink href="#">Watchlist</NavLink>
        </NavLinks>
        <AuthButtons>
          <LoginButton>Log in</LoginButton>
          <SignupButton>Sign up</SignupButton>
        </AuthButtons>
      </Nav>
      <FlexBox width="100%" height="100%" backgroundColor="#142C8E0D" column>
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
          <FlexBox column rowGap="18px" padding="1rem">
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

export default index;
