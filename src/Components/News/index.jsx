import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CiClock2 } from "react-icons/ci";
import { Pagination, Spin, Modal, Button } from "antd";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { client } from "@axiosClient";

import FlexBox from "@common/UI/FlexBox";
import { Support } from "@common/UI/Headings";
import { device } from "@common/UI/Responsive";
import { H6 } from "../common/Typography";
import { Small, Medium } from "../common/Paragraph";
import { IoFilterOutline } from "react-icons/io5";

const FilterModal = dynamic(() => import("./FilterModal"), { ssr: false });

const Wrapper = styled.div`
  background: url("/assets/home/page-bg.png") center/cover no-repeat;
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
  width: 100%;
  gap: 1.5rem;

  @media ${device.laptop} {
    width: 86.67%;
    max-width: 75rem;
    margin: auto;
    padding-bottom: 150px;
    gap: 2.5rem;
  }
`;

const Card = styled(FlexBox)`
  flex-direction: column;
  width: 100%;
  background: #fff;
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

const HoverCard = styled(Card)`
  cursor: pointer;
  transition: box-shadow 0.3s ease;
  &:hover {
    box-shadow: 0 8px 16px rgba(20, 44, 142, 0.3);
  }
`;

const Hr = styled.hr`
  width: 100%;
  border: 1px solid #ebf0f4;
`;

const EmptyState = styled(FlexBox)`
  width: 100%;
  height: 60vh;
  justify-content: center;
  align-items: center;
`;

const News = ({ onlyCompanyNews = false, companyFqn = "" }) => {
  const router = useRouter();

  // applied filters
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [selectedNewsTypes, setSelectedNewsTypes] = useState([]);
  // modal-only filters
  const [mFrom, setMFrom] = useState(null);
  const [mTo, setMTo] = useState(null);
  const [mTypes, setMTypes] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // detail modal
  const [detail, setDetail] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const [newsList, setNewsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);

  const pageSize = 10;

  const fetchNews = async (page = 1) => {
    setLoading(true);
    let params = { page, pageSize };
    let url;

    if (onlyCompanyNews) {
      url = `/news/company/${companyFqn}`;
    } else {
      if (fromDate) params.start = fromDate;
      if (toDate) params.end = toDate;
      if (selectedNewsTypes.length)
        params.newsTypes = selectedNewsTypes.join(",");
      url = fromDate || toDate ? "/news/date" : "/news";
    }

    try {
      const res = await client.get(url, { params });
      setNewsList(res.data.data?.map((news) => ({
        ...news, newsContent: news.newsContent
          .replace(/<\/p>\s*<p>/gi, '\n\n')
          .replace(/<\/?p>/gi, '')
      })));
      setTotalItems(res.data.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, fromDate, toDate, selectedNewsTypes, onlyCompanyNews, companyFqn]);

  const openFilters = () => {
    setMFrom(fromDate);
    setMTo(toDate);
    setMTypes(selectedNewsTypes);
    setIsFilterOpen(true);
  };

  const applyFilters = () => {
    setFromDate(mFrom);
    setToDate(mTo);
    setSelectedNewsTypes(mTypes);
    setCurrentPage(1);
    setIsFilterOpen(false);
  };

  const resetFilters = () => {
    setMFrom(null);
    setMTo(null);
    setMTypes([]);
    setFromDate(null);
    setToDate(null);
    setSelectedNewsTypes([]);
    setCurrentPage(1);
    setIsFilterOpen(false);
  };

  // render the list + pagination block
  const ListSection = (
    <FlexBox width="100%" column rowGap="1rem">
      {!onlyCompanyNews && (
        <FlexBox justify="flex-end">
          <FlexBox
            border="1.5px solid #142C8E"
            align="center"
            padding="0.5rem 1rem"
            columnGap="0.75rem"
            borderRadius="0.4rem"
            cursor="pointer"
            onClick={openFilters}
          >
            <IoFilterOutline color="#142C8E" size={20} />
            <Small color="#142C8E">Filter</Small>
          </FlexBox>
        </FlexBox>
      )}

      {loading ? (
        <LoaderWrapper>
          <Spin size="large" />
        </LoaderWrapper>
      ) : newsList.length > 0 ? (
        newsList.map(item => (
          <HoverCard
            key={item.id}
            onClick={() => {
              setDetail(item);
              setIsDetailOpen(true);
            }}
          >
            <FlexBox width="100%" column rowGap="15px" padding="1rem">
              {!onlyCompanyNews && (
                <Support color="#142C8E">{item.newsType}</Support>
              )}
              <H6 bold>{item.newsTitle}</H6>
              <Medium>
                {item.newsContent.length > 100
                  ? item.newsContent.slice(0, 100) + "..."
                  : item.newsContent}
              </Medium>
              <Hr />
              <FlexBox columnGap="4px" align="center">
                <CiClock2 color="#687792" />
                <Small color="#687792">
                  {new Date(item.newsDate).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Small>
              </FlexBox>
            </FlexBox>
          </HoverCard>
        ))
      ) : (
        <EmptyState style={{ height: onlyCompanyNews ? '10vh' : '60vh'}}>
          <Medium color="#687792" style={{ fontSize: "1.5rem" }}>
            No news found
          </Medium>
        </EmptyState>
      )}

      {!loading && newsList.length > 0 && (
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
      )}
    </FlexBox>
  );

  // parse related companies
  const relatedFqns = detail?.newsRelatedCo
    ? detail.newsRelatedCo.split(",").map(f => f.trim()).filter(f => f)
    : [];

  return (
    <>
      {onlyCompanyNews ? (
        <FlexBox style={{ width: "100%" }}>{ListSection}</FlexBox>
      ) : (
        <Wrapper>
          <Container>{ListSection}</Container>
        </Wrapper>
      )}

      {!onlyCompanyNews && (
        <FilterModal
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          fromDate={mFrom}
          toDate={mTo}
          setFromDate={setMFrom}
          setToDate={setMTo}
          selectedNewsTypes={mTypes}
          setSelectedNewsTypes={setMTypes}
          onApply={applyFilters}
          onReset={resetFilters}
        />
      )}

      <Modal
        open={isDetailOpen}
        title={null}
        footer={[
          ...(!onlyCompanyNews
            ? relatedFqns.map(fqn => (
              <Button
                key={fqn}
                type="link"
                onClick={() => {
                  setIsDetailOpen(false);
                  router.push(`/stocks/${fqn}`);
                }}
              >
                Open Related Company
              </Button>
            ))
            : []),
          <Button key="close" onClick={() => setIsDetailOpen(false)}>
            Close
          </Button>,
        ]}
        onCancel={() => setIsDetailOpen(false)}
        centered
      >
        <H6 bold>{detail?.newsTitle}</H6>
        <FlexBox justify="space-between" style={{ margin: "0.5rem 0" }}>
          <Small>{detail?.newsCaption}</Small>
          <Small>
            {new Date(detail?.newsDate).toLocaleString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Small>
        </FlexBox>
        <Medium>{detail?.newsContent}</Medium>
      </Modal>
    </>
  );
};

export default News;
