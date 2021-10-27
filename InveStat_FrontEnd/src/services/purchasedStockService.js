import http from "./httpService";
import { apiUrl } from "../config.json";
const apiEndpoint = apiUrl + "/purchasedStock";

export async function getPurchasedStockList(portfolioId) {
  return await http.get(apiEndpoint, { headers: { portfolioId: portfolioId } });
}

export async function deletePurchasedStock(id) {
  const deleteEndPoint = apiEndpoint + "/delete";
  return await http.delete(deleteEndPoint, { data: { id } });
}

export async function getAllPurchasedStockList(token) {
  const getEndPoint = apiEndpoint + "/all";
  const { data } = await http.get(getEndPoint, {
    headers: { "x-access-token": token },
  });
  return data;
}
export default {
  getPurchasedStockList,
  deletePurchasedStock,
  getAllPurchasedStockList,
};
