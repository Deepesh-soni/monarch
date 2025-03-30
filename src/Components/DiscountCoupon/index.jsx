import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Bugsnag from "@bugsnag/js";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

import FlexBox from "@common/UI/FlexBox";
import { Body1 } from "@common/UI/Headings";
import { device } from "@common/UI/Responsive";
import { ACCENT_0, SECONDARY_500 } from "@common/UI/colors";
import CardWithSubtitle from "@common/Coupons/CardWithSubtitle";
import SectionContainer from "@common/SectionContainer";
import { client } from "@axiosClient";
import { URL } from "@constants/urls";
import NullStateCouponData from "./NullStateCouponData";
import CouponLineItem from "./CouponLineItem";
import Filter from "./Filter";
import Loader from "@common/Loader";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  overflow-y: scroll;
  width: 100%;
  gap: 1rem;

  @media ${device.laptop} {
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    width: 25rem;
    overflow-x: scroll;
    white-space: nowrap;
  }
`;

const SmallCard = styled(FlexBox)`
  flex-direction: column;
  row-gap: 1rem;

  @media ${device.laptop} {
    flex-direction: row;
    height: 30%;
    column-gap: 1rem;
  }

  @media (max-width: 768px) {
    max-width: 25rem;
    height: 100%;
    width: auto;
  }
`;

const Container = styled(FlexBox)`
  width: 100%;
  background-color: ${ACCENT_0};
  overflow-y: auto;
`;

const Table = styled.table`
  width: 100%;
`;

const Th = styled.th`
  text-align: ${({ align }) => align || "start"};
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #d7d7d7;
  text-transform: capitalize;
`;

const AdjustingWidth = styled(FlexBox)`
  max-width: 100vw;
  overflow: scroll;

  @media ${device.laptop} {
    width: 100%;
  }
`;

const initialState = {
  active: null,
  couponType: null,
  time: null,
  day: null,
};

const DiscountCoupon = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [couponsData, setCouponsData] = useState([]);
  const [couponCategory, setCouponCategory] = useState([]);
  const [filterData, setFilterData] = useState(initialState);
  const storeId = useSelector(state => state.auth.storeId);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const getCouponsData = async () => {
    setLoading(true);
    try {
      const { active, couponType, day, startDate, endDate, date } =
        filterData || {};
      let params = {};

      if (filterData !== initialState) {
        if (day === "pickDate") {
          params = { active, couponType, startDate, endDate };
        } else {
          let start, end;

          if (day === "today") {
            start = end = dayjs().format("YYYY-MM-DD");
          } else if (day === "this week") {
            start = dayjs().startOf("week").format("YYYY-MM-DD");
            end = dayjs().endOf("week").format("YYYY-MM-DD");
          } else if (day === "this month") {
            start = dayjs().startOf("month").format("YYYY-MM-DD");
            end = dayjs().endOf("month").format("YYYY-MM-DD");
          } else {
            start = dayjs(date).startOf(day).format("YYYY-MM-DD");
            end = dayjs(date).endOf(day).format("YYYY-MM-DD");
          }

          params = {
            active,
            couponType,
            startDate: start,
            endDate: end,
          };
        }
      }

      const response = await client.get(
        `${URL.getCouponsPerformance}/${storeId}/`,
        {
          params,
        }
      );
      setCouponsData(response?.data?.data);
    } catch (error) {
      Bugsnag.notify(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCouponsData();
  }, [filterData]);

  useEffect(() => {
    const couponCategory = async () => {
      try {
        const response = await client.get(URL.getCouponCategory);
        setCouponCategory(response?.data?.data);
      } catch (error) {
        Bugsnag.notify(error);
      }
    };
    couponCategory();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleRedirect = () => router.push("/coupons/curated");
  const handleCustomRedirect = () => router.push("/coupons/custom");

  return (
    <Wrapper>
      {isModalOpen && <NullStateCouponData closeModal={closeModal} />}
      <SmallCard columnGap="1.5rem">
        {couponCategory &&
          couponCategory.map((data, index) => (
            <CardWithSubtitle
              key={data?._id}
              id={data?._id}
              title={data?.categoryName}
              subtitle={data?.description}
              image={data?.categoryIcon}
              onClick={
                index === 0
                  ? handleRedirect
                  : index === 1
                  ? handleCustomRedirect
                  : openModal
              }
            />
          ))}
      </SmallCard>

      <FlexBox height="100%">
        <SectionContainer
          noPadding
          title="Coupons performance"
          cta={
            <Filter
              filterData={filterData}
              setFilterData={setFilterData}
              initialState={initialState}
            />
          }
        >
          <AdjustingWidth>
            <Container>
              <Table>
                <thead>
                  <tr>
                    <Th align="center">Coupons</Th>
                    <Th align="center">Start Date</Th>
                    <Th align="center">End Date</Th>
                    <Th align="center">Runtime</Th>
                    <Th align="center">Click through</Th>
                    <Th align="center">Conversion</Th>
                    <Th align="center">Status</Th>
                    <Th align="center">Action</Th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <FlexBox justify="center" align="center" height="100%">
                      <Loader fitContent />
                    </FlexBox>
                  ) : (
                    <>
                      {couponsData?.length > 0 ? (
                        couponsData
                          .slice()
                          .reverse()
                          .map(data => (
                            <CouponLineItem
                              key={data?.id}
                              data={data}
                              getCouponsData={getCouponsData}
                            />
                          ))
                      ) : (
                        <tr>
                          <td colSpan="7">
                            <FlexBox
                              column
                              rowGap="1rem"
                              width="100%"
                              height="15rem"
                              justify="center"
                              align="center"
                            >
                              <img
                                src="/assets/Coupons/no-task.webp"
                                alt="No Booking"
                                width="40px"
                                height="50px"
                              />
                              <Body1 color={SECONDARY_500}>
                                No Coupons available. Publish some coupons now.
                              </Body1>
                            </FlexBox>
                          </td>
                        </tr>
                      )}
                    </>
                  )}
                </tbody>
              </Table>
            </Container>
          </AdjustingWidth>
        </SectionContainer>
      </FlexBox>
    </Wrapper>
  );
};

export default DiscountCoupon;
