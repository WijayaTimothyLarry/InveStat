import React from "react";
import { Line } from "react-chartjs-2";

const StockGraph = ({ stockData }) => {
  console.log("stockdata", stockData);
  const dataStock = {
    labels: stockData.date.reverse(),
    datasets: [
      {
        label: stockData.symbol,
        data: stockData.price.reverse(),
        fill: true,
        backgroundColor: "rgba(115, 184, 246, 0.4)",
        borderColor: "rgba(115, 184, 246, 0.6)",
        pointBorderColor: "rgb(255, 255, 255)",
        pointHitRadius: 5,
        pointBorderWidth: 3,
        tension: 0.2,
      },
    ],
  };

  const optionsStock = {
    plugins: { legend: { display: false } },
    layout: { padding: { bottom: 60, top: 40 } },
    scales: {
      y: {
        ticks: {
          color: "black",
          font: { size: 18 },
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
    <div className="StockGraph">
      <Line data={dataStock} options={optionsStock} />
    </div>
  );
};

export default StockGraph;
