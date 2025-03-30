import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Bugsnag from "@bugsnag/js";
import { toast } from "react-toastify";

import { URL } from "@constants/urls";
import { client } from "@axiosClient";
import FlexBox from "@common/UI/FlexBox";
import { H1, H4 } from "@common/UI/Headings";
import UserReview from "./UserReview";
import CustomerReviews from "./CustomerReviews";
import SectionContainer from "@common/SectionContainer";
import Favorite from "./FavoriteContainer";
import Rating from "@common/UI/DisplayRate";
import { device } from "@common/UI/Responsive";
import OtherRatings from "./OtherRatings";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  width: 100%;
  gap: 1.5rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  @media ${device.laptop} {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
`;

const StoreImg = styled.div`
  width: 100%;
  max-width: 4rem;
  aspect-ratio: 1;
  border-radius: 5rem;
  overflow: hidden;
`;

const Review = () => {
  const [rating, setRating] = useState({});
  const storeId = useSelector(state => state?.auth?.storeId);
  const storeDetails = useSelector(state => state?.activeStore?.storeDetails);
  const [likeCount, setLikeCount] = useState(0);

  const thumbnail = storeDetails?.storeImages?.filter(
    image => image.isThumbnail
  )?.[0]?.imageUrl;

  const getAllRating = async storeId => {
    try {
      const response = await client.get(`${URL.getAllRating}/${storeId}`);
      setRating(response?.data?.data);
    } catch (error) {
      toast.error("Failed to load review");
      Bugsnag.notify(error);
    }
  };

  useEffect(() => {
    if (!storeId) return;
    getAllRating(storeId);
  }, []);

  const likeNumberCount = async storeId => {
    try {
      const response = await client.get(`${URL.favouriteCount}/${storeId}`);
      setLikeCount(response?.data?.data);
    } catch (error) {
      toast.error("Failed to load review");
      Bugsnag.notify(error);
    }
  };

  useEffect(() => {
    if (!storeId) return;
    likeNumberCount(storeId);
  }, []);

  return (
    <Wrapper>
      <SectionContainer showHeader={false}>
        <FlexBox column align="center" justify="center" rowGap="0.75rem">
          <StoreImg>
            <img src={thumbnail} height="100%" width="100%" />
          </StoreImg>
          <H1 bold>{storeDetails?.storeName}</H1>
          {rating && (
            <>
              <Rating
                rate={parseFloat(rating?.overallRating)}
                width="3.50rem"
                height="3.50rem"
              />
              <H4 bold>Your Rating : {rating?.overallRating}</H4>
            </>
          )}
        </FlexBox>
      </SectionContainer>
      <FlexBox>
        <Container columnGap="1.5rem">
          <FlexBox column rowGap="1rem">
            <UserReview data={rating} />
            <OtherRatings data={rating} />
            <Favorite data={likeCount}/>
          </FlexBox>
          <CustomerReviews storeId={storeId} />
        </Container>
      </FlexBox>
    </Wrapper>
  );
};

export default Review;
