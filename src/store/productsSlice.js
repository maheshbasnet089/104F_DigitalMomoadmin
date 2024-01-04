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
        updateProductStatusById(state,action){
            const index = state.products.findIndex(product=>product._id === action.payload.productId)
            if(index !== -1){
                state.products[index] = action.payload.data
            }
        },
        addNewProduct(state,action){
            state.products.push(action.payload)
        }

    }
})

export const {setProducts,setStatus,deleteProductById,updateProductStatusById,addNewProduct} = productSlice.actions 

export default productSlice.reducer 


export function addProduct(data){
    return async function addProductThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await APIAuthenticated.post("/products",data, {
                headers : {
                    "Content-Type"  : "multipart/form-data"
                }
            })

            dispatch(addNewProduct(response.data.data))
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}


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


export function updateProductStatus(productId,productStatus){
    return async function updateProductStatusThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try {
            
            const response = await APIAuthenticated.patch(`/products/status/${productId}`,{productStatus})
          
            dispatch(updateProductStatusById({productId,data : response.data.data}))
            
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}

export function updateTsqPp(productId,data){
    return async function updateTsqPpThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try {
            
            const response = await APIAuthenticated.patch(`/products/stockprice/${productId}`,data)
          
            dispatch(updateProductStatusById({productId,data : response.data.data}))
            
            dispatch(setStatus(STATUSES.SUCCESS))
            
        } catch (error) {
            
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}


