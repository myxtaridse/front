import { makeRequest } from "./makeRequest";

const URL = "/posts";

export const getPhotos = (config) =>
  makeRequest({
    method: "GET",
    url: URL,
    ...config,
  });

// измнение файла, когда пользователь ставит лайк
export const mutatedPhotos = (config) => {
  config.url = `${URL}${config.url}`;
  return makeRequest({
    method: "PUT",
    ...config,
  });
};
