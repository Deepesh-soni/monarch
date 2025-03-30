import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Image from "next/image";
import Bugsnag from "@bugsnag/js";
import { client } from "@axiosClient";
import { FaPlayCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import dayjs from "dayjs";

import Avatar from "@common/UI/Avatar";
import FlexBox from "@common/UI/FlexBox";
import { H4, H3 } from "@common/UI/Headings";
import Rating from "@common/UI/DisplayRate";
import { Button } from "@common/UI/Buttons";
import {
  ACCENT_0,
  ACCENT_300,
  SECONDARY_GREY,
  PRIMARY_900,
} from "@common/UI/colors";
import TextArea from "@common/UI/TextArea";
import { URL } from "@constants/urls";
import { device } from "@common/UI/Responsive";
import PreviewMedia from "./PreviewMedia";

const Wrapper = styled(FlexBox)`
  width: 100%;
  row-gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid ${ACCENT_300};
`;

const DateContainer = styled(FlexBox)`
  flex-direction: column;
  gap: 0.25rem;
  @media ${device.laptop} {
    flex-direction: row;
  }
`;

const MediaContainer = styled(FlexBox)`
  width: 8rem;
  height: 5rem;
  border-radius: 0.75rem;
  background-color: ${ACCENT_300};
  position: relative;
  cursor: pointer;
`;

const VideoThumbnail = styled(FlexBox)`
  justify-content: center;
  align-items: center;
  z-index: 10;
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 0.75rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.5);
`;

const MediaWrapper = styled(FlexBox)`
  padding: 0.5rem 0;
  column-gap: 0.5rem;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.75rem;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.75rem;
`;

const ReplyToggle = styled(H4)`
  cursor: pointer;
  color: ${PRIMARY_900};
  padding-left: 2rem;
  text-transform: capitalize;
  text-decoration: underline;
`;

const MerchantReplyChip = styled(FlexBox)`
  background-color: rgba(83, 58, 113, 0.1);
  padding: 0 0.5rem;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  column-gap: 0.5rem;
`;

const SingleReview = ({ data, getAllReview }) => {
  const minVisibleReviews = 3;
  const [showBox, setShowBox] = useState(false);
  const [comment, setComment] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleReviews, setVisibleReviews] = useState(minVisibleReviews);

  const user = useSelector(state => state?.auth?.user);
  const storeName = useSelector(
    state => state?.activeStore?.storeDetails?.storeName
  );

  const handleOpen = index => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleReply = () => {
    setShowBox(true);
  };

  const handleCancel = () => {
    setShowBox(false);
    setComment("");
  };

  const handleLoadMore = () => {
    setVisibleReviews(prev =>
      prev + 5 > data?.replyReview?.length
        ? data?.replyReview?.length
        : prev + 5
    );
  };

  const handleViewLess = () => {
    setVisibleReviews(minVisibleReviews);
  };

  const disabled = comment.trim().length === 0;

  const handlePost = async () => {
    try {
      await client.post(`${URL.replyRating}/${data?._id}`, {
        userId: user?.userId,
        name: storeName,
        comment: comment,
      });
      setShowBox(false);
      setComment("");
      getAllReview();
      toast.success("Reply posted successfully");
    } catch (error) {
      toast.error("Failed to post reply");
      Bugsnag.notify(error);
    }
  };

  return (
    <>
      {isOpen && (
        <PreviewMedia
          media={data?.media}
          handleClose={handleClose}
          index={currentIndex}
        />
      )}

      <Wrapper column>
        <FlexBox justify="space-between">
          <FlexBox align="center" columnGap="0.5rem">
            <Avatar name={data?.name} />
            <H3 bold>{data?.name}</H3>
          </FlexBox>
        </FlexBox>
        <FlexBox column rowGap="0.5rem">
          <Rating rate={data?.overallAvgRating} height="1.25rem" />
          <DateContainer>
            <H4>
              {data?.createdAt
                ? dayjs(data?.createdAt).format("DD-MMMM-YYYY")
                : ""}
            </H4>
            <H4>{data?.serviceNames}</H4>
          </DateContainer>
          <H3>{data ? data?.review : "-"}</H3>
        </FlexBox>

        {data?.media?.length > 0 && (
          <MediaWrapper>
            {data?.media?.map((item, index) => (
              <MediaContainer key={index} onClick={() => handleOpen(index)}>
                {item?.type === "image" ? (
                  <Img
                    key={index}
                    src={item?.mediaUrl}
                    alt={`Review Image ${index + 1}`}
                  />
                ) : (
                  <>
                    <VideoThumbnail>
                      <FaPlayCircle size="2rem" color="white" />
                    </VideoThumbnail>
                    <Video src={item?.mediaUrl} />
                  </>
                )}
              </MediaContainer>
            ))}
          </MediaWrapper>
        )}
        <FlexBox column padding="0.5rem 2.5rem" rowGap="0.75rem">
          {data?.replyReview?.length > 0 &&
            data.replyReview.slice(0, visibleReviews).map((review, index) => (
              <FlexBox key={index} columnGap="0.5rem">
                <Avatar name={review?.name} width="1.75rem" height="1.75rem" />
                <FlexBox column rowGap="0.25rem">
                  <FlexBox align="center" columnGap="0.5rem">
                    {review?.isAuthor ? (
                      <MerchantReplyChip>
                        <H4 bold>{review?.name}</H4>
                        <Image
                          src="/assets/images/verified-badge.svg"
                          alt="verified"
                          width={20}
                          height={20}
                        />
                      </MerchantReplyChip>
                    ) : (
                      <H4 bold>{review?.name}</H4>
                    )}
                    <H4 color={SECONDARY_GREY}>
                      {review?.repliedAt
                        ? dayjs(review?.repliedAt).format("DD-MMMM-YYYY")
                        : ""}
                    </H4>
                  </FlexBox>
                  <H4>{review?.comment}</H4>
                </FlexBox>
              </FlexBox>
            ))}

          {data?.replyReview?.length > visibleReviews && (
            <ReplyToggle onClick={handleLoadMore} bold>
              Show more replies
            </ReplyToggle>
          )}
          {data?.replyReview?.length > minVisibleReviews &&
            visibleReviews === data?.replyReview?.length && (
              <ReplyToggle onClick={handleViewLess} bold>
                View less
              </ReplyToggle>
            )}
        </FlexBox>
        {!showBox ? (
          <Button primary onClick={handleReply}>
            Reply
          </Button>
        ) : (
          <FlexBox column rowGap="0.75rem">
            <TextArea
              label="Write your reply"
              type="text"
              labelColor={ACCENT_0}
              value={comment}
              onChange={e => setComment(e.target.value)}
            />
            <FlexBox columnGap="1rem">
              <Button disabled={disabled} onClick={handlePost}>
                Post
              </Button>
              <Button textCta onClick={handleCancel}>
                Cancel
              </Button>
            </FlexBox>
          </FlexBox>
        )}
      </Wrapper>
    </>
  );
};

export default SingleReview;
