import { formatEpoch } from "frontend/util/dateFormatter";

describe("formatEpoch", () => {
  it("formats date correctly", () => {
    const epoch = 514476916000;
    const result = formatEpoch(epoch, "GMT");
    expect(result).toEqual("21/04/1986, 14:15:16");
  });
});
