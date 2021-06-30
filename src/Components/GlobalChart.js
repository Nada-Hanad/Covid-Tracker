import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = ({ chartData }) => {
  var data = {
    labels: Object.keys(chartData?.cases) ?? [],
    datasets: [
      {
        label: "# of Cases",
        data: Object.values(chartData?.cases) ?? [],
        fill: true,
        backgroundColor: "rgba(255, 99, 132,0.3)",
        borderColor: "rgb(255, 99, 132)",
      },
      {
        label: "# of Deaths",
        data: Object.values(chartData?.deaths) ?? [],
        fill: true,
        backgroundColor: "rgba(255,255,255,0.3)",
        borderColor: "black",
      },

      {
        label: "# of Recovered",
        data: Object.values(chartData?.recovered) ?? [],
        fill: true,
        backgroundColor: "rgba(12, 237, 125,0.3)",
        borderColor: "rgb(12, 237, 125)",
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
