import React from "react";
import { Line } from "react-chartjs-2";

const MainGraph = ({ portfolioGraphData }) => {
  const { portfolioTotalValue, date } = portfolioGraphData;
  const datasets = portfolioTotalValue.map((d) => {
    return {
      label: d.portfolioName,
      data: d.portfolioHistoricalValue,
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
    labels: date,
    datasets: datasets,
    //
    // {
    //   label:
    //     portfolioTotalValue.length !== 0
    //       ? portfolioTotalValue[0].portfolioName
    //       : "",
    //   data: portfolioTotalValue
    //     ? portfolioTotalValue[0].portfolioHistoricalValue
    //     : [],
    //   fill: true,
    //   backgroundColor: "rgba(255, 99, 132, 0.4)",
    //   borderColor: "rgba(255, 99, 132, 0.2)",
    //   pointBorderColor: "rgb(255, 255, 255)",
    //   pointHitRadius: 5,
    //   pointBorderWidth: 3,
    //   tension: 0.2,
    // },
    //{
    //  label: "Portfolio 2",
    //  data: [3000, 3018, 4790, 5000, 6273, 7777],
    //  fill: true,
    //  backgroundColor: "rgba(255, 99, 0, 0.4)",
    //  borderColor: "rgba(255, 99, 0, 0.2)",
    //  pointBorderColor: "rgb(255, 255, 255)",
    //  pointHitRadius: 5,
    //  pointBorderWidth: 3,
    //  tension: 0.2,
    //},
    //],
  };

  const options = {
    plugins: { legend: { display: true } },
    layout: { padding: { bottom: 100, top: 100 } },
    scales: {
      y: {
        stacked: true,
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
            size: 18,
          },
        },
      },
    },
  };

  return (
    <div className="MainGraph">
      <Line data={data} options={options} />
    </div>
  );
};

export default MainGraph;
