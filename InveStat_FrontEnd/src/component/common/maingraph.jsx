import React from "react";
import { Line } from "react-chartjs-2";

//Main Portfolio Graph Data
const data = {
  labels: [
    "2021-10-14",
    "2021-10-15",
    "2021-10-16",
    "2021-10-17",
    "2021-10-18",
    "2021-10-19",
  ],
  datasets: [
    {
      label: "Portfolio 1",
      data: [3000, 3018, 4790, 5000, 6273, 7777],
      fill: true,
      backgroundColor: "rgba(255, 99, 132, 0.4)",
      borderColor: "rgba(255, 99, 132, 0.2)",
      pointBorderColor: "rgb(255, 255, 255)",
      pointHitRadius: 5,
      pointBorderWidth: 3,
      tension: 0.2,
    },
    {
      label: "Portfolio 2",
      data: [3000, 3018, 4790, 5000, 6273, 7777],
      fill: true,
      backgroundColor: "rgba(255, 99, 0, 0.4)",
      borderColor: "rgba(255, 99, 0, 0.2)",
      pointBorderColor: "rgb(255, 255, 255)",
      pointHitRadius: 5,
      pointBorderWidth: 3,
      tension: 0.2,
    },
  ],
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

//Individual Stock Graph
const dataStock = {
  labels: [
    "2021-10-14",
    "2021-10-15",
    "2021-10-16",
    "2021-10-17",
    "2021-10-18",
    "2021-10-19",
  ],
  datasets: [
    {
      label: "APPL",
      data: [145.6, 146.5, 146.7, 143.3, 149.1, 151.0],
      fill: true,
      backgroundColor: "rgba(0, 255, 0, 0.4)",
      borderColor: "rgba(0, 255, 0, 0.2)",
      pointBorderColor: "rgb(255, 255, 255)",
      pointHitRadius: 5,
      pointBorderWidth: 3,
      tension: 0.2,
    },
  ],
};

const optionsStock = {
  plugins: { legend: { display: true } },
  layout: { padding: { bottom: 100, top: 100 } },
  scales: {
    y: {
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

function MainGraph() {
  return (
    <div className="MainGraph">
      <Line data={data} options={options} />
    </div>
  );
}

export default MainGraph;
