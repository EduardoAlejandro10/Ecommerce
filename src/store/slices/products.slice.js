import { createSlice } from "@reduxjs/toolkit";
import { setIsLoading } from "./isLoading.slice";
import axios from "axios";
import { setSideBar } from "./sideBar.slice";

export const productsSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    setProducts: (state, action) => {
      return action.payload;
    },
  },
});

export const { setProducts } = productsSlice.actions;

export const getProducts = () => (dispatch) => {
  dispatch(setIsLoading(true));
  dispatch(setSideBar(false));
  return axios
    .get("https://ecommerce-api-react.herokuapp.com/api/v1/products")
    .then((res) => dispatch(setProducts(res.data.data.products)))
    .finally(() => dispatch(setIsLoading(false)));
};

export const filterProducts = (query) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .get(
      `https://ecommerce-api-react.herokuapp.com/api/v1/products?query=${query}`
    )
    .then((res) => dispatch(setProducts(res.data.data.products)))
    .finally(() => dispatch(setIsLoading(false)));
};

export const filterCategory = (id) => (dispatch) => {
  dispatch(setIsLoading(true));
  dispatch(setSideBar(false));
  return axios
    .get(
      `https://ecommerce-api-react.herokuapp.com/api/v1/products?category=${id}`
    )
    .then((res) => dispatch(setProducts(res.data.data.products)))
    .finally(() => dispatch(setIsLoading(false)));
};

export default productsSlice.reducer;
