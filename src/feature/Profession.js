import { createSlice } from "@reduxjs/toolkit";

export const ProfessionSlice = createSlice({
    name: "profession",
    initialState: {
        // userId: null,
        // token: null,
        // auth: null,
        profession: []
    },
    reducers: {
        allProfession: (state, {payload}) => {
            if(payload){
                state.profession = payload;
            }else{
                state.profession = [];
            }
        },
    }
});

export const {allProfession} = ProfessionSlice.actions;
export default ProfessionSlice.reducer;

// export const selectCurrentUser = (state) => state.auth.user;
// export const selectCurrentToken = (state) => state.auth.token;