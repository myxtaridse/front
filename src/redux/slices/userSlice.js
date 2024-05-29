import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../axios";

export const fetchAuthMe = createAsyncThunk(
  "auth/fetchAuthMeStatus",
  async () => {
    const response = await Axios.get("/auth/me"); // params не нужны токен в axois уже хранит в себе параметры
    return response.data;
  }
);

const initialState = {
  dataMyAcc: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "authMe",
  initialState,
  reducers: {
    isExitAuth(state, action) {
      state.dataMyAcc = null;
      state.status = "loading";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuthMe.pending, (state, action) => {
      console.log("loading");
      state.status = "loading";
      state.dataMyAcc = null;
    });
    builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
      console.log("normall", state);
      state.status = "success";
      state.dataMyAcc = action.payload;
    });
    builder.addCase(fetchAuthMe.rejected, (state, action) => {
      console.log("error");
      state.status = "error";
      state.dataMyAcc = null;
    });
  },
});

//проверка на авторизацию - yes/no
export const selectFilter = (state) => state.authSlice.status;

export const { isExitAuth } = authSlice.actions;

export default authSlice.reducer;
