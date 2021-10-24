import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/userlogin";

export function login(user) {
  return http.post(apiEndpoint, {
    email: user.username,
    password: user.password
  })
}

export function userAuthenticated() {
    return http.get(apiEndpoint,{
        headers:{
            "x-access-token":localStorage.getItem("token"),
        },}).then((response)=>{
            console.log(response);
        })
    }

export default { login , userAuthenticated };
