import React from "react";
import { Doughnut } from "react-chartjs-2";
import styled from "styled-components";

import FlexBox from "@common/UI/FlexBox";
import { Body2, H1 } from "@common/UI/Headings";

const ChartWrapper = styled(FlexBox)`
  padding: 1.5rem;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Text = styled(FlexBox)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const PieGraph = ({
  labels,
  data,
  backgroundColor,
  borderColor,
  totalItems,
  graphTitle,
  height,
}) => {
  const chartData = {
    datasets: [
      {
        labels: labels,
        data: data,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
        responsive: true,
        cutout: 80,
        borderRadius: 1,
        spacing: 8,
        legend: {
          display: false,
        },
        layout: {
          padding: 10,
        },
        animations: {
          tension: {
            duration: 1000,
            easing: "linear",
            from: 1,
            to: 0,
            loop: true,
          },
        },
      },
    ],
  };

  return (
    <>
      <ChartWrapper height={height}>
        <Doughnut data={chartData} />
        <Text column>
          <H1 bold>{totalItems}</H1>
          <Body2>{graphTitle}</Body2>
        </Text>
      </ChartWrapper>
    </>
  );
};

export default PieGraph;
