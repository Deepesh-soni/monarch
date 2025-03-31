import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Bugsnag from "@bugsnag/js";
import { toast } from "react-toastify";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";

import { client } from "@axiosClient";
import FlexBox from "@common/UI/FlexBox";
import { Display, Body1, H1 } from "@common/UI/Headings";
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
  }
`;

const CustomH1 = styled(Display)`
  font-family: Montserrat;
  font-weight: 500;
  font-size: 91.31px;
  line-height: 100%;
  letter-spacing: -5%;
  text-align: center;
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

const Stocks = styled.img`
  width: 304px;
  height: 108px;
`;

const SearchContainer = styled(FlexBox)`
  width: 806px;
  gap: 16px;
  border-radius: 18px;
  border-width: 1px;
  padding: 12px 16px;
  border: 1px solid #687792;
`;

const SearchIcon = styled(FaSearch)`
  color: #888;
  margin-right: 10px;
`;

const FilterText = styled(Body1)`
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
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

const FilterContainer = styled(FlexBox)`
  width: 271px;
  height: 52px;
  gap: 12px;
  border-radius: 8px;
  padding-top: 6px;
  padding-right: 18px;
  padding-bottom: 6px;
  padding-left: 18px;
  background: #ebf0f4;
  align-items: center;
  justify-content: space-around;
`;

const GridContainer = styled(FlexBox)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: 16px;
  background: #ffffff;
  width: 100%;
  padding: 20px;
  border-radius: 10px;
`;

const Card = styled(FlexBox)`
  display: flex;
  flex-direction: column;
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  gap: 8px;
`;

const Hr = styled.hr`
  width: 100%;
`;

const TextWrapper = styled(FlexBox)`
  max-width: 695px;
`;

const Home = () => {
  const [filter, setFilter] = useState("all");

  const [stocks, setStocks] = useState([]);

  const fetchStocks = async filterType => {
    let url = "";
    if (filterType === "gainers") {
      url =
        "http://iosskwk0k8cgkcs8k0o80wc8.188.165.196.11.sslip.io/default/gainers";
    } else if (filterType === "losers") {
      url =
        "http://iosskwk0k8cgkcs8k0o80wc8.188.165.196.11.sslip.io/default/losers";
    } else {
      filterType === "all";
      url =
        "http://iosskwk0k8cgkcs8k0o80wc8.188.165.196.11.sslip.io/default/topMcap";
    }

    try {
      const response = await client.get(url);
      setStocks(response?.data?.results || []);
    } catch (error) {
      toast.error(`Failed to load ${filterType} stocks`);
      Bugsnag?.notify(error);
    }
  };

  useEffect(() => {
    fetchStocks(filter);
  }, [filter]);

  return (
    <Wrapper>
      <Nav>
        <LogoContainer>
          <Image
            src="/assets/logo.svg"
            alt="Monarch Logo"
            width={120}
            height={40}
          />
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
      <FlexBox column width="100%" align="center" justify="center">
        <CustomH1>Discover & Analyze</CustomH1>
        <FlexBox>
          <Stocks src="/assets/home/stocks.svg" alt="Monarch Logo" />
          <CustomH1>like never before</CustomH1>
        </FlexBox>
      </FlexBox>
      <TextWrapper>
        <H1 textAlign="center">
          Advanced stock screening, real-time analysis, and powerful tools to
          make informed investment decisions
        </H1>
      </TextWrapper>
      <SearchContainer>
        <SearchIcon />
        <SearchInput
          type="text"
          placeholder="Search stocks, create screens.."
        />
      </SearchContainer>
      <FlexBox column align="center">
        <Display>Discover Trending Stocks</Display>
        <Body1 color="#687792">
          Explore the most popular stocks that investors are watching right now.
        </Body1>
      </FlexBox>
      <FilterContainer>
        <FilterText active={filter === "all"} onClick={() => setFilter("all")}>
          All
        </FilterText>
        <FilterText
          active={filter === "gainers"}
          onClick={() => setFilter("gainers")}
        >
          Gainers
        </FilterText>
        <FilterText
          active={filter === "losers"}
          onClick={() => setFilter("losers")}
        >
          Losers
        </FilterText>
      </FilterContainer>
      <GridContainer>
        {stocks.map((stock, index) => (
          <Card key={index}>
            <FlexBox>
              <img src="/reliance.svg" width={48} />
              <FlexBox column>
                <Body1>{stock.companyName}</Body1>
                <Body1 color="#687792">{stock.exchange}</Body1>
              </FlexBox>
            </FlexBox>
            <FlexBox width="100%" column>
              <Body1>{stock.price}</Body1>
              <Body1 color={stock.color}>{stock.change}</Body1>
            </FlexBox>
            <Hr />
            <FlexBox width="100%" justify="space-between">
              <FlexBox column>
                <Body1 color="#687792">Market Cap</Body1>
                <Body1>{stock.cap}</Body1>
              </FlexBox>
              <FlexBox column>
                <Body1 color="#687792">Volume</Body1>
                <Body1>{stock.volume}</Body1>
              </FlexBox>
            </FlexBox>
          </Card>
        ))}
      </GridContainer>
    </Wrapper>
  );
};

export default Home;
