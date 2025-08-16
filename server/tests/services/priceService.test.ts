import { Stock } from "server/model/Stock";
import { calculateBestPrice } from "server/services/priceService";

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

    it("calculates when best price is in the middle", () => {
      const prices = generateData([5, 6, 1, 4, 2, 3]);
      const result = calculateBestPrice(prices);
      expect(result.profit).toEqual(3);
      expect(result.buyInformation.date).toEqual(2);
      expect(result.sellInformation.date).toEqual(3);
    });

    it("calculates when best price is first transaction", () => {
      const prices = generateData([1, 100, 2, 3, 4, 5, 6, 6]);
      const result = calculateBestPrice(prices);
      expect(result.profit).toEqual(99);
      expect(result.buyInformation.date).toEqual(0);
      expect(result.sellInformation.date).toEqual(1);
    });

    it("throws when less than 2 prices provided", () => {
      const prices = generateData([1]);
      expect(() => calculateBestPrice(prices)).toThrow();
    });
  });
});
