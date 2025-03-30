import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useQueryParam, StringParam } from "use-query-params";
import { toast } from "react-toastify";
import { trackEvent } from "@utils/helper";

import FlexBox from "@common/UI/FlexBox";
import { device } from "@common/UI/Responsive";
import { ACCENT_0, PRIMARY_900 } from "@common/UI/colors";
import { Display, Body2 } from "@common/UI/Headings";
import { Button } from "@common/UI/Buttons";
import { CDN } from "@constants/urls";
import { URL } from "@constants/urls";
import { client } from "@axiosClient";

const Wrapper = styled(FlexBox)`
  width: 100%;
  height: 100vh;
  height: 100dvh; // dvh for safe area for full screen height in mobile browsers
  flex-direction: column;

  @media ${device.laptop} {
    flex-direction: row-reverse;
  }
`;

const VideoContainer = styled(FlexBox)`
  width: 100%;
  height: 100%;
  position: fixed;

  @media ${device.laptop} {
    left: 0;
    width: 45%;
  }
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TextContainer = styled(FlexBox)`
  width: 100%;
  height: 100vh;
  height: 100dvh; // dvh for safe area for full screen height in mobile browsers
  position: absolute;
  background: linear-gradient(to top, rgba(0, 0, 0, 1) 0%, transparent 70%);

  @media ${device.laptop} {
    width: 55%;
    background: ${PRIMARY_900};
  }
`;

const TextWrapper = styled(FlexBox)`
  flex-direction: column;
  padding: 5rem 1.5rem;
  gap: 1.5rem;
  justify-content: end;
  align-self: end;
  flex-wrap: wrap;

  @media ${device.laptop} {
    padding: 5rem;
    justify-content: center;
    align-self: center;
  }
`;

const Title = styled(Display)`
  font-size: 2rem;
  line-height: 3rem;
  color: ${ACCENT_0};

  @media ${device.laptop} {
    font-size: 3.125rem;
    line-height: 4rem;
  }
`;

const WelcomePage = ({ commonAnalyticsPayload }) => {
  const router = useRouter();
  const [storeId] = useQueryParam("id", StringParam);

  const handleOnboardingComplete = async () => {
    if (!storeId) return;

    trackEvent("get_started_cta_click", {
      ...commonAnalyticsPayload,
      step_name: "welcome page",
    });

    try {
      await client.patch(URL.updateStore, {
        onBoardingComplete: true,
        storeId,
      });
      router.push(`/my-stores?source=onboarding`);
    } catch (error) {
      toast.error("Failed to add data");
      Bugsnag.notify(error);
    }
  };

  return (
    <Wrapper>
      <VideoContainer>
        <Video loop muted autoPlay>
          <source
            src={`${CDN}/merchant-onboarding/onboarding-video.webm`}
            type="video/webm"
          />
        </Video>
      </VideoContainer>
      <TextContainer>
        <TextWrapper>
          <Title bold>
            Congratulations, <br /> Magician!
          </Title>
          <Body2 color={ACCENT_0}>
            Your salon profile is all set, and customers are excited to get
            pampered. We&apos;ll need about 4-5 business days to check your
            details. After that, you&apos;ll be able to access the dashboard.
          </Body2>
          <Button whiteButton onClick={handleOnboardingComplete}>
            Get Started
          </Button>
        </TextWrapper>
      </TextContainer>
    </Wrapper>
  );
};

export default WelcomePage;
