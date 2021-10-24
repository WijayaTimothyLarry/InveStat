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
    plugins: {
      labels: {
        render: "percentage",
        fontcolor: ["white", "black", "black"],
        precision: 2,
      },
    },
    title: { display: true, text: "Goal Progress", fontSize: 20 },
    legend: {
      display: true,
      position: "right",
    },
    layout: { padding: { bottom: 40, left: 400, right: 10, top: 0 } },
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

  return (
    <React.Fragment>
      <Doughnut data={data} options={options} height={0} />
    </React.Fragment>
  );
};

export default DoughnutChart;
