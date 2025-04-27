import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CiClock2 } from "react-icons/ci";
import Link from "next/link";
import axios from "axios";

import FlexBox from "@common/UI/FlexBox";
import { Support } from "@common/UI/Headings";
import { device } from "@common/UI/Responsive";
import { H6 } from "../common/Typography";
import { Small, Medium } from "../common/Paragraph";

const Wrapper = styled.div`
  background: url("/assets/home/page-bg.png");
  background-position: center;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled(FlexBox)`
  flex-direction: column;
  padding: 1rem;
  align-items: center;
  gap: 1.5rem;
  width: 100%;

  @media ${device.laptop} {
    justify-content: space-between;
    margin: auto;
    gap: 2.5rem;
    width: 86.67%;
    max-width: 75rem;
    padding-bottom: 150px;
  }
`;

const Card = styled(FlexBox)`
  flex-direction: column;
  width: 100%;
  background: #ffffff;
  border: 1px solid #ebf0f4;
  box-shadow: 0px 3px 3px 0px #00000040;
  padding: 0.75rem;
  row-gap: 1rem;
  border-radius: 12px;

  @media ${device.laptop} {
    flex-direction: row;
    column-gap: 1rem;
  }
`;

const Hr = styled.hr`
  width: 100%;
  border: 1px solid #ebf0f4;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const News = ({ fqn }) => {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://api-test-monarq.pamprazzi.in/news/company/${fqn}`
        );

        const { data } = response.data;
        setNewsList(data);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }
    };
    fetchNews();
  }, []);

  if (newsList?.length === 0) {
    return null;
  }

  return (
    <>
      <Wrapper>
        <Container>
          {newsList?.map(item => (
            <StyledLink key={item.newsId} href={`/news/${item.newsId}`}>
              <Card>
                <FlexBox width="100%" column rowGap="15px" padding="1rem">
                  <Support color="#142C8E">{item.newsType}</Support>
                  <H6 bold>{item.newsTitle}</H6>
                  {/* Truncate newsContent if too long */}
                  <Medium>
                    {item.newsContent.length > 100
                      ? item.newsContent.slice(0, 100) + "..."
                      : item.newsContent}
                  </Medium>
                  <Hr />
                  <FlexBox width="100%" justify="space-between">
                    <FlexBox columnGap="4px" align="center">
                      <CiClock2 color="#687792" />
                      <Small color="#687792">
                        {new Date(item.newsDate).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </Small>
                    </FlexBox>
                    <Medium bold>Read More</Medium>
                  </FlexBox>
                </FlexBox>
              </Card>
            </StyledLink>
          ))}
        </Container>
      </Wrapper>
    </>
  );
};

export default News;
