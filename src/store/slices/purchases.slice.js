import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setIsLoading } from "./isLoading.slice";
import getConfig from "../../helpers/getConfig";
import { setCart } from "./cart.slice";

export const purchasesSlice = createSlice({
  name: "purchases",
  initialState: [],
  reducers: {
    setPurchases: (state, action) => {
      return action.payload;
    },
  },
});

export const { setPurchases } = purchasesSlice.actions;

export const getPurchases = () => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .get(
      "https://ecommerce-api-react.herokuapp.com/api/v1/purchases",
      getConfig()
    )
    .then((res) => dispatch(setPurchases(res.data.data.purchases)))
    .finally(() => dispatch(setIsLoading(false)));
};

export const purchase = () => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .post(
      "https://ecommerce-api-react.herokuapp.com/api/v1/purchases",
      {},
      getConfig()
    )
    .then(() => {
      dispatch(getPurchases());
      dispatch(setCart({}));
    })
    .finally(() => dispatch(setIsLoading(false)));
};

export default purchasesSlice.reducer;
