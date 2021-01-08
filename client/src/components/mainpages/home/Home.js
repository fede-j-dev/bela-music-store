import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utils/productItem/ProductItem";
import Loading from "../utils/loading/Loading";
import axios from "axios";
import ConfirmationModal from "../utils/modal/ConfirmationModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link, useLocation } from "react-router-dom";
import Footer from "../footer/Footer";
import { useMediaQuery } from "react-responsive";

function Products() {
  const state = useContext(GlobalState);
  const [products, setProducts] = state.productsAPI.products;
  const [newProducts] = state.productsAPI.newProducts;
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
  const { pathname } = useLocation();
  const newProducts_first4 = newProducts.slice(0, 4);
  const newProducts_last4 = newProducts.slice(4);
  const newProducts_first2 = newProducts.slice(0, 2);
  const newProducts_last2 = newProducts.slice(2, 4);
  const newProducts_first3 = newProducts.slice(0, 3);
  const newProducts_last3 = newProducts.slice(3, 6);
  const newProducts_1 = newProducts.slice(0, 1);
  const newProducts_2 = newProducts.slice(1, 2);
  const newProducts_3 = newProducts.slice(2, 3);
  const newProducts_4 = newProducts.slice(3, 4);

  const isMobile = useMediaQuery({ query: "(max-width: 700px)" });
  const isMediumMobile = useMediaQuery({ query: "(max-width: 830px)" });
  const isBigMobile = useMediaQuery({ query: "(max-width: 1000px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1300px)" });

  useEffect(() => {
    if (pathName !== pathname) {
      setPathName(pathname);
    }
  }, []);

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
      <div className="main-carrousel">
        <Carousel autoPlay="true" showThumbs={false}>
          <div>
            {isMediumMobile ? (
              <img
                alt="carousel-mobile"
                src="/images/image1/prueba2mobile.png"
              />
            ) : (
              <img alt="carousel-img" src="/images/image1/prueba22.png" />
            )}
          </div>

          <div>
            {isMediumMobile ? (
              <img
                alt="carousel-mobile"
                src="/images/image2/elvis-mobile-4.png"
              />
            ) : (
              <img alt="carousel-img" src="/images/image2/elvis9.png" />
            )}
          </div>
        </Carousel>
      </div>
      {show && <ConfirmationModal modalHandler={() => setShow(!show)} />}

      {isAdmin && (
        <div className="delete-all">
          <span>Select all</span>
          <input type="checkbox" checked={isCheck} onChange={checkAll} />
          <button onClick={deleteAll}>Delete selected</button>
        </div>
      )}
      <div className="new-albums">
        <h2>New albums</h2>

        <hr />
      </div>
      <div className="product-carousel-container">
        {isMobile ? (
          <Carousel autoPlay="true">
            <div className="product-carousel">
              {newProducts_1.map((product) => {
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
            <div className="product-carousel">
              {newProducts_2.map((product) => {
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
            <div className="product-carousel">
              {newProducts_3.map((product) => {
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
            <div className="product-carousel">
              {newProducts_4.map((product) => {
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
          </Carousel>
        ) : isBigMobile ? (
          <Carousel autoPlay="true">
            <div className="product-carousel">
              {newProducts_first2.map((product) => {
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
            <div className="product-carousel">
              {newProducts_last2.map((product) => {
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
          </Carousel>
        ) : isTablet ? (
          <Carousel autoPlay="true">
            <div className="product-carousel">
              {newProducts_first3.map((product) => {
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

            <div className="product-carousel">
              {newProducts_last3.map((product) => {
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
          </Carousel>
        ) : (
          <Carousel autoPlay="true">
            <div className="product-carousel">
              {newProducts_first4.map((product) => {
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

            <div className="product-carousel">
              {newProducts_last4.map((product) => {
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
          </Carousel>
        )}
      </div>

      {products.length === 0 && <Loading />}
      <div className="visit-shop">
        <Link to="/shop">VISIT THE SHOP</Link>
      </div>

      <div id="news-container">
        <div className="title">
          <h1 id="big-title">COME TO THE STORE AND FIND OUT WHAT IS NEW!</h1>
          <div id="medium-title-container">
            <h1 id="medium-title">WHAT IS NEW?</h1>
            <hr />
          </div>
        </div>
        <div className="adv-1">
          <div className="adv1-img">
            <img alt="live-music" src="/images/live-music/live.jpg" />
          </div>
          <div className="adv1-info">
            <h2> Live jazz every friday night</h2>
            <hr style={{ marginBottom: "15px" }} />
            <p>
              Every Friday night at 22:00 we say hello to the weekend by
              receiving groups talentous jazz musicians from all over the
              country, that bring a fantastic show to enjoy in family and with
              friends. The show starts on time, so come over a little sooner to
              enjoy our petit couicine and bar!
            </p>
            <button>
              <a href="#contact-container">Contact us</a>
            </button>
          </div>
        </div>

        <div className="adv-2">
          <div className="adv2-info">
            <h2> New vinil collection </h2>
            <hr style={{ marginBottom: "15px" }} />
            <p>
              We have inaugurated a new vinil section in the store. It has over
              500 vinils from all genres includind jazz and various special
              editions of classical music and vintage rock. Also, until March
              we'll be having some special inauguration prices for most of the
              vinils, so don't forget to check them out when you pass by!
            </p>

            <button>
              {" "}
              <Link to="/shop">VISIT THE SHOP</Link>
            </button>
          </div>
          <div className="adv2-img">
            <img alt="live-music" src="/images/live-music/vinils.jpeg" />
          </div>
        </div>
      </div>

      {/* --------CONTACT-------- */}

      <div id="contact-main-title-container">
        <h1 id="contact-main-title">CONTACT</h1>
        <hr />
      </div>

      <div id="contact-container">
        <div className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3285.7490882727493!2d-58.45506288478371!3d-34.55990778047085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb5d292f2839d%3A0x98c03931d80a6f6f!2sO&#39;Higgins%202100!5e0!3m2!1ses-419!2sar!4v1609351178890!5m2!1ses-419!2sar"
            width="100%"
            height="467"
            frameborder="0"
            style={{ border: 0 }}
            allowfullscreen=""
            aria-hidden="true"
            tabindex="0"
          ></iframe>
        </div>
        <div className="map-info">
          <img alt="live-music" src="/images/live-music/bar.jpg" />

          <table>
            <tr>
              <td>
                <FontAwesomeIcon icon={faMapMarkerAlt} color="#287194" />{" "}
                <h3>OUR ADRESS</h3>
                <p>
                  <span>O'Higgins 2100, Belgrano - Buenos Aires</span>
                </p>
              </td>
              <td>
                <FontAwesomeIcon icon={faPhoneAlt} color="#287194" />
                <h3>PHONES</h3>
                <p>
                  <span>+54 911 4554 6756</span>
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <FontAwesomeIcon icon={faClock} color="#287194" />
                <h3>OPEN</h3>
                <p>
                  <span>Tuesday to Sunday 19pm-4am</span>
                </p>
              </td>
              <td>
                <FontAwesomeIcon icon={faEnvelope} color="#287194" />
                <h3>OUR EMAIL</h3>
                <p>
                  <span>belamstore@gmail.com</span>
                </p>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <Footer />

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
        <p className="message">The product was succesfully added to the cart</p>
      </div>
    </>
  );
}

export default Products;
