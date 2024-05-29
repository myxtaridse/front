import { makeRequest } from "./makeRequest";

const URL = "/postsByUser";

export const getPosts = (config) => {
  config.url = `${URL}/${config.url}`;
  return makeRequest({
    method: "GET",

    ...config,
  });
};

export const mutatedPosts = (config) => {
  config.url = `${URL}/${config.url}`;
  return makeRequest({
    method: "PUT",
    ...config,
  });
};

export const createUserByPosts = (config) => {
  config.url = `${URL}`;
  return makeRequest({
    method: "POST",
    ...config,
  });
};
