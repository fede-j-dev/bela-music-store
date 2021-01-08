import React, { useState } from "react";
import "./confirmationModal.css";
import { Link } from "react-router-dom";

function DeleteModal(props) {
  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <span className="close" onClick={() => props.deleteModalHandler()}>
            &times;
          </span>
          <h4>Are you sure you want to remove this product from the cart?</h4>
        </div>
        <div className="modal-body">
          <Link to="#!" onClick={() => props.deleteModalHandler()}>
            Cancel
          </Link>
          <Link onClick={() => props.confirmDelete()} to="#!">
            Remove Product
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
