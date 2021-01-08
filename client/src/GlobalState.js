import React, { createContext, useState, useEffect } from "react";
import ProductsAPI from "./api/ProductsAPI";
import UserAPI from "./api/UserAPI";
import GenresAPI from "./api/GenresAPI";

import axios from "axios";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);
  const [show, setShow] = useState(false);
  const [pathName, setPathName] = useState("");
  const [searchAutofocus, setSearchAutofocus] = useState(true);

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");

    if (firstLogin) {
      const refreshToken = async () => {
        const res = await axios.get("/user/refresh_token");

        setToken(res.data.accesstoken);

        setTimeout(() => {
          refreshToken();
        }, 10 * 60 * 1000);
      };
      refreshToken();
    }
  }, []);

  const state = {
    token: [token, setToken],
    modal: [show, setShow],
    pathName: [pathName, setPathName],
    searchAutofocus: [searchAutofocus, setSearchAutofocus],
    productsAPI: ProductsAPI(),
    userAPI: UserAPI(token),
    genresAPI: GenresAPI(),
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
