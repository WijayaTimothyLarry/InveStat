import http from "./httpService";
import { apiUrl } from "../config.json";
import purchasedStockService from "./purchasedStockService";
import stockDataService from "./stockDataService";

const apiEndpoint = apiUrl + "/portfolio";

export async function getPortfolioList(token) {
  const { data } = await http.get(apiEndpoint, {
    headers: { "x-access-token": token },
  });
  console.log(data);
  return data;
}
export async function getCompletePortfolioList(token) {
  const { data: portfolioList } = await http.get(apiEndpoint, {
    headers: { "x-access-token": token },
  });
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

export async function getTotalInvestementValue(token) {
  const { data: portfolioList } = await http.get(apiEndpoint, {
    headers: { "x-access-token": token },
  });
  var currentInvestmentValue = 0;
  for (const portfolio of portfolioList) {
    portfolio.totalValue = 0;
    const portfolioId = portfolio.id;
    const { data: stockList } =
      await purchasedStockService.getPurchasedStockList(portfolioId);
    for (const stock of stockList) {
      const ticker = stock.stockTickerId;
      const data = await stockDataService.getStockQuote(ticker);
      stock.value = data.price * stock.totalQuantity;
      portfolio.totalValue += stock.value;
    }
    portfolio.totalValue = portfolio.totalValue.toFixed(2);
    currentInvestmentValue += parseFloat(portfolio.totalValue);
  }
  return currentInvestmentValue.toFixed(2);
}

export async function getHistoricalData(portfolioId) {
  const { data: stockList } = await purchasedStockService.getPurchasedStockList(
    portfolioId
  );
  console.log(stockList);
  let totalValue = Array(30).fill(0);

  for (const stock of stockList) {
    const priceList = await stockDataService.getStockHistoricalPrice(
      stock.stockTickerId
    );
    totalValue = totalValue.map((p, index) => {
      return (
        parseFloat(p) +
        parseFloat(priceList[index]) * stock.totalQuantity
      ).toFixed(2);
    });
  }

  return { totalValue: totalValue.reverse() };
}

export async function getGraphData(token) {
  try {
    const { data: portfolioList } = await http.get(apiEndpoint, {
      headers: { "x-access-token": token },
    });
    const portfolioTotalValue = [];

    const { date } = await stockDataService.getStockHistoricalData("AAPL");

    for (const portfolio of portfolioList) {
      const { totalValue } = await getHistoricalData(portfolio.id);
      portfolioTotalValue.push({
        portfolioHistoricalValue: totalValue,
        portfolioName: portfolio.portfolioName,
      });
    }

    return { portfolioTotalValue, date };
  } catch (ex) {
    console.log(ex);
    return ex;
  }
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
  getCompletePortfolioList,
  getHistoricalData,
  addNewPortfolio,
  deletePortfolio,
  updatePortfolio,
  getGraphData,
  getTotalInvestementValue,
};
