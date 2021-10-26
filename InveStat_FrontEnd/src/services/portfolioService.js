import http from "./httpService";
import { apiUrl } from "../config.json";
const apiEndpoint = apiUrl + "/portfolio";

export async function getPortfolioList(token) {
  const { data } = await http.get(apiEndpoint, {
    headers: { "x-access-token": token },
  });
  return data;
}

export async function addNewPortfolio(userEmail, portfolioName) {
  return await http.post(apiEndpoint, { portfolioName, userEmail });
}

export async function deletePortfolio(token, id) {
  const deleteEndPoint = apiEndpoint + "/delete";
  return await http.delete(deleteEndPoint, {
    headers: {
      "x-access-token": token,
    },
    data: { id },
  });
}

export async function updatePortfolio(token, portfolioId) {
  return await http.put(apiEndpoint, {
    headers: {
      "x-access-token": token,
    },
    data: { portfolioId },
  });
}

export default {
  getPortfolioList,
  addNewPortfolio,
  deletePortfolio,
  updatePortfolio,
};
