import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utils/productItem/ProductItem";
import Loading from "../utils/loading/Loading";
import axios from "axios";
import Filters from "./Filters";
import LoadMore from "./LoadMore";
import ConfirmationModal from "../utils/modal/ConfirmationModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import ReactDOM from "react-dom";
import { useLocation, withRouter } from "react-router-dom";
import { set } from "mongoose";

function Products() {
  const state = useContext(GlobalState);
  const [products, setProducts] = state.productsAPI.products;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const [callback, setCallback] = state.productsAPI.callback;
  const [loading, setLoading] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [show, setShow] = state.modal;
  const [alreadyAdded, setAlreadyAdded] = state.userAPI.alreadyAdded;
  const [
    succesfullyAdded,
    setSuccessfullyAdded,
  ] = state.userAPI.succesfullyAdded;
  const [pathName, setPathName] = state.pathName;

  //scroll to the top if the user comes from a different url. avoid it when click on Load more button
  function _ScrollToTop(props) {
    const { pathname } = useLocation();
    useEffect(() => {
      if (pathName !== pathname) {
        setPathName(pathname);
        window.scrollTo(0, 0);
      }
    }, [pathname]);
    return props.children;
  }
  const ScrollToTop = withRouter(_ScrollToTop);

  const handleCheck = (id) => {
    products.forEach((product) => {
      if (product._id === id) product.checked = !product.checked;
    });
    setProducts([...products]);
  };

  const deleteProduct = async (id, public_id) => {
    try {
      setLoading(true);
      const destroyImg = axios.post(
        "/api/destroy",
        { public_id },
        {
          headers: { Authorization: token },
        }
      );
      const deleteProduct = axios.delete(`/api/products/${id}`, {
        headers: { Authorization: token },
      });

      await destroyImg;
      await deleteProduct;
      setCallback(!callback);
      setLoading(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const checkAll = () => {
    products.forEach((product) => {
      product.checked = !isCheck;
    });
    setProducts([...products]);
    setIsCheck(!isCheck);
  };

  const deleteAll = () => {
    products.forEach((product) => {
      if (product.checked) deleteProduct(product._id, product.images.public_id);
    });
  };

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  return (
    <>
      <ScrollToTop>
        <Filters />

        {show && <ConfirmationModal modalHandler={() => setShow(!show)} />}

        {isAdmin && (
          <div className="delete-all">
            <span>Select all</span>
            <input type="checkbox" checked={isCheck} onChange={checkAll} />
            <button onClick={deleteAll}>Delete selected</button>
          </div>
        )}

        <div className="products">
          {products.map((product) => {
            return (
              <ProductItem
                key={product._id}
                product={product}
                isAdmin={isAdmin}
                deleteProduct={deleteProduct}
                handleCheck={handleCheck}
              />
            );
          })}
        </div>

        <div
          className={
            alreadyAdded
              ? "message-container message-container-show"
              : "message-container message-container-hide"
          }
        >
          <div className="close-message">
            <span onClick={() => setAlreadyAdded(false)}>x</span>
          </div>
          <div className="icon">
            <FontAwesomeIcon icon={faExclamation} />
          </div>
          <p className="message">
            This product had already been added to the cart
          </p>
        </div>

        <div
          className={
            succesfullyAdded
              ? "message-container message-container-show"
              : "message-container message-container-hide"
          }
        >
          <div className="close-message">
            <span onClick={() => setSuccessfullyAdded(false)}>x</span>{" "}
          </div>
          <div className="icon">
            <FontAwesomeIcon icon={faCheckCircle} />
          </div>
          <p className="message">
            The product was succesfully added to the cart
          </p>
        </div>

        <LoadMore />
        {products.length === 0 && <Loading />}
      </ScrollToTop>
    </>
  );
}

export default Products;
