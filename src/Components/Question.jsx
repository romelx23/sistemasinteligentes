import React from "react";

const Question = ({ question, img }) => {
  return (
    <div className="card m-auto mt-5 col-5">
      <h3>{question}</h3>
      <img className="image-fluid" src={img} alt={question} />
    </div>
  );
};

export default Question;
