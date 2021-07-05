import React, { useState, useEffect, useRef } from "react";
/* import data from "../helpers/data.json"; */
import { useHistory } from "react-router-dom";
import Question from "./Question";
import axios from "axios";
import jwt from "jsonwebtoken";
import Swal from "sweetalert2";
import pl from "tau-prolog";
const Quiz = () => {
  const history = useHistory();
  const [questions, setQuestions] = useState([]);
  const [showQuestions, setShowQuestions] = useState(false);
  const [index, setIndex] = useState(1);
  const [res, setRes] = useState([]);
  const [evaluation, setEvaluation] = useState();
  const mounted = useRef(true);
  const [question, setQuestion] = useState();
  useEffect(() => {
    loadQuestions();
    return () => {
      mounted.current = false;
    };
  }, []);
  const loadQuestions = async () => {
    try {
      const { data } = await axios.get("http://localhost:6800/questions");
      const { questions } = data;
      if (mounted.current) {
        setQuestions(questions);
        setQuestion({
          id: questions[0]._id,
          question: questions[0].question,
          image: questions[0].image,
        });
      }
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al cargar preguntas",
      });
    }
  };
  const handleNext = (value) => {
    setIndex(index + 1);
    if (value === 1) {
      setRes([...res, questions[index - 1].symptom]);
    }
    if (index === questions.length) {
      // Tau prolog
      resolveWithTauProlog(res);
    } else {
      setQuestion({
        id: questions[index]._id,
        question: questions[index].question,
        image: questions[index].image,
      });
    }
  };

  const sendResult = async () => {
    try {
      const { token } = JSON.parse(window.localStorage.getItem("token"));
      console.log(token);
      jwt.verify(token, "SEED", function (err, decoded) {
        console.log(decoded); // bar
      });
      const { data } = await axios.post("http://localhost:6800/evaluation", {
        diagnostic: "",
        user: "",
      });
      const { questions } = data;
      if (mounted.current) {
        setQuestions(questions);
        setQuestion({
          id: questions[0]._id,
          question: questions[0].question,
          image: questions[0].image,
        });
      }
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al cargar preguntas",
      });
    }
    /* history.replace("/report"); */
  };

  const resolveWithTauProlog = (valuesTP) => {
    const session = pl.create(1000);
    const program = `
      % ENFERMEDADES
      enfermedad('enfermedad1',['sintoma1', 'sintoma3', 'sintoma4',
      'sintoma5', 'sintoma1', 'sintoma3' ,'sintoma4' ,'sintoma5']).
      enfermedad('enfermedad2',['sintoma1', 'sintoma3', 'sintoma8',
      'sintoma10', 'sintoma1', 'sintoma3' ,'sintoma4', 'sintoma5']).
      enfermedad('enfermedad3',['sintoma2', 'sintoma3', 'sintoma4',
      'sintoma5', 'sintoma1', 'sintoma3' ,'sintoma4' ,'sintoma5']).
      enfermedad('enfermedad4',['sintoma1', 'sintoma2', 'sintoma4',
      'sintoma5', 'sintoma6', 'sintoma7' ,'sintoma8' ,_ ]).
      enfermedad('enfermedad5',['sintoma1', 'sintoma2', 'sintoma5',
      'sintoma6', 'sintoma7', 'sintoma8' , _ , _ ]).
      enfermedad('enfermedad6',['sintoma5', 'sintoma7', 'sintoma8'
      , _ , _ , _ , _ , _ ]).
    `;
    let cadena = "enfermedad(X,['";
    const goal = (valores, n) => {
      for (let index = 0; index < valores.length; index++) {
        if (index === valores.length - 1) {
          cadena = cadena + valores[index] + "',";
        } else {
          cadena = cadena + valores[index] + "','";
        }
      }
      for (let index = 0; index < n - valores.length; index++) {
        if (index === n - valores.length - 1) {
          cadena = cadena + " _ ]).";
        } else {
          cadena = cadena + " _ , ";
        }
      }
      return cadena;
    };
    const goalres = goal(valuesTP, 8);
    let responseTp = "";
    session.consult(program, {
      success: function () {
        session.query(goalres, {
          success: function () {
            session.answer(async (x) => {
              let rekt = await session.format_answer(x);
              responseTp = rekt.slice(4, rekt.length - 1);
              setEvaluation(responseTp);
            });
          },
        });
      },
    });
  };
  console.log(index);
  return (
    <div className="quiz">
      {!showQuestions && (
        <div className="card m-auto mt-5" style={{ width: "18rem" }}>
          <img
            src="https://img2.viajar.elperiodico.com/de/cf/83/istock-1223692043.jpg"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">Empezar test</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <button
              className="btn btn-primary d-block"
              onClick={() => {
                setShowQuestions(true);
              }}
            >
              Empezar
            </button>
          </div>
        </div>
      )}
      {showQuestions && (
        <div>
          <h2>Preguntas</h2>
          <Question question={question.question} img={question.image} />
          {index !== questions.length + 1 && (
            <>
              <button
                className="btn btn-success w-50"
                onClick={() => handleNext(1)}
              >
                Sí
              </button>
              <button
                className="btn btn-danger w-50"
                onClick={() => handleNext(0)}
              >
                No
              </button>
            </>
          )}
          {index == questions.length + 1 && (
            <>
              <button className="btn btn-primary w-100" onClick={sendResult}>
                Ver resultados
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
