import stockList from "../US Ticker List/USTickerList.json";
import { apiUrl } from "../config.json";
import http from "./httpService";

const apiEndpoint = apiUrl + "/watchlist";
export function getStockList() {
  const StockList = stockList.filter((s) => {
    if (
      (s.Exchange === "NASDAQ" || s.Exchange === "NYSE") &&
      !s.Name.includes("%")
    ) {
      s.id = s.Code;
      return s;
    }
  });
  return StockList;
}

export function getUserWatchList(token) {
  return http.get(apiEndpoint, {
    headers: { "x-access-token": token },
  });
}
export default { getStockList, getUserWatchList };
