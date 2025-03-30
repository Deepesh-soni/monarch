import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const CustomDoughnutChart = ({ percentage }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      // Check if a chart already exists
      if (chartRef.current.__chartid) {
        chartRef.current
          .getContext("2d")
          .clearRect(0, 0, chartRef.current.width, chartRef.current.height);
        // Destroy the existing chart before creating a new one
        const existingChart = Chart.getChart(chartRef.current);
        existingChart.destroy();
      }

      // Create a new chart
      myChart.destroy();
      new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Completion", "Remaining"],
          datasets: [
            {
              data: [percentage, 100 - percentage],
              backgroundColor: [
                "rgba(75, 192, 192, 0.8)",
                "rgba(255, 255, 255, 0.8)",
              ],
              borderWidth: 0,
            },
          ],
        },
        options: {
          cutout: "70%",
          rotation: -0.5 * Math.PI,
          circumference: 1 * Math.PI,
          tooltips: {
            enabled: false,
          },
          legend: {
            display: false,
          },
          animation: {
            onComplete: animation => {
              const ctx = animation.chart.ctx;
              ctx.font = "20px Arial";
              ctx.fillStyle = "#333";
              ctx.textBaseline = "middle";

              const centerX =
                (animation.chart.width -
                  animation.chart.scales["x-axis-0"].left) /
                2;
              const centerY =
                (animation.chart.height -
                  animation.chart.scales["y-axis-0"].top) /
                2;

              ctx.fillText(percentage + "%", centerX, centerY);
            },
          },
        },
      });
    }
  }, [percentage]);

  return <canvas ref={chartRef} />;
};

export default CustomDoughnutChart;
