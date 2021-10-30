import http from "./httpService";

//const apiKey = "cf3953c4e866acf8a208e15e1f835bc1";
//const apiKey = "7aa87da7ef549544cc1ed7281de197b0";
const apiKey = "41ac00e73c382ba2d01d302571413eb1";
export async function getStockQuote(tickerId) {
  const apiEndpoint =
    "https://financialmodelingprep.com/api/v3/quote/" +
    tickerId +
    "?apikey=" +
    apiKey;
  const { data } = await http.get(apiEndpoint);
  return data[0];
}

export async function getStockHistoricalData(tickerId) {
  const apiEndpoint =
    "https://financialmodelingprep.com/api/v3/historical-price-full/" +
    tickerId +
    "?serietype=line&apikey=" +
    apiKey;
  const { data } = await http.get(apiEndpoint);
  console.log(data);
  const date = data.historical.slice(0, 30).map((s) => s.date);
  const price = data.historical.slice(0, 30).map((s) => s.close.toFixed(2));
  return { date: date, price: price, symbol: data.symbol };
}

export async function getStockHistoricalPrice(tickerId) {
  const apiEndpoint =
    "https://financialmodelingprep.com/api/v3/historical-price-full/" +
    tickerId +
    "?serietype=line&apikey=" +
    apiKey;
  const { data } = await http.get(apiEndpoint);
  const price = data.historical.slice(0, 30).map((s) => s.close.toFixed(2));
  return price;
}
export default {
  getStockHistoricalData,
  getStockQuote,
  getStockHistoricalPrice,
};
