import {  createSlice } from "@reduxjs/toolkit";

import { STATUSES } from "../globals/misc/statuses";
import {API, APIAuthenticated} from "../http";


const userSlice = createSlice({
    name : "user",
    initialState :{

        status : STATUSES.SUCCESS,
        users : null
     
    },
    reducers : {

       setStatus(state,action){
        state.status = action.payload
       },
       setUsers(state,action){
        state.users = action.payload
       },
       deleteUserById(state,action){
        // action.payload.productId
        const index = state.users.findIndex(user=>user._id === action.payload.userId)
        state.users.splice(index,1)
        },

    }
})

export const {setUsers,setStatus,deleteUserById} = userSlice.actions 

export default userSlice.reducer 




export function fetchUser(){
    return async function fetchUserThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await APIAuthenticated.get("admin/users")
            dispatch(setUsers(response.data.data.reverse()))
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}


export function deleteUser(userId){
    return async function deleteUserThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try {
          
            const response = await APIAuthenticated.delete(`admin/users/${userId}`)
            
            dispatch(deleteUserById({userId}))
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}
