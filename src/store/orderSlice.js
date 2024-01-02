import {  createSlice } from "@reduxjs/toolkit";

import { STATUSES } from "../globals/misc/statuses";
import {API, APIAuthenticated} from "../http";


const orderSlice = createSlice({
    name : "order",
    initialState :{

        status : STATUSES.SUCCESS,
        orders : null
     
    },
    reducers : {

       setStatus(state,action){
        state.status = action.payload
       },
       setOrders(state,action){
        state.orders = action.payload
       },
       deleteOrderById(state,action){
        // action.payload.productId
        const index = state.orders.findIndex(order=>order._id === action.payload.orderId)
        state.orders.splice(index,1)
        },

         updateOrderById(state,action){
            const index = state.orders.findIndex(order=>order._id === action.payload.orderId)
            if(index !== -1){
                state.orders[index] = action.payload.data
            }
        },
        updatePaymentStatusById(state,action){
            const index = state.orders.findIndex(order=>order._id === action.payload.orderId)
            if(index !== -1){
                state.orders[index] = action.payload.data
            }
        },

    }
})

export const {setOrders,setStatus,deleteOrderById,updateOrderById,updatePaymentStatusById} = orderSlice.actions 

export default orderSlice.reducer 




export function fetchOrder(){
    return async function fetchOrderThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await APIAuthenticated.get("admin/orders")
            dispatch(setOrders(response.data.data.reverse()))
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}

export function deleteOrders(orderId){
    return async function deleteOrdersThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try {
          
            const response = await APIAuthenticated.delete(`admin/orders/${orderId}`)
            console.log(response,"Response")
            dispatch(deleteOrderById({orderId}))
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}

export function updateOrderStatus(orderId,orderStatus){
    return async function updateOrderStatusThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try {
            
            const response = await APIAuthenticated.patch(`admin/orders/${orderId}`,{orderStatus})
            console.log(response,"Response")
            dispatch(updateOrderById({orderId,data : response.data.data}))
            
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}



export function updatePaymentStatus(orderId,paymentStatus){
    return async function updatePaymentStatusThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try {
            
            const response = await APIAuthenticated.patch(`admin/orders/paymentstatus/${orderId}`,{paymentStatus})
            console.log(response,"Response")
            dispatch(updatePaymentStatusById({orderId,data : response.data.data}))
            
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}




