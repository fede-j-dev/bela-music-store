import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { set } from "mongoose";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import LoadingIcon from "./loading.gif";

function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    terms: false,
  });

  const onChangeInput = (e) => {
    const { name, value, checked } = e.target;
    console.log(user.terms);
    if (name === "terms") {
      setUser({ ...user, terms: checked });
      setNoTermsError(false);
    } else {
      setUser({ ...user, [name]: value });
      if (e.target.name === "email") {
        setEmailAlreadyExistsError(false);
        setEmailFormatError(false);
        setNoEmailError(false);
      } else if (e.target.name === "name") {
        setNoNameError(false);
      } else if (e.target.name === "password") {
        setPasswordLengthError(false);
      }
    }
  };
  const [emailFormatError, setEmailFormatError] = useState(false);
  const [noEmailError, setNoEmailError] = useState(false);
  const [emailAlreadyExistsError, setEmailAlreadyExistsError] = useState(false);
  const emailRed = emailFormatError || noEmailError || emailAlreadyExistsError;

  const [noNameError, setNoNameError] = useState(false);

  const [passwordLengthError, setPasswordLengthError] = useState(false);
  const passwordRed = passwordLengthError;

  const [noTermsError, setNoTermsError] = useState(false);

  const [registerAttempt, setRegisterAttempt] = useState(false);

  const [loading, setLoading] = useState(true);

  //VALIDATIONS
  const validations = () => {
    if (!user.email.length) {
      setNoEmailError(true);
    } else if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        user.email
      )
    ) {
      setEmailFormatError(true);
    }
    if (!user.name) {
      setNoNameError(true);
    }
    if (!user.password || user.password.length < 6) {
      setPasswordLengthError(true);
    }
    if (!user.terms) {
      setNoTermsError(true);
    }
    setRegisterAttempt(true);
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    validations();
  };

  useEffect(() => {
    //made this way, to wait the states of the validations to update
    const registerTry = async () => {
      if (registerAttempt) {
        setRegisterAttempt(false);
        if (!emailRed && !passwordRed && !noNameError && !noTermsError) {
          setLoading(true);
          try {
            await axios.post("/user/register", { ...user });

            localStorage.setItem("firstLogin", true);

            window.location.href = "/";
          } catch (err) {
            if (err.response.data.msg === "emailAlreadyExists") {
              setEmailAlreadyExistsError(true);
            }
            //I can also add all validation from the server side
            // if (err.response.data.msg === "passwordLength") {
            //   setPasswordLengthError(true);
            // }
          }
        }
      }
      setLoading(false);
    };
    registerTry();
  }, [registerAttempt]);

  return (
    <div className="login-page">
      <div className="form-container">
        <form onSubmit={registerSubmit}>
          <h2>Register</h2>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={user.name}
            onChange={onChangeInput}
            style={{
              border: noNameError ? "red 1px solid" : "",
              marginBottom: noNameError ? "0px" : "",
            }}
          />
          <p
            className="error no-name-error"
            style={{ display: noNameError ? "inline-block" : "none" }}
          >
            Please write your name{" "}
          </p>

          <input
            type="text"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={onChangeInput}
            style={{
              border: emailRed ? "red 1px solid" : "",
              marginBottom: emailRed ? "0px" : "",
            }}
          />
          <p
            className="error email-error email-invalid-format"
            style={{ display: emailFormatError ? "inline-block" : "none" }}
          >
            The email format is invalid{" "}
          </p>
          <p
            className="error email-error no-email-error"
            style={{ display: noEmailError ? "inline-block" : "none" }}
          >
            Please write your email adress{" "}
          </p>
          <p
            className="error email-error email-exists-error"
            style={{
              display: emailAlreadyExistsError ? "inline-block" : "none",
            }}
          >
            This email is already connected to another user{" "}
          </p>

          <input
            type="password"
            name="password"
            autoComplete="on"
            placeholder="Password"
            value={user.password}
            onChange={onChangeInput}
            style={{
              border: passwordRed ? "red 1px solid" : "",
              marginBottom: passwordRed ? "0px" : "",
            }}
          />
          <p
            className="error password-error"
            style={{ display: passwordLengthError ? "inline-block" : "none" }}
          >
            Password must be at least 6 characters long{" "}
          </p>

          <div
            className="terms-container"
            style={{
              marginBottom: noTermsError ? "0px" : "",
            }}
          >
            <input
              name="terms"
              type="checkbox"
              className="terms-checkbox"
              onChange={onChangeInput}
            />
            <p>I agree to the terms of service and privacy policy</p>
          </div>
          <p
            className="error password-error"
            style={{ display: noTermsError ? "inline-block" : "none" }}
          >
            In order to proceed, you have to accept our terms and conditions{" "}
          </p>
          <div className="row">
            <button type="submit">
              {loading ? <img src={LoadingIcon} width="25px" /> : "Register"}
            </button>
          </div>
          <div className="login-register-mobile">
            <p>Already have an account?</p>
            <Link to="/login" className="login-register-swap-mobile">
              Login
            </Link>
          </div>
        </form>
      </div>
      <div className="img-container img-container-register">
        <div>
          <h2>Already a user?</h2>
          <Link to="/login" className="login-register-swap">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
