import React from "react";
import { Line } from "react-chartjs-2";

const StockGraph = ({ stockData }) => {
  const dataStock = {
    labels: stockData.date,
    datasets: [
      {
        label: stockData.symbol,
        data: stockData.price,
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
    plugins: { legend: { display: true } },
    layout: { padding: { bottom: 100, top: 0 } },
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
