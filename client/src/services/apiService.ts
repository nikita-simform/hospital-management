import { sortDirection } from "../types/appTypes";
import { updatePatient,Patient } from "../types/patient";
import { loginRequestBody, signUpRequestBody } from "../types/user";
import { request } from "../utils/request";
import { setLocalStorage } from "../utils/storage";

export const API_URL = "http://localhost:8000/v1";

function login(requestBody:loginRequestBody) {
  return request(
    API_URL + "/login",
    "POST",
    {
      "Content-Type": "application/json",
    },
    requestBody
  );
}

function signup(requestBody:signUpRequestBody) {
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

function savePatient(requestBody:Patient) {
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

function updatePatient(requestBody:updatePatient) {
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

function getPatientById(patientId:string) {
  return request(API_URL + "/patients/" + patientId, "GET", {}, {}, true);
}
function deletePatient(patientId:string) {
  return request(API_URL + "/patients/" + patientId, "DELETE", {}, {}, true);
}
function getAllPatients(page?:number, limit?:number, sort?:string, direction?:sortDirection) {
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

function searchPatient(searchKey:string) {
  return request(
    API_URL + "/patients/search/" + searchKey,
    "GET",
    {},
    {},
    true
  );
}

function filterPatient(minAge:number, maxAge:number) {
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
