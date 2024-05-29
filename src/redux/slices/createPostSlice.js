import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../axios";

export const fetchCreatePost = createAsyncThunk(
  "create/fetchCreatePostStatus",
  async (fields) => {
    const response = await Axios.post("/posts", fields);
    console.log(fields);
    return response.data;
  }
);

// export const fetchUpdatePost = createAsyncThunk(
//   "create/fetchCreatePostStatus",
//   async (fields) => {
//     const response = await Axios.patch(`/posts/${fields.id}`, fields);
//     console.log(fields);
//     return response.data;
//   }
// );

const initialState = {
  title: "",
  imageUrl: "",
  tags: "",
  status: "",
  comments: "",
  likes: "",
};

const postsSlice = createSlice({
  name: "create",
  initialState,
  reducers: {
    setTitle(state, action) {
      state.title = action.payload;
    },
    setImageUrl(state, action) {
      state.imageUrl = action.payload;
    },
    setTags(state, action) {
      state.tags = action.payload;
    },
    setComments(state, action) {
      state.comments = action.payload;
    },
    setLikes(state, action) {
      state.likes = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCreatePost.pending, (state, action) => {
      //console.log("loading");
      state.status = "loading";
    });
    builder.addCase(fetchCreatePost.fulfilled, (state, action) => {
      //console.log("normall", state);
      state.title = action.payload;
      state.imageUrl = action.payload;
      state.tags = action.payload;
      state.likes = action.payload;
      state.comments = action.payload;
      state.status = "succes";
    });
    builder.addCase(fetchCreatePost.rejected, (state, action) => {
      //console.log("loading");
      //state.post.items = [];
      state.status = "error";
    });
  },
});

export const { setImageUrl, setTags, setTitle, setText } = postsSlice.actions;

export default postsSlice.reducer;
