import http from "./httpService";
import { apiUrl } from "../config.json";
const apiEndpoint = apiUrl + "/purchasedStock";

export async function getPurchasedStockList(portfolioId) {
  return http.get(apiEndpoint, { headers: { portfolioId: portfolioId } });
}

export default { getPurchasedStockList };
