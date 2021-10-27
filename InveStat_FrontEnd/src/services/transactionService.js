import http from "./httpService";
import { apiUrl } from "../config.json";
import purchasedStockService from "./purchasedStockService";
import auth from "./authService";

const apiEndpoint = apiUrl + "/transaction";

export async function addTransaction(data) {
  const submitData = {
    ...data,
    portfolioId: data.id,
  };
  delete submitData.id;
  console.log(submitData);
  await http.post(apiEndpoint, submitData);

  await http.put(apiEndpoint, submitData);
}

export async function getTransactionList(ticker) {
  const purchasedStockList =
    await purchasedStockService.getAllPurchasedStockList(auth.getJwt());
  const { id } = purchasedStockList.find((s) => {
    return s.stockTickerId === ticker;
  });

  const { data } = await http.get(apiEndpoint, {
    headers: { purchasedStockId: id },
  });
  return data;
}
export default { addTransaction, getTransactionList };
