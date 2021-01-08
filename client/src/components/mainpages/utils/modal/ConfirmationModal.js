import React from "react";
import "./confirmationModal.css";
import { Link } from "react-router-dom";

function ConfirmationModal(props) {
  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <span className="close" onClick={() => props.modalHandler()}>
            &times;
          </span>
          <h4>Please sign in to proceed to checkout</h4>
        </div>
        <div className="modal-body">
          <Link to="#!" onClick={() => props.modalHandler()}>
            Cancel
          </Link>
          <Link onClick={() => props.modalHandler()} to="/login" className="">
            Login/Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
