import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Footer from "../footer/Footer";
import LoadingIcon from "./loading.gif";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const state = useContext(GlobalState);
  const [pathName, setPathName] = state.pathName;
  const [userError, setUserError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathName !== pathname) {
      setPathName(pathname);
    }
  }, []);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    if (name === "email") {
      setUserError(false);
    } else if (name === "password") {
      setPasswordError(false);
    }
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/user/login", { ...user });

      localStorage.setItem("firstLogin", true);

      window.location.href = "/";
    } catch (err) {
      if (err.response.data.msg === "!userExist") {
        setUserError(true);
      } else if (err.response.data.msg === "incorrectPassword") {
        setPasswordError(true);
      }
    }
    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="form-container">
        <form onSubmit={loginSubmit}>
          <h2>Login</h2>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={onChangeInput}
            style={{ marginBottom: userError ? "0px" : "" }}
          />

          <p
            className="error password-error"
            style={{ display: userError ? "inline-block" : "none" }}
          >
            This email is not registered
          </p>

          <input
            type="password"
            name="password"
            autoComplete="on"
            placeholder="Password"
            value={user.password}
            onChange={onChangeInput}
            style={{ marginBottom: passwordError && "0px" }}
          />
          <p
            className="error password-error"
            style={{ display: passwordError ? "inline-block" : "none" }}
          >
            The password is incorrect
          </p>
          <div className="row">
            <button type="submit">
              {loading ? <img src={LoadingIcon} width="25px" /> : "Login"}
            </button>
          </div>

          <div className="login-register-mobile">
            <p>Don't have an account?</p>
            <Link to="/register" className="login-register-swap-mobile">
              Create an account
            </Link>
          </div>
        </form>
      </div>
      <div className="img-container img-container-login">
        <div className="login-register">
          <h2>Don't have an account?</h2>
          <Link to="/register" className="login-register-swap">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
