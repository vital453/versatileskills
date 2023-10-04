import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
    name: "auth",
    initialState: {
        // userId: null,
        // token: null,
        // auth: null,
        user: []
    },
    reducers: {
        setCredentials: (state, {payload}) => {
        //    const { userId, accessToken, auth } = payload;
           state.user = payload;
        //    state.token = accessToken;
        //    state.auth = auth;
           localStorage.setItem('user', JSON.stringify(state.user));

        },
        recupUser: (state, {payload}) => {
            if(payload){
                state.user = payload;
            }else{
                state.user = [];
            }
        },
        logOut: (state, {payload}) => {
            state.user = [];
            localStorage.removeItem('user');
            // localStorage.setItem('user', JSON.stringify(state.user));
        }
    }
});

export const {setCredentials, logOut, recupUser} = AuthSlice.actions;
export default AuthSlice.reducer;

// export const selectCurrentUser = (state) => state.auth.user;
// export const selectCurrentToken = (state) => state.auth.token;