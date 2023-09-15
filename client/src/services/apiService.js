import { request } from "../utils/request";
import { setLocalStorage } from "../utils/storage";

export const API_URL = import.meta.env.VITE_API_URL+"/v1";

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

function signup(requestBody) {
  return request(
    API_URL + "/signup",
    "POST",
    {
      "Content-Type": "application/json",
    },
    requestBody
  );
}

function logout() {
  setLocalStorage("token", null);
  return request(API_URL + "/logout", "GET");
}

function savePatient(requestBody) {
  return request(
    API_URL + "/patients/add",
    "POST",
    {
      "Content-Type": "application/json",
    },
    requestBody,
    true
  );
}

function updatePatient(requestBody) {
  return request(
    API_URL + "/patients/update",
    "PUT",
    {
      "Content-Type": "application/json",
    },
    requestBody,
    true
  );
}

function getPatientById(patientId) {
  return request(API_URL + "/patients/" + patientId, "GET", {}, {}, true);
}
function deletePatient(patientId) {
  return request(API_URL + "/patients/" + patientId, "DELETE", {}, {}, true);
}
function getAllPatients(page, limit, sort, direction) {
  let url = API_URL + "/patients/all";

  if (page && limit) {
    url += "?page=" + page + "&limit=" + limit;
  }
  if (sort && direction) {
    url +=
      `${!page || !limit ? "?" : "&"}sort=` + sort + "&direction=" + direction;
  }
  return request(url, "GET", {}, {}, true);
}

function searchPatient(searchKey) {
  return request(
    API_URL + "/patients/search/" + searchKey,
    "GET",
    {},
    {},
    true
  );
}

function filterPatient(minAge, maxAge) {
  if (!minAge || !maxAge) {
    getAllPatients();
  }
  return request(
    API_URL + "/patients/filter?minAge=" + minAge + "&maxAge=" + maxAge,
    "GET",
    {},
    {},
    true
  );
}

export const apiService = {
  login,
  signup,
  logout,
  savePatient,
  updatePatient,
  getPatientById,
  deletePatient,
  getAllPatients,
  searchPatient,
  filterPatient,
};
