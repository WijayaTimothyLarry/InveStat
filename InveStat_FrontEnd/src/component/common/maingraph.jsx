import React from "react";
import { Line } from "react-chartjs-2";

const MainGraph = ({ portfolioGraphData }) => {
  const { portfolioTotalValue, date } = portfolioGraphData;
  const datasets = portfolioTotalValue.map((d) => {
    return {
      label: d.portfolioName,
      data: d.portfolioHistoricalValue.reverse(),
      fill: true,
      backgroundColor: "rgba(255, 99, 0, 0.4)",
      borderColor: "rgba(255, 99, 0, 0.2)",
      pointBorderColor: "rgb(255, 255, 255)",
      pointHitRadius: 5,
      pointBorderWidth: 3,
      tension: 0.2,
    };
  });
  const data = {
    labels: date.reverse(),
    datasets: datasets,
  };

  const options = {
    plugins: { legend: { display: true } },
    layout: { padding: { bottom: 20, top: 0, right: 20, left: 20 } },
    scales: {
      y: {
        stacked: true,
        beginAtZero: true,
        ticks: {
          color: "black",
          font: {
            size: 18,
          },
        },
      },
      x: {
        ticks: {
          color: "black",
          font: {
            size: 10,
          },
        },
      },
    },
  };

  return (
    <main className="MainGraph">
      <Line data={data} options={options} />
    </main>
  );
};

export default MainGraph;
