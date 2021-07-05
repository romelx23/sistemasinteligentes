import React from "react";
import { Line } from "react-chartjs-2";
import "./css/Report.css";
const Report = () => {
  const data = {
    labels: ["1", "2", "3", "4", "5", "6"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        fill: false,
        backgroundColor: "rgb(27, 8, 12)",
        borderColor: "rgba(255, 99, 132, 0.2)",
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
    <div className="container__report">
      <div className="content__report__hoja card">
        <h1>Resultados de la consulta</h1>
        <div className="content__chart">
          <Line data={data} options={options} className="report__chart" />
        </div>
        <div className="report __content">
          <h2>Nombre: Dante Quispe</h2>
          <h2>Preguntas y Respuestas:</h2>
          <div className="report__questions">
            <h3>1.-¿tos seca?</h3>
            <h4>Si</h4>
            <h3>2.-¿dolor de espalda?</h3>
            <h4>Si</h4>
            <h3>3.-¿dolor de cabeza?</h3>
            <h4>Si</h4>
            <h3>4.-¿dolor de cuello?</h3>
            <h4>Si</h4>
          </div>
          <h2>Diagnostico:</h2>
          <h3>Usted está maluco comase un Snickers</h3>
        </div>
      </div>
    </div>
  );
};

export default Report;
