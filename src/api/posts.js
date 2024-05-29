import { makeRequest } from "./makeRequest";

const URL = "/postsByUser";

export const getPostsAll = (config) =>
  makeRequest({
    method: "GET",
    url: URL,
    ...config,
  });
