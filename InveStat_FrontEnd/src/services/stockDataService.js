import http from "./httpService";
import { stocDailykApi, apiKey } from "../config.json";

export function getDailyStockData(tickerId) {
  const apiEndpoint = stocDailykApi + tickerId + "&apikey=" + apiKey;
  return http.get(apiEndpoint);
}

export default { getDailyStockData };
