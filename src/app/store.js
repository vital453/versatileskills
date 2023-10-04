import { configureStore } from "@reduxjs/toolkit";
import profilreducer from '../feature/profileUser.slice'
import AuthReducer from "../feature/AuthSlice";
import ProfessionReducer from "../feature/Profession";
 export default configureStore({
    reducer: {
        profileUser: profilreducer,
        auth: AuthReducer,
        profession: ProfessionReducer,
    },
    // devTools: false,
 }) 