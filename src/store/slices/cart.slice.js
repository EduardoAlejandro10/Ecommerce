import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setIsLoading } from "./isLoading.slice";
import getConfig from "../../helpers/getConfig";
export const cartSlice = createSlice({
  name: "cart",
  initialState: {},
  reducers: {
    setCart: (state, action) => {
      return action.payload;
    },
  },
});

export const { setCart } = cartSlice.actions;

export const getCart = () => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .get("https://ecommerce-api-react.herokuapp.com/api/v1/cart", getConfig())
    .then((res) => dispatch(setCart(res.data.data.cart)))
    .finally(() => dispatch(setIsLoading(false)));
};

export const addItemsToCart = (productAdded) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .post(
      "https://ecommerce-api-react.herokuapp.com/api/v1/cart",
      productAdded,
      getConfig()
    )
    .then(() => {
      dispatch(getCart());
      alert("Product added to cart");
    })
    .finally(() => dispatch(setIsLoading(false)));
};

export default cartSlice.reducer;
