import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    token: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        } ,
        setTokent: (state, action) => {
            state.token = action.payload;
        }
    }
});

export const { setIsAuthenticated,setTokent  } = authSlice.actions;


export default authSlice.reducer;