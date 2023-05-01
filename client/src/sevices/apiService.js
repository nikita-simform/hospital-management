import { request } from "../utils/request";
import { setLocalStorage } from "../utils/storage";

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
  setLocalStorage("token",null);
  return request(API_URL + "/logout", "GET");
}

function savePatient(requestBody) {
  return request(
    API_URL + "/patients/add",
    "POST",
    {
      "Content-Type": "application/json",
    },
    requestBody
  );
}

function updatePatient(requestBody) {
  return request(
    API_URL + "/patients/update",
    "PUT",
    {
      "Content-Type": "application/json",
    },
    requestBody
  );
}

function getPatientById(patientId) {
  return request(API_URL + "/patients/" + patientId, "GET");
}
function deletePatient(patientId) {
  return request(API_URL + "/patients/" + patientId, "DELETE");
}
function getAllPatients(page, limit, sort, direction) {
  let url = API_URL + "/patients/all";

  if (page & limit) {
    url += url + "?page=" + page + "&limit=" + limit;
  }
  if (sort & direction) {
    url +=
      url +
      `${!page || !limit ? "?" : "&"}sort=` +
      sort +
      "&direction=" +
      direction;
  }
  return request(url, "GET", {}, {}, true);
}

function searchPatient(searchKey) {
  return request(API_URL + "/search" + searchKey, "GET");
}

function filterPatient(minAge, maxAge) {
  if (!minAge || !maxAge) {
    getAllPatients();
  }
  return request(
    API_URL + "/filter?minAge=" + minAge + "&maxAge=" + maxAge,
    "GET"
  );
}

function uploadCSV(csvFile) {}
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
