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
       }

    }
})

export const {setUsers,setStatus} = userSlice.actions 

export default userSlice.reducer 




export function fetchUser(){
    return async function fetchUserThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const response = await APIAuthenticated.get("admin/users")
            dispatch(setUsers(response.data.data))
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
            
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}


