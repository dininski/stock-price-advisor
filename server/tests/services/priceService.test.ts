import {
  calculateBestPrice,
  findElementPosition,
} from "server/services/priceService";
import { Stock } from "@stock-advisor/shared/model/Stock";

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
      const result = calculateBestPrice(prices, 0, 4);
      expect(result.profit).toEqual(4);
      expect(result.buyInformation.date).toEqual(0);
      expect(result.sellInformation.date).toEqual(4);
    });

    it("calculates when best price is in the middle", () => {
      const prices = generateData([5, 6, 1, 4, 2, 3]);
      const result = calculateBestPrice(prices, 0, 5);
      expect(result.profit).toEqual(3);
      expect(result.buyInformation.date).toEqual(2);
      expect(result.sellInformation.date).toEqual(3);
    });

    it("calculates when best price is first transaction", () => {
      const prices = generateData([1, 100, 2, 3, 4, 5, 6, 6]);
      const result = calculateBestPrice(prices, 0, 7);

      expect(result.profit).toEqual(99);
      expect(result.buyInformation.date).toEqual(0);
      expect(result.sellInformation.date).toEqual(1);
    });

    it("throws when less than 2 prices provided", () => {
      const prices = generateData([1]);
      expect(() => calculateBestPrice(prices, 0, 1000)).toThrow();
    });

    it("throws when sell date is before buy date", () => {
      const prices = generateData([1]);
      expect(() => calculateBestPrice(prices, 1000, 0)).toThrow();
    });

    it("throws when buy date outside of range", () => {
      const prices = generateData([1, 2, 3]);
      expect(() => calculateBestPrice(prices, -1, 2)).toThrow();
    });

    it("throws when sell date outside of range", () => {
      const prices = generateData([1, 2, 3]);
      expect(() => calculateBestPrice(prices, 0, 5)).toThrow();
    });

    it("returns correctly when descending", () => {
      const prices = generateData([5, 4, 3, 2, 1]);
      const result = calculateBestPrice(prices, 0, 4);
      expect(result?.profit).toEqual(-1);
    });
  });

  describe("findElementPosition", () => {
    it("throws when element out of range (min)", () => {
      expect(() =>
        findElementPosition(generateData([1, 2]), -1, true),
      ).toThrow();
    });

    it("throws when element out of range (max)", () => {
      expect(() =>
        findElementPosition(generateData([1, 2]), 2, false),
      ).toThrow();
    });

    it("rounds up correctly", () => {
      const data = generateData([0, 0, 0, 0]).map((val) => ({
        price: val.price,
        date: val.date * 2,
      }));
      const result = findElementPosition(data, 1, false);
      expect(result).toEqual(0);
    });

    it("rounds down correctly", () => {
      const data = generateData([0, 0, 0, 0]).map((val) => ({
        price: val.price,
        date: val.date * 2,
      }));
      const result = findElementPosition(data, 1, true);
      expect(result).toEqual(1);
    });
  });
});
