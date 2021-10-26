import React from "react";
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = () => {
  const achievedgoal = 50;
  const goalchange = 10;
  const remaininggoal = 40;

  const chartdata = [achievedgoal, goalchange, remaininggoal];
  const showchangepercentage = chartdata[1] + "%";

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
    labels: ["Remaining", "Change", "Goal Achieved"],
    datasets: [
      {
        label: "Goal Progress",
        text: showchangepercentage,
        data: [remaininggoal, goalchange, achievedgoal],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 10,
      },
    ],
  };

  const plugins = [
    {
      beforeDraw: function (chart) {
        var width = chart.width,
          height = chart.height,
          ctx = chart.ctx;
        ctx.restore();
        var fontSize = (height / 160).toFixed(2);
        ctx.font = fontSize + "em sans-serif";
        ctx.textBaseline = "top";
        var text = showchangepercentage,
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
