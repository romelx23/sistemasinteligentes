import React from "react";

const Evaluation = ({ evaluation, setUser }) => {
  const dateParsed = new Date(evaluation.createdAt);
  const day = dateParsed.getDate();
  const month = dateParsed.getMonth();
  const year = dateParsed.getFullYear();
  const minutes = dateParsed.getMinutes();
  const hours = dateParsed.getHours();
  const dateFull = `${day}/${month}/${year}     ${hours}:${minutes}`;
  return (
    <>
      <h2>Resultado: {evaluation.diagnostic}</h2>
      <p className="d-block">{dateFull}</p>
    </>
  );
};

export default Evaluation;
