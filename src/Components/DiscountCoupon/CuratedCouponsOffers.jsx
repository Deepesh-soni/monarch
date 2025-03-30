import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Bugsnag from "@bugsnag/js";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { TbChevronRight, TbChevronLeft } from "react-icons/tb";
import dayjs from "dayjs";

import FlexBox from "@common/UI/FlexBox";
import { device } from "@common/UI/Responsive";
import SectionContainer from "@common/SectionContainer";
import { ACCENT_0, PRIMARY_900 } from "@common/UI/colors";
import { client } from "@axiosClient";
import { URL } from "@constants/urls";
import IndividualCouponListItem from "./individualCouponList";
import SingleCouponBox from "./SingleCouponBox";
import NullState from "../Appointment/NullStates";
import Filter from "./Filter";
import Loader from "@common/Loader";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  overflow-y: scroll;
  width: 100%;
  gap: 1rem;
  @media ${device.laptop} {
    gap: 1.5rem;
    padding: 0;
  }
`;

const TypeWrapper = styled(FlexBox)`
  width: 100%;
  overflow: auto;
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
  white-space: nowrap;
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

const NavigationButton = styled.button`
  background: none;
  border: none;
  color: ${PRIMARY_900};
  font-size: 1.5rem;
  cursor: pointer;

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const breakpoints = {
  320: {
    slidesPerView: 1,
    spaceBetween: 8,
  },
  480: {
    slidesPerView: 1.25,
    spaceBetween: 8,
  },
  768: {
    slidesPerView: 2.5,
    spaceBetween: 12,
  },
  1024: {
    slidesPerView: 3,
    spaceBetween: 16,
  },
  1440: {
    slidesPerView: 3.5,
    spaceBetween: 16,
  },
  1600: {
    slidesPerView: 3.75,
    spaceBetween: 16,
  },
  1920: {
    slidesPerView: 4,
    spaceBetween: 16,
  },
  2560: {
    slidesPerView: 4.5,
    spaceBetween: 16,
  },
};

const CuratedCouponsOffers = () => {
  const [couponsData, setCouponsData] = useState([]);
  const [flatRateCoupons, setFlatRateCoupons] = useState([]);
  const [percentageDiscountCoupons, setPercentageDiscountCoupons] = useState(
    []
  );
  const [filterData, setFilterData] = useState(initialState);
  const prevRefFlatRate = useRef(null);
  const nextRefFlatRate = useRef(null);
  const prevRefPercentage = useRef(null);
  const nextRefPercentage = useRef(null);
  const storeId = useSelector(state => state?.auth?.storeId);
  const [loading, setLoading] = useState(false);

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

          if (day === "day") {
            start = end = dayjs().format("YYYY-MM-DD");
          } else if (day === "week") {
            start = dayjs().startOf("week").format("YYYY-MM-DD");
            end = dayjs().endOf("week").format("YYYY-MM-DD");
          } else if (day === "month") {
            start = dayjs().startOf("month").format("YYYY-MM-DD");
            end = dayjs().endOf("month").format("YYYY-MM-DD");
          }

          params = { active, couponType, startDate: start, endDate: end };
        }
      }

      const response = await client.get(
        `${URL.getAllCuratedCouponList}/${storeId}/`,
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

  const fetchFlatCoupons = async () => {
    try {
      const response = await client.get(
        `${URL.getCuratedCoupon}/1?storeId=${storeId}&discountType=1`
      );
      setFlatRateCoupons(response?.data?.data);
    } catch (error) {
      Bugsnag.notify(error);
    }
  };

  const fetchDiscountCoupons = async () => {
    try {
      const response = await client.get(
        `${URL.getCuratedCoupon}/1?storeId=${storeId}&discountType=2`
      );
      setPercentageDiscountCoupons(response?.data?.data);
    } catch (error) {
      Bugsnag.notify(error);
    }
  };

  useEffect(() => {
    fetchFlatCoupons();
    fetchDiscountCoupons();
  }, []);

  return (
    <Wrapper>
      <AdjustingWidth>
        <SectionContainer
          title="Flat Rate Coupons"
          cta={
            <FlexBox align="center" justify="center">
              <NavigationButton ref={prevRefFlatRate}>
                <TbChevronLeft size="2rem" />
              </NavigationButton>
              <NavigationButton ref={nextRefFlatRate}>
                <TbChevronRight size="2rem" />
              </NavigationButton>
            </FlexBox>
          }
        >
          <TypeWrapper>
            <Swiper
              navigation={{
                prevEl: prevRefFlatRate.current,
                nextEl: nextRefFlatRate.current,
              }}
              breakpoints={breakpoints}
              modules={[Navigation]}
              onInit={swiper => {
                swiper.params.navigation.prevEl = prevRefFlatRate.current;
                swiper.params.navigation.nextEl = nextRefFlatRate.current;
                swiper.navigation.update();
              }}
              className="mySwiper"
            >
              {flatRateCoupons?.map((item, index) => (
                <SwiperSlide key={index}>
                  <SingleCouponBox
                    key={index}
                    item={item}
                    isDiscount
                    getCouponsData={getCouponsData}
                    fetchFlatCoupons={fetchFlatCoupons}
                    fetchDiscountCoupons={fetchDiscountCoupons}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </TypeWrapper>
        </SectionContainer>
      </AdjustingWidth>

      <AdjustingWidth>
        <SectionContainer
          title="Percentage Discount"
          cta={
            <FlexBox align="center" justify="center">
              <NavigationButton ref={prevRefPercentage}>
                <TbChevronLeft size="2rem" />
              </NavigationButton>
              <NavigationButton ref={nextRefPercentage}>
                <TbChevronRight size="2rem" />
              </NavigationButton>
            </FlexBox>
          }
        >
          <TypeWrapper>
            <Swiper
              navigation={{
                prevEl: prevRefPercentage.current,
                nextEl: nextRefPercentage.current,
              }}
              breakpoints={breakpoints}
              modules={[Navigation]}
              onInit={swiper => {
                swiper.params.navigation.prevEl = prevRefPercentage.current;
                swiper.params.navigation.nextEl = nextRefPercentage.current;
                swiper.navigation.update();
              }}
              className="mySwiper"
            >
              {percentageDiscountCoupons?.map((item, index) => (
                <SwiperSlide key={index}>
                  <SingleCouponBox
                    key={index}
                    item={item}
                    getCouponsData={getCouponsData}
                    fetchFlatCoupons={fetchFlatCoupons}
                    fetchDiscountCoupons={fetchDiscountCoupons}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </TypeWrapper>
        </SectionContainer>
      </AdjustingWidth>
      <SectionContainer
        noPadding
        title="Coupons list"
        cta={
          <Filter
            filterData={filterData}
            setFilterData={setFilterData}
            initialState={initialState}
            showDistinct={true}
          />
        }
      >
        <AdjustingWidth>
          <Container>
            <Table>
              <thead>
                <tr>
                  <Th align="left">Coupons</Th>
                  <Th align="left">Type</Th>
                  <Th align="left">Start time</Th>
                  <Th align="left">End Time</Th>
                  <Th align="left">Status</Th>
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
                      couponsData.map(data => (
                        <IndividualCouponListItem key={data?._id} data={data} />
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7">
                          <NullState
                            content="No Coupons available. Publish some coupons now."
                            imgUrl="/assets/Coupons/no-task.webp"
                          />
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
    </Wrapper>
  );
};

export default CuratedCouponsOffers;
