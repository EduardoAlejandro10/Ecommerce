import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "../styles/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const submit = (data) => {
    axios
      .post(
        "https://ecommerce-api-react.herokuapp.com/api/v1/users/login",
        data
      )
      .then((res) => {
        localStorage.setItem("token", res.data.data.token);
        navigate("/");
      })

      .catch((error) => {
        console.log(error.response.status);
        if (error.response.status === 404) {
          alert("Invalid Email or Password");
        }
      });
  };
  return (
    <div className="main-div">
      <form onSubmit={handleSubmit(submit)} className="form-estructure">
        <h2>Welcome! Enter your email and password to continue</h2>
        <div className="test-data">
          <h3>Test data</h3>
          <div className="email-container">
            <i className="fa-solid fa-envelope"></i>
            <p> mason@gmail.com</p>
          </div>
          <div className="lock-container">
            <i className="fa-solid fa-lock"></i>
            <p>mason1234</p>
          </div>
        </div>
        <label htmlFor="">Email</label>
        <input type="text" {...register("email")} />
        <label htmlFor="">Password</label>
        <input type="password" {...register("password")} />
        <button>Login</button>
        <p>
          Don't have an account? <Link to>Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
