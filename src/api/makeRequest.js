import axios from "axios";

const API_ENDPOINT = process.env.REACT_APP_API_URL;

// обертка над axios
export const makeRequest = (config) => {
  config.url = `${API_ENDPOINT}${config.url}`;
  console.log(config);
  return axios(config);
};
