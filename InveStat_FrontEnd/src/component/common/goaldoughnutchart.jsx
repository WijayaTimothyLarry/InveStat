import React from "react";
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = ({ goalData, currentInvestmentValue, completion }) => {
  const achievedgoal = currentInvestmentValue;
  const remaininggoal = goalData.overallTarget - achievedgoal;
  const completionPercentage = String(completion);
  console.log(completionPercentage);
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    title: { display: true, text: "Goal Progress", fontSize: 20 },
    legend: {
      display: true,
      position: "right",
    },
    layout: { padding: { bottom: 0, left: 50, right: 50, top: 0 } },
    elements: {
      arc: {
        borderWidth: 2,
      },
    },
  };

  const data = {
    labels: ["Goal Achieved", "Remaining"],
    datasets: [
      {
        label: "Goal Progress",
        text: completion,
        data: [achievedgoal, remaininggoal],
        backgroundColor: ["rgb(54, 162, 235)", "rgb(255, 99, 132)"],
        hoverOffset: 10,
      },
    ],
  };

  const plugins = [
    {
      beforeDraw: function (chart) {
        const width = chart.width,
          height = chart.height,
          ctx = chart.ctx;
        ctx.restore();
        const fontSize = (height / 160).toFixed(2);
        ctx.font = fontSize + "em sans-serif";
        ctx.textBaseline = "top";
        const textX = Math.round(
            (width - ctx.measureText(String(completion)).width) / 2
          ),
          textY = height / 2;
        ctx.fillText(String(completion), textX, textY);
        ctx.save();
      },
    },
  ];

  return (
    <React.Fragment>
      <Doughnut data={data} options={options} plugins={plugins} height={0} />
    </React.Fragment>
  );
};

export default DoughnutChart;
