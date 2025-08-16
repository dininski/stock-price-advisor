import type { Stock } from "shared/model/Stock";
import { PriceResponse } from "shared/response/Price";

const findElementPosition = (
  data: Stock[],
  time: number,
  roundUp: boolean,
): number => {
  if (time < data[0].date) {
    throw new Error("Time is lower than the minimum value allowed");
  }

  if (time > data[data.length - 1].date) {
    throw new Error("Time is higher that the maximum value allowed");
  }

  let start = 0;
  let end = data.length - 1;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);

    if (data[mid].date === time) {
      return mid;
    } else if (data[mid].date < time) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  return roundUp ? start : start - 1;
};

const calculateBestPrice = (
  stock: Stock[],
  buyTime: number,
  sellTime: number,
): PriceResponse => {
  if (stock.length < 2) {
    throw new Error(
      "Not enough data points for stock. More ticker prices needed.",
    );
  }

  if (buyTime > sellTime) {
    throw new Error("Buy time cannot be before sell time.");
  }

  const startPosition = findElementPosition(stock, buyTime, true);
  const endPosition = findElementPosition(stock, sellTime, false);

  let minBuy = stock[startPosition];
  let maxProfit = -Infinity;
  let bestBuy = stock[0];
  let bestSell = stock[1];

  for (let i = startPosition + 1; i < endPosition + 1; i++) {
    const profit = stock[i].price - minBuy.price;
    if (profit > maxProfit) {
      maxProfit = profit;
      bestBuy = minBuy;
      bestSell = stock[i];
    }

    if (stock[i].price < minBuy.price) {
      minBuy = stock[i];
    }
  }

  return {
    buyInformation: {
      price: bestBuy.price,
      date: bestBuy.date,
    },
    sellInformation: {
      price: bestSell.price,
      date: bestSell.date,
    },
    profit: maxProfit,
  };
};

export { calculateBestPrice, findElementPosition };
