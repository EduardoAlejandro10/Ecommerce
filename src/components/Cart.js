import React from "react";
import { useSelector } from "react-redux";
import "../styles/Cart.css";
import { useNavigate } from "react-router-dom";
import { setSideBar } from "../store/slices/sideBar.slice";
import { useDispatch } from "react-redux";
import { purchase } from "../store/slices/purchases.slice";
const SideBar = () => {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const sideBar = useSelector((state) => state.sideBar);
  const dispatch = useDispatch();

  const cartNavigate = (product) => {
    dispatch(setSideBar(!sideBar));
    navigate(`/products/${product.id}`);
  };

  let total = 0;

  if (cart?.length > 0) {
    if (cart?.length > 1) {
      total = cart?.reduce((initial, current) => {
        if (typeof initial === "number") {
          return initial + current.price * current.productsInCart?.quantity;
        } else {
          return (
            initial.price * initial.productsInCart?.quantity +
            current.price * current.productsInCart?.quantity
          );
        }
      });
    } else {
      total = cart?.[0].price * cart?.[0].productsInCart?.quantity;
    }
  }

  return (
    <div className="sidebar">
      <h3>Shopping Cart</h3>
      {cart.products?.map((product) => (
        <div>
          <div key={product.id} className="cart-card">
            <span>{product.brand}</span>
            <p onClick={() => cartNavigate(product)}>{product.title}</p>
            <span className="quantity">{product.productsInCart.quantity}</span>
          </div>
          <div className="total">
            <p>Total:</p>
            <span>{product.price}</span>
          </div>
        </div>
      ))}
      <div className="checkout-div">
        <div className="total-container">
          <span>Total</span>
          <span>$ {total}</span>
        </div>
        <button
          onClick={() => dispatch(purchase())}
          className="checkout-button"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default SideBar;
