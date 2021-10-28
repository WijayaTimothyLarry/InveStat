import React from "react";
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = ({ goalData, currentInvestmentValue }) => {
  const achievedgoal = currentInvestmentValue.totalValue;
  const remaininggoal = goalData.overallTarget - achievedgoal;
  const completion = (
    (parseFloat(achievedgoal) / parseFloat(goalData.overallTarget)) *
    100
  ).toFixed(2);
  const showCompletionPercentage = completion;
  console.log(completion);

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    title: { display: true, text: "Goal Progress", fontSize: 20 },
    legend: {
      display: true,
      position: "right",
    },
    layout: { padding: { bottom: 40, left: 100, right: 100, top: 120 } },
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
        text: showCompletionPercentage,
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
        const text = showCompletionPercentage,
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 2;
        ctx.fillText(text, textX, textY);
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
