import { request } from "../utils/request";

const API_URL = "http://localhost:8000/v1";

function login(requestBody) {
  return request(
    API_URL + "/login",
    "POST",
    {
      "Content-Type": "application/json",
    },
    requestBody
  );
}

export const apiService = {
  login,
};
