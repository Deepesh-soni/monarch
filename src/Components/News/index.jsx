import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CiClock2 } from "react-icons/ci";
import { Pagination, Spin } from "antd";
import Link from "next/link";
import dynamic from "next/dynamic";
import axios from "axios";

import FlexBox from "@common/UI/FlexBox";
import { Support } from "@common/UI/Headings";
import { device } from "@common/UI/Responsive";
import { H6 } from "../common/Typography";
import { Small, Medium } from "../common/Paragraph";
import { IoFilterOutline } from "react-icons/io5";

const FilterModal = dynamic(() => import("./FilterModal"), {
  ssr: false,
});

const Wrapper = styled.div`
  background: url("/assets/home/page-bg.png");
  background-position: center;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoaderWrapper = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
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

const News = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newsList, setNewsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);

  // New States for filters
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [selectedNewsTypes, setSelectedNewsTypes] = useState([]);

  const pageSize = 10; // Set pageSize same as backend

  const fetchNews = async (page = 1) => {
    try {
      setLoading(true);

      const params = {
        page,
        pageSize,
      };

      // Add filters to API call if selected
      if (fromDate) {
        params.fromDate = fromDate;
      }
      if (toDate) {
        params.toDate = toDate;
      }
      if (selectedNewsTypes.length > 0) {
        params.newsTypes = selectedNewsTypes.join(",");
      }

      const response = await axios.get(
        "https://api-test-monarq.pamprazzi.in/news",
        { params }
      );

      const { data, total } = response.data;
      setNewsList(data);
      setTotalItems(total);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch news:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, fromDate, toDate, selectedNewsTypes]);

  const handleApplyFilter = () => {
    setCurrentPage(1); // Reset to page 1 when filter applied
    fetchNews(1);
    setIsModalOpen(false);
  };

  const handleResetFilters = () => {
    setFromDate(null);
    setToDate(null);
    setSelectedNewsTypes([]);
    setCurrentPage(1); // Reset to first page
    fetchNews(1); // Fetch news after resetting
    setIsModalOpen(false);
  };

  return (
    <>
      <Wrapper>
        <Container>
          <FlexBox width="100%" column rowGap="1rem">
            <FlexBox
              align="center"
              justify="space-between"
              width="100%"
              padding="1rem 0"
            >
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

            {/* If loading, show loading text (you can add skeletons too) */}
            {loading ? (
              <LoaderWrapper width="100%" justify="center" padding="2rem">
                <Spin size="large" />
              </LoaderWrapper>
            ) : (
              newsList.map(item => (
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
                            {new Date(item.newsDate).toLocaleDateString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </Small>
                        </FlexBox>
                        <Medium bold>Read More</Medium>
                      </FlexBox>
                    </FlexBox>
                  </Card>
                </StyledLink>
              ))
            )}

            <Pagination
              current={currentPage}
              onChange={page => {
                setCurrentPage(page);
                window.scrollTo(0, 0);
              }}
              total={totalItems}
              pageSize={pageSize}
              showSizeChanger={false}
              style={{ marginTop: "1rem", alignSelf: "center" }}
            />
          </FlexBox>
        </Container>
      </Wrapper>

      {/* Filter Modal */}
      {isModalOpen && (
        <FilterModal
          setIsModalOpen={setIsModalOpen}
          fromDate={fromDate}
          toDate={toDate}
          setFromDate={setFromDate}
          setToDate={setToDate}
          selectedNewsTypes={selectedNewsTypes}
          setSelectedNewsTypes={setSelectedNewsTypes}
          onApplyFilter={handleApplyFilter}
          onResetFilters={handleResetFilters}
        />
      )}
    </>
  );
};

export default News;
