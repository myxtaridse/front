import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "./slices/postsSlice";
import authSlice from "./slices/authSlice";
import createPostSlice from "./slices/createPostSlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
  reducer: {
    postsSlice,
    authSlice,
    createPostSlice,
    userSlice,
  },
});

export default store;
