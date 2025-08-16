import type { Stock } from "../../model/Stock";
import { calculateBestPrice } from "../../services/priceService";

const generateData = (sample: number[]): Stock[] => {
  return sample.map((val, index) => ({
    price: val,
    date: index,
  }));
};

describe("priceService", () => {
  describe("calculateBestPrice", () => {
    it("calculates for ascending price", () => {
      const prices = generateData([1, 2, 3, 4, 5]);
      const result = calculateBestPrice(prices);
      expect(result.profit).toEqual(4);
      expect(result.buyInformation.date).toEqual(0);
      expect(result.sellInformation.date).toEqual(4);
    });
  });
});
