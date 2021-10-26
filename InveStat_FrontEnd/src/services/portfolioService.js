import http from "./httpService";
import { apiUrl } from "../config.json";
import purchasedStockService from "./purchasedStockService";
import stockDataService from "./stockDataService";

const apiEndpoint = apiUrl + "/portfolio";

export async function getPortfolioList(token) {
  const { data: portfolioList } = await http.get(apiEndpoint, {
    headers: { "x-access-token": token },
  });

  console.log(portfolioList);
  for (const portfolio of portfolioList) {
    portfolio.totalValue = 0;
    portfolio.costPrice = 0;
    const portfolioId = portfolio.id;
    const { data: stockList } =
      await purchasedStockService.getPurchasedStockList(portfolioId);
    for (const stock of stockList) {
      const ticker = stock.stockTickerId;
      const data = await stockDataService.getStockQuote(ticker);
      stock.costPrice = stock.avgPurchasePriceUsd * stock.totalQuantity;
      portfolio.costPrice += stock.costPrice;
      stock.value = data.price * stock.totalQuantity;
      portfolio.totalValue += stock.value;
    }
    portfolio.totalValue = portfolio.totalValue.toFixed(2);
    portfolio.PnL = (portfolio.totalValue - portfolio.costPrice).toFixed(2);
    if (portfolio.costPrice != 0)
      portfolio.return = ((portfolio.PnL / portfolio.costPrice) * 100).toFixed(
        2
      );
    else portfolio.return = 0;
  }
  return portfolioList;
}

export async function addNewPortfolio(userEmail, portfolioName) {
  return await http.post(apiEndpoint, { portfolioName, userEmail });
}

export async function deletePortfolio(token, id) {
  const deleteEndPoint = apiEndpoint + "/delete";
  return await http.delete(deleteEndPoint, {
    headers: {
      "x-access-token": token,
    },
    data: { id },
  });
}

export async function updatePortfolio(token, portfolioId) {
  return await http.put(apiEndpoint, {
    headers: {
      "x-access-token": token,
    },
    data: { portfolioId },
  });
}

export default {
  getPortfolioList,
  addNewPortfolio,
  deletePortfolio,
  updatePortfolio,
};
