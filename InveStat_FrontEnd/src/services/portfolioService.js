import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/portfolio";

export function getPortfolioList(token) {
  return http.get(apiEndpoint, {
    headers: { "x-access-token": token },
  });
}

export default { getPortfolioList };
