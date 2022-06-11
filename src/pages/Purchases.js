import React from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPurchases } from "../store/slices/purchases.slice";
import "../styles/Purchases.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Purchases = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPurchases());
  }, [dispatch]);

  const purchases = useSelector((state) => state.purchases);

  return (
    <div className="main-page-container">
      <div className="return-container">
        <Link to="/">Home - </Link>
        <span>Purchases</span>
      </div>

      {purchases.map((purchase) => (
        <div className="purchases-container">
          <header className="purchases-title">{purchase.createdAt}</header>
          <ul className="items-div">
            {purchase.cart.products.map((product) => (
              <li
                key={product.id}
                className="li"
                onClick={() => navigate(`/products/${product.id}`)}
              >
                <h3>{product.title}</h3>
                <p>{product.productsInCart.quantity}</p>
                <span>{product.price}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Purchases;
