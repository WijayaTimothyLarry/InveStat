import stockList from "../US Ticker List/USTickerList.json";

export function getStockList() {
  const StockList = stockList.filter((s) => {
    if (s.Exchange === "NASDAQ" || s.Exchange === "NYSE") return s;
  });
  return StockList;
}

export default { getStockList };
