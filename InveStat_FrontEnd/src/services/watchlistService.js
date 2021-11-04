import _ from "lodash";
import { apiUrl } from "../config.json";
import http from "./httpService";

const apiEndpoint = apiUrl + "/watchlist";
//const apiKey = "7aa87da7ef549544cc1ed7281de197b0";
//const apiKey = "cf3953c4e866acf8a208e15e1f835bc1";
//const apiKey = "527bb5b45b47154dec3da6e9732df14f";
const apiKey = "41ac00e73c382ba2d01d302571413eb1";
const stockApi =
  "https://financialmodelingprep.com/api/v3/available-traded/list?apikey=" +
  apiKey;

export async function getStockList() {
  const { data } = await http.get(stockApi);
  const filtered = data.filter((s) => {
    if (
      (s.exchangeShortName === "NASDAQ" || s.exchangeShortName === "NYSE") &&
      (!s.name.includes("%") || !s.name.includes("&")) &&
      s.price !== 0
    ) {
      s.id = s.symbol;
      s.liked = false;
      return s;
    }
  });
  const StockList = _.orderBy(filtered, "symbol", "asc");
  return StockList;
}

export async function getUserWatchList(token) {
  try {
    const { data } = await http.get(apiEndpoint, {
      headers: { "x-access-token": token },
    });
    const stockList = data.map((w) => {
      return { id: w.id, stockID: w.wStockTickerId, liked: true };
    });
    return stockList;
  } catch (ex) {
    console.log(ex);
    return ex;
  }
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
  //getStockList2,
};
