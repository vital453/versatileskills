import { configureStore } from "@reduxjs/toolkit";
import profilreducer from '../feature/profileUser.slice'

 export default configureStore({
    reducer: {
        profileUser: profilreducer,
    }
 }) 