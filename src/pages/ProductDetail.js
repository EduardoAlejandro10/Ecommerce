import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { filterCategory } from "../store/slices/products.slice";
import "../styles/ProductDetail.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { addItemsToCart } from "../store/slices/cart.slice";

const ProductDetail = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/`)
      .then((res) => {
        const productsSearch = res.data.data.products.find(
          (productItem) => productItem.id === Number(id)
        );
        setProduct(productsSearch);
        dispatch(filterCategory(productsSearch.category.id));
      });
  }, [dispatch, id]);

  
  const products = useSelector((state) => state.products);

  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addProduct = () => {
    const productAdded = {
      id: Number(id),
      quantity,
    };

    dispatch(addItemsToCart(productAdded));
  };

  return (
    <div>
      <div className="return-container">
        <Link to="/">Home - </Link>
        <span>{product.title}</span>
      </div>
      <div className="main-container">
        <div className="img-container">
          <img src={product.productImgs} alt="" />
        </div>
        <div className="main-detail-content">
          <h2>{product.title}</h2>
          <div className="card-description-container">
            <p>{product.description}</p>
          </div>
          <div className="options-box">
            <div className="price-box">
              <span>Price</span>
              <p>$ {product.price}</p>
            </div>
            <div className="quantity">
              <p>Quantity</p>
              <button onClick={decrement}>-</button>
              <input
                onChange={(e) => setQuantity(e.target.value)}
                type="text"
                value={quantity}
              />
              <button onClick={increment}>+</button>
            </div>
          </div>
          <button onClick={addProduct} className="add-button">
            Add to cart <i className="fa-solid fa-cart-shopping"></i>
          </button>
        </div>
      </div>
      <h3 className="h3-suggestions">Discover similar items</h3>
      <ul className="cards-container">
        {products.map((productItem) => (
          <li
            onClick={() => navigate(`/products/${productItem.id}`)}
            className="card-body"
            key={productItem.id}
          >
            <div className="card-img-container">
              <img
                className="principal-img"
                src={productItem.productImgs[0]}
                alt=""
              />
            </div>
            <div className="card-info">
              <h3>{productItem.title}</h3>
              <div className="price-container">
                <span className="price">Price</span>
                <br />
                <br />
                <span>$ {productItem.price}</span>
              </div>
            </div>
            <button className="cart-button">
              <i className="fa-solid fa-cart-shopping"></i>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductDetail;
