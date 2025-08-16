export type PriceRequest = {
  startDate: number;
  endDate: number;
};

export type PriceResponse = {
  buyInformation: {
    date: number;
    price: number;
  };
  sellInformation: {
    date: number;
    price: number;
  };
  profit: number;
};
