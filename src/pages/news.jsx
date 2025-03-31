import styled from "styled-components";
import { IoFilter } from "react-icons/io5";
import { CiClock2 } from "react-icons/ci";

import FlexBox from "@common/UI/FlexBox";
import { Body1, Support } from "@common/UI/Headings";
import { device } from "@common/UI/Responsive";
import Navbar from "@common/Navbar";
import Layout from "../layout/HomePageLayout";
import News from "../Components/news";

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

const NewsPage = () => {
  return (
    <Layout>
      <News />
    </Layout>
  );
};

export default NewsPage;
