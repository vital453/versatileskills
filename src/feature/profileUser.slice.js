import { createSlice } from "@reduxjs/toolkit";


export const profileUserSlice = createSlice({
    name: "profileUser",
    initialState: {
        profiles: [],
        image_profiles: [],
        name: "",
        userdata: [],
        hash_user: [],
    },
    reducers: {
        setPictureData: (state, {payload}) =>{

            if(payload){
                state.profiles = payload; 
                state.profiles = state.profiles.sort(function (a, b) {
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
            // localStorage.setItem("pic",JSON.stringify(payload));
            
        },
        setimage_profile: (state, {payload}) =>{

            if(payload){
                state.image_profiles = payload; 
                state.image_profiles = state.image_profiles.sort(function (a, b) {
                    var key1 = new Date(a.date);
                    var key2 = new Date(b.date);
                    if (key1 < key2) {
                      return 1;
                    } else if (key1 == key2) {
                      return 0;
                    } else {
                      return -1;
                    }
                  })
            }
        },
        setHash_code: (state, {payload}) =>{
            state.hash_user = payload;
            localStorage.setItem("hash",JSON.stringify(payload));
        },
        recuppic: (state, {payload}) =>{
            if(payload){
                state.profiles = payload;
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

export const {setPictureData, recuppic, addData, addandEraseData,setHash_code, setimage_profile} = profileUserSlice.actions;
export default profileUserSlice.reducer;
