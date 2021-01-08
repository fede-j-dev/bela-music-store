import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import { Link, useLocation } from "react-router-dom";

import axios from "axios";
import PaypalButton from "./PaypalButton";
import DeleteModal from "../utils/modal/DeleteModal";

function Cart() {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userAPI.cart;
  const [token] = state.token;
  const [total, setTotal] = useState(0);
  const [show, setShow] = useState(false);
  // const [confirmDelete, setConfirmDelete] = useState(false);
  const [productId, setProductId] = useState("");
  const [pathName, setPathName] = state.pathName;
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathName !== pathname) {
      setPathName(pathname);
    }
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);

      setTotal(total);
    };

    getTotal();
  }, [cart]);

  const addToCart = async (cart) => {
    await axios.patch(
      "/user/addcart",
      { cart },
      {
        headers: { Authorization: token },
      }
    );
  };

  const increment = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity += 1;
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };

  const decrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };

  //REMOVE PRODUCT
  const removeProduct = (id) => {
    setShow(true);
    setProductId(id);
  };
  const confirmDelete = () => {
    setShow(false);
    cart.forEach((item, index) => {
      if (item._id === productId) {
        cart.splice(index, 1);
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };

  //INITIALIZE PAYMENT
  const tranSuccess = async (payment) => {
    const { paymentID, address } = payment;

    await axios.post(
      "/api/payment",
      { cart, paymentID, address },
      {
        headers: { Authorization: token },
      }
    );

    setCart([]);
    addToCart([]);
    alert("You have successfully placed an order.");
  };

  if (cart.length === 0)
    return (
      <div>
        <h3 className="empty-cart-title">Your cart is empty</h3>
        <p className="empty-cart-subtitle">
          Don't know what to buy? If you want to find your favorite music,{" "}
          <Link to="/shop">visit the shop!</Link>
        </p>
      </div>
    );

  return (
    <>
      {show && (
        <DeleteModal
          deleteModalHandler={() => setShow(!show)}
          confirmDelete={confirmDelete}
        />
      )}
      <div className="cart-container">
        {cart.map((product) => (
          <div className="cart" key={product._id}>
            <img src={product.images.url} alt="" />

            <div className="cart-detail">
              <div className="title-artist">
                <h2>{product.title}</h2>
                <p>{product.artist}</p>
              </div>

              <div className="amount">
                <div>
                  <button onClick={() => decrement(product._id)}> - </button>
                  <span>{product.quantity}</span>
                  <button onClick={() => increment(product._id)}> + </button>
                </div>
              </div>

              <h3 className="cart-price">
                $ {product.price * product.quantity}
              </h3>

              <div
                className="delete"
                onClick={() => removeProduct(product._id)}
              >
                X
              </div>
            </div>
          </div>
        ))}

        <div className="total">
          <div>
            <h3>$ {total} Total (shipping included)</h3>

            <PaypalButton total={total} tranSuccess={tranSuccess} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
