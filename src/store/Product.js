import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import product1 from '../images/product-1.jpg'
import product2 from '../images/product-2.jpg'
import product3 from '../images/product-3.jpg'
import product4 from '../images/product-4.jpg'

import product5 from '../images/product-5.jpg'
import product6 from '../images/product-6.jpg'
import product7 from '../images/product-7.jpg'
import product8 from '../images/product-8.jpg'

import product9 from '../images/product-9.jpg'
import product10 from '../images/product-10.jpg'
import product11 from '../images/product-11.jpg'
import product12 from '../images/product-12.jpg'
// const data1 = [
//     {
//         name:"Red Printed T-Shirt",
//         img:product1,
//         price:50,
//         score:4,
//         quantity:1
    
//     },
//     {
//         name:"HRX Sports Shoes",
//         img:product2,
//         price:75,
//         score:5,
//         quantity:1

      
//     },
//     {
//         name:"HRX Gray Trackpants",
//         img:product3,
//         price:75,
//         score:5,
//         quantity:1

        
//     },
//     {
//         name:"Blue Printed T-Shirt",
//         img:product4,
//         price:55,
//         score:4,
//         quantity:1
//     }];
// const data2 = [
//     {
//         name:"Puma Gray Sports Shoe",
//         img:product5,
//         price:95,
//         score:4,
//         quantity:1


//     },
//     {
//         name:"Black Printed T-Shirt",
//         img:product6,
//         price:65,
//         score:5,
//         quantity:1

    
//     },
//     {
//         name:"HRX Set of 3 Socks",
//         img:product7,
//         price:30,
//         score:4,
//         quantity:1

    
//     },
//     {
//         name:"Black Fossil Watch",
//         img:product8,
//         price:120,
//         score:4,
//         quantity:1

    
//     },
//     {
//         name:"Black SportX Watch",
//         img:product9,
//         price:135,
//         score:5,
//         quantity:1

        
//     },
//     {
//         name:"Black HRX Shoe",
//         img:product10,
//         price:50,
//         score:4,
//         quantity:1

    
//     },
//     {
//         name:"Gray Nike Shoe",
//         img:product11,
//         price:55,
//         score:5,
//         quantity:1

        
//     },
//     {
//         name:"HRX Black Trackpants",
//         img:product12,
//         price:75,
//         score:5,
//         quantity:1

//     },
// ]
// const getProductsFromBasket =  async(state) => {
//     const response = await fetch('http://localhost:3000/addedProducts');
//     const data = await response.json();
//     return data;
//     }
// export const fetchAsyncData =  createAsyncThunk('data/fetch', async () => {
//     const result = await getProductsFromBasket();
//     return result;
// });
const initialState = {
    addedProducts:[],
    process:false
}

const product = createSlice({
    name:'product',
    initialState,   
    reducers:{
        
        addBasket:(state,action) => {
            state.addedProducts = [...state.addedProducts,action.payload];        
        },
        removeProductFromBasket:(state,action) => {
            state.addedProducts = state.addedProducts.filter(p => p.id != action.payload)
        },
        refreshBasket:(state,action) => {
            state.addedProducts = [];
        },
        activeProccess:(state) => {
            state.process=true
        },
        removeProccess:(state) => {
            state.process=false
        },

        
    // changeQuantity: (state,action) => {
    //     state.exactProduct.quantity = action.payload
    // },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchAsyncData.pending, (state) => {
    //             state.loading = true;
    //         })
    //         .addCase(fetchAsyncData.fulfilled, (state, action) => {
    //             state.loading = false;
    //             state.addedProducts = action.payload;
    //         })
    //         .addCase(fetchAsyncData.rejected, (state, action) => {
    //             state.loading = false;
    //             state.error = action.error.message;
    //         });
    // },
})

export const {addBasket,removeProductFromBasket,refreshBasket,activeProccess,removeProccess} = product.actions;
export default product.reducer;