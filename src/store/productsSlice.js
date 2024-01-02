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
       },
       deleteProductById(state,action){
        // action.payload.productId
        const index = state.products.findIndex(product=>product._id === action.payload.productId)
        state.products.splice(index,1)
        },

    }
})

export const {setProducts,setStatus,deleteProductById} = productSlice.actions 

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


export function deleteProduct(productId){
    return async function deleteProductThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try {
          
            const response = await APIAuthenticated.delete(`/products/${productId}`)
            console.log(response,"Response")
            dispatch(deleteProductById({productId}))
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}


