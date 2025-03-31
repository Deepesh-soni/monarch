import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Bugsnag from "@bugsnag/js";
import { toast } from "react-toastify";

import { URL } from "@constants/urls";
import { client } from "@axiosClient";
// import Image from "next/image";
import Link from "next/link";
import FlexBox from "@common/UI/FlexBox";
import { H1, H3, H5, Display, Body1 } from "@common/UI/Headings";
import { device } from "@common/UI/Responsive";
import { PRIMARY_900 } from "@common/UI/colors";
import { FaSearch } from "react-icons/fa";

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

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 500px;
  padding: 10px 15px;
  border: 1px solid #ccc;
  border-radius: 25px;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
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
  gap: 8px;iii
`;

const Hr = styled.hr`
  width: 100%;
`;

const Home = () => {
  const [filter, setFilter] = useState("all");
  // const [gainer, setGainer] = useState([]);
  // const [losers, setLosers] = useState([]);

  // const getGainers = async () => {
  //   try {
  //     const response = await client.get(
  //       "http://iosskwk0k8cgkcs8k0o80wc8.188.165.196.11.sslip.io/default/gainers"
  //     );
  //     console.log(response?.data, "response");
  //     setGainer(response?.data?.results);
  //   } catch (error) {
  //     toast.error("Failed to load gainers");
  //     if (Bugsnag) {
  //       Bugsnag.notify(error);
  //     } else {
  //       console.error("Bugsnag not initialized:", error);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   getGainers();
  // }, []);

  // const getLosers = async () => {
  //   try {
  //     const response = await client.get(
  //       "http://iosskwk0k8cgkcs8k0o80wc8.188.165.196.11.sslip.io/default/losers"
  //     );
  //     console.log(response?.data, "response");
  //     setLosers(response?.data?.results);
  //   } catch (error) {
  //     toast.error("Failed to load gainers");
  //     if (Bugsnag) {
  //       Bugsnag.notify(error);
  //     } else {
  //       console.error("Bugsnag not initialized:", error);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   getLosers();
  // }, []);

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
      <FlexBox width="100%" height="100%">
        <Image
          src="/projectImage.png"
          alt="Monarch Logo"
          width="100%"
          height="100%"
        />
      </FlexBox>
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
