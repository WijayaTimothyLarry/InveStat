import http from "./httpService";
import auth from "./authService";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/goalsetting";
export async function setGoal(data) {
  try {
    const token = auth.getJwt();
    console.log(token);
    console.log(data);
    const res = await http.post(apiEndPoint, data, {
      headers: {
        "x-access-token": token,
      },
    });
    console.log(res);
    return res;
  } catch (ex) {
    console.log(ex);
  }
}

export async function getGoal() {
  const token = auth.getJwt();
  const res = await http.get(apiEndPoint, {
    headers: { "x-access-token": token },
  });
  return res.data;
}

export default { setGoal, getGoal };
