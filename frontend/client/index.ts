import axios from "axios";
import { Stock } from "shared/model/Stock";
import { PriceResponse } from "shared/response/Price";

const baseUrl = "localhost:3030";
const scheme = "http";

const regenerateData = async () => {
  const response = await axios.post<Stock[] | null>(
    `${scheme}://${baseUrl}/api/v1/stock`,
  );

  return response;
};

const fetchStockData = async () => {
  const response = await axios.get<Stock[] | null>(
    `${scheme}://${baseUrl}/api/v1/stock`,
  );

  return response;
};

const fetchBestProfit = async (buyTime: number, sellTime: number) => {
  const response = await axios.get<PriceResponse | null>(
    `${scheme}://${baseUrl}/api/v1/price/best?buyTime=${buyTime}&sellTime=${sellTime}`,
  );

  return response;
};

export {
  regenerateData,
  fetchStockData,
  fetchBestProfit,
};
