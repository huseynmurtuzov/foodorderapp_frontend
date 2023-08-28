import { configureStore } from "@reduxjs/toolkit";
import Product from "./Product";

const store = configureStore({
    reducer :{
        Product
    }
})

export default store