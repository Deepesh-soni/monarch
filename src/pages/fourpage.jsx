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

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  background: #f8f9fc;
  padding: 20px;
  border-radius: 10px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Th = styled.th`
  border-bottom: 1px solid #e0e0e0;
  padding: 12px;
  text-align: left;
  font-weight: bold;
  font-size: 14px;
  color: #333;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #e0e0e0;
  font-size: 14px;
  color: #555;
`;

const Tr = styled.tr``;

const data = [
  {
    name: "Zomato",
    CMP: 192,
    PE: 37,
    marketCap: 654,
    dividend: 478,
    netProfit: 308,
    profitVar: 39,
    sales: 241,
    salesVar: 550,
    ROCE: 339,
  },
  ...Array(9).fill({
    name: "Info Beans Tech",
    CMP: 192,
    PE: 37,
    marketCap: 654,
    dividend: 478,
    netProfit: 308,
    profitVar: 39,
    sales: 241,
    salesVar: 550,
    ROCE: 339,
  }),
];

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
        <TableContainer>
          <StyledTable>
            <thead>
              <tr>
                <Th>Name</Th>
                <Th>CMP</Th>
                <Th>P/E</Th>
                <Th>Market Cap</Th>
                <Th>Dividend</Th>
                <Th>Net Profit</Th>
                <Th>Profit Var</Th>
                <Th>Sales</Th>
                <Th>Sales Var</Th>
                <Th>ROCE</Th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <Tr key={index}>
                  <Td>{row.name}</Td>
                  <Td>{row.CMP}</Td>
                  <Td>{row.PE}</Td>
                  <Td>{row.marketCap}</Td>
                  <Td>{row.dividend}</Td>
                  <Td>{row.netProfit}</Td>
                  <Td>{row.profitVar}</Td>
                  <Td>{row.sales}</Td>
                  <Td>{row.salesVar}</Td>
                  <Td>{row.ROCE}</Td>
                </Tr>
              ))}
            </tbody>
          </StyledTable>
        </TableContainer>
      </FlexBox>
    </Wrapper>
  );
};

export default index;
