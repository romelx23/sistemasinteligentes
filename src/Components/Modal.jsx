import React from "react";
import Evaluation from "./Evaluation";
const Modal = ({ evaluations }) => {
  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Resultados de paciente
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              {evaluations.map((evaluation) => (
                <Evaluation key={evaluation._id} evaluation={evaluation} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
