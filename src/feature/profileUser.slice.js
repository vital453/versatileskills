import { createSlice } from "@reduxjs/toolkit";


export const profileUserSlice = createSlice({
    name: "profileUser",
    initialState: {
        pictures: [],
        name: "",
        userdata: [],
        hash_user: [],
    },
    reducers: {
        setPictureData: (state, {payload}) =>{

            if(payload){
                state.pictures = payload; 
                state.pictures = state.pictures.sort(function (a, b) {
                    var key1 = new Date(a.creation_date);
                    var key2 = new Date(b.creation_date);
                    if (key1 < key2) {
                      return 1;
                    } else if (key1 == key2) {
                      return 0;
                    } else {
                      return -1;
                    }
                  })
            }
            state.name = payload[0].name;
            localStorage.setItem("pic",JSON.stringify(payload));
            
        },
        setHash_code: (state, {payload}) =>{
            state.hash_user = payload;
            localStorage.setItem("hash",JSON.stringify(payload));
        },
        recuppic: (state, {payload}) =>{
            if(payload){
                state.pictures = payload;
             //  localStorage.setItem("pic",JSON.stringify(payload));
            }  
        },
        addData: (state, {payload})=>{
           // state.userdata.push(payload);
            state.userdata = [...state.userdata, payload];
            localStorage.setItem("userdata",JSON.stringify(payload));
        },
        addandEraseData: (state, {payload})=>{
            // state.userdata.push(payload);
             state.userdata = payload;
             localStorage.setItem("userdata",JSON.stringify(payload));
             //localStorage.removeItem('pac');
         }
    }
    
})

export const {setPictureData, recuppic, addData, addandEraseData,setHash_code} = profileUserSlice.actions;
export default profileUserSlice.reducer;
