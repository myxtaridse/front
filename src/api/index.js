import { getPhotos, mutatedPhotos } from "./photos";
import { createUserByPosts, getPosts, mutatedPosts } from "./photosByUser";
import { getPostsAll } from "./posts";
import { getUser, mutatedAuth } from "./users";

// запрос на получение всех фотографий
export const api = {
  photos: {
    getPhotos,
    mutatedPhotos,
  },
  users: {
    getUser,
    mutatedAuth,
  },
  postsByUser: {
    getPosts,
    mutatedPosts,
    createUserByPosts,
  },
  posts: {
    getPostsAll,
  },
};
