import React from "react";
import styled from "styled-components";

import FlexBox from "@common/UI/FlexBox";
import { H4 } from "@common/UI/Headings";
import SectionContainer from "@common/SectionContainer";
import { PRIMARY_800 } from "@common/UI/colors";

const Wrapper = styled(FlexBox)`
  width: 100%;
`;

const ProgressBarContainer = styled(FlexBox)`
  width: 100%;
  background-color: #ddd;
  border-radius: 10px;
  margin: 0.5rem 0;
`;

const ProgressBar = styled(FlexBox)`
  width: 15rem;
  height: 0.75rem;
  background-color: ${PRIMARY_800};
  width: ${props => props.progress}%;
  border-radius: 10px;
`;

const PerformanceWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  width: 100%;
`;

const PerformanceTitle = styled(H4)`
  margin-right: 0.5rem;
`;

const UserReview = ({ data }) => {
  const Performance = [
    { title: "Excellent", progress: data?.distribution?.["5"] || 0 },
    { title: "Very good", progress: data?.distribution?.["4"] || 0 },
    { title: "Average", progress: data?.distribution?.["3"] || 0 },
    { title: "Poor", progress: data?.distribution?.["2"] || 0 },
    { title: "Terrible", progress: data?.distribution?.["1"] || 0 },
  ];

  return (
    <Wrapper>
      <SectionContainer title="User Reviews" noPadding>
        <FlexBox column width="100%" padding="0.75rem 1.5rem">
          <FlexBox column padding="0.75rem 0" rowGap="0.5rem">
            <FlexBox columnGap="1.75rem">
              <H4 bold>Total Ratings Received :</H4>
              <H4 bold>{data?.ratingLength}</H4>
            </FlexBox>
            <H4 color="#808080">Your Review breakdown</H4>
          </FlexBox>
          {Performance.map(({ title, progress }, index) => (
            <PerformanceWrapper key={index}>
              <PerformanceTitle>{title}</PerformanceTitle>
              <ProgressBarContainer>
                <ProgressBar progress={progress} />
              </ProgressBarContainer>
            </PerformanceWrapper>
          ))}
        </FlexBox>
      </SectionContainer>
    </Wrapper>
  );
};

export default UserReview;
