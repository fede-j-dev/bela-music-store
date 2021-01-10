import React, { useContext, useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utils/productItem/ProductItem";
import ConfirmationModal from "../utils/modal/ConfirmationModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

function DetailProduct() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const [newProducts] = state.productsAPI.newProducts;
  const [show, setShow] = state.modal;
  const [isLogged] = state.userAPI.isLogged;
  const addCart = state.userAPI.addCart;
  const [alreadyAdded, setAlreadyAdded] = state.userAPI.alreadyAdded;
  const [
    succesfullyAdded,
    setSuccessfullyAdded,
  ] = state.userAPI.succesfullyAdded;
  const [detailProduct, setDetailProduct] = useState([]);
  const [pathName, setPathName] = state.pathName;
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathName !== pathname) {
      setPathName(pathname);
    }
    if (params.id) {
      products.forEach((product) => {
        if (product._id === params.id) setDetailProduct(product);
      });
    }
    if (detailProduct.length === 0) {
      newProducts.forEach((product) => {
        if (product._id === params.id) setDetailProduct(product);
      });
    }
    if (detailProduct.length !== 0) {
      products.map((product) => {
        const productOk =
          product.genre === detailProduct.genre &&
          product._id !== detailProduct._id;
      });
    }
  }, [params.id, products]);

  if (detailProduct.length === 0) return null;

  return (
    <>
      {show && <ConfirmationModal modalHandler={() => setShow(!show)} />}
      <div className="detail">
        <img src={detailProduct.images.url} alt="" />
        <div className="box-detail">
          <div className="row">
            <h2 className="detail-title">{detailProduct.title}</h2>
            <div className="sold-id">
              <h5>Units left: {5 - Number(detailProduct.sold)}</h5>
              <h6>#id: {detailProduct.product_id}</h6>
            </div>
          </div>
          <p className="detail-artist">{detailProduct.artist}</p>
          <p id="description">{detailProduct.description}</p>
          <span>Price: ${detailProduct.price}</span>

          {isLogged ? (
            <Link
              to="/cart"
              className="cart"
              onClick={() => addCart(detailProduct)}
            >
              Buy Now
            </Link>
          ) : (
            <Link to="#!" className="cart" onClick={() => setShow(!show)}>
              Buy Now
            </Link>
          )}
        </div>
      </div>

      <div>
        <h2 className="related-title">Related products</h2>
        <div className="products">
          {products.map((product) => {
            const productOk =
              product.genre === detailProduct.genre &&
              product._id !== detailProduct._id;
            return productOk ? (
              <ProductItem key={product._id} product={product} />
            ) : null;
          })}
        </div>

        {alreadyAdded && (
          <div className="message-container">
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
        )}
        {succesfullyAdded && (
          <div className="message-container">
            <div className="close-message">
              <span onClick={() => setSuccessfullyAdded(false)}>x</span>
            </div>
            <div className="icon">
              <FontAwesomeIcon icon={faCheckCircle} />
            </div>
            <p className="message">
              The product was succesfully added to the cart
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default DetailProduct;
