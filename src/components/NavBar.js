import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getCart } from "../store/slices/cart.slice";
import { useDispatch } from "react-redux";
import { setSideBar } from "../store/slices/sideBar.slice";
import { useSelector } from "react-redux";
import SideBar from "./Cart";

const NavBar = () => {
  

  const sideBar = useSelector((state) => state.sideBar);
  const dispatch = useDispatch();

  const isShowing = () => {
    dispatch(setSideBar(!sideBar));
  };

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  return (
    <div>
      <div>
        <nav className="nav-bar">
          <div className="title">
            <strong>
              <Link to="/">e-commerce</Link>
            </strong>
          </div>

          <div className="nav-buttons-container">
            <Link to="/login" className="i-container">
              <i className="fa-solid fa-user"></i>
            </Link>
            <Link to="/purchases" className="i-container">
              <i className="fa-solid fa-box"></i>
            </Link>
            <button onClick={isShowing} to="" className="i-container">
              <i className="fa-solid fa-cart-shopping"></i>
            </button>
          </div>
        </nav>
      </div>
      {sideBar && <SideBar />}
    </div>
  );
};

export default NavBar;
