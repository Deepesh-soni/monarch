import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import Bugsnag from "@bugsnag/js";
import { toast } from "react-toastify";
import { client } from "@axiosClient";
import { TfiClose } from "react-icons/tfi";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import Image from "next/image";

import { URL } from "@constants/urls";
import FlexBox from "../common/UI/FlexBox";
import { Body2, H6 } from "@common/UI/Headings";
import {
  PRIMARY_900,
  SECONDARY_901,
  SECONDARY_200,
  ACCENT_500,
} from "@common/UI/colors";
import SectionContainer from "@common/SectionContainer";
import ReviewFilter from "./ReviewFilter";
import SingleReview from "./SingleReview";

const SingleFilterBox = styled(FlexBox)`
  padding: 0.25rem 1rem;
  width: fit-content;
  align-items: center;
  border-radius: 1.5rem;
  column-gap: 0.25rem;
  cursor: pointer;
  background-color: ${SECONDARY_901};
`;

const ReviewSection = styled(FlexBox)`
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  overflow: hidden;
`;

const NullState = styled(FlexBox)`
  border: 1px dotted ${SECONDARY_200};
  padding: 5rem 2rem;
  width: 100%;
  height: 100%;
`;

const FilterLabel = styled(Body2)`
  color: ${PRIMARY_900};
  text-transform: capitalize;
  font-weight: 500;
`;

dayjs.extend(advancedFormat);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const initialState = {
  ratingType: null,
  day: null,
};

const CustomerReviews = ({ storeId }) => {
  const [filterModal, setFilterModal] = useState(false);
  const [filters, setFilters] = useState(initialState);
  const [review, setReview] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);

  const openFilterModal = () => setFilterModal(true);
  const closeFilterModal = () => setFilterModal(false);

  const removeFilter = filedName => {
    setFilters(prev => ({ ...prev, [filedName]: null }));
  };

  const getAllRating = async () => {
    try {
      const response = await client.get(`${URL.getAllRating}/${storeId}`);
      setRating(response?.data?.data);
    } catch (error) {
      Bugsnag.notify(error);
    }
  };

  const getAllReview = async () => {
    try {
      const response = await client.get(`${URL.getAllReview}/${storeId}`);
      setReview(response?.data?.data);
      setFilteredReviews(response?.data?.data.reverse());
    } catch (error) {
      toast.error("Failed to load review");
      Bugsnag.notify(error);
    }
  };

  useEffect(() => {
    if (!storeId) return;
    getAllRating();
    getAllReview();
  }, [storeId]);

  useEffect(() => {
    filterReviews();
  }, [filters]);

  const filterReviews = useCallback(() => {
    const { ratingType, day } = filters;

    let filtered = [...review];

    if (ratingType && ratingType !== "all") {
      filtered = filtered.filter(review => {
        switch (ratingType) {
          case "excellent":
            return review.overallAvgRating > 4;
          case "very-good":
            return review.overallAvgRating > 3 && review.overallAvgRating <= 4;
          case "average":
            return review.overallAvgRating > 2 && review.overallAvgRating <= 3;
          case "poor":
            return review.overallAvgRating > 1 && review.overallAvgRating <= 2;
          case "terrible":
            return review.overallAvgRating === 1;
          default:
            return true;
        }
      });
    }

    if (day) {
      if (day === "today") {
        const today = dayjs().format();
        filtered = filtered.filter(review => {
          const reviewDate = dayjs(review.updatedAt);
          return reviewDate.isSame(today, "day");
        });
      } else if (day === "this week") {
        const startOfWeek = dayjs().startOf("week");
        const endOfWeek = dayjs().endOf("week");

        filtered = filtered.filter(review => {
          const reviewDate = dayjs(review.updatedAt);
          return (
            reviewDate.isSameOrAfter(startOfWeek) &&
            reviewDate.isSameOrBefore(endOfWeek)
          );
        });
      } else if (day === "this month") {
        const startOfMonth = dayjs().startOf("month");
        const endOfMonth = dayjs().endOf("month");

        filtered = filtered.filter(review => {
          const reviewDate = dayjs(review.updatedAt);

          return (
            reviewDate.isSameOrAfter(startOfMonth) &&
            reviewDate.isSameOrBefore(endOfMonth)
          );
        });
      }
    }

    setFilteredReviews(filtered);
  }, [filters]);

  return (
    <>
      {filterModal && (
        <ReviewFilter
          closeModal={closeFilterModal}
          filters={filters}
          setFilters={setFilters}
          initialState={initialState}
        />
      )}
      <SectionContainer
        title="Customer Reviews"
        cta={
          <FlexBox
            columnGap="0.5rem"
            align="center"
            cursor="pointer"
            justify="start"
          >
            <FlexBox
              columnGap="0.5rem"
              align="center"
              style={{ cursor: "pointer" }}
            >
              {filters?.ratingType && (
                <SingleFilterBox
                  onClick={() => {
                    removeFilter("ratingType");
                  }}
                >
                  <FilterLabel>{filters?.ratingType}</FilterLabel>
                  <TfiClose size={12} color={PRIMARY_900} />
                </SingleFilterBox>
              )}

              {filters?.day && (
                <SingleFilterBox
                  onClick={() => {
                    removeFilter("day");
                  }}
                >
                  <FilterLabel color={PRIMARY_900}>{filters?.day}</FilterLabel>
                  <TfiClose size={12} color={PRIMARY_900} />
                </SingleFilterBox>
              )}
            </FlexBox>
            <FlexBox
              columnGap="0.5rem"
              align="center"
              onClick={openFilterModal}
              padding="0.5rem 0"
            >
              <Image src="/assets/images/filter.svg" width={16} height={16} />
              <Body2>Filters</Body2>
            </FlexBox>
          </FlexBox>
        }
      >
        {filteredReviews?.length > 0 ? (
          <ReviewSection>
            {filteredReviews?.map((item, index) => (
              <SingleReview
                key={index}
                data={item}
                getAllReview={getAllReview}
              />
            ))}
          </ReviewSection>
        ) : (
          <ReviewSection>
            <NullState column justify="center" align="center">
              <img src="/assets/Coupons/no-task.webp" alt="No data available" />
              <H6 color={ACCENT_500}>BE THE FIRST ONE TO RATE.</H6>
            </NullState>
          </ReviewSection>
        )}
      </SectionContainer>
    </>
  );
};

export default CustomerReviews;
