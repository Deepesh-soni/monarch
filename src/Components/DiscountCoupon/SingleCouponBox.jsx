import React, { useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import FlexBox from "@common/UI/FlexBox";
import { Body1, Support } from "@common/UI/Headings";
import { ACCENT_300, ACCENT_600 } from "@common/UI/colors";
import { Button } from "@common/UI/Buttons";
import CuratedCouponModal from "./CuratedCouponModal";
import ShareModal from "./CuratedCouponModal/ShareModal"; // Adjusted import

dayjs.extend(utc);
dayjs.extend(timezone);

const SmallCard = styled(FlexBox)`
  border: 1px solid ${ACCENT_300};
  border-radius: 0.75rem;
  padding: 0.75rem 1.5rem;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
`;

const SingleCouponBox = ({
  item,
  index,
  isDiscount,
  getCouponsData,
  fetchFlatCoupons,
  fetchDiscountCoupons,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [openShareModal, setOpenShareModal] = useState(false);

  const handleSelectClick = () => {
    setOpenModal(true);
  };

  const handleShareClick = () => {
    setOpenShareModal(true);
  };

  const hasCouponCreated = item?.couponCreated?.couponCreated;

  return (
    <SmallCard key={index}>
      {openModal && (
        <CuratedCouponModal
          setModalOpen={setOpenModal}
          item={item}
          getCouponsData={getCouponsData}
          fetchFlatCoupons={fetchFlatCoupons}
          fetchDiscountCoupons={fetchDiscountCoupons}
        />
      )}
      {openShareModal && (
        <ShareModal
          setModalOpen={setOpenShareModal}
          couponCode={item?.couponCode}
          couponString={item?.couponString}
        />
      )}
      <FlexBox column rowGap="0.5rem">
        <Body1 bold color="black">
          {item?.couponCode}
        </Body1>
        <Support color={ACCENT_600}>{item?.couponString}</Support>
        {hasCouponCreated ? (
          <Button outline width="100%">
            {dayjs(item.couponCreated.couponCreated.startedFrom)
              .utc()
              .format("DD.MM.YY")}{" "}
            -{" "}
            {dayjs(item.couponCreated.couponCreated.expiredAt)
              .utc()
              .format("DD.MM.YY")}
          </Button>
        ) : (
          <Button width="100%" onClick={handleSelectClick}>
            Select Time
          </Button>
        )}
      </FlexBox>
      <FlexBox column rowGap="1rem" align="end">
        {hasCouponCreated && (
          <img
            src="/assets/Coupons/share.webp"
            height={16}
            width={16}
            onClick={handleShareClick}
            style={{ cursor: "pointer" }}
          />
        )}
        <img
          src={
            isDiscount
              ? "/assets/Coupons/rupees-icon.webp"
              : "/assets/Coupons/percentage-icon.webp"
          }
          width="65px"
          height="65px"
        />
      </FlexBox>
    </SmallCard>
  );
};

export default SingleCouponBox;
