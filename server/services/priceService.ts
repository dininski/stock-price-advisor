import type { Stock } from "server/model/Stock";
import type { PriceResponse } from "server/routes/price/priceModel";

// TODO: change return type
// TODO: error handling
const calculateBestPrice = (stock: Stock[]): PriceResponse | null => {
  let isProfitable = false;
  if (stock.length < 2) {
    throw new Error(
      "Not enough data points for stock. More ticker prices needed.",
    );
  }

  let minBuy = stock[0];
  let maxProfit = 0;
  let bestBuy = stock[0];
  let bestSell = stock[1];
  
  for (let i = 0; i < stock.length; i++) {
    const profit = stock[i].price - minBuy.price;
    if (profit > maxProfit) {
      isProfitable = true;
      maxProfit = profit;
      bestBuy = minBuy;
      bestSell = stock[i];
    }

    if (stock[i].price < minBuy.price) {
      minBuy = stock[i];
    }
  }

  return isProfitable
    ? {
        buyInformation: {
          price: bestBuy.price,
          date: bestBuy.date,
        },
        sellInformation: {
          price: bestSell.price,
          date: bestSell.date,
        },
        profit: maxProfit,
      }
    : null;
};

export { calculateBestPrice };
