import React from "react";
import "./styles.css";

function Modal({ setOpenModal }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Submitted Success</h1>
        </div>
        <div className="body">
          <p>Thank You For Giving your Valuable Feedback to Shelter Home  </p>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Done
          </button>
         
        </div>
      </div>
    </div>
  );
}

export default Modal;