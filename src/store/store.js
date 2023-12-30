import { configureStore } from "@reduxjs/toolkit";

import authSlice from './authSlice'
import orderSlice from "./orderSlice";
import userSlice from "./userSlice";
import productsSlice from "./productsSlice";


const store = configureStore({
    reducer : {
        
     
        auth : authSlice,
        orders : orderSlice,
        users : userSlice,
        products : productsSlice
        
        
    }
})

export default store