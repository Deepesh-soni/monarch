import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import Bugsnag from "@bugsnag/js";
import { useSelector } from "react-redux";
import { FiChevronRight } from "react-icons/fi";

import { client } from "@axiosClient";
import { Button } from "@common/UI/Buttons";
import { URL } from "@constants/urls";
import FlexBox from "@common/UI/FlexBox";
import { ACCENT_0 } from "@common/UI/colors";
import { H3, Display } from "@common/UI/Headings";
import CircularProgressBar from "@common/Analytics/CircularProgressBar";
import useIsDesktop from "@hooks/useIsDesktop";
import { boxShadowDs1 } from "@common/UI/styles";
import { device } from "@common/UI/Responsive";
import CompletionModal from "./CompletionModal";

const BgWrapper = styled(FlexBox)`
  width: 100%;
  flex-direction: row;
  padding: 1.5rem 1rem;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
  background: var(
    --gradient,
    linear-gradient(180deg, #c6426e 0%, #533a71 100%)
  );
  border-radius: 0.75rem;
  ${boxShadowDs1};

  @media ${device.laptop} {
    gap: 1.5rem;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    max-width: 16rem;
  }
`;

export const ProfilePercent = () => {
  const [profileCompletion, setProfileCompletion] = useState({});
  const [showModal, setShowModal] = useState(false);

  const isDesktop = useIsDesktop();
  const storeId = useSelector(state => state.auth.storeId);

  useEffect(() => {
    if (!storeId) return;
    getCompletionPercentage();
  }, [storeId]);

  const getCompletionPercentage = async () => {
    try {
      const res = await client.get(`${URL.profileCompletion}/${storeId}`);
      setProfileCompletion(res?.data?.data);
    } catch (error) {
      toast.error("Failed to fetch details");
      Bugsnag.notify(error);
    }
  };

  const toggleModal = () => setShowModal(prev => !prev);

  return (
    <>
      {showModal && (
        <CompletionModal closeModal={toggleModal} data={profileCompletion} />
      )}
      <BgWrapper onClick={toggleModal}>
        <H3
          bold
          color={ACCENT_0}
          textAlign="center"
          cursor="pointer"
          textDecoration="underline"
        >
          Complete your Profile
        </H3>
        {isDesktop ? (
          <CircularProgressBar
            percent={profileCompletion?.overallPercentage ?? 0}
          />
        ) : (
          <FlexBox align="center" columnGap="0.25rem">
            <Display color={ACCENT_0} bold>
              {profileCompletion?.overallPercentage}
            </Display>
            <FiChevronRight size={32} color={ACCENT_0} />
          </FlexBox>
        )}
        {isDesktop && (
          <Button outline whiteButton>
            Check More Details
          </Button>
        )}
      </BgWrapper>
    </>
  );
};
