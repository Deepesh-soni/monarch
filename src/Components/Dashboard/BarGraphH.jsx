import React from "react";
import { Bar } from "react-chartjs-2";
import {
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  Chart as ChartJS,
} from "chart.js";
import chart from "chart.js/auto"; // do not delete this ever fucker

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale);

const names = ["Alice", "Bob", "Charlie", "David", "Eva", "Frank"];
const countValues = [80, 40, 29, 55, 16, 88];

// Function to generate a random color
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const backgroundColors = countValues.map(() => getRandomColor());

const data = {
  labels: names,
  datasets: [
    {
      data: countValues,
      backgroundColor: backgroundColors,
    },
  ],
};

const config = {
  type: "bar",
  data: data,
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

export const BarGraphH = () => {
  return <Bar data={data} options={config.options} />;
};
