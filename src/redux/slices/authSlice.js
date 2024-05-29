import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../axios";

export const fetchUserData = createAsyncThunk(
  "auth/fetchUserDataStatus",
  async (params) => {
    const response = await Axios.post("/auth/login", params); // в params будут хранится email, password
    console.log(response);
    return response.data; // если все ок - получим объект с инфой о пользователе
  }
);

export const fetchRegisterUser = createAsyncThunk(
  "auth/fetchRegisterUserStatus",
  async (params) => {
    console.log(params);
    try {
      const response = await Axios.post("/auth/register", params); // в params будут хранится email, password
      console.log(response);
      return response.data; // если все ок - получим объект с инфой о пользователе
    } catch (err) {
      console.log(err);
    }
  }
);

// export const fetchAuthMe = createAsyncThunk(
//   "auth/fetchAuthMeStatus",
//   async () => {
//     const response = await Axios.get("/auth/me"); // params не нужны токен в axois уже хранит в себе параметры
//     return response.data;
//   }
// );

export const fetchUser = createAsyncThunk(
  "auth/fetchUserStatus",
  async (id) => {
    const response = await Axios.get(`/user/${id}`, id); // params не нужны токен в axois уже хранит в себе параметры
    return response.data;
  }
);

export const fetchUserUpdate = createAsyncThunk(
  "auth/fetchUserUpdateStatus",
  async ({ id, subscribersPushed }) => {
    console.log(id, subscribersPushed);
    const { data } = await Axios.patch(`/user/${id}`, {
      subscribers: [...subscribersPushed],
    });
    console.log(data);
    return data;
  }
);

const initialState = {
  dataUser: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    isExitAuth(state, action) {
      state.dataUser = null;
      state.status = "loading";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state, action) => {
      console.log("loading");
      state.status = "loading";
      state.dataUser = null;
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      console.log("normall", state);
      state.status = "success";
      state.dataUser = action.payload;
    });
    builder.addCase(fetchUserData.rejected, (state, action) => {
      console.log("error");
      state.status = "error";
      state.dataUser = null;
    });
    builder.addCase(fetchUserUpdate.pending, (state, action) => {
      console.log("loading");
      state.status = "loading";
      state.dataUser = null;
    });
    builder.addCase(fetchUserUpdate.fulfilled, (state, action) => {
      console.log("normall", state);
      state.status = "success";
      state.dataUser = action.payload;
    });
    builder.addCase(fetchUserUpdate.rejected, (state, action) => {
      console.log("error");
      state.status = "error";
      state.dataUser = null;
    });
    builder.addCase(fetchUser.pending, (state, action) => {
      console.log("loading");
      state.status = "loading";
      state.dataUser = null;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      console.log("normall", state);
      state.status = "success";
      state.dataUser = action.payload;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      console.log("error");
      state.status = "error";
      state.dataUser = null;
    });
    builder.addCase(fetchRegisterUser.pending, (state, action) => {
      console.log("loading");
      state.status = "loading";
      state.dataUser = null;
    });
    builder.addCase(fetchRegisterUser.fulfilled, (state, action) => {
      console.log("normall", state);
      state.status = "success";
      state.dataUser = action.payload;
    });
    builder.addCase(fetchRegisterUser.rejected, (state, action) => {
      console.log("error");
      state.status = "error";
      state.dataUser = null;
    });
  },
});

//проверка на авторизацию - yes/no
export const selectFilter = (state) => state.authSlice.status;

export const { isExitAuth } = authSlice.actions;

export default authSlice.reducer;
