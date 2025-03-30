import React from "react";
import { Bar } from "react-chartjs-2";
import {
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  Chart as ChartJS,
} from "chart.js";
import styled from "styled-components";
import chart from "chart.js/auto"; // do not delete this ever fucker

import { Body1 } from "@common/UI/Headings";
import FlexBox from "@common/UI/FlexBox";
import { DARKGREY } from "@common/UI/colors";
import { Button } from "@common/UI/Buttons";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale);

const NullState = styled(FlexBox)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex: 1 0 0;
`;

const BarGraph = ({ data, config }) => {
  const bgColor = [
    "#4dc9f6",
    "#f67019",
    "#f53794",
    "#537bc4",
    "#acc236",
    "#166a8f",
    "#00a950",
    "#58595b",
    "#8549ba",
  ];
  const backgroundColors = bgColor.map(
    color => bgColor[Math.floor(Math.random() * bgColor.length)]
  );

  const barConfig = {
    type: "bar",
    options: {
      indexAxis: "y",
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: false,
          text: "Chart.js Horizontal Bar Chart",
        },
      },
    },
  };

  const updatedData = {
    ...data,
    datasets: [
      {
        ...data.datasets[0],
        backgroundColor: backgroundColors,
      },
    ],
  };

  if (
    !data ||
    !data.datasets ||
    data.datasets.length === 0 ||
    data.datasets[0].data.length === 0
  ) {
    return (
      <NullState>
        <img src="/assets/Coupons/no-task.webp" alt="null" />
        <Body1 color={DARKGREY} textAlign="center">
          Please Add Stylists To See Their Appointment Progress
        </Body1>
        <Button outline borderRadius="3.25rem">
          Add Stylist
        </Button>
      </NullState>
    );
  }

  return <Bar data={updatedData} options={barConfig.options} />;
};

export default BarGraph;
