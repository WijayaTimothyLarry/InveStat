import http from "./httpService";

export async function getDailyStockData(tickerId) {
  const apiEndpoint =
    "https://financialmodelingprep.com/api/v3/quote/" +
    tickerId +
    "?apikey=41ac00e73c382ba2d01d302571413eb1";
  const { data } = await http.get(apiEndpoint);
  return data[0];
}

export async function getStockHistoricalData(tickerId) {
  const apiEndpoint =
    "https://financialmodelingprep.com/api/v3/historical-price-full/" +
    tickerId +
    "?serietype=line&apikey=41ac00e73c382ba2d01d302571413eb1";
  const { data } = await http.get(apiEndpoint);
  const date = data.historical.slice(0, 30).map((s) => s.date);
  const price = data.historical.slice(0, 30).map((s) => s.close);
  return { date: date, price: price, symbol: data.symbol };
}
export default { getDailyStockData };
