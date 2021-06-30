import React from "react";
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = ({ allData }) => {
  var data = {
    labels: Object.keys(allData) ?? [],
    datasets: [
      {
        label: "",
        data: Object.values(allData) ?? [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      {" "}
      <div className="header">
        <h1 className="title"></h1>
        <div className="links"></div>
      </div>{" "}
      <Doughnut data={data} />
    </>
  );
};

export default DoughnutChart;
