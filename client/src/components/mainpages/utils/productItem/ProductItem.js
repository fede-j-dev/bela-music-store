import React from "react";
import BtnRender from "./BtnRender";
import { Link, useLocation } from "react-router-dom";

function ProductItem({ product, isAdmin, deleteProduct, handleCheck }) {
  let location = useLocation();

  const handleAlbumClick = () => {
    //go to the top if we click on an album that is on the related section. we don't want this on the shop section
    if (location.pathname.includes("detail")) {
      window.scrollTo(0, 0);
    }
  };
  return (
    <div className="product_card">
      {isAdmin && (
        <input
          type="checkbox"
          checked={product.checked}
          onChange={() => handleCheck(product._id)}
        />
      )}
      <Link to={`/detail/${product._id}`} onClick={() => handleAlbumClick()}>
        <img src={product.images.url} alt="" />
      </Link>

      <div className="product_box">
        <Link to={`/detail/${product._id}`} onClick={() => handleAlbumClick()}>
          <h2 title={product.title}>{product.title}</h2>
        </Link>

        <p id="artist">{product.artist}</p>

        <p>{product.description}</p>
        <span>${product.price}</span>
      </div>

      <BtnRender product={product} deleteProduct={deleteProduct} />
    </div>
  );
}

export default ProductItem;
