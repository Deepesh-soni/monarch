import React from "react";
import styled from "styled-components";
import { useQueryParam, StringParam } from "use-query-params";
import Bugsnag from "@bugsnag/js";

import FlexBox from "@common/UI/FlexBox";
import { Body1, Body2 } from "@common/UI/Headings";
import { Button } from "@common/UI/Buttons";
import {
  ACCENT_200,
  SECONDARY_200,
  GREEN_BACKGROUND,
  PRIMARY_200,
  RED_100,
  WARNING,
  WARNING_BACKGROUND,
  GREEN,
  ERROR,
} from "@common/UI/colors";
import { client } from "@axiosClient";
import { URL } from "@constants/urls";
import { trackEvent } from "@utils/helper";
import { ACTIVE, PUBLISHED } from "@constants";

const StatusBox = styled(FlexBox)`
  width: fit-content;
  padding: 0 1rem;
  border-radius: 2rem;
  background: ${({ background }) => background || PRIMARY_200};
`;

const Card = styled(FlexBox)`
  width: 100%;
  flex-direction: column;
  padding: 0.75rem;
  align-items: center;
  gap: 1rem;
  border: 1px solid ${SECONDARY_200};
  border-radius: 1rem;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  border-radius: 1rem;
  object-fit: cover;
`;

const ProgressBar = styled(FlexBox)`
  width: 80%;
  height: 0.5rem;
  background: ${ACCENT_200};
`;

const ProgressIndicator = styled.div`
  width: ${({ percentage }) => `${percentage * 100}%`};
  height: 0.5rem;
  border-radius: 0.25rem;
  background: var(
    --gradient,
    linear-gradient(180deg, #c6426e 0%, #533a71 100%)
  );
  transition: width 600ms ease-out;
`;

const storeStatuses = {
  PENDING: { label: "Incomplete Profile", labelBg: RED_100, textColor: ERROR },
  IN_REVIEW: {
    label: "In Review",
    labelBg: WARNING_BACKGROUND,
    textColor: WARNING,
  },
  ACTIVE: { label: "Active", labelBg: GREEN_BACKGROUND, textColor: GREEN },
};

const StoreCard = ({ store, handleCardClick }) => {
  const { store_status, storeId, thumbImage, storeName, address } = store;
  const storeStatus = storeStatuses[store_status?.toUpperCase()];
  const [source] = useQueryParam("source", StringParam);

  const handleClick = () => {
    trackEvent("store_card_click", {
      page: "my-stores",
      source: source || "my-stores",
      store_status,
      store_id: storeId,
    });
    handleCardClick(store);
  };

  const handlePublishSalon = async (e, publishSalon = true) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const response = await client.post(URL.updateSalonStatus, {
        storeId,
        status: publishSalon ? PUBLISHED : ACTIVE,
      });
    } catch (error) {
      Bugsnag.notify(error);
    }
  };

  return (
    <Card onClick={handleClick}>
      <Image
        src={thumbImage ? thumbImage : "assets/fallback.webp"}
        alt={`${storeName} thumbnail`}
      />
      <FlexBox width="100%" align="center" column>
        <Body1 bold>{storeName}</Body1>
        <Body2 textTransform="capitalize">{address?.city}</Body2>
      </FlexBox>
      <FlexBox width="100%" rowGap="0.25rem" align="center" column>
        <ProgressBar>
          <ProgressIndicator percentage={store?.completedPercentage / 100} />
        </ProgressBar>
        <Body2>{store?.completedPercentage}% Profile Completed</Body2>
      </FlexBox>
      <FlexBox
        width="100%"
        rowGap="0.5rem"
        column
        align="center"
        padding="0 2.5rem"
      >
        <FlexBox width="100%" column rowGap="0.5rem" align="center">
          {store_status === PUBLISHED ? (
            <Button width="100%" onClick={e => handlePublishSalon(e, false)}>
              Unpublish Salon
            </Button>
          ) : store_status === ACTIVE ? (
            <Button outline width="100%" onClick={handlePublishSalon}>
              Publish Salon
            </Button>
          ) : (
            <StatusBox background={storeStatus.labelBg}>
              <Body2 color={storeStatus.textColor}>{storeStatus.label}</Body2>
            </StatusBox>
          )}
        </FlexBox>
      </FlexBox>
    </Card>
  );
};

export default StoreCard;
