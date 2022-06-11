import { configureStore } from '@reduxjs/toolkit'
import isLoading from './slices/isLoading.slice'
import products from './slices/products.slice'
import purchases from './slices/purchases.slice'
import cart from './slices/cart.slice'
import sideBar from './slices/sideBar.slice'
import aside from './slices/aside.slice'

export default configureStore({
    reducer: {
        isLoading,
        products,
        purchases,
        cart,
        sideBar,
        aside


    }
})
