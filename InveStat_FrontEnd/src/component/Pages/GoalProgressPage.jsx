import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Doughnut } from 'react-chartjs-2';

const achievedgoal = 50;
const goalchange = 10;
const remaininggoal = 40;

const chartdata = [achievedgoal, goalchange, remaininggoal];
const showchangepercentage = chartdata[1] + "%" ;


const options = {
  responsive: true,
  maintainAspectRatio: true,
  plugins:{
    labels:{
      render:'percentage',
      fontcolor: ['white', 'white', 'white'],
      precision:2
    }
  },
  legend: {
    display: false,
    position: "right"
  },
  layout:{padding: {bottom:300, left:300, right:300, top:300}},
  elements: {
    arc: {
      borderWidth:2
    }
  }
};

const data = {
  labels: ['Remaining','Change','Goal Achieved'],
  datasets: [{
    label: 'Goal Progress',
    text:showchangepercentage,
    data: [remaininggoal, goalchange, achievedgoal],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 2
  }]
};
class GoalProgressPage extends Component {
  render() 
  {
      
    return (
      <React.Fragment>
        <Link className="btn btn-primary" to="/goal-setting/set-goal">
            Set Goal
          </Link>
        <main className="container">
        <h2>Eg: Goal Progress Bar with 50% achieved + 10% change and 40% remaining </h2>
        <Doughnut data = {data} options = {options} height = {0}/>
        </main>
      </React.Fragment>
    );
  }
}

export default GoalProgressPage;
