import { configureStore } from "@reduxjs/toolkit";
import Product from "./Product";

const store1 = configureStore({
    reducer :{
        Product
    }
})

export default store1