import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Cookie } from "universal-cookie";
import jwtDecode from "jwt-decode";
import axios from "axios";

const initialState = {
    users : [],
    error:null,
    isLogin:false,
    token:false,
}

export const __loginUser = createAsyncThunk(
    "loginUser",
    async(thatUser, thunk)=> {
        try{
            const response = await axios.post('/api/user/',thatUser)
             const token = response.headers.authorization
             const newtoken = token.split(" ")[1]
             const payload = jwt_decode(newtoken);
             console.log(payload)
             cookies.set("token", newtoken,{path:'/'})
             cookies.set("userId",payload.sub,{path:"/"})
            return thunk.fulfillWithValue(payload)
        }catch(error){
            return thunk.rejectWithValue(error)
        }
    }
)

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers:{},
    extraReducers:{
        [__loginUser.fulfilled] : (state, action) => {
            state.isLogin = true;
            state.users = action.payload
            alert("Welcome to 가축 World!!");
        },
        [__loginUser.rejected] : (state, action) => {
            state.isLogin = false;
            window.alert(action.payload)
        },
    }
})

export default userSlice.reducer;