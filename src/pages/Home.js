import React, { useEffect } from "react";
import { getProducts, filterProducts } from "../store/slices/products.slice";
import { useDispatch, useSelector } from "react-redux";
import "../App.css";
import { useState } from "react";
import "../styles/Home.css";
import "../styles/Category.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { filterCategory } from "../store/slices/products.slice";
import SideBar from "../components/Cart";
import { setAside } from "../store/slices/aside.slice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector((state) => state.products);

  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://ecommerce-api-react.herokuapp.com/api/v1/products/categories"
      )
      .then((res) => setCategories(res.data.data.categories));
  }, []);

  const filter = () => {
    dispatch(filterProducts(search));
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [getProducts, dispatch]);

  const selectCategory = (id) => {
    dispatch(filterCategory(id));
  };

  const sideBar = useSelector((state) => state.sideBar);
  const aside = useSelector((state) => state.aside);

  const showFilters = () => {
    dispatch(setAside(!aside));
  };

  return (
    <div className="main-page-container home-page">
      <main className="main-content">
        {sideBar && <SideBar />}
        <form className="search-box">
          <input
            placeholder="What are you looking for?"
            className="search-input"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            type="search"
          />
          <button className="search-button" onClick={filter} type="button">
            <i className="fa light fa-magnifying-glass"></i>
          </button>
          <div>
            <div className="filter-container">
              <button onClick={showFilters}>
                <i  className="fa-solid fa-filter"></i>{" "}
                Filters
              </button>
            </div>
            {aside &&
              categories.map((category) => (
                <div className="mobile-category-container">
                  <li>
                    <button onClick={() => selectCategory(category.id)}>
                      {category.name}
                    </button>
                  </li>
                </div>
              ))}
          </div>
        </form>
        <ul className="cards-container">
          {products.map((product) => (
            <li
              className="card-body"
              key={product.id}
              onClick={() => navigate(`/products/${product.id}`)}
            >
              <div className="card-img-container">
                <img
                  className="principal-img"
                  src={product.productImgs[0]}
                  alt=""
                />
              </div>
              <div className="card-info">
                <h3>{product.title}</h3>
                <div className="price-container">
                  <span className="price">Price</span>
                  <br />
                  <br />
                  <span>$ {product.price}</span>
                </div>
              </div>
              <button className="cart-button">
                <i className="fa-solid fa-cart-shopping"></i>
              </button>
            </li>
          ))}
        </ul>
      </main>
      <aside className="category-aside">
        <div className="form-select category-title">
          <b>Category</b>
        </div>

        <div className="categories-div">
          {categories.map((category) => (
            <li
              key={category.id}
              onClick={() => selectCategory(category.id)}
              className="listed-categories">
              {category.name}
            </li>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default Home;
