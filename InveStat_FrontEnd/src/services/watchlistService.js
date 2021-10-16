import stockList from "../US Ticker List/USTickerList.json";

const StockList = stockList;
export function getStockList() {
  return StockList;
}

export default { getStockList };
