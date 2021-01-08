import { useState, useEffect } from "react";
import axios from "axios";

function ProductsAPI() {
  const [products, setProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [callback, setCallback] = useState(false);
  const [genre, setGenre] = useState("");
  const [sort, setSort] = useState("");

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(0);

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get(
        `/api/products?limit=${
          page * 12
        }&${genre}&${sort}&title[regex]=${search}`
      );
      setProducts(res.data.products);
      setResult(res.data.result);
    };
    getProducts();
  }, [callback, genre, sort, search, page]);

  useEffect(() => {
    const getNewProducts = async () => {
      const res = await axios.get(`/api/products?limit=${page * 8}&sort`);
      setNewProducts(res.data.products);
    };
    getNewProducts();
  }, [callback]);

  return {
    products: [products, setProducts],
    newProducts: [newProducts, setNewProducts],
    callback: [callback, setCallback],
    genre: [genre, setGenre],
    sort: [sort, setSort],
    search: [search, setSearch],
    page: [page, setPage],
    result: [result, setResult],
  };
}

export default ProductsAPI;
