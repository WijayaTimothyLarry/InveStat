import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/portfolio";

export function getPortfolioList(token) {
  return http.get(apiEndpoint, {
    headers: { "x-access-token": token },
  });
}

export async function addNewPortfolio(userEmail, portfolioName) {
  await http.post(apiEndpoint, { portfolioName, userEmail });
}

export async function deletePortfolio(userEmail, portfolioName) {
  const deleteEndPoint = apiEndpoint + "/delete";
  await http.get(deleteEndPoint, { portfolioName, userEmail });
}

export default { getPortfolioList, addNewPortfolio };
