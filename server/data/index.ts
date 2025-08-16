import type { Stock } from "shared/model/Stock";

let data: Stock[];

const regenerateData = () => {
  const startDate = Date.now();
  data = Array.from({ length: Math.floor(Math.random() * 30) }, (_, index) => ({
    price: Math.floor(Math.random() * 400),
    date: startDate + index * 1000,
  }));
};

regenerateData();

const getData = () => {
  return data;
};

export { regenerateData, getData };
