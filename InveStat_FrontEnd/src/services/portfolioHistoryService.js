import http from "./httpService";
import { apiUrl } from "../config.json";
import auth from "./authService";

const apiEndPoint = apiUrl + "/portfolioHistory";
export async function getLatestPortfolioValue() {
  const endPoint = apiEndPoint + "/latest";
  const userEmail = auth.getCurrentUserEmail();
  console.log(userEmail);
  const { data } = await http.get(endPoint, {
    headers: { userEmail: userEmail },
  });
  return data;
}

export default { getLatestPortfolioValue };
