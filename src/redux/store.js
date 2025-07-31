import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./useSlice"


const userStore = configureStore({
    reducer: {
        user: userReducer
    }
})

export default userStore;