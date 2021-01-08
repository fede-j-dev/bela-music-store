import React, { useContext, useState } from "react";
import { GlobalState } from "../../GlobalState";
import Menu from "./icon/menu.svg";
import Close from "./icon/close.svg";
import Logo from "./icon/logotry3.png";
import LogoMobile from "./icon/logomobile6.png";
import AdminLogo from "./icon/admin.png";
import AdminMobileLogo from "./icon/belamobileadmin1.png";
import Cart from "./icon/cart.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";

function Header() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [userName, setUserName] = state.userAPI.userName;
  const [cart] = state.userAPI.cart;
  const [menu, setMenu] = useState(false);
  const [pathName] = state.pathName;
  const isMobile = useMediaQuery({ query: "(max-width: 720px)" });
  const isLaptop = useMediaQuery({ query: "(max-width: 1150px)" });
  const showContactNews = pathName === "/" && isAdmin === false && !isLaptop;
  const userOk = isMobile && isLogged;
  const isAdminMobile = isAdmin && isMobile;
  const logoutUser = async () => {
    await axios.get("/user/logout");

    localStorage.removeItem("firstLogin");

    window.location.href = "/";
  };

  const adminRouter = () => {
    return (
      <>
        <li
          className="create-product admin-header-li"
          onClick={() => setMenu(!menu)}
        >
          <Link to="/create_product">Create Product</Link>
        </li>
        <li
          className="header-genres admin-header-li"
          onClick={() => setMenu(!menu)}
        >
          <Link to="/genre">Genres</Link>
        </li>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <>
        <li
          className={isAdmin ? "history admin-header-li" : "history"}
          onClick={() => setMenu(!menu)}
        >
          <Link to="/history">History</Link>
        </li>

        <li className={isAdmin ? "logout admin-header-li" : "logout"}>
          <Link to="/" onClick={logoutUser}>
            Logout
          </Link>
        </li>
        {!isMobile && (
          <p className={isAdmin ? "user-name admin-header-li" : "user-name"}>
            {userName}
            <FontAwesomeIcon icon={faUser} color="#287194" />
          </p>
        )}
      </>
    );
  };

  const styleMenu = {
    left: menu ? 0 : "-100%",
  };

  return (
    <header>
      <div className="menu" onClick={() => setMenu(!menu)}>
        <img src={Menu} alt="" width="30" />
      </div>

      <div className="logo">
        <Link to="/">
          {isAdminMobile ? (
            <img src={AdminMobileLogo} alt="" />
          ) : isAdmin ? (
            <img src={AdminLogo} alt="" />
          ) : isMobile ? (
            <img src={LogoMobile} alt="" />
          ) : (
            <img src={Logo} alt="" />
          )}
        </Link>
      </div>

      <ul style={styleMenu}>
        {userOk && (
          <p className="user-name">
            {userName}
            <FontAwesomeIcon icon={faUser} color="#287194" />
          </p>
        )}
        {showContactNews ? (
          <>
            <li className="news" onClick={() => setMenu(!menu)}>
              <a href="#news-container">News</a>
            </li>
            <li className="contact" onClick={() => setMenu(!menu)}>
              <a href="#contact-container"> Contact </a>
            </li>
          </>
        ) : (
          ""
        )}

        <li
          className={isAdmin ? "shop admin-header-li" : "shop"}
          onClick={() => setMenu(!menu)}
        >
          <Link to="/shop">{isAdmin ? "Products" : "Shop"}</Link>
        </li>

        {isAdmin && adminRouter()}

        {isLogged ? (
          loggedRouter()
        ) : (
          <li className="login-register" onClick={() => setMenu(!menu)}>
            <Link to="/login">Login | Register</Link>
          </li>
        )}

        <li className="close-symbol" onClick={() => setMenu(!menu)}>
          <img src={Close} alt="" width="30" className="menu" />
        </li>
      </ul>

      {isAdmin ? (
        ""
      ) : (
        <Link to="/cart">
          <div className="cart-icon">
            <span>{cart.length}</span>

            <img src={Cart} alt="" width="30" />
          </div>
        </Link>
      )}
    </header>
  );
}

export default Header;
