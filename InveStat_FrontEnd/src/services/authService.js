import jwtDecode from "jwt-decode";
import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/userlogin";
const tokenKey = "token";

export async function login(email, password) {
  const res = await http.post(apiEndpoint, { email, password });
  console.log(res);
  const jwt = res.data.token;
  localStorage.setItem(tokenKey, jwt);
  return res;
}

export async function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export async function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const token = jwtDecode(jwt);
    return token.name;
  } catch (ex) {
    return null;
  }
}

export function checkExpiry() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const token = jwtDecode(jwt);
    if (token.exp * 1000 < Date.now()) {
      logout();
      window.location = "/";
    } else console.log("still login");
  } catch (ex) {
    return null;
  }
}

export function getCurrentUserEmail() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const token = jwtDecode(jwt);
    return token.email;
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getCurrentUserEmail,
  getJwt,
  checkExpiry,
};
