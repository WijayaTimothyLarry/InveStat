import http from "./httpService";
import { stocDailykApi, apiKey } from "../config.json";

export async function getDailyStockData(tickerId) {
  const apiEndpoint =
    "https://financialmodelingprep.com/api/v3/quote/" +
    tickerId +
    "?apikey=7aa87da7ef549544cc1ed7281de197b0";
  const { data } = await http.get(apiEndpoint);
  return data["0"];
}

export async function getStockHistoricalData(tickerId) {
  const apiEndpoint =
    "https://financialmodelingprep.com/api/v3/historical-price-full/" +
    tickerId +
    "?serietype=line&apikey=7aa87da7ef549544cc1ed7281de197b0";
  const { data } = await http.get(apiEndpoint);
  return data;
}
export default { getDailyStockData };
