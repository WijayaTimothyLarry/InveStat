import http from "./httpService";
import { apiUrl } from "../config.json";

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

export default { addTransaction };
