import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/transaction";

export async function addTransaction(data) {
  const {
    transactionType,
    TransactionPrice,
    changeInQuantity,
    transactionDate,
    id: portfolioId,
    purchasedStockStockTickerId,
    brokerageCost,
  } = data;

  await http.post(apiEndpoint, {
    transactionType,
    TransactionPrice,
    changeInQuantity,
    transactionDate,
    portfolioId,
    purchasedStockStockTickerId,
    brokerageCost,
  });
}

export default { addTransaction };
