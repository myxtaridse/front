import axios from "axios";

const API_ENDPOINT = "http://localhost:4444";

// обертка над axios
export const makeRequest = (config) => {
  config.url = `${API_ENDPOINT}${config.url}`;
  console.log(config);
  return axios(config);
};
