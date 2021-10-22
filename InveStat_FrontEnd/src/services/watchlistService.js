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

export async function getUserWatchList(token) {
  const { data } = await http.get(apiEndpoint, {
    headers: { "x-access-token": token },
  });
  const stockList = data.map((w) => {
    return { id: w.id, stockID: w.wStockTickerId, liked: true };
  });
  return stockList;
}

export async function addUserWatchList(wStockTickerId, userEmail) {
  const res = await http.post(apiEndpoint, {
    wStockTickerId,
    userEmail,
  });
  return res;
}

export async function deleteUserWatchList(id) {
  const deleteEndPoint = apiEndpoint + "/delete";
  await http.delete(deleteEndPoint, {
    data: { id },
  });
}

export default {
  getStockList,
  getUserWatchList,
  addUserWatchList,
  deleteUserWatchList,
};
