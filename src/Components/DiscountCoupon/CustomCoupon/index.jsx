import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Bugsnag from "@bugsnag/js";
import { useSelector } from "react-redux";

import FlexBox from "@common/UI/FlexBox";
import { Body1, Body2 } from "@common/UI/Headings";
import { device } from "@common/UI/Responsive";
import {
  ACCENT_0,
  PRIMARY_900,
  SECONDARY_901,
  SECONDARY_500,
} from "@common/UI/colors";
import { boxShadowDs1 } from "@common/UI/styles";
import CardWithSubtitle from "@common/Coupons/CardWithSubtitle";
import SectionContainer from "@common/SectionContainer";
import { client } from "@axiosClient";
import { URL } from "@constants/urls";
import ControlBoardTable from "./ControlBoardTable";
import Filter from "../Filter";
import Loader from "@common/Loader";
import NullStateCouponData from "../NullStateCouponData";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  overflow-y: scroll;
  width: 100%;
  gap: 1rem;

  @media ${device.laptop} {
    gap: 1.5rem;
    padding: 0.25rem;
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
  text-wrap: wrap;

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

const CreateCustomBox = styled(FlexBox)`
  width: 100%;
  flex-direction: column;
  padding: 0.75rem;
  gap: 0.5rem;
  justify-content: center;
  align-items: flex-start;
  border-bottom: 0.5px solid ${SECONDARY_901};
  border-radius: 0.75rem;
  flex-wrap: wrap;
  ${boxShadowDs1};

  @media ${device.laptop} {
    padding: 0.75rem 1.5rem;
  }
`;

const CreateCTA = styled(FlexBox)`
  padding: 0.5rem 2rem;
  width: fit-content;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px solid ${PRIMARY_900};
  border-radius: 0.3125rem;
  background-color: #cabbdd;
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

const CustomCoupon = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [couponsData, setCouponsData] = useState([]);
  const [couponCategory, setCouponCategory] = useState([]);
  const [filterData, setFilterData] = useState(initialState);
  const storeId = useSelector(state => state.auth.storeId);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  //   const getCouponsData = async () => {
  //     setLoading(true);
  //     try {
  //       const { active, couponType, day, startDate, endDate, date } =
  //         filterData || {};
  //       let params = {};

  //       if (filterData !== initialState) {
  //         if (day === "pickDate") {
  //           params = { active, couponType, startDate, endDate };
  //         } else {
  //           let start, end;

  //           if (day === "today") {
  //             start = end = dayjs().format("YYYY-MM-DD");
  //           } else if (day === "this week") {
  //             start = dayjs().startOf("week").format("YYYY-MM-DD");
  //             end = dayjs().endOf("week").format("YYYY-MM-DD");
  //           } else if (day === "this month") {
  //             start = dayjs().startOf("month").format("YYYY-MM-DD");
  //             end = dayjs().endOf("month").format("YYYY-MM-DD");
  //           } else {
  //             start = dayjs(date).startOf(day).format("YYYY-MM-DD");
  //             end = dayjs(date).endOf(day).format("YYYY-MM-DD");
  //           }

  //           params = {
  //             active,
  //             couponType,
  //             startDate: start,
  //             endDate: end,
  //           };
  //         }
  //       }

  //       const response = await client.get(
  //         `${URL.getCouponsPerformance}/${storeId}/`,
  //         {
  //           params,
  //         }
  //       );
  //       setCouponsData(response?.data?.data);
  //     } catch (error) {
  //       Bugsnag.notify(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   useEffect(() => {
  //     getCouponsData();
  //   }, [filterData]);

  //small card - custom homepage

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
  const handleCustomForm = () => router.push("/coupons/customForm");

  return (
    <Wrapper>
      {isModalOpen && <NullStateCouponData closeModal={closeModal} />}
      <SmallCard columnGap="1.5rem">
        {couponCategory &&
          couponCategory.map(
            (data, index) =>
              data?.couponCategoryId !== 2 && (
                <CardWithSubtitle
                  key={data?.id}
                  id={data?.id}
                  title={data?.categoryHeading}
                  subtitle={data.subDescription}
                  image={data?.categoryIcon}
                  onClick={index === 0 ? handleRedirect : openModal}
                />
              )
          )}
      </SmallCard>

      <CreateCustomBox column Gap="0.5rem">
        <Body1 bold>Create Custom Coupons!</Body1>
        <Body2>
          Tailor promotions to fit your business needs. Boost sales, attract
          customers, and reward loyalty with personalized offers. Start
          designing your unique coupons today and elevate your marketing
          efforts!
        </Body2>
        <CreateCTA onClick={handleCustomForm}>Create New Coupon</CreateCTA>
      </CreateCustomBox>

      <FlexBox height="100%">
        <SectionContainer
          noPadding
          title="Custom Coupons control board"
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
                    <Th align="center">Coupon Name</Th>
                    <Th align="center">Discount</Th>
                    <Th align="center">Status</Th>
                    <Th align="center">Start Time</Th>
                    <Th align="center">Expiration</Th>
                    <Th align="center">Conversion</Th>
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
                            <ControlBoardTable
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

export default CustomCoupon;
