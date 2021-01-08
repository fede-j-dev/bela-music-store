import { useState, useEffect } from "react";
import axios from "axios";

function UserAPI(token) {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [history, setHistory] = useState([]);
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const [succesfullyAdded, setSuccesfullyAdded] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get("/user/infor", {
            headers: { Authorization: token },
          });

          setIsLogged(true);
          setUserName(res.data.name);
          res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);

          setCart(res.data.cart);
        } catch (err) {
          alert(err.response.data.msg);
        }
      };

      getUser();
    }
  }, [token]);

  const addCart = async (product) => {
    const check = cart.every((item) => {
      return item._id !== product._id;
    });

    if (check) {
      setCart([...cart, { ...product, quantity: 1 }]);
      setSuccesfullyAdded(true);
      setTimeout(() => {
        setSuccesfullyAdded(false);
      }, 4000);

      await axios.patch(
        "/user/addcart",
        { cart: [...cart, { ...product, quantity: 1 }] },
        {
          headers: { Authorization: token },
        }
      );
    } else {
      setAlreadyAdded(true);
      setTimeout(() => {
        setAlreadyAdded(false);
      }, 4000);
    }
  };

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    cart: [cart, setCart],
    addCart: addCart,
    history: [history, setHistory],
    alreadyAdded: [alreadyAdded, setAlreadyAdded],
    succesfullyAdded: [succesfullyAdded, setSuccesfullyAdded],
    userName: [userName, setUserName],
  };
}

export default UserAPI;
