import React from "react";
import "./styles.css";

function Modal({ setOpenModal }) {
  return (
    <div className="modalBackgroundd">
      <div className="modalContainerr">
        <div className="titleCloseBtnn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="titlee">
          <h1>Success</h1>
        </div>
        <div className="bodyy">
          <p>Thank You For Posting </p>
        </div>
        <div className="footerr">
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