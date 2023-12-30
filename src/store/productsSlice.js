import {  createSlice } from "@reduxjs/toolkit";

import { STATUSES } from "../globals/misc/statuses";
import {API, APIAuthenticated} from "../http";


const productSlice = createSlice({
    name : "product",
    initialState :{

        status : STATUSES.SUCCESS,
        products : null
     
    },
    reducers : {

       setStatus(state,action){
        state.status = action.payload
       },
       setProducts(state,action){
        state.products = action.payload
       }

    }
})

export const {setProducts,setStatus} = productSlice.actions 

export default productSlice.reducer 




export function fetchProduct(){
    return async function fetchProductThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await APIAuthenticated.get("/products")
            dispatch(setProducts(response.data.data))
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}


