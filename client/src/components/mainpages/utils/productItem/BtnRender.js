import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../../../GlobalState";

function BtnRender({ product, deleteProduct }) {
  const state = useContext(GlobalState);
  const [isAdmin] = state.userAPI.isAdmin;
  const addCart = state.userAPI.addCart;
  const [isLogged] = state.userAPI.isLogged;
  const [show, setShow] = state.modal;
  const [setSearchAutofocus] = state.searchAutofocus;

  const handleClickLogged = (product) => {
    //this prevents window going to the top
    setSearchAutofocus(false);
    addCart(product);
  };
  const handleClickNotLogged = () => {
    setSearchAutofocus(false);
    setShow(!show);
  };
  return (
    <div className="row_btn">
      {isAdmin ? (
        <>
          <Link
            id="btn_delete"
            to="#!"
            onClick={() => deleteProduct(product._id, product.images.public_id)}
          >
            Delete
          </Link>
          <Link id="btn_view" to={`/edit_product/${product._id}`}>
            Edit
          </Link>
        </>
      ) : (
        <>
          {isLogged ? (
            <Link
              id="btn_buy"
              to="#!"
              onClick={() => handleClickLogged(product)}
            >
              Add to cart
            </Link>
          ) : (
            <Link id="btn_buy" to="#!" onClick={() => handleClickNotLogged()}>
              Add to cart
            </Link>
          )}
        </>
      )}
    </div>
  );
}

export default BtnRender;
