import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = ({ chartData }) => {
  var data = {
    labels: Object.keys(chartData) ?? [],
    datasets: [
      {
        label: "# of Candidates",
        data: Object.values(chartData) ?? [],
        fill: true,
        backgroundColor: "rgba(255, 99, 132,0.3)",
        borderColor: "rgb(255, 99, 132)",
      },
    ],
  };
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <div className="globalChart">
      <>
        <Line data={data} options={options} />
      </>
    </div>
  );
};

export default LineChart;
