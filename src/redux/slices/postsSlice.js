import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../axios";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPostsStatus",
  async () => {
    const response = await Axios.get("/posts");

    return response.data;
  }
);

export const fetchTags = createAsyncThunk("posts/fetchTagsStatus", async () => {
  const response = await Axios.get("/tags");
  return response.data;
});

export const fetchPostsRemove = createAsyncThunk(
  "posts/fetchPostsRemoveStatus",
  async (id) => {
    await Axios.delete(`/posts/${id}`);
  }
);

const initialState = {
  post: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
  searchValue: "",
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(fetchPostsRemove.fulfilled, (state, action) => {
    //   //console.log("normall", state);
    //   state.post.items = action.payload;
    //   state.post.status = "succes";
    // });
    // builder.addCase(fetchPostsRemove.rejected, (state, action) => {
    //   //console.log("loading");
    //   state.post.items = [];
    //   state.post.status = "error";
    // });

    builder.addCase(fetchPosts.pending, (state, action) => {
      //console.log("loading");
      state.post.status = "loading";
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      //console.log("normall", state);
      state.post.items = action.payload;
      state.post.status = "succes";
      console.log(action.payload);
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      //console.log("loading");
      state.post.items = [];
      state.post.status = "error";
    });
    builder.addCase(fetchTags.pending, (state, action) => {
      //console.log("loading");
      state.tags.status = "loading";
    });
    builder.addCase(fetchTags.fulfilled, (state, action) => {
      //console.log("normall", state);
      state.tags.items = action.payload;
      state.tags.status = "succes";
    });
    builder.addCase(fetchTags.rejected, (state, action) => {
      //console.log("loading");
      state.tags.items = [];
      state.tags.status = "error";
    });

    builder.addCase(fetchPostsRemove.rejected, (state, action) => {
      state.post.items = state.post.items.filter(
        (obj) => obj._id !== action.meta.arg
      ); // удаление статьи
      //state.post.status = "loading";
      //console.log(items);
    });
  },
});
export const { setSearchValue } = postsSlice.actions;
export default postsSlice.reducer;
